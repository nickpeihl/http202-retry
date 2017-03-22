var reqRetry = require('../')

reqRetry({
  url: 'http://data.sjcgis.org/datasets/167317f36825482abeae53637ad7a7f4_3.geojson?where=Island%20like%20\'%25Decatur%25\'&geometry={"xmin":-13838177.03790262,"ymin":6156211.922408805,"xmax":-13544658.849287685,"ymax":6247936.356350972,"spatialReference":{"wkid":102100}}',
  json: true
}, function (err, res, body) {
  if (err) throw err
  if (res.statusCode === 200) {
    console.log('GeoJSON data: ', body)
  } else {
    console.log('Response returned: ', res.statusCode)
  }
})
