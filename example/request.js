var reqRetry = require('../')
var get = require('request').get

reqRetry('http://data.sjcgis.org/datasets/167317f36825482abeae53637ad7a7f4_3.geojson?where=Island%20like%20\'%25Decatur%25\'', {
  request: get,
  reqOpts: {
    json: true
  }
}, function (err, res, body) {
  if (err) throw err
  if (res.statusCode === 200) {
    console.log('GeoJSON data: ', body)
  } else {
    console.log('Response returned: ', res.statusCode)
  }
})
