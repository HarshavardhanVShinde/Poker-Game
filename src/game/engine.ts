import { Deck, Card } from './poker';
import { EventEmitter } from 'events';

class Player {
  public hand: Card[] = [];
  public isFolded = false;
  public bet = 0;

  constructor(public id: string, public name: string, public chips: number) {}
}

class GameEngine extends EventEmitter {
  public players: Player[] = [];
  public communityCards: Card[] = [];
  public pot = 0;
  public activePlayerIndex = 0;
  public dealer = 0;
  private deck = new Deck();

  addPlayer(player: { id: string; name: string; chips: number }) {
    this.players.push(new Player(player.id, player.name, player.chips));
  }

  start() {
    this.deal();
    this.emit('stateChanged', this.getState());
  }

  deal() {
    this.deck.reset();
    this.players.forEach((player) => {
      player.hand = [this.deck.deal(), this.deck.deal()];
    });
    this.communityCards = [this.deck.deal(), this.deck.deal(), this.deck.deal()];
  }

  fold(playerId: string) {
    const player = this.players.find((p) => p.id === playerId);
    if (player) {
      player.isFolded = true;
      this.nextTurn();
    }
  }

  call(playerId: string) {
    const player = this.players.find((p) => p.id === playerId);
    if (player) {
      const amountToCall = this.getAmountToCall(playerId);
      player.chips -= amountToCall;
      player.bet += amountToCall;
      this.pot += amountToCall;
      this.nextTurn();
    }
  }

  raise(playerId: string, amount: number) {
    const player = this.players.find((p) => p.id === playerId);
    if (player) {
      player.chips -= amount;
      player.bet += amount;
      this.pot += amount;
      this.nextTurn();
    }
  }

  check(playerId: string) {
    this.nextTurn();
  }

  getAmountToCall(playerId: string): number {
    const player = this.players.find((p) => p.id === playerId);
    if (player) {
      const maxBet = Math.max(...this.players.map((p) => p.bet));
      return maxBet - player.bet;
    }
    return 0;
  }

  canRaise(playerId: string): boolean {
    return true;
  }

  nextTurn() {
    this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
    while (this.players[this.activePlayerIndex].isFolded) {
      this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
    }
    this.emit('stateChanged', this.getState());
  }

  getState() {
    return {
      players: this.players,
      communityCards: this.communityCards,
      pot: this.pot,
      activePlayer: this.players[this.activePlayerIndex],
      dealer: this.players[this.dealer].id,
    };
  }
}

const engine = new GameEngine();

engine.addPlayer({ id: 'player', name: 'Player', chips: 500 });
engine.addPlayer({ id: 'bot1', name: 'Bot 1', chips: 500 });
engine.addPlayer({ id: 'bot2', name: 'Bot 2', chips: 500 });

engine.start();

const takeBotAction = (player: Player) => {
  if (player.id.startsWith('bot')) {
    setTimeout(() => {
      try {
        const amountToCall = engine.getAmountToCall(player.id);
        const canRaise = engine.canRaise(player.id);

        if (amountToCall === 0) {
          engine.check(player.id);
        } else if (canRaise && Math.random() < 0.3) {
          const raiseAmount = Math.floor(Math.random() * player.chips);
          engine.raise(player.id, raiseAmount);
        } else {
          engine.call(player.id);
        }
      } catch (e) {
        engine.fold(player.id);
      }
    }, 1000);
  }
};

engine.on('stateChanged', (state: any) => {
  if (state.activePlayer) {
    takeBotAction(state.activePlayer);
  }
});

export default engine;
