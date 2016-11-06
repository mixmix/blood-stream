const pull = require('pull-stream')
const Heart = require('./organs/heart')
const pacemaker = require('./organs/pacemaker')
const marrow = require('./organs/marrow')
const pancreas = require('./organs/pancreas')
const adipose = require('./organs/adipose')
const bloodSampler = require('./bloodSampler')

const initialState = {
  sugar: 10,
  glucagon: 0
}

const heart = Heart({ initialState })

pull(
  heart.source,
  pacemaker(300),
  marrow,
  pancreas,
  adipose,
  bloodSampler,
  heart.sink
)

