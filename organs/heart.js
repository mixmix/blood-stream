
module.exports = Heart

function Heart ({ initialState }) {
  var atrium = initialState

  const source = (abort, callback) => {
    if (abort) return callback(abort)

    const blood = atrium  // draw blood from the atrium
    atrium = null         //
    callback(null, blood) // pump the blood
  }

  const sink = (source) => {
    const readMore = (err, blood) => {
      if (err) return console.log('You died from', err)
      if (blood.sugar <= 0) return console.log('You died: blood sugar bottomed out')

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
