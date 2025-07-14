using Mirror;
using UnityEngine;
using System.Collections.Generic;
using System.Linq;

namespace PokerGame.Logic
{
    public class PokerGameManager : NetworkBehaviour
    {
        [Header("Game Settings")]
        public int maxPlayers = 6;
        public int smallBlind = 10;
        public int bigBlind = 20;
        public float actionTimeout = 30f;
        
        [Header("Game State")]
        [SyncVar] public GameState currentState = GameState.Waiting;
        [SyncVar] public int currentPlayerIndex = 0;
        [SyncVar] public int dealerIndex = 0;
        [SyncVar] public int pot = 0;
        [SyncVar] public int currentBet = 0;
        [SyncVar] public GameRound currentRound = GameRound.PreFlop;
        
        [Header("Cards")]
        public List<Card> communityCards = new List<Card>();
        private List<Card> deck = new List<Card>();
        
        private readonly SyncList<PokerPlayer> players = new SyncList<PokerPlayer>();
        private CardDealer cardDealer;
        private PokerUI pokerUI;
        
        public enum GameState
        {
            Waiting,
            Starting,
            Playing,
            Showdown,
            GameOver
        }
        
        public enum GameRound
        {
            PreFlop,
            Flop,
            Turn,
            River,
            Showdown
        }
        
        void Start()
        {
            cardDealer = GetComponent<CardDealer>();
            pokerUI = FindObjectOfType<PokerUI>();
            
            if (cardDealer == null)
                cardDealer = gameObject.AddComponent<CardDealer>();
        }
        
        public override void OnStartServer()
        {
            base.OnStartServer();
            InitializeDeck();
        }
        
        void InitializeDeck()
        {
            deck.Clear();
            string[] suits = { "Hearts", "Diamonds", "Clubs", "Spades" };
            string[] values = { "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" };
            
            foreach (string suit in suits)
            {
                foreach (string value in values)
                {
                    deck.Add(new Card(value, suit));
                }
            }
            
            ShuffleDeck();
        }
        
        void ShuffleDeck()
        {
            for (int i = 0; i < deck.Count; i++)
            {
                Card temp = deck[i];
                int randomIndex = Random.Range(i, deck.Count);
                deck[i] = deck[randomIndex];
                deck[randomIndex] = temp;
            }
        }
        
        [Server]
        public void AddPlayer(PokerPlayer player)
        {
            if (players.Count < maxPlayers)
            {
                player.seatIndex = players.Count;
                players.Add(player);
                
                if (players.Count >= 2 && currentState == GameState.Waiting)
                {
                    StartGame();
                }
            }
        }
        
        [Server]
        public void RemovePlayer(PokerPlayer player)
        {
            players.Remove(player);
            
            if (players.Count < 2 && currentState == GameState.Playing)
            {
                EndGame();
            }
        }
        
        [Server]
        void StartGame()
        {
            currentState = GameState.Starting;
            dealerIndex = Random.Range(0, players.Count);
            
            // Reset all players
            foreach (var player in players)
            {
                player.ResetForNewGame();
            }
            
            StartNewRound();
        }
        
        [Server]
        void StartNewRound()
        {
            currentState = GameState.Playing;
            currentRound = GameRound.PreFlop;
            pot = 0;
            currentBet = bigBlind;
            communityCards.Clear();
            
            // Deal hole cards
            DealHoleCards();
            
            // Post blinds
            PostBlinds();
            
            // Set first player to act (after big blind)
            currentPlayerIndex = (dealerIndex + 3) % players.Count;
            
            RpcUpdateGameState();
        }
        
        [Server]
        void DealHoleCards()
        {
            foreach (var player in players)
            {
                if (player.isActive)
                {
                    player.holeCards.Clear();
                    player.holeCards.Add(DrawCard());
                    player.holeCards.Add(DrawCard());
                }
            }
        }
        
        [Server]
        void PostBlinds()
        {
            int smallBlindIndex = (dealerIndex + 1) % players.Count;
            int bigBlindIndex = (dealerIndex + 2) % players.Count;
            
            players[smallBlindIndex].PlaceBet(smallBlind);
            players[bigBlindIndex].PlaceBet(bigBlind);
            
            pot += smallBlind + bigBlind;
        }
        
        [Server]
        Card DrawCard()
        {
            if (deck.Count > 0)
            {
                Card card = deck[0];
                deck.RemoveAt(0);
                return card;
            }
            return null;
        }
        
