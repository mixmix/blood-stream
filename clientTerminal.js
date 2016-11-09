const pull = require('pull-stream')

const Heart = require('./organs/heart')
const Pacemaker = require('./organs/pacemaker')
const Marrow = require('./organs/marrow')
const Pancreas = require('./organs/pancreas')
const Liver = require('./organs/liver')
const Adipose = require('./organs/adipose')
const FoodTube = require('./organs/foodTube')

const BloodSampler = require('./equipment/bloodSampler')
const Monitor = require('./equipment/monitorSpark')

const initialState = {
  sugar: 10,
  glucagon: 0,
  insulin: 0
}
const heart = Heart({ initialState })

const foodTube = FoodTube({})
const mouth = foodTube.input
const monitor = Monitor({ mouth })

pull(
  heart.source,
  Pacemaker(100),
  foodTube.organ({ monitor }),
  Marrow(),
  Pancreas(),
  Liver({}),
  Adipose({ monitor }),
  BloodSampler({ monitor }),
  heart.sink
)

