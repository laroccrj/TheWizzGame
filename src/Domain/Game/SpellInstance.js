export default class SpellInstance {
  constructor(
    originX,
    originY,
    frames
  ) {
    this.originX = originX;
    this.originY = originY;
    this.frames = frames;
    this.currentFrame = 0;
  }

  getNextFrame() {
    if(this.frames.length <= this.currentFrame) return [];
    return this.frames[++this.currentFrame];
  }
}