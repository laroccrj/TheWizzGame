import Player from '@/Domain/Game/Player'

export default class GameController {
  constructor(grid) {
    this.grid = grid
    this.players = [
      new Player(0,0)
    ];
    this.currentPlayer = 0
    this.drawPlayers()
  }

  nextTurn() {
    this.currentPlayer++
    if(this.currentPlayer >= this.players.length) this.currentPlayer = 0
  }

  drawPlayers() {
    let player = this.players[0]
    this.grid.setGridValue(player.posX, player.posY,
    {
      component: 'GamePlayerNode',
      facing: 'down'
    })
  }
}