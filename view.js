const html = require('yo-yo')
const spark = require('sparkly')
const { createSelector: Getter, createStructuredSelector: Struct } = require('reselect')
const getIn = require('get-in')

module.exports = view

function view (history) {
  if (history === undefined) return html`<div>Loading...</div>`

  const {
    bloodSugar,
    bloodInsulin,
    bloodGlucagon,
    adipose,
    intestine
  } = getViewState(history)

  return html`
    <div>
      <div class='blood'>
        <div>
          blood-insulin: 
          ${bloodInsulin.now}    
          ${graph(bloodInsulin.values)}
        </div>
        <div>
          blood-glucagon: 
          ${bloodGlucagon.now}    
          ${graph(bloodGlucagon.values)}
        </div>
        <div>
          blood-sugar: 
          ${bloodSugar.now}    
          ${graph(bloodSugar.values)}
        </div>
      </div>
      <div class='organs'>
        <div>
          intestine (sugar income): 
          ${intestine.now}    
          ${graph(intestine.values)}
        </div>
        <div>
          fat (sugar stores): 
          ${adipose.now}    
          ${graph(adipose.values)}
        </div>
      </div>
    </div>
  `
}

const getViewState = Struct({
  bloodSugar: getLocationAttribute('blood', 'sugar'),
  bloodInsulin: getLocationAttribute('blood', 'insulin'),
  bloodGlucagon: getLocationAttribute('blood', 'glucagon'),
  adipose: getLocationAttribute('adipose', 'sugar'),
  intestine: getLocationAttribute('intestine', 'sugar'),
})

const emptyState = ''
const sampleLength = 40

function getLocationAttribute (location, attribute) {
  return Getter(
    getRawLocation(location),
    (data) => {
      console.log(location, attribute,  data[attribute])
      return {
        now: getIn(data, [attribute, 0], emptyState),
        values: getIn(data, [attribute], []).slice(0, sampleLength)
      }
    }
  )
}
function getRawLocation (location) {
  return (history) => {
    return getIn(history, [location], [])
  }
}
    
function graph (values) {
  while (values.length < sampleLength) {
    values.push(emptyState)
  }

  return spark(values)
}

function round (num) {
  return Math.round(num * 100) / 100
}
