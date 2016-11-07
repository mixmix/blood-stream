const extend = require('xtend')
const Organ = require('./index')

const Adipose = ({ monitor }) => Organ({
  name: 'adipose',
  initialState: { sugar: 100 },
  reducer: ({ blood, state }) => {
    if (blood.glucagon === 0 || blood.glucagon === undefined) return { blood, state }
    if (state.sugar <= 0) return { blood, state }

    const sugarReleased = (state.sugar < blood.glucagon * 0.8) 
      ? state.sugar
      : blood.glucagon * 0.8

    return {
      state: extend(state, { sugar: state.sugar - sugarReleased }),
      blood: extend(blood, { sugar: blood.sugar + sugarReleased })
    }
  },
  monitor
})

module.exports = Adipose

