const extend = require('xtend')
const Organ = require('./index')

const SUGAR_CONSUMPTION = 5

module.exports = () => Organ({
  name: 'marrow',
  reducer: ({ state, blood }) => {
    return {
      blood: extend(blood, { sugar: blood.sugar - SUGAR_CONSUMPTION }),
      state
    }
  }
})