        [Server]
        public void PlayerAction(uint playerId, PlayerAction action, int amount = 0)
        {
            PokerPlayer player = players.FirstOrDefault(p => p.netId == playerId);
            if (player == null || !player.isActive) return;
            
            switch (action)
            {
                case PlayerAction.Fold:
                    player.Fold();
                    break;
                    
                case PlayerAction.Call:
                    int callAmount = currentBet - player.currentBet;
                    player.PlaceBet(callAmount);
                    pot += callAmount;
                    break;
                    
                case PlayerAction.Raise:
                    int raiseAmount = amount - player.currentBet;
                    player.PlaceBet(raiseAmount);
                    pot += raiseAmount;
                    currentBet = amount;
                    break;
                    
                case PlayerAction.Check:
                    // No action needed
                    break;
            }
            
            NextPlayer();
        }
        
        [Server]
        void NextPlayer()
        {
            // Check if betting round is complete
            if (IsBettingRoundComplete())
            {
                NextRound();
                return;
            }
            
            // Move to next active player
            do
            {
                currentPlayerIndex = (currentPlayerIndex + 1) % players.Count;
            }
            while (!players[currentPlayerIndex].isActive);
            
            RpcUpdateGameState();
        }
        
        [Server]
        bool IsBettingRoundComplete()
        {
            var activePlayers = players.Where(p => p.isActive && !p.hasFolded).ToList();
            
            if (activePlayers.Count <= 1) return true;
            
            return activePlayers.All(p => p.currentBet == currentBet || p.isAllIn);
        }
        
        [Server]
        void NextRound()
        {
            // Reset player bets for next round
            foreach (var player in players)
            {
                player.currentBet = 0;
            }
            
            currentBet = 0;
            
            switch (currentRound)
            {
                case GameRound.PreFlop:
                    DealFlop();
                    currentRound = GameRound.Flop;
                    break;
                    
                case GameRound.Flop:
                    DealTurn();
                    currentRound = GameRound.Turn;
                    break;
                    
                case GameRound.Turn:
                    DealRiver();
                    currentRound = GameRound.River;
                    break;
                    
                case GameRound.River:
                    Showdown();
                    return;
            }
            
            // First player to act after dealer
            currentPlayerIndex = (dealerIndex + 1) % players.Count;
            while (!players[currentPlayerIndex].isActive)
            {
                currentPlayerIndex = (currentPlayerIndex + 1) % players.Count;
            }
            
            RpcUpdateGameState();
        }
        
        [Server]
        void DealFlop()
        {
            // Burn one card
            DrawCard();
            
            // Deal 3 community cards
            for (int i = 0; i < 3; i++)
            {
                communityCards.Add(DrawCard());
            }
        }
        
        [Server]
        void DealTurn()
        {
            DrawCard(); // Burn card
            communityCards.Add(DrawCard());
        }
        
        [Server]
        void DealRiver()
        {
            DrawCard(); // Burn card
            communityCards.Add(DrawCard());
        }
        
        [Server]
        void Showdown()
        {
            currentRound = GameRound.Showdown;
            currentState = GameState.Showdown;
            
            // Determine winner(s)
            var activePlayers = players.Where(p => p.isActive && !p.hasFolded).ToList();
            
            if (activePlayers.Count == 1)
            {
                // Only one player left, they win
                activePlayers[0].chips += pot;
                RpcAnnounceWinner(activePlayers[0].netId, pot);
            }
            else
            {
                // Evaluate hands and determine winner
                EvaluateHands(activePlayers);
            }
            
            // Start new round after delay
            Invoke(nameof(PrepareNextRound), 5f);
        }
        
        [Server]
        void EvaluateHands(List<PokerPlayer> activePlayers)
        {
            // Simple hand evaluation - implement full poker hand ranking
            var winner = activePlayers[0]; // Placeholder
            winner.chips += pot;
            RpcAnnounceWinner(winner.netId, pot);
        }
        
        [Server]
        void PrepareNextRound()
        {
            // Move dealer button
            dealerIndex = (dealerIndex + 1) % players.Count;
            
            // Remove players with no chips
            for (int i = players.Count - 1; i >= 0; i--)
            {
                if (players[i].chips <= 0)
                {
                    players.RemoveAt(i);
                }
            }
            
            if (players.Count >= 2)
            {
                StartNewRound();
            }
            else
            {
                EndGame();
            }
        }
        
        [Server]
        void EndGame()
        {
            currentState = GameState.GameOver;
            RpcGameOver();
        }
        
        [ClientRpc]
        void RpcUpdateGameState()
        {
            if (pokerUI != null)
            {
                pokerUI.UpdateGameState(this);
            }
        }
        
        [ClientRpc]
        void RpcAnnounceWinner(uint winnerId, int winAmount)
        {
            if (pokerUI != null)
            {
                pokerUI.AnnounceWinner(winnerId, winAmount);
            }
        }
        
        [ClientRpc]
        void RpcGameOver()
        {
            if (pokerUI != null)
            {
                pokerUI.ShowGameOver();
            }
        }
    }
    
    public enum PlayerAction
    {
        Fold,
        Check,
        Call,
        Raise
    }
}