const html = require('yo-yo')
const spark = require('sparkly')
const { createSelector: Getter, createStructuredSelector: Struct } = require('reselect')
const getIn = require('get-in')

module.exports = view

function view ({ history, mouth }) {
  if (history === undefined || mouth === undefined) return html`<div>Loading...</div>`

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
        onclick=${() => mouth({ inputSugar: 50 }) }
      >
        FEED
      </a>

    </div>
  `
}

function graphDisplay (thing) {
  return html`
    <div class='pt3 pb4 ph3 flex'>
      <div class='w4 pr2 self-end'>${thing.title}</div>
      <div class='w3 self-end'>${thing.now}</div>
      <div class='f2'>${graph(thing.values)}</div>
    </div>
  `
}

const emptyState = ''
const sampleLength = 40

function graph (values) {
  while (values.length < sampleLength) {
    values.push(emptyState)
  }

  return spark(values)
}

const getViewState = Struct({
  bloodSugar: getLocationAttribute('blood', 'sugar'),
  bloodInsulin: getLocationAttribute('blood', 'insulin'),
  bloodGlucagon: getLocationAttribute('blood', 'glucagon'),
  adipose: getLocationAttribute('adipose', 'sugar'),
  intestine: getLocationAttribute('intestine', 'sugar'),
})

function getLocationAttribute (location, attribute) {
  return Getter(
    getRawLocation(location),
    (data) => ({
      title: `${location} ${attribute}`,
      now: round(getIn(data, [attribute, 0], emptyState)),
      values: getIn(data, [attribute], []).slice(0, sampleLength)
    })
  )
}
function getRawLocation (location) {
  return (history) =>  getIn(history, [location], [])
}

function round (num) {
  if (num === emptyState) return num

  return Math.round(num * 100) / 100
}
