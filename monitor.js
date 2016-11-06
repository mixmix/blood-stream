const assert = require('assert')
const mapValues = require('map-values')

module.exports = function ({ name, state }) {
  assert(typeof name === 'string', 'Monitor: must have a string name')
  assert(typeof state === 'object', 'Monitor: must have a state (object)')

  console.log(name, mapValues(state, round))
}

function round (num) {
  return Math.round(num * 100) / 100
}
