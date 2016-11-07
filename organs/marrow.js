const extend = require('xtend')
const Organ = require('./index')

const marrow = () => Organ({
  name: 'marrow',
  initialState: { sugar: 100 },
  reducer: ({ blood, state }) => {
    return {
      blood: extend(blood, { sugar: blood.sugar - 1.1 }),
      state
    }
  }
})

module.exports = marrow

