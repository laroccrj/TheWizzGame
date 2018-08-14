import Player from '@/Domain/Game/Player'
import SpellInstance from '@/Domain/Game/SpellInstance'

export default class GameController {
  constructor(grid) {
    this.grid = grid
    this.players = [
      new Player(0,0, Player.FACING_DOWN),
      new Player(10,10, Player.FACING_UP)
    ];
    this.spellInstances = []
    this.currentPlayer = 0
    this.drawPlayers()
  }

  nextTurn() {
    this.currentPlayer++
    if(this.currentPlayer >= this.players.length) this.currentPlayer = 0
    this.drawGame()
  }

  drawGame() {
    this.resetGrid()
    this.drawPlayers()
    this.drawSpells()
  }

  drawPlayers() {
    let i = this.players.length
    while (i--) {
      let player = this.players[i]
      this.grid.setGridValue(player.posX, player.posY,
        {
          component: 'GamePlayerNode',
          facing: player.facing
        }
      )
    }
  }

  drawSpells() {
    let i = this.spellInstances.length
    while (i--) {
      let spellInstance = this.spellInstances[i]
      let frame = spellInstance.getNextFrame()
      let n = frame.length

      while (n--) {
        let spellNode = frame[n]

        if (!this.grid.withinBounds(spellNode.x, spellNode.y)) return

        this.grid.setGridValue(spellNode.x, spellNode.y, {
          component: 'GameSpellNode'
        })
      }
    }
  }

  resetGrid() {
    var x = this.grid.columns
    var y = this.grid.rows

    while (y--) {
      while (x--) {
        var node = this.grid.getGridValue(x, y)
        node.component = 'GameFieldNode'
      }
      x = this.grid.columns
    }
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

  castSpell(frames) {
    let player = this.players[this.currentPlayer]

    let spellInstance = new SpellInstance(
      player.facing,
      player.posX,
      player.posY,
      frames
    )

    this.spellInstances.push(spellInstance)
    this.nextTurn()
  }
}