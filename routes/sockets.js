'use strict'

const chokidar = require('chokidar')
const fs = require('fs')
const rl = require('readline')

module.exports = io => {
  io.on('connection', function (socket) {

    let lastTs;
    chokidar.watch('./flowMeter.txt', {persistent: true}).on('change', (filename) => {
      fs.readFile(filename, 'utf-8', (err, data) => {
        let lines = data.split('\n')
        let line = lines[lines.length - 2]

        // Exit on empty line
        if (!line) return;

        let parts = line.replace(/\+/g, '').split(',')
        socket.emit('data::gpm', {
          ts: parts[1],
          point: parseFloat(parts[3])
        })

        let newTs = new Date(parts[1])
        if (!lastTs || (newTs - lastTs) > 1000) {
          socket.emit('data::gpm::hourly', {
            ts: parts[1],
            point: parseFloat(parts[3])
          })
          lastTs = newTs
        }
      })
    })

    chokidar.watch('./PHSensor.txt', {persistent: true}).on('change', filename => {
      fs.readFile(filename, 'utf8', (err, data) => {
        let lines = data.split('\n')
        let line = lines[lines.length - 2]

        // Exit on empty line
        if (!line) return;

        let parts = line.replace(/\+/g, '').split(',')

        socket.emit('data::ph', {
          ts: parts[1],
          point: parseFloat(parts[2])
        })

        socket.emit('data::temp', {
          ts: parts[1],
          point: parseFloat(parts[4])
        })

        socket.emit('data::mv', {
          ts: parts[1],
          point: parseFloat(parts[3])
        })
      })
    })
  })
}
