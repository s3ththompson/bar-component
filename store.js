var TRICKLE_SPEED = 200
var _trickle

module.exports = function () {
  return function (state, emitter) {
    emitter.on('progress:start', start)
    emitter.on('progress:done', done)
    emitter.on('progress:remove', remove)
    emitter.on('progress:set', set)
    emitter.on('progress:inc', inc)

    function start () {
      set(0)

      _trickle = setInterval(function () {
        inc()
      }, TRICKLE_SPEED)
    }

    function done () {
      inc(0.3 + 0.5 * Math.random())
      set(1)
    }

    function remove () {
      state.__progress = null
      render()
    }

    function set (n) {
      n = clamp(n, 0, 1)
      state.__progress = n
      render()
      if (n == 1) {
        clearInterval(_trickle)
        // wait for animation to finish then clear
        setTimeout(function () {
          state.__progress = null
          render()
        }, 200)
      }
    }

    function inc (amount) {
      var n = state.__progress
      if (n == null) {
        return start()
      } else if (n == 1) {
      } else {
        // trickle amounts from NProgress, (c) 2013, 2014 Rico Sta. Cruz
        // http://ricostacruz.com/nprogress
        if (typeof amount !== 'number') {
          if (n >= 0 && n < 0.2) {
            amount = 0.1
          } else if (n >= 0.2 && n < 0.5) {
            amount = 0.04
          } else if (n >= 0.5 && n < 0.8) {
            amount = 0.02
          } else if (n >= 0.8 && n < 0.99) {
            amount = 0.005
          } else {
            amount = 0
          }
        }
        n = clamp(n + amount, 0, 0.994)
        return set(n)
      }
    }

    function render () {
      emitter.emit('render')
    }
  }
}

function clamp (n, min, max) {
  if (n < min) return min
  if (n > max) return max
  return n
}
