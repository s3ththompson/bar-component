var Nanocomponent = require('nanocomponent')
var html = require('bel')
var xtend = require('xtend')

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
  return html`<div styles="${css(progress, color, height)}"></div>`
}

Bar.prototype.update = function (progress, color, height) {
  if (this.element) {
    this.element.setAttribute('style', css(progress, color, height))
  }
  return false
}

function css (progress, color, height) {
  var styles = `transition: all 200ms ease;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;`
  if (progress == null) return styles + 'transition: none; ' + translate(-100)
  if (!color) color = '#000'
  if (!height) height = '2px'
  if (Number.isInteger(height)) height += 'px'
  return (
    styles +
    translate(100 * (progress - 1)) +
    ` background-color: ${color}; height: ${height};`
  )
}

function translate (percentage) {
  return `-webkit-transform: translate3d(${percentage}%, 0px, 0px);
    -ms-transform: translate3d(${percentage}%, 0px, 0px);
    transform: translate3d(${percentage}%, 0px, 0px);`
}
