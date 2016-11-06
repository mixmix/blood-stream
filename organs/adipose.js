const extend = require('xtend')
const Organ = require('./index')
const monitor = require('../monitor')

const adipose = Organ({
  name: 'adipose',
  initialState: { sugar: 100 },
  reducer: ({ blood, state }) => {
    if (blood.glucagon === 0 || blood.glucagon === undefined) return { blood, state }

    const sugarReleased = blood.glucagon*0.8

    return {
      state: extend(state, { sugar: state.sugar - sugarReleased }),
      blood: extend(blood, { sugar: blood.sugar + sugarReleased })
    }
  },
  monitor
})

module.exports = adipose

function round(num) {
  return Math.round(num*100)/100
}
