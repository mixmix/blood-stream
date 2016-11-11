const assert = require('assert')
const spark = require('sparkly')
const getIn = require('get-in')
const extend = require('xtend')
const clone = require('clone') // TODO check perf

module.exports = Monitor

function Monitor ({ subscribe }) {
  var history = {}

  return ({ name: location, state }) => {
    assert(typeof location === 'string', 'Monitor: must have a string location')
    assert(typeof state === 'object', 'Monitor: must have a state (object)')

    var newHistory = clone(history)
    newHistory[location] = getIn(newHistory, [location], {})

    for (var attr in state) {
      var attrState = getIn(newHistory, [location, attr], [])
      attrState.unshift(state[attr])

      newHistory[location][attr] = attrState
    }
    //TODO tidy ^
    subscribe(null, newHistory) // need to return new obj because of memoization
    history = newHistory
  }
}

