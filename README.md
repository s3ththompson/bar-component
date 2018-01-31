# bar-component [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

tiny loading bar component

## Installation

```
$ npm install bar-component
```

## Usage

```js
// index.js
var choo = require('choo')
var html = require('choo/html')
var Bar = require('bar-component')
var bar = new Bar()

var app = choo()

app.use(require('bar-component/store')())

app.route('/', (state, emit) => {
  return html`<body>
    <h1>Hello</h1>
    ${bar.render(state.__progress)}
  </body>`
})

app.mount('body')
```

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/bar-component.svg?style=flat-square
[3]: https://npmjs.org/package/bar-component
[4]: https://img.shields.io/travis/s3ththompson/bar-component/master.svg?style=flat-square
[5]: https://travis-ci.org/s3ththompson/bar-component
[8]: http://img.shields.io/npm/dm/bar-component.svg?style=flat-square
[9]: https://npmjs.org/package/bar-component
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
