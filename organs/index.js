const assert = require('assert')
  
module.exports = Organ

// reducer({ blood, state }) -> { blood, state }
// input({ action, state }) -> state
function Organ ({ initialState = {}, reducer, input }) {
  return (source) => {
    var state = initialState

    function organ (abort, callback) {
      if (abort) return callback(abort)

      source(null, (err, blood) => {
        if (err) return callback(err)

        const { blood: newBlood, state: newState } = reducer({ blood, state })
        state = newState
        callback(null, newBlood)
      })
    }

    organ.getState = () => state
    organ.input = (action) => {
      if (input === undefined) return
      state = input({ action, state })
    }
    return organ
  }
}

