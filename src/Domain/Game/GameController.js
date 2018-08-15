import Player from '@/Domain/Game/Player'
import SpellInstance from '@/Domain/Game/SpellInstance'

export default class GameController {
  constructor(grid) {
    this.grid = grid
    this.players = [
      new Player(0, 'Player 1', 0, 0, Player.FACING_DOWN),
      new Player(1, 'Player 2', 10, 10, Player.FACING_UP)
    ]
    this.spellInstances = []
    this.currentPlayerId = 0
    this.drawGame()
  }

  get currentPlayer() {
    return this.players[this.currentPlayerId]
  }

  nextTurn() {
    this.currentPlayerId++
    if (this.currentPlayerId >= this.players.length) this.currentPlayerId = 0
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
      this.grid.setGridValue(player.posX, player.posY, {
        component: 'GamePlayerNode',
        facing: player.facing
      })
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

        // Check if it hits a player
        let playerId = this.players.length
        let playerHit = false
        while (playerId--) {
          let player = this.players[playerId]
          if (player.posX === spellNode.x && player.posY === spellNode.y) playerHit = playerHit.id
        }

        if (playerHit !== false) {
          if (player.id !== spell.player.id) {
            let victor = this.players[spell.player.id]
            alert(victor.displayName + ' Wins!')
          }
        } else {
          this.grid.setGridValue(spellNode.x, spellNode.y, {
            component: 'GameSpellNode'
          })
        }
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
    let player = this.players[this.currentPlayerId]

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
    let player = this.players[this.currentPlayerId]

    let newX = player.posX + changeX
    let newY = player.posY + changeY

    if (!this.grid.withinBounds(newX, newY)) return

    player.posY = newY
    player.posX = newX
  }

  rotateRight() {
    let player = this.players[this.currentPlayerId]
    player.rotateRight()
    this.nextTurn()
  }

  rotateLeft() {
    let player = this.players[this.currentPlayerId]
    player.rotateLeft()
    this.nextTurn()
  }

  castSpell(frames) {
    let player = this.players[this.currentPlayerId]
    let spellInstance = new SpellInstance(player, frames)
    this.spellInstances.push(spellInstance)
    this.nextTurn()
  }
}
