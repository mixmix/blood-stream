const extend = require('xtend')
const Organ = require('./organs/index')

module.exports = ({ monitor }) => Organ({
  name: 'blood',
  reducer: ({ blood, state }) => {
    state = extend(blood)
    return { blood, state }
  },
  monitor
})

