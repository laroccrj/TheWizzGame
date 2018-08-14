import Player from '@/Domain/Game/Player'

export default class SpellInstance {
  constructor(player, frames) {
    this.player = player
    this.direction = player.facing
    this.originX = player.posX
    this.originY = player.posY
    this.frames = frames
    this.currentFrame = 0
    this.makeFramesRelativeToOrigin()
  }

  makeFramesRelativeToOrigin() {
    let i = this.frames.length
    while (i--) {
      let frame = this.frames[i]
      let n = frame.length

      while (n--) {
        let spellNode = frame[n]
        let x = this.originX
        let y = this.originY

        switch (this.direction) {
          case Player.FACING_LEFT:
            x += spellNode.y
            y -= spellNode.x
            break
          case Player.FACING_UP:
            x += spellNode.x
            y += spellNode.y
            break
          case Player.FACING_RIGHT:
            x -= spellNode.y
            y += spellNode.x
            break
          case Player.FACING_DOWN:
            x -= spellNode.x
            y -= spellNode.y
            break
        }

        spellNode.x = x;
        spellNode.y = y;
        frame[n] = spellNode;
      }

      this.frames[i] = frame
    }
  }

  getNextFrame() {
    if (this.frames.length <= this.currentFrame) return []
    let frame = this.frames[this.currentFrame]
    this.currentFrame++
    return frame
  }
}
