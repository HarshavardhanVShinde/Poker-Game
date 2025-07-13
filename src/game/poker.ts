export const SUITS = ['c', 'd', 'h', 's'];
export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

export class Card {
  constructor(public suit: string, public rank: string) {}
}

export class Deck {
  cards: Card[] = [];

  constructor() {
    this.reset();
  }

  reset() {
    this.cards = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        this.cards.push(new Card(suit, rank));
      }
    }
    this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal(): Card {
    return this.cards.pop();
  }
}

export class Hand {
  constructor(public cards: Card[]) {}

  getRank() {
    // TODO: Implement hand evaluation
    return 0;
  }
}
