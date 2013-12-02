module.exports = function peek(path) {
  if (typeof path !== 'string') {
    throw new TypeError('path must be a string')
  }

  return function(obj) {
    return _peek(obj, path.split('.'))
  }

  function _peek(obj, parts) {
    if(!parts.length) {
      return obj
    }

    if(obj === null || typeof obj !== 'object') {
      return undefined
    }
    return _peek(obj[parts[0]], parts.slice(1))
  }
}
