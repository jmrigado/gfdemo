'use strict'

const fs = require('fs')
const rl = require('readline')

module.exports = io => {
  io.on('connection', function (socket) {
    console.log('A user connected');

    setInterval(() => {
      let now = Date.now();

      socket.emit('data::gpm', {
        ts: now,
        point: Math.floor(Math.random() * 100) + 1
      })


    }, 50)

    fs.readFile('PHSensor-1hr.txt', 'utf8', (err, data) => {
      let lines = data.split('\n')

      let readLine = function readLine(lines) {
        if (!lines.length) return;
        let line = lines.shift();

        setTimeout(() => {
          let parts = line.replace(/\+/g, '').split(',')

          socket.emit('data::ph', {
            ts: parts[0],
            point: parseFloat(parts[1])
          })

          socket.emit('data::temp', {
            ts: parts[0],
            point: parseFloat(parts[3])
          })

          socket.emit('data::mv', {
            ts: parts[0],
            point: parseFloat(parts[2])
          })

          return readLine(lines)
        }, 1000)
      }

      readLine(lines)
    })

    setInterval(() => {
      socket.emit('data::gpm::hourly', {
        ts: Date.now(),
        point: Math.floor(Math.random() * 100) + 1
      })
    }, 5000)
  })
}
