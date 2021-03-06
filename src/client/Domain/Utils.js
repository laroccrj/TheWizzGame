export default class Utils {
  static createArray(length) {
    var arr = new Array(length || 0),
      i = length

    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1)
      while (i--) arr[length - 1 - i] = this.createArray.apply(this, args)
    }

    return arr
  }

  static deepCopy(val) {
    return JSON.parse(JSON.stringify(val))
  }
}
