const pull = require('pull-stream')
const Heart = require('./organs/heart')
const Pacemaker = require('./organs/pacemaker')
const Marrow = require('./organs/marrow')
const Pancreas = require('./organs/pancreas')
const Adipose = require('./organs/adipose')
const BloodSampler = require('./bloodSampler')
const monitor = require('./sparkMonitor')

const initialState = {
  sugar: 10,
  glucagon: 0
}

const heart = Heart({ initialState })

pull(
  heart.source,
  Pacemaker(200),
  Marrow(),
  Pancreas(),
  Adipose({ monitor }),
  BloodSampler({ monitor }),
  heart.sink
)

