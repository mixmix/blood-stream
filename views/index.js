const html = require('yo-yo')

const graphElement = require('./graphElement')
const getViewState = require('./getter')

module.exports = view

function view ({ history, mouth }) {
  if (history === undefined || mouth === undefined) return html`<div class='pa2'>Loading...</div>`

  const {
    bloodSugar,
    bloodGlucagon,
    bloodInsulin,
    intestine,
    uterus,
    adipose
  } = getViewState(history)

  return html`
    <div>
      <div class='ma4 dark-gray'>
        <div>
          ${graphElement(intestine)}
          <a 
            class='f6 link dib br2 ba ph3 pv2 mb2 ma4 dib dark-red' 
            href='#'
            onclick=${() => mouth({ inputSugar: 600 })}
          >
            FEED
          </a>
        </div>
        ${graphElement(adipose)}
        ${graphElement(uterus)}
      </div>
      <div class='ma4 b--dashed-l ba dark-red'>
        ${graphElement(bloodSugar)}
        ${graphElement(bloodInsulin)}
        ${graphElement(bloodGlucagon)}
      </div>
    </div>
  `
}

