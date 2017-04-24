var test = require('tape')
var reqData = require('./')
var http = require('http')

// TODO make this test run faster somehow (spies?)
test('return data after backoff', function (t) {
  t.plan(3)
  var tries = 1
  var server = http.createServer(function (req, res) {
    if (tries) {
      console.log(tries)
      res.statusCode = 202
      tries--
      res.end()
    } else {
      res.statusCode = 200
      res.end('Woo data!')
    }
  })
  server.listen(0, function () {
    var port = server.address().port
    reqData({
      reqOpts: {
        uri: 'http://localhost:' + port
      }
    }, function (err, res, data) {
      t.ifError(err)
      t.equal(res.statusCode, 200)
      t.equal(data.toString(), 'Woo data!')
      server.close()
    })
  })
})

test('uri parameter no opts', function (t) {
  t.plan(3)
  var server = http.createServer(function (req, res) {
    res.statusCode = 200
    res.end('Woo data!')
  })

  server.listen(0, function () {
    var port = server.address().port
    reqData('http://localhost:' + port, function (err, res, data) {
      t.ifError(err)
      t.equal(res.statusCode, 200)
      t.equal(data.toString(), 'Woo data!')
      server.close()
    })
  })
})
