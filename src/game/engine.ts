import { HoldemEngine } from 'holdem-engine';

const engine = new HoldemEngine();

engine.addPlayer({ id: 'player', name: 'Player', chips: 500 });
engine.addPlayer({ id: 'bot1', name: 'Bot 1', chips: 500 });
engine.addPlayer({ id: 'bot2', name: 'Bot 2', chips: 500 });

engine.start();

const takeBotAction = (player) => {
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

engine.on('stateChanged', (state) => {
  if (state.activePlayer) {
    takeBotAction(state.activePlayer);
  }
});

export default engine;
