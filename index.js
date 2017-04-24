var backoff = require('backoff')
var xtend = require('xtend')

module.exports = function (uri, opts, cb) {
  var params = uri.reqOpts ? uri.reqOpts : uri

  if (typeof opts === 'function') {
    cb = opts
    if (typeof uri === 'string') {
      params = { uri: uri }
    }
  } else {
    params = opts.reqOpts ? xtend(opts.reqOpts, { uri: uri }) : { uri: uri }
  }

  var timeout = opts.timeout || 30 * 1000

  var request = opts.request || require('nets')

  var xb = backoff.fibonacci({
    initialDelay: 1000,
    maxDelay: timeout
  })

  xb.on('backoff', function (n, d) {
    console.log('backoff', n, d)
  })

  xb.on('ready', function () {
    request(params, function (err, res, body) {
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
