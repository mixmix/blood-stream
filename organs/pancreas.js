const getIn = require('get-in')
const extend = require('xtend')
const Organ = require('./index')

const pancreas = () => Organ({
  name: 'pancreas',
  reducer: ({ blood, state }) => {
    if (blood.sugar > 5) return { blood, state }

    const glucagon = getIn(blood, ['glucagon'], 0) + 1

    return {
      state,
      blood: extend(blood, { glucagon })
    }
  }
})

module.exports = pancreas

