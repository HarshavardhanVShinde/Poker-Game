using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.Collections;

namespace PokerGame.Logic
{
    public class CardUI : MonoBehaviour
    {
        [Header("UI References")]
        public Image cardBackground;
        public Image cardBack;
        public TextMeshProUGUI valueText;
        public TextMeshProUGUI suitText;
        public Button cardButton;
        
        [Header("Card Settings")]
        public Color cardFrontColor = Color.white;
        public Color cardBackColor = new Color(0.722f, 0.902f, 1f, 1f); // #B8E6FF
        
        private Card cardData;
        private bool isRevealed = false;
        private bool isPlayerCard = false;
        
        void Start()
        {
            if (cardButton != null)
            {
                cardButton.onClick.AddListener(OnCardClicked);
            }
            
            SetupCardAppearance();
        }
        
        void SetupCardAppearance()
        {
            // Set initial card back appearance
            if (cardBackground != null)
            {
                cardBackground.color = cardBackColor;
            }
            
            if (cardBack != null)
            {
                cardBack.gameObject.SetActive(true);
            }
            
            if (valueText != null)
            {
                valueText.gameObject.SetActive(false);
            }
            
            if (suitText != null)
            {
                suitText.gameObject.SetActive(false);
            }
        }
        
        public void SetCard(Card card, bool isPlayerCard = false)
        {
            this.cardData = card;
            this.isPlayerCard = isPlayerCard;
            
            if (card != null)
            {
                UpdateCardDisplay();
            }
        }
        
        void UpdateCardDisplay()
        {
            if (cardData == null) return;
            
            if (isRevealed)
            {
                ShowCardFront();
            }
            else
            {
                ShowCardBack();
            }
        }
        
        void ShowCardFront()
        {
            if (cardBackground != null)
            {
                cardBackground.color = cardFrontColor;
            }
            
            if (cardBack != null)
            {
                cardBack.gameObject.SetActive(false);
            }
            
            if (valueText != null)
            {
                valueText.gameObject.SetActive(true);
                valueText.text = cardData.value;
                valueText.color = cardData.GetSuitColor();
            }
            
            if (suitText != null)
            {
                suitText.gameObject.SetActive(true);
                suitText.text = cardData.GetSuitSymbol();
                suitText.color = cardData.GetSuitColor();
            }
        }
        
        void ShowCardBack()
        {
            if (cardBackground != null)
            {
                cardBackground.color = cardBackColor;
            }
            
            if (cardBack != null)
            {
                cardBack.gameObject.SetActive(true);
            }
            
            if (valueText != null)
            {
                valueText.gameObject.SetActive(false);
            }
            
            if (suitText != null)
            {
                suitText.gameObject.SetActive(false);
            }
        }
        
        public void RevealCard()
        {
            if (!isRevealed)
            {
                StartCoroutine(FlipCardAnimation());
            }
        }
        
        public void HideCard()
        {
            if (isRevealed)
            {
                StartCoroutine(FlipCardAnimation(false));
            }
        }
        
        IEnumerator FlipCardAnimation(bool reveal = true)
        {
            float flipDuration = 0.3f;
            float halfDuration = flipDuration / 2f;
            
            // First half - scale down
            float elapsed = 0f;
            Vector3 originalScale = transform.localScale;
            
            while (elapsed < halfDuration)
            {
                elapsed += Time.deltaTime;
                float progress = elapsed / halfDuration;
                
                Vector3 scale = originalScale;
                scale.x = Mathf.Lerp(1f, 0f, progress);
                transform.localScale = scale;
                
                yield return null;
            }
            
            // Change card appearance at halfway point
            isRevealed = reveal;
            UpdateCardDisplay();
            
            // Second half - scale back up
            elapsed = 0f;
            while (elapsed < halfDuration)
            {
                elapsed += Time.deltaTime;
                float progress = elapsed / halfDuration;
                
                Vector3 scale = originalScale;
                scale.x = Mathf.Lerp(0f, 1f, progress);
                transform.localScale = scale;
                
                yield return null;
            }
            
            transform.localScale = originalScale;
            
            // Play flip sound
            AudioManager.Instance?.PlayCardFlip();
        }
        
        void OnCardClicked()
        {
            // Only allow clicking on player's own cards
            if (isPlayerCard)
            {
                if (isRevealed)
                {
                    HideCard();
                }
                else
                {
                    RevealCard();
                }
            }
        }
        
        // Touch and hold functionality for mobile
        public void OnPointerDown()
        {
            if (isPlayerCard && !isRevealed)
            {
                RevealCard();
            }
        }
        
        public void OnPointerUp()
        {
            if (isPlayerCard && isRevealed)
            {
                HideCard();
            }
        }
    }
}