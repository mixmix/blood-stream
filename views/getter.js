const { createSelector: Getter, createStructuredSelector: Struct } = require('reselect')
const getIn = require('get-in')

const { sampleLength, emptyState } = require('./config')

const getViewState = Struct({
  bloodSugar: getLocationAttribute('blood', 'sugar'),
  bloodInsulin: getLocationAttribute('blood', 'insulin'),
  bloodGlucagon: getLocationAttribute('blood', 'glucagon'),
  adipose: getLocationAttribute('adipose', 'sugar'),
  intestine: getLocationAttribute('intestine', 'sugar')
})

function getLocationAttribute (location, attribute) {
  return Getter(
    getRawLocation(location),
    (data) => {
      const values = getIn(data, [attribute], [])

      return {
        location,
        attribute,
        now: round(values[values.length - 1] || 0),
        values: values.slice(values.length - sampleLength),
        timeStep: values.length
      }
    }
  )
}

function getRawLocation (location) {
  return (history) => getIn(history, [location], [])
}

function round (num) {
  if (num === emptyState) return num

  return Math.round(num * 100) / 100
}

module.exports = getViewState

