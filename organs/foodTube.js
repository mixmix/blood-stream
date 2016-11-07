const assert = require('assert')
const extend = require('xtend')

module.exports = FoodTube

const RELEASE_RATE = 3

function FoodTube ({ initialState = { sugar: 0 } }) {
  assert(typeof initialState === 'object', 'FoodTube: must have an initial state (object)')
  var state = initialState

  function input ({ inputSugar }) {
    state = extend(state, { sugar: state.sugar + inputSugar })
  }

  const organ = ({monitor}) => Organ({
    name: 'foodTube',
    reducer: ({ blood, state }) => {
      if (blood.glucagon === 0 || blood.glucagon === undefined) return { blood, state }
      if (state.sugar <= 0) return { blood, state }

      const sugarReleased = (state.sugar < RELEASE_RATE) ? state.sugar : RELEASE_RATE

      return {
        state: extend(state, { sugar: state.sugar - sugarReleased }),
        blood: extend(blood, { sugar: blood.sugar + sugarReleased })
      }
    },
    monitor
  })

  return {
    input,
    organ
  }

  // modified Organ prototype which extracts the raises the state up a level
  function Organ ({ name, reducer, monitor }) {
    assert(typeof name === 'string', 'Organ: must have a string name')
    assert(typeof reducer === 'function', 'Organ: must have a reducer')
    return (source) => (abort, callback) => {
      if (abort) return monitor({ abort }) && callback(abort)

      source(null, (err, blood) => {
        if (err) return callback(err)

        const { blood: newBlood, state: newState } = reducer({ blood, state })
        state = newState
        if (monitor) monitor({ name, state, abort })

        callback(null, newBlood)
      })
    }
  }
}
