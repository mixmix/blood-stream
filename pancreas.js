
const extend = require('xtend')

// the pancreas increases blood glucagon levels when blood sugar gets low

module.exports = (source) =>
  (abort, callback) => {
    if (abort) return callback(abort)

    source(null, (err, blood) => {
      if (err) return callback(err)
      if (blood.sugar > 5 ) return callback(null, blood)

      const newBloodState = extend(blood, {
        glucagon: blood.glucagon + 1
      })
      callback(null, newBloodState)
    })
  }

