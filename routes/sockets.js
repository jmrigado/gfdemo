'use strict'

module.exports = io => {
  io.on('connection', function (socket) {
    console.log('A user connected');

    setInterval(() => {
      let now = Date.now();

      socket.emit('data::gpm', {
        ts: now,
        point: Math.floor(Math.random() * 100) + 1
      })

      socket.emit('data::ph', {
        ts: now,
        point: Math.floor(Math.random() * 100) + 1
      })

      socket.emit('data::temp', {
        ts: now,
        point: Math.floor(Math.random() * 100) + 1
      })

      socket.emit('data::mv', {
        ts: now,
        point: Math.floor(Math.random() * 100) + 1
      })
    }, 50)

    setInterval(() => {
      socket.emit('data::gpm::hourly', {
        ts: Date.now(),
        point: Math.floor(Math.random() * 100) + 1
      })
    }, 5000)
  })
}
