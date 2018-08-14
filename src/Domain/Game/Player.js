export default class Player {

  static get FACING_DOWN() { return 'down' }
  static get FACING_UP() { return 'up' }
  static get FACING_LEFT() { return 'left' }
  static get FACING_RIGHT() { return 'right' }

  constructor(posX, posY, facing) {
    this.posX = posX
    this.posY = posY
    this.facing = facing
  }

  rotateRight() {
    switch (this.facing) {
      case Player.FACING_LEFT:
        this.facing = Player.FACING_UP
        break
      case Player.FACING_UP:
        this.facing = Player.FACING_RIGHT
        break
      case Player.FACING_RIGHT:
        this.facing = Player.FACING_DOWN
        break
      case Player.FACING_DOWN:
        this.facing = Player.FACING_LEFT
        break
      default:
        this.facing = Player.FACING_DOWN
        console.error('Invalid playerNode.facing. Defaulting to down', this.facing)
        break
    }
  }

  rotateLeft() {
    switch (this.facing) {
      case Player.FACING_LEFT:
        this.facing = Player.FACING_DOWN
        break
      case Player.FACING_UP:
        this.facing = Player.FACING_LEFT
        break
      case Player.FACING_RIGHT:
        this.facing = Player.FACING_UP
        break
      case Player.FACING_DOWN:
        this.facing = Player.FACING_RIGHT
        break
      default:
        this.facing = Player.FACING_DOWN
        console.error('Invalid playerNode.facing. Defaulting to down', this.facing)
        break
    }
  }
}