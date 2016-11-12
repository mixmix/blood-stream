const extend = require('xtend')
const Organ = require('./index')

const PERIOD = 50
const PERIODIC_COST = 100

module.exports = ({ monitor } = {}) => Organ({
  name: 'uterus',
  initialState: { 
    timeStep: 0,
    sugar: PERIODIC_COST
  },
  reducer: ({ state, blood }) => {
    const sugarTaken = hunger(state)
    const payment = isPaymentStep(state) ? PERIODIC_COST : 0

    return {
      blood: extend(blood, {
        sugar: blood.sugar - sugarTaken
      }),
      state: extend(state, {
        sugar: state.sugar + sugarTaken - payment,
        timeStep: state.timeStep + 1
      })
    }
  },
  monitor
})

function hunger (state) { 
  if (isFull(state)) return 0

  const timeTillPayment = PERIOD - (state.timeStep % PERIOD)
  const amountToSave = 1.3 * PERIODIC_COST - state.sugar

  return amountToSave / timeTillPayment
}

function isFull (state) {
  return state.sugar > 1.1 * PERIODIC_COST 
}

function isPaymentStep (state) {
  if (state.timeStep === 0) return false

  return state.timeStep % PERIOD === 0
}

