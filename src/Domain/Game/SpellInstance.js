export default class SpellInstance {
  constructor(direction, originX, originY, frames) {
    this.direction = direction
    this.originX = originX
    this.originY = originY
    this.frames = frames
    this.currentFrame = 0
  }

  getNextFrame() {
    if (this.frames.length <= this.currentFrame) return []
    let frame = this.frames[this.currentFrame]
    this.currentFrame++
    return frame
  }
}
