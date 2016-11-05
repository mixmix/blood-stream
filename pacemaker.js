
module.exports = (period) => (source) =>
  (abort, callback) => {
    if (abort) return callback(abort)

    source(null, (err, blood) => {
      if (err) return callback(err)

      setTimeout(
        () => callback(null, blood),
        period
      )
    })
  }

