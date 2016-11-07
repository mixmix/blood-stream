const extend = require('xtend')
const Organ = require('./index')

module.exports = () => Organ({
  name: 'pancreas',
  reducer: ({ blood, state }) => {
    const { sugar, glucagon, insulin } = blood
    return {
      blood: extend(blood, { 
        glucagon: glucagon + glucagonResponse(sugar),
        insulin: insulin + insulinResponse(sugar)
      }),
      state
    }
  }
})

function glucagonResponse(sugar) {
  if (sugar > 5) return 0

  return 0.5 * (5 - sugar)  // release proportional to difference from minimum
}

function insulinResponse(sugar) {
  if (sugar < 10) return 0

  return 0.5 * (sugar - 10)  // release proportional to difference from minimum
}

