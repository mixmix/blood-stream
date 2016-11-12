const html = require('yo-yo')
const spark = require('sparkline-canvas')
const { createSelector: Getter, createStructuredSelector: Struct } = require('reselect')
const getIn = require('get-in')

module.exports = view

function view ({ history, mouth }) {
  if (history === undefined || mouth === undefined) return html`<div class='pa2'>Loading...</div>`

  const {
    bloodSugar,
    bloodInsulin,
    bloodGlucagon,
    adipose,
    intestine
  } = getViewState(history)

  return html`
    <div>
      <div class='ma4 b--dashed-l ba dark-red'>
        ${graphDisplay(bloodInsulin)}
        ${graphDisplay(bloodGlucagon)}
        ${graphDisplay(bloodSugar)}
      </div>
      <div class='ma4 dark-gray'>
        ${graphDisplay(adipose)}
        ${graphDisplay(intestine)}
      </div>
      <a 
        class='f6 link dim br2 ba ph3 pv2 mb2 ma4 dib dark-red' 
        href='#'
        onclick=${() => mouth({ inputSugar: 50 })}
      >
        FEED
      </a>

    </div>
  `
}

function graphDisplay (thing) {
  const { now, location, attribute } = thing

  return html`
    <div class='pt3 pb4 ph3 flex'>
      <div class='f2'>${graph(thing)}</div>
      <div class='w3 ph3 self-end'>${now}</div>
      <div class='w4 ph3 self-end'>${location} ${attribute}</div>
    </div>
  `
}

const sampleLength = 200
const emptyState = 0

function graph (thing) {
  let { values } = thing
  while (values.length < sampleLength) {
    values.unshift(emptyState)
  }

  const graphOpts = {
    width: 400,
    height: 50,
    id: customId(thing)
  }
  return spark.draw(values, graphOpts)
}

function customId ({ location, attribute, timeStep }) {
  return [location, attribute, timeStep].join('-')
}

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
        now: round(values[values.length -1] || 0),
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
