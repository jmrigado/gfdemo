'use strict'

const chokidar = require('chokidar')
const fs = require('fs')
const rl = require('readline')

module.exports = io => {
  io.on('connection', function (socket) {

    let lastTs;
    console.log(process.cwd())
    chokidar.watch('./flowMeter-1hr.txt', {persistent: true}).on('change', (filename) => {
      fs.readFile(filename, 'utf-8', (err, data) => {
        let lines = data.split('\n')
        console.log(lines.length)
        let line = lines[lines.length - 2]
        console.log('LINE: ' + line)
        let parts = line.replace(/\+/g, '').split(',')
        socket.emit('data::gpm', {
          ts: parts[0],
          point: parseFloat(parts[2])
        })

        let newTs = new Date(parts[0])
        if (!lastTs || (newTs - lastTs) > 30000) {
          socket.emit('data::gpm::hourly', {
            ts: parts[0],
            point: parseFloat(parts[2])
          })
          lastTs = newTs
        }
      })
    })

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
  })
}
