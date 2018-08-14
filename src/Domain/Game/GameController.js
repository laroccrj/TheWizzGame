import Player from '@/Domain/Game/Player'

export default class GameController {
  constructor(grid) {
    this.grid = grid
    this.players = [
      new Player(0,0, Player.FACING_DOWN)
    ];
    this.currentPlayer = 0
    this.drawPlayers()
  }

  nextTurn() {
    this.currentPlayer++
    if(this.currentPlayer >= this.players.length) this.currentPlayer = 0
    this.drawGame()
  }

  drawGame() {
    this.drawPlayers()
  }

  drawPlayers() {
    let player = this.players[this.currentPlayer]
    this.grid.setGridValue(player.posX, player.posY,
    {
      component: 'GamePlayerNode',
      facing: player.facing
    })
  }

  movePlayerForward() {
    let player = this.players[this.currentPlayer]

    switch (player.facing) {
      case Player.FACING_LEFT:
        this.movePlayer(-1, 0)
        break
      case Player.FACING_UP:
        this.movePlayer(0, -1)
        break
      case Player.FACING_RIGHT:
        this.movePlayer(1, 0)
        break
      case Player.FACING_DOWN:
        this.movePlayer(0, 1)
        break
    }

    this.nextTurn()
  }

  movePlayer(changeX, changeY) {
    let player = this.players[this.currentPlayer]

    let newX = player.posX + changeX
    let newY = player.posY + changeY

    if (!this.grid.withinBounds(newX, newY)) return

    this.grid.setGridValue(player.posX, player.posY, {
      component: 'GameFieldNode'
    })

    player.posY = newY
    player.posX = newX
  }

  rotateRight() {
    let player = this.players[this.currentPlayer]
    player.rotateRight()
    this.nextTurn()
  }

  rotateLeft() {
    let player = this.players[this.currentPlayer]
    player.rotateLeft()
    this.nextTurn()
  }
}