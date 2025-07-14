using UnityEngine;
using System.Collections;
using System.Collections.Generic;

namespace PokerGame.Logic
{
    public class CardDealer : MonoBehaviour
    {
        [Header("Animation Settings")]
        public float dealSpeed = 0.5f;
        public float cardSpacing = 0.1f;
        public AnimationCurve dealCurve = AnimationCurve.EaseOut(0, 0, 1, 1);
        
        [Header("Card Prefab")]
        public GameObject cardPrefab;
        
        [Header("Positions")]
        public Transform deckPosition;
        public Transform[] playerPositions;
        public Transform[] communityCardPositions;
        
        private Queue<GameObject> cardPool = new Queue<GameObject>();
        
        void Start()
        {
            InitializeCardPool();
        }
        
        void InitializeCardPool()
        {
            // Pre-instantiate card objects for performance
            for (int i = 0; i < 60; i++) // More than enough for a full game
            {
                GameObject card = Instantiate(cardPrefab);
                card.SetActive(false);
                cardPool.Enqueue(card);
            }
        }
        
        public void DealHoleCards(List<PokerPlayer> players)
        {
            StartCoroutine(DealHoleCardsCoroutine(players));
        }
        
        IEnumerator DealHoleCardsCoroutine(List<PokerPlayer> players)
        {
            // Deal 2 cards to each player
            for (int cardIndex = 0; cardIndex < 2; cardIndex++)
            {
                for (int playerIndex = 0; playerIndex < players.Count; playerIndex++)
                {
                    if (players[playerIndex].isActive)
                    {
                        yield return StartCoroutine(DealCardToPlayer(
                            players[playerIndex], 
                            playerIndex, 
                            cardIndex
                        ));
                        yield return new WaitForSeconds(cardSpacing);
                    }
                }
            }
        }
        
        IEnumerator DealCardToPlayer(PokerPlayer player, int playerIndex, int cardIndex)
        {
            GameObject cardObj = GetCardFromPool();
            CardUI cardUI = cardObj.GetComponent<CardUI>();
            
            // Set card data
            if (cardIndex < player.holeCards.Count)
            {
                cardUI.SetCard(player.holeCards[cardIndex]);
            }
            
            // Start position (deck)
            cardObj.transform.position = deckPosition.position;
            cardObj.transform.rotation = deckPosition.rotation;
            cardObj.SetActive(true);
            
            // Target position (player)
            Vector3 targetPosition = playerPositions[playerIndex].position;
            targetPosition.x += cardIndex * 0.5f; // Offset for second card
            
            // Animate card movement
            float elapsed = 0f;
            Vector3 startPos = cardObj.transform.position;
            
            while (elapsed < dealSpeed)
            {
                elapsed += Time.deltaTime;
                float progress = elapsed / dealSpeed;
                float curveValue = dealCurve.Evaluate(progress);
                
                cardObj.transform.position = Vector3.Lerp(startPos, targetPosition, curveValue);
                
                yield return null;
            }
            
            cardObj.transform.position = targetPosition;
            
            // Add card flip sound effect here if needed
            AudioManager.Instance?.PlayCardDeal();
        }
        
        public void DealCommunityCards(List<Card> communityCards, int count)
        {
            StartCoroutine(DealCommunityCardsCoroutine(communityCards, count));
        }
        
        IEnumerator DealCommunityCardsCoroutine(List<Card> communityCards, int count)
        {
            int startIndex = communityCards.Count - count;
            
            for (int i = 0; i < count; i++)
            {
                yield return StartCoroutine(DealCommunityCard(
                    communityCards[startIndex + i], 
                    startIndex + i
                ));
                yield return new WaitForSeconds(cardSpacing);
            }
        }
        
        IEnumerator DealCommunityCard(Card card, int position)
        {
            GameObject cardObj = GetCardFromPool();
            CardUI cardUI = cardObj.GetComponent<CardUI>();
            
            cardUI.SetCard(card);
            cardUI.RevealCard(); // Community cards are always revealed
            
            cardObj.transform.position = deckPosition.position;
            cardObj.transform.rotation = deckPosition.rotation;
            cardObj.SetActive(true);
            
            Vector3 targetPosition = communityCardPositions[position].position;
            
            float elapsed = 0f;
            Vector3 startPos = cardObj.transform.position;
            
            while (elapsed < dealSpeed)
            {
                elapsed += Time.deltaTime;
                float progress = elapsed / dealSpeed;
                float curveValue = dealCurve.Evaluate(progress);
                
                cardObj.transform.position = Vector3.Lerp(startPos, targetPosition, curveValue);
                
                yield return null;
            }
            
            cardObj.transform.position = targetPosition;
            AudioManager.Instance?.PlayCardDeal();
        }
        
        GameObject GetCardFromPool()
        {
            if (cardPool.Count > 0)
            {
                return cardPool.Dequeue();
            }
            else
            {
                // Create new card if pool is empty
                return Instantiate(cardPrefab);
            }
        }
        
        public void ReturnCardToPool(GameObject card)
        {
            card.SetActive(false);
            cardPool.Enqueue(card);
        }
        
        public void ClearTable()
        {
            // Return all active cards to pool
            CardUI[] activeCards = FindObjectsOfType<CardUI>();
            foreach (CardUI card in activeCards)
            {
                ReturnCardToPool(card.gameObject);
            }
        }
    }
}