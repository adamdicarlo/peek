module.exports = function createPeek(path) {
  if (typeof path !== 'string') {
    throw new TypeError('path must be a string')
  }
  var parts = path.split('.')
  return function peek(obj) {
    return parts.reduce(function peekSegment(obj, segment) {
      if (obj === null || obj === undefined) {
        return undefined
      }
      return obj[segment]
    }, obj)
  }
}
