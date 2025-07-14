using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.Collections.Generic;

namespace PokerGame.Logic
{
    public class PokerUI : MonoBehaviour
    {
        [Header("Game UI")]
        public TextMeshProUGUI potText;
        public TextMeshProUGUI currentBetText;
        public TextMeshProUGUI gameStateText;
        public GameObject actionButtonsPanel;
        
        [Header("Action Buttons")]
        public Button foldButton;
        public Button checkButton;
        public Button callButton;
        public Button raiseButton;
        public TextMeshProUGUI callButtonText;
        public TextMeshProUGUI raiseButtonText;
        
        [Header("Raise Controls")]
        public Slider raiseSlider;
        public TextMeshProUGUI raiseAmountText;
        public Button raiseConfirmButton;
        public GameObject raisePanel;
        
        [Header("Player Seats")]
        public PlayerSeatUI[] playerSeats;
        
        [Header("Community Cards")]
        public Transform communityCardsParent;
        
        [Header("Notifications")]
        public GameObject winnerPanel;
        public TextMeshProUGUI winnerText;
        public TextMeshProUGUI winAmountText;
        
        private PokerPlayer localPlayer;
        private PokerGameManager gameManager;
        
        void Start()
        {
            SetupButtons();
            HideActionButtons();
        }
        
        void SetupButtons()
        {
            if (foldButton != null)
                foldButton.onClick.AddListener(() => localPlayer?.DoFold());
                
            if (checkButton != null)
                checkButton.onClick.AddListener(() => localPlayer?.DoCheck());
                
            if (callButton != null)
                callButton.onClick.AddListener(() => localPlayer?.DoCall());
                
            if (raiseButton != null)
                raiseButton.onClick.AddListener(ShowRaisePanel);
                
            if (raiseConfirmButton != null)
                raiseConfirmButton.onClick.AddListener(ConfirmRaise);
                
            if (raiseSlider != null)
                raiseSlider.onValueChanged.AddListener(UpdateRaiseAmount);
        }
        
        public void SetLocalPlayer(PokerPlayer player)
        {
            localPlayer = player;
        }
        
        public void UpdateGameState(PokerGameManager manager)
        {
            gameManager = manager;
            
            // Update pot and bet display
            if (potText != null)
                potText.text = $"Pot: ${manager.pot}";
                
            if (currentBetText != null)
                currentBetText.text = $"Bet: ${manager.currentBet}";
                
            if (gameStateText != null)
                gameStateText.text = manager.currentRound.ToString();
            
            // Update player seats
            UpdatePlayerSeats();
            
            // Update action buttons for current player
            UpdateActionButtons();
        }
        
        void UpdatePlayerSeats()
        {
            if (playerSeats == null || gameManager == null) return;
            
            // Clear all seats first
            foreach (var seat in playerSeats)
            {
                seat.ClearSeat();
            }
            
            // Update active player seats
            var players = gameManager.GetComponent<PokerGameManager>().players;
            for (int i = 0; i < players.Count && i < playerSeats.Length; i++)
            {
                playerSeats[i].SetPlayer(players[i]);
                playerSeats[i].SetDealer(i == gameManager.dealerIndex);
                playerSeats[i].SetCurrentPlayer(i == gameManager.currentPlayerIndex);
            }
        }
        
        void UpdateActionButtons()
        {
            if (localPlayer == null || gameManager == null) return;
            
            bool isMyTurn = gameManager.currentPlayerIndex == localPlayer.seatIndex;
            
            if (isMyTurn && !localPlayer.hasFolded)
            {
                ShowActionButtons();
                
                // Update button states
                if (checkButton != null)
                    checkButton.interactable = localPlayer.CanCheck();
                    
                if (callButton != null)
                {
                    callButton.interactable = localPlayer.CanCall();
                    if (callButtonText != null)
                        callButtonText.text = $"Call ${localPlayer.GetCallAmount()}";
                }
                
                if (raiseButton != null)
                {
                    raiseButton.interactable = localPlayer.CanRaise();
                    if (raiseButtonText != null)
                        raiseButtonText.text = $"Raise ${localPlayer.GetMinRaise()}";
                }
            }
            else
            {
                HideActionButtons();
            }
        }
        
        void ShowActionButtons()
        {
            if (actionButtonsPanel != null)
                actionButtonsPanel.SetActive(true);
        }
        
        void HideActionButtons()
        {
            if (actionButtonsPanel != null)
                actionButtonsPanel.SetActive(false);
                
            if (raisePanel != null)
                raisePanel.SetActive(false);
        }
        
        void ShowRaisePanel()
        {
            if (raisePanel != null && localPlayer != null)
            {
                raisePanel.SetActive(true);
                
                // Setup slider
                if (raiseSlider != null)
                {
                    raiseSlider.minValue = localPlayer.GetMinRaise();
                    raiseSlider.maxValue = localPlayer.chips + localPlayer.currentBet;
                    raiseSlider.value = localPlayer.GetMinRaise();
                }
                
                UpdateRaiseAmount(raiseSlider.value);
            }
        }
        
        void UpdateRaiseAmount(float amount)
        {
            if (raiseAmountText != null)
                raiseAmountText.text = $"${(int)amount}";
        }
        
        void ConfirmRaise()
        {
            if (localPlayer != null && raiseSlider != null)
            {
                localPlayer.DoRaise((int)raiseSlider.value);
                
                if (raisePanel != null)
                    raisePanel.SetActive(false);
            }
        }
        
        public void AnnounceWinner(uint winnerId, int amount)
        {
            if (winnerPanel != null)
            {
                winnerPanel.SetActive(true);
                
                // Find winner name
                string winnerName = "Player";
                var players = FindObjectsOfType<PokerPlayer>();
                foreach (var player in players)
                {
                    if (player.netId == winnerId)
                    {
                        winnerName = player.playerName;
                        break;
                    }
                }
                
                if (winnerText != null)
                    winnerText.text = $"{winnerName} Wins!";
                    
                if (winAmountText != null)
                    winAmountText.text = $"${amount}";
                
                // Hide after 3 seconds
                Invoke(nameof(HideWinnerPanel), 3f);
            }
        }
        
        void HideWinnerPanel()
        {
            if (winnerPanel != null)
                winnerPanel.SetActive(false);
        }
        
        public void ShowGameOver()
        {
            if (gameStateText != null)
                gameStateText.text = "Game Over";
                
            HideActionButtons();
        }
    }
}