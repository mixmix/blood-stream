const assert = require('assert')

module.exports = Organ

// reducer({ blood, state }) -> { blood, state }
// input({ action, state }) -> state
function Organ ({ name, initialState = {}, reducer, monitor }) {
  assert(typeof name === 'string', 'Organ: must have a string name')
  assert(typeof initialState === 'object', 'Organ: must have an initial state (object)')
  assert(typeof reducer === 'function', 'Organ: must have a reducer')

  return (source) => {
    var state = initialState

    function organ (abort, callback) {
      if (abort) return callback(abort)

      source(null, (err, blood) => {
        if (err) return callback(err)

        const { blood: newBlood, state: newState } = reducer({ blood, state })
        state = newState
        if (monitor) monitor({ name, state })

        callback(null, newBlood)
      })
    }

    return organ
  }
}

