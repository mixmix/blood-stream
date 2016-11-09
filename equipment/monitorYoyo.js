const assert = require('assert')
const spark = require('sparkly')
const getIn = require('get-in')

module.exports = Monitor

function Monitor ({ mouth, callback }) {
  var history = {}

  //TODO onclick
  // drop some sugar in the food-pipe
  //screen.key(
    //[1, 2, 3, 4, 5, 6, 7, 8, 9].map(String), 
    //(ch, key) => {
      //mouth({ inputSugar: ch*10 })
    //}
  //)
   
  //TODO onclick
  // Quit on Escape, q, or Control-C. 
  //screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

  return ({ name, state }) => {
    assert(typeof name === 'string', 'Monitor: must have a string name')
    assert(typeof state === 'object', 'Monitor: must have a state (object)')

    history[name] = getIn(history, [name], {})

    for (var attr in state) {
      var attrState = getIn(history, [name, attr], [])
      attrState.unshift(state[attr])

      history[name][attr] = attrState
    }
    //TODO
    // update
    callback(null, history)
  }
}

