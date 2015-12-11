module.exports = io => {
  io.on('connection', function (socket) {
    console.log('A user connected');

    setInterval(() => {
      socket.emit('data::gpm', {
        ts: Date.now(),
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
