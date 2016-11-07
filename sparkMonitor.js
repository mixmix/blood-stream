const assert = require('assert')
const blessed = require('blessed')
const spark = require('sparkly')
const fw = require('fixed-width-string')

module.exports = Monitor()

function Monitor () {
  var history = {}
  var attrCount = 0
  var screen = blessed.screen({
    smartCSR: true
  })

  return ({ name, state }) => {
    assert(typeof name === 'string', 'Monitor: must have a string name')
    assert(typeof state === 'object', 'Monitor: must have a state (object)')

    history[name] = history[name] || {}

    for (attr in state) {
      attrState = history[name][attr] || {}
      attrState.values =  attrState.values || []
      attrState.values.unshift(state[attr])

      if (attrState.view === undefined) {
        var box = blessed.box({ top: `${ attrCount++ * 5 + 10}%` })
        attrState.view = box
        screen.append(box)
      }

      const viewContet = [
        format(`${name} ${attr}:`, 20),
        format(round(state[attr]), 6),
        graph(attrState.values)
      ].join(' ')

      attrState.view.setContent(viewContet)

      history[name][attr] = attrState
      screen.render()
    }
   
  }
}

function format(text, width = 12) {
  return fw(text, width, {align: 'right'})
}


function graph(values) {
  const length = 40
  values = values.slice(0, length)

  while (values.length < length) {
    values.push('')
  }

  return spark(values, {style: 'fire'})
}

function round (num) {
  return Math.round(num * 100) / 100
}
