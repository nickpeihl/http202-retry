var request = require('nets')
var backoff = require('backoff')

module.exports = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
  }

  var xb = backoff.fibonacci({
    initialDelay: 1000,
    maxDelay: 30 * 1000
  })

  xb.on('backoff', function (n, d) {
    console.log('backoff', n, d)
  })

  xb.on('ready', function () {
    request(opts, function (err, res, body) {
      if (err) {
        cb(err)
      } else if (res.statusCode === 202) {
        xb.backoff()
      } else {
        xb.reset()
        cb(err, res, body)
      }
    })
  })

  xb.on('fail', function () {
    cb(new Error('Timed out waiting for data'))
  })
  xb.backoff()
}
