var peek = require('./index')
  , test = require('tape')

test('Test basic fetches', function(assert) {
  assert.strictEqual(peek('a')({a: 5}), 5)
  assert.strictEqual(peek('')({'': 6}), 6)

  assert.end()
})

test('Test advanced fetches', function(assert) {
  var find = peek('part.key.attribute')
    , found = find({part: {key: {attribute: 'woop woop'}}})
  assert.strictEqual(found, 'woop woop')

  var not_found = find({}) || find() || find(null)
  assert.strictEqual(not_found, undefined)

  var fetch = peek('foo')
  assert.strictEqual(fetch({foo: 'bar!'}), 'bar!')

  // Having created a second object should not interfere with the first.
  assert.strictEqual(find({part: {key: {attribute: 'beep beep'}}}), 'beep beep')

  assert.end()
})

test('Test example from README', function(assert) {
  var booty = peek("lower deck.captain's quarters.secret panel.treasure")
  var pirate_ship = {
    'lower deck': {
      "captain's quarters": {
        'secret panel': {
          treasure: '5000 gold'
        }
      }
    }
  }
  assert.strictEqual(booty(pirate_ship), '5000 gold')

  assert.end()
})

test('bad input cases', function(assert) {
  [{}, true, undefined, null, 5, Infinity].forEach(function(bad_type) {
    assert.throws(function() { peek(bad_type) }, TypeError)
  })

  assert.end()
})

test('accessing properties of primitives', function(assert) {
  var primitives = [
      "grilled cheese sandwiches"
    , true
    , false
    , 15
    ]
  var toString = peek('toString')

  primitives.forEach(function testPrimitive(value) {
    assert.doesNotThrow(function () { toString(value) })
    assert.equal(toString(value).call(value), value.toString(), value + '.toString')
  })
  assert.end()
})

test('accessing properties of functions', function(assert) {
  function f() {}
  f.prototype.lettuce = 'optional'

  var prototype = peek('prototype')
  var lettuce = peek('prototype.lettuce')

  assert.doesNotThrow(function () { prototype(f) })
  assert.doesNotThrow(function () { lettuce(f) })
  assert.strictEqual(prototype(f), f.prototype, 'prototype')
  assert.strictEqual(lettuce(f), f.prototype.lettuce, 'prototype property')
  assert.end()
})
