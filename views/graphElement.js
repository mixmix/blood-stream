const html = require('yo-yo')
const spark = require('sparkline-canvas')

const { sampleLength, emptyState } = require('./config')

module.exports = graphElement

function graphElement (thing) {
  const { now, location, attribute } = thing

  return html`
    <div class='pt3 pb4 ph3 flex'>
      <div class='f2'>${graph(thing)}</div>
      <div class='w3 ph3 self-end'>${now}</div>
      <div class='w4 ph3 self-end'>${location} ${attribute}</div>
    </div>
  `
}

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

