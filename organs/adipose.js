const extend = require('xtend')
const Organ = require('./index')

const RELEASE_RATE = 0.8
const STORAGE_RATE = 0.5

module.exports = ({ monitor } = {}) => Organ({
  name: 'adipose',
  initialState: { sugar: 100 },
  reducer: ({ blood, state }) => {
    if (blood.glucagon === 0 || blood.glucagon === undefined) return { blood, state }
    if (state.sugar <= 0) return { blood, state }

    const sugarReleased = (state.sugar < blood.glucagon * RELEASE_RATE)
      ? state.sugar
      : blood.glucagon * RELEASE_RATE

    const sugarStored =  blood.insulin * STORAGE_RATE

    return {
      blood: extend(blood, { sugar: blood.sugar + sugarReleased - sugarStored}),
      state: extend(state, { sugar: state.sugar - sugarReleased + sugarStored})
    }
  },
  monitor
})

