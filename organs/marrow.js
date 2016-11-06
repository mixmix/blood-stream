const getIn = require('get-in')
const extend = require('xtend')
const Organ = require('./index')

const marrow = Organ({
  initialState: { sugar: 100 },
  reducer: ({ blood, state }) => {
    return {
      blood: extend(blood, { sugar: blood.sugar*0.9 }),
      state
    }
  }
})

module.exports = marrow

