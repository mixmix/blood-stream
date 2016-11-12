const pull = require('pull-stream')
const html = require('yo-yo')

const Heart = require('./organs/heart')
const Pacemaker = require('./organs/pacemaker')
const marrow = require('./organs/marrow')()
const pancreas = require('./organs/pancreas')()
const liver = require('./organs/liver')({})
const Adipose = require('./organs/adipose')
const FoodTube = require('./organs/foodTube')

const BloodSampler = require('./equipment/bloodSampler')
const Monitor = require('./equipment/monitorYoyo')
const View = require('./view')

const initialState = {
  sugar: 10,
  glucagon: 0,
  insulin: 0
}
const heart = Heart({ initialState })

const { organ: intestine, input: mouth } = FoodTube({})

var view = View({})
document.getElementById('main').appendChild(view)

const monitor = Monitor({
  subscribe: (err, history) => {
    if (err) throw err
    if (history.blood === undefined) return

    html.update(view, View({ history, mouth }))
  }
})

pull(
  heart.source,
  Pacemaker(100),
  intestine({ monitor }),
  marrow,
  pancreas,
  liver,
  Adipose({ monitor }),
  BloodSampler({ monitor }),
  heart.sink
)

