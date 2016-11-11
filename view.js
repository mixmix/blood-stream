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
          <span class='w-10'>blood-insulin:</span>
          <span class='w-10'>${bloodInsulin.now}</span>
          ${graph(bloodInsulin.values)}
        </div>
        <div>
          <span class='w-10'>blood-glucagon:</span>
          <span class='w-20'>${bloodGlucagon.now}</span>
          ${graph(bloodGlucagon.values)}
        </div>
        <div>
          <span class='w-10'>blood-sugar:</span>
          <span class='w-20'>${bloodSugar.now}</span>    
          ${graph(bloodSugar.values)}
        </div>
      </div>
      <div class='organs'>
        <div>
          <span class='w-10'>intestine (sugar income): 
          <span class='w-20'>${intestine.now}</span>   
          ${graph(intestine.values)}
        </div>
        <div>
          <span class='w-10'>fat (sugar stores):</span>
          <span class='w-20'>${adipose.now}</span>
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
    (data) => ({
      now: round(getIn(data, [attribute, 0], emptyState)),
      values: getIn(data, [attribute], []).slice(0, sampleLength)
    })
  )
}
function getRawLocation (location) {
  return (history) =>  getIn(history, [location], [])
}
    
function graph (values) {
  while (values.length < sampleLength) {
    values.push(emptyState)
  }

  return spark(values)
}

function round (num) {
  if (num === emptyState) return num

  return Math.round(num * 100) / 100
}
