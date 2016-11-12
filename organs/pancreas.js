const extend = require('xtend')
const Organ = require('./index')

HOMEOSTATIC_SUGAR = 50

module.exports = () => Organ({
  name: 'pancreas',
  reducer: ({ state, blood }) => {
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

function glucagonResponse (sugar) {
  if (sugar > HOMEOSTATIC_SUGAR) return 0

  return 0.5 * (HOMEOSTATIC_SUGAR - sugar)  // release proportional to difference from minimum
}

function insulinResponse (sugar) {
  if (sugar < HOMEOSTATIC_SUGAR) return 0

  return 0.5 * (sugar - HOMEOSTATIC_SUGAR)  // release proportional to difference from minimum
}

