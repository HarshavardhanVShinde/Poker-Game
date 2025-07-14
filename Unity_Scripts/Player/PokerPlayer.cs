using Mirror;
using UnityEngine;
using System.Collections.Generic;

namespace PokerGame.Logic
{
    public class PokerPlayer : NetworkBehaviour
    {
        [Header("Player Info")]
        [SyncVar] public string playerName = "";
        [SyncVar] public int chips = 1000;
        [SyncVar] public int currentBet = 0;
        [SyncVar] public bool isActive = true;
        [SyncVar] public bool hasFolded = false;
        [SyncVar] public bool isAllIn = false;
        [SyncVar] public int seatIndex = -1;
        [SyncVar] public bool isDealer = false;
        
        [Header("Cards")]
        public List<Card> holeCards = new List<Card>();
        
        private PokerGameManager gameManager;
        private PlayerUI playerUI;
        
        public override void OnStartLocalPlayer()
        {
            base.OnStartLocalPlayer();
            
            // Set random player name for demo
            playerName = "Player" + Random.Range(1000, 9999);
            CmdSetPlayerName(playerName);
            
            // Find game manager and register
            gameManager = FindObjectOfType<PokerGameManager>();
            if (gameManager != null)
            {
                gameManager.AddPlayer(this);
            }
            
            // Setup UI
            playerUI = FindObjectOfType<PlayerUI>();
            if (playerUI != null)
            {
                playerUI.SetLocalPlayer(this);
            }
        }
        
        [Command]
        void CmdSetPlayerName(string name)
        {
            playerName = name;
        }
        
        public void ResetForNewGame()
        {
            currentBet = 0;
            hasFolded = false;
            isAllIn = false;
            holeCards.Clear();
        }
        
        [Server]
        public void PlaceBet(int amount)
        {
            int actualBet = Mathf.Min(amount, chips);
            chips -= actualBet;
            currentBet += actualBet;
            
            if (chips <= 0)
            {
                isAllIn = true;
            }
        }
        
        [Server]
        public void Fold()
        {
            hasFolded = true;
        }
        
        // Client-side action methods
        public void DoFold()
        {
            if (!isLocalPlayer) return;
            CmdPlayerAction(PlayerAction.Fold, 0);
        }
        
        public void DoCheck()
        {
            if (!isLocalPlayer) return;
            CmdPlayerAction(PlayerAction.Check, 0);
        }
        
        public void DoCall()
        {
            if (!isLocalPlayer) return;
            CmdPlayerAction(PlayerAction.Call, 0);
        }
        
        public void DoRaise(int amount)
        {
            if (!isLocalPlayer) return;
            CmdPlayerAction(PlayerAction.Raise, amount);
        }
        
        [Command]
        void CmdPlayerAction(PlayerAction action, int amount)
        {
            if (gameManager != null)
            {
                gameManager.PlayerAction(netId, action, amount);
            }
        }
        
        public bool CanCheck()
        {
            return currentBet == gameManager.currentBet;
        }
        
        public bool CanCall()
        {
            return currentBet < gameManager.currentBet && chips > 0;
        }
        
        public bool CanRaise()
        {
            return chips > (gameManager.currentBet - currentBet);
        }
        
        public int GetCallAmount()
        {
            return gameManager.currentBet - currentBet;
        }
        
        public int GetMinRaise()
        {
            return gameManager.currentBet * 2;
        }
    }
}