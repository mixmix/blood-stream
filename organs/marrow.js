const extend = require('xtend')
const Organ = require('./index')

SUGAR_CONSUMPTION = 0.9

module.exports = () => Organ({
  name: 'marrow',
  initialState: { sugar: 100 },
  reducer: ({ blood, state }) => {
    return {
      blood: extend(blood, { sugar: blood.sugar - SUGAR_CONSUMPTION }),
      state
    }
  }
})

