import { HoldemEngine } from 'holdem-engine';

// Create a new game engine
const engine = new HoldemEngine();

// Add players
engine.addPlayer({ id: 'player', name: 'Player', chips: 500 });
engine.addPlayer({ id: 'bot1', name: 'Bot 1', chips: 500 });
engine.addPlayer({ id: 'bot2', name: 'Bot 2', chips: 500 });

// Start the game
engine.start();

const takeBotAction = (player: any) => {
  if (player.id.startsWith('bot')) {
    setTimeout(() => {
      try {
        engine.call(player.id);
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
