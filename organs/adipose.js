const extend = require('xtend')
const Organ = require('./index')

const adipose = Organ({
  initialState: { sugar: 100 },
  reducer: ({ blood, state }) => {
    if (blood.glucagon === 0 ) return { blood, state }

    const sugarReleased = blood.glucagon*0.8
    console.log('\x1b[36m', '      adipose stores:', round(state.sugar - sugarReleased), '\x1b[0m')

    return {
      state: extend(state, { sugar: state.sugar - sugarReleased }),
      blood: extend(blood, { sugar: blood.sugar + sugarReleased })
    }
  }
})

module.exports = adipose

function round(num) {
  return Math.round(num*100)/100
}
