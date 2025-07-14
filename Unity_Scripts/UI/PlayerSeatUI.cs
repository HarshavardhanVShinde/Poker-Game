using UnityEngine;
using UnityEngine.UI;
using TMPro;

namespace PokerGame.Logic
{
    public class PlayerSeatUI : MonoBehaviour
    {
        [Header("UI References")]
        public Image avatarImage;
        public TextMeshProUGUI playerNameText;
        public TextMeshProUGUI chipsText;
        public TextMeshProUGUI currentBetText;
        public GameObject dealerBadge;
        public GameObject currentPlayerIndicator;
        public Image seatBackground;
        
        [Header("Card Positions")]
        public Transform[] cardPositions;
        
        [Header("Colors")]
        public Color activePlayerColor = new Color(0f, 0.9f, 0.765f, 1f);
        public Color inactivePlayerColor = new Color(0.5f, 0.5f, 0.5f, 1f);
        public Color foldedPlayerColor = new Color(0.3f, 0.3f, 0.3f, 1f);
        
        private PokerPlayer currentPlayer;
        private CardUI[] playerCards;
        
        void Start()
        {
            ClearSeat();
            SetupCardPositions();
        }
        
        void SetupCardPositions()
        {
            if (cardPositions != null)
            {
                playerCards = new CardUI[cardPositions.Length];
            }
        }
        
        public void SetPlayer(PokerPlayer player)
        {
            currentPlayer = player;
            
            if (player != null)
            {
                gameObject.SetActive(true);
                
                // Update player info
                if (playerNameText != null)
                    playerNameText.text = player.playerName;
                    
                if (chipsText != null)
                    chipsText.text = $"${player.chips}";
                    
                if (currentBetText != null)
                {
                    if (player.currentBet > 0)
                    {
                        currentBetText.text = $"${player.currentBet}";
                        currentBetText.gameObject.SetActive(true);
                    }
                    else
                    {
                        currentBetText.gameObject.SetActive(false);
                    }
                }
                
                // Update seat appearance based on player state
                UpdateSeatAppearance();
                
                // Update player cards
                UpdatePlayerCards();
            }
            else
            {
                ClearSeat();
            }
        }
        
        void UpdateSeatAppearance()
        {
            if (currentPlayer == null || seatBackground == null) return;
            
            Color seatColor;
            
            if (currentPlayer.hasFolded)
            {
                seatColor = foldedPlayerColor;
            }
            else if (currentPlayer.isActive)
            {
                seatColor = activePlayerColor;
            }
            else
            {
                seatColor = inactivePlayerColor;
            }
            
            seatBackground.color = seatColor;
        }
        
        void UpdatePlayerCards()
        {
            if (currentPlayer == null || cardPositions == null) return;
            
            // Clear existing cards
            ClearPlayerCards();
            
            // Show hole cards if available
            for (int i = 0; i < currentPlayer.holeCards.Count && i < cardPositions.Length; i++)
            {
                CreatePlayerCard(i, currentPlayer.holeCards[i]);
            }
        }
        
        void CreatePlayerCard(int index, Card card)
        {
            if (cardPositions[index] == null) return;
            
            // Create card UI object
            GameObject cardObj = Instantiate(Resources.Load<GameObject>("CardPrefab"));
            cardObj.transform.SetParent(cardPositions[index], false);
            cardObj.transform.localPosition = Vector3.zero;
            
            CardUI cardUI = cardObj.GetComponent<CardUI>();
            if (cardUI != null)
            {
                bool isLocalPlayerCard = currentPlayer.isLocalPlayer;
                cardUI.SetCard(card, isLocalPlayerCard);
                
                // Only reveal cards for local player or if game is in showdown
                if (isLocalPlayerCard || card.isRevealed)
                {
                    cardUI.RevealCard();
                }
            }
            
            playerCards[index] = cardUI;
        }
        
        void ClearPlayerCards()
        {
            if (playerCards != null)
            {
                foreach (var card in playerCards)
                {
                    if (card != null)
                    {
                        Destroy(card.gameObject);
                    }
                }
            }
        }
        
        public void SetDealer(bool isDealer)
        {
            if (dealerBadge != null)
                dealerBadge.SetActive(isDealer);
        }
        
        public void SetCurrentPlayer(bool isCurrent)
        {
            if (currentPlayerIndicator != null)
                currentPlayerIndicator.SetActive(isCurrent);
        }
        
        public void ClearSeat()
        {
            gameObject.SetActive(false);
            currentPlayer = null;
            
            if (dealerBadge != null)
                dealerBadge.SetActive(false);
                
            if (currentPlayerIndicator != null)
                currentPlayerIndicator.SetActive(false);
                
            if (currentBetText != null)
                currentBetText.gameObject.SetActive(false);
                
            ClearPlayerCards();
        }
        
        // Animation methods for visual feedback
        public void AnimateChipBet(int amount)
        {
            // Animate chips moving from player to pot
            // Implementation depends on your animation system
        }
        
        public void AnimateCardDeal()
        {
            // Animate cards being dealt to this seat
            // Implementation depends on your animation system
        }
        
        public void ShowFoldAnimation()
        {
            // Animate cards being folded/discarded
            if (playerCards != null)
            {
                foreach (var card in playerCards)
                {
                    if (card != null)
                    {
                        // Fade out or move cards to discard pile
                        card.GetComponent<CanvasGroup>().alpha = 0.3f;
                    }
                }
            }
        }
    }
}