using UnityEngine;
using System;

namespace PokerGame.Logic
{
    [Serializable]
    public class Card
    {
        public string value;
        public string suit;
        public bool isRevealed = false;
        
        public Card(string value, string suit)
        {
            this.value = value;
            this.suit = suit;
        }
        
        public int GetNumericValue()
        {
            switch (value)
            {
                case "A": return 14; // Ace high
                case "K": return 13;
                case "Q": return 12;
                case "J": return 11;
                default: return int.Parse(value);
            }
        }
        
        public Color GetSuitColor()
        {
            switch (suit)
            {
                case "Hearts":
                case "Diamonds":
                    return new Color(0.914f, 0.118f, 0.388f, 1f); // Red
                default:
                    return new Color(0.184f, 0.208f, 0.259f, 1f); // Black
            }
        }
        
        public string GetSuitSymbol()
        {
            switch (suit)
            {
                case "Hearts": return "♥";
                case "Diamonds": return "♦";
                case "Clubs": return "♣";
                case "Spades": return "♠";
                default: return suit;
            }
        }
        
        public override string ToString()
        {
            return $"{value}{GetSuitSymbol()}";
        }
    }
}