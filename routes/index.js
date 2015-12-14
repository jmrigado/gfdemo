'use strict'

var express = require('express')
var fs = require('fs')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  let file = fs.readFile('flowMeter-1hr.txt', 'utf-8', (err, data) => {
    let initData = []
    let lines = data.split('\n')
    let line;
    for (let i in lines) {
      if ((i % 30) === 0) {
        let parts = lines[i].replace(/\+/g, '').split(',')
        initData.push([parts[0], parseFloat(parts[2])])
      }
    }

    res.render('index', {
      title: 'GFS - Backend Master Controller',
      initialLineGraphData: JSON.stringify(initData)
    })
  })
})

module.exports = router
