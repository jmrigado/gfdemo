(function (global) {
  var io = global.io.connect()

  global.app = {
    onSocketEvent: function (event, cb) {
      io.on(event, cb)
    }
  }

})(window)
