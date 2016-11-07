
const extend = require('xtend')
const Organ = require('./index')

// TODO research the mechanism of insulin + glucagon decay
const PEPTIDE_DECAY_PROPORTION = 0.8

module.exports = ({ monitor }) => Organ({
  name: 'liver',
  reducer: ({ blood, state }) => {
    const { glucagon, insulin } = blood
    return {
      blood: extend(blood, {
        glucagon: glucagon * PEPTIDE_DECAY_PROPORTION,
        insulin: insulin * PEPTIDE_DECAY_PROPORTION
      }),
      state
    }
  },
  monitor
})

