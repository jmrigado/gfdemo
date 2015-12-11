(function (global) {
  var io = global.io.connect()

  global.app = {
    onSocketEvent: function (event, cb) {
      io.on(event, cb)
    }
  }

  var phElem = global.document.getElementById('ph');
  global.app.onSocketEvent('data::ph', function (data) {
    phElem.innerText = data.point;
  })

  var mvElem = global.document.getElementById('mv');
  global.app.onSocketEvent('data::mv', function (data) {
    mvElem.innerText = data.point;
  })

  var tempElem = global.document.getElementById('temp');
  global.app.onSocketEvent('data::temp', function (data) {
    tempElem.innerText = data.point;
  })

})(window)
