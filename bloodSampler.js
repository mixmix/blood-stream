const extend = require('xtend')
const Organ = require('./organs/index')
const monitor = require('./monitor')

module.exports = Organ({
  name: 'blood',
  reducer: ({ blood, state }) => {
    state = extend(blood)
    return { blood, state }
  },
  monitor
})

