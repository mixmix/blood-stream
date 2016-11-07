const pull = require('pull-stream')
const html = require('yo-yo')
const spark = require('sparkly')

const Heart = require('./organs/heart')
const Pacemaker = require('./organs/pacemaker')
const Marrow = require('./organs/marrow')
const Pancreas = require('./organs/pancreas')
const Liver = require('./organs/liver')
const Adipose = require('./organs/adipose')
const FoodTube = require('./organs/foodTube')

const BloodSampler = require('./equipment/bloodSampler')
const Monitor = require('./equipment/monitorYoyo')

const initialState = {
  sugar: 10,
  glucagon: 0,
  insulin: 0
}
const heart = Heart({ initialState })

const foodTube = FoodTube({})
const mouth = foodTube.input
const monitor = Monitor({ mouth, callback: update })

pull(
  heart.source,
  Pacemaker(50),
  foodTube.organ({ monitor }),
  Marrow(),
  Pancreas(),
  Liver({}),
  Adipose({ monitor }),
  BloodSampler({ monitor }),
  heart.sink
)

const view = (history) => {
  if (history === undefined) return html`<div>Loading...</div>`

  return html`
    <div>
      blood-sugar: 
      ${history.blood.sugar[0]}    
      ${graph(history.blood.sugar.values)}
    </div>
  `
}

function graph (values) {
  const length = 100
  values = values.slice(0, length)

  while (values.length < length) {
    values.push('')
  }

  return spark(values)
}

var el = view()
document.getElementById('main').appendChild(el)

function update (err, history) {
  if (err) throw err
  if (history.blood === undefined) return

  html.update(el, view(history))
}


