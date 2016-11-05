// has an upstream `source` plugged into it
// builds a new source which 
//  - takes an early `abort` which stop reading of source
//  - a `callback` which passes the reading result down toward the sink

module.exports = (source) =>
  (abort, callback) => {
    if (abort) return callback(abort)

    source(null, (err, blood) => {
      if (err) return callback(err)

      console.log({
        sugar: round(blood.sugar),
        glucagon: blood.glucagon
      })
      callback(null, blood)
    })
  }

function round(num) {
  return Math.round(num*100)/100
}
