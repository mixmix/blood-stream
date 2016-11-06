const pull = require('pull-stream')
const pacemaker = require('./organs/pacemaker')
const marrow = require('./organs/marrow')
const pancreas = require('./organs/pancreas')
const adipose = require('./organs/adipose')
const sample = require('./sample')

const INITIAL_STATE = {
  sugar: 10,
  glucagon: 0
}

function Heart () {
  var atrium = INITIAL_STATE 

  const source = (abort, callback) => {
    if (abort) return callback(abort)

    const blood = atrium  // draw blood from the atrium
    atrium = null         // 
    callback(null, blood) // pump the blood
  }

  const sink = (source) => {
    const readMore = (err, blood) => {
      if (err) return console.log('DONE', err)

      atrium = blood     // pass the blood into the atrium
      source(null, readMore)
    }

    source(null, readMore)
  }

  return {
    source,
    sink
  }
}

const heart = Heart()

pull(
  heart.source,
  pacemaker(300),
  marrow,
  pancreas,
  adipose,
  sample,
  heart.sink
)

