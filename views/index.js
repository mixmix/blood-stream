const html = require('yo-yo')

const graphElement = require('./graphElement')
const getViewState = require('./getter')

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
        ${graphElement(bloodInsulin)}
        ${graphElement(bloodGlucagon)}
        ${graphElement(bloodSugar)}
      </div>
      <div class='ma4 dark-gray'>
        ${graphElement(adipose)}
        ${graphElement(intestine)}
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

