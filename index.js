const pull = require('pull-stream')

const Heart = require('./organs/heart')
const Pacemaker = require('./organs/pacemaker')
const Marrow = require('./organs/marrow')
const Pancreas = require('./organs/pancreas')
const Liver = require('./organs/liver')
const Adipose = require('./organs/adipose')
const FoodTube = require('./organs/foodTube')

const BloodSampler = require('./equipment/bloodSampler')
const monitor = require('./equipment/monitorSpark')

const initialState = {
  sugar: 10,
  glucagon: 0,
  insulin: 0
}
const heart = Heart({ initialState })

const foodTube = FoodTube({})
const mouth = foodTube.input

pull(
  heart.source,
  Pacemaker(200),
  foodTube.organ({ monitor }),
  Marrow(),
  Pancreas(),
  Liver({}),
  Adipose({ monitor }),
  BloodSampler({ monitor }),
  heart.sink
)

setTimeout(
  () => { mouth({ inputSugar: 40 }) },
  3e3
)

