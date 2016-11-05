
const extend = require('xtend')

// adipose releases sugar into the blood when it detects glucagon

module.exports = (source) => {
  var stores = 50

  return (abort, callback) => {
    if (abort) return callback(abort)

    source(null, (err, blood) => {
      if (err) return callback(err)
      if (blood.glucagon === 0 ) return callback(null, blood)

      const sugarReleased = blood.glucagon*0.8
      stores -= sugarReleased
      console.log('\x1b[36m', '      adipose stores:', round(stores), '\x1b[0m')

      const newBloodState = extend(blood, {
        sugar: blood.sugar + sugarReleased
      })
      callback(null, newBloodState)
    })
  }
}

function round(num) {
  return Math.round(num*100)/100
}

