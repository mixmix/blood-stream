const extend = require('xtend')

// an example of an organ which has a constant upkeep,
// but doesn't modify state otherwise

module.exports = (source) =>
  (abort, callback) => {
    if (abort) return callback(abort)

    source(null, (err, blood) => {
      if (err) return callback(err)

      const newBloodState = extend(blood, {
        sugar: blood.sugar*.9
      })
      callback(null, newBloodState)
    })
  }

