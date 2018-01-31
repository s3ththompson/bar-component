var Nanocomponent = require('nanocomponent')
var html = require('bel')
var xtend = require('xtend')
var css = require('sheetify')

var basic = css`
  :host {
    transition: all 200ms ease;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
  }
`

module.exports = Bar

function Bar () {
  if (!(this instanceof Bar)) return new Bar()
  Nanocomponent.call(this)
}

Bar.prototype = Object.create(Nanocomponent.prototype)

Bar.identity = function () {
  return 'unique'
}

Bar.prototype.createElement = function (progress, color, height) {
  var custom = attributes(progress, color, height)
  return html`<div class="${basic}" styles="${custom}"></div>`
}

Bar.prototype.update = function (progress, color, height) {
  var custom = attributes(progress, color, height)
  if (this.element) this.element.setAttribute('style', custom)
  return false
}

function attributes (progress, color, height) {
  if (progress == null) return 'transition: none; ' + translate(-100)
  if (!color) color = '#000'
  if (!height) height = '2px'
  if (Number.isInteger(height)) height += 'px'
  return (
    translate(100 * (progress - 1)) +
    ` background-color: ${color}; height: ${height};`
  )
}

function translate (percentage) {
  return `-webkit-transform: translate3d(${percentage}%, 0px, 0px);
    -ms-transform: translate3d(${percentage}%, 0px, 0px);
    transform: translate3d(${percentage}%, 0px, 0px);`
}
