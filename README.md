# http202-retry

A module to automatically retry HTTP requests if a [HTTP 202 response][2] is returned.

I built this module specifically for interacting with GeoJSON APIs on [ArcGIS Open Data websites][1], but it may be useful for other purposes.

The GeoJSON API on [ArcGIS Open Data websites][1] returns a [202 Accepted response code][2] when a filter is applied to a dataset. This means the server is still processing the request. This module catches that response code and automatically schedules another request after a short duration. By default the process repeats for 30s or until data is returned.

# Usage
``` javascript
var reqRetry = require('http202-retry')

reqRetry('http://data.sjcgis.org/datasets/167317f36825482abeae53637ad7a7f4_3.geojson?where=Island%20like%20\'%25Decatur%25\'', {
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


```

# API

``` javascript
var reqRetry = require('http202-retry')
```

### `reqRetry([url], [opts], cb)`
___
By default, creates a new [request][3] ([xhr][4] in browsers). Automatically retries the request several times (up to 30s by default) if `response.statusCode === 202`.

* `[opts.request]` {Function} if specified, a [substitute XMLHttpRequest GET function](https://github.com/zeke/npm-collection-http-clients). See [this example](./example/request.js). If not specified, [nets](http://npmjs.com/nets) is used.

* `[opts.reqOpts]` {Object} options passed to [requestOptions][6] parameter ([xhrOptions][7] in the browser). Include `json:true` if requesting JSON or GeoJSON data.

* `[opts.timeout]` {Number} Time, in milliseconds, to wait until timeout (default `30000`)

* `cb` {Function} is called with the arguments ([`Error`][5], `response`, `body`)

[`Error`][5] is only returned if something is preventing the request or after time out. HTTP 400 or 500 responses will not return an error. You should catch these yourself.

# Installation

```
npm install http202-retry
```

# License


ISC License (ISC)

Copyright 2017 Nick Peihl

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


[1]: http://opendata.arcgis.com
[2]: https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.3
[3]: https://www.npmjs.org/package/request
[4]: https://www.npmjs.org/package/xhr
[5]: http://es5.github.com/#x15.11
[6]: https://www.npmjs.com/package/request#requestoptions-callback
[7]: https://www.npmjs.com/package/xhr#var-req--xhroptions-callback
