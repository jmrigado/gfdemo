(function (global) {
  // Initial Data
  var ts = new Date();
  ts = new Date(ts.setHours(ts.getHours() - 1));
  var chartData = global.initLineGraphData.map(function (value) {
    ts = new Date(ts.setSeconds(ts.getSeconds() + 30));
    return [ts, value[1]];
  });

  google.load('visualization', '1', {'packages':['corechart', 'line']});
  google.setOnLoadCallback(function () {
    drawChart(chartData);
    startListening();
  });

  function drawChart(points) {
      // Create the data table.
      var cData = [['Time', 'GPM']].concat(points);
      var data = google.visualization.arrayToDataTable(cData);

      // Set chart options
      var options = {
          //title: 'Inlet Flow',
          hAxis: {title: 'Time',  titleTextStyle: {color: '#333'}},
          vAxis: {title: 'GPM',  minValue: 0},
          height: 300
      };

      //create and draw the chart from DIV
      var chart = new google.visualization.AreaChart(document.getElementById('lineChart'));
      chart.draw(data, options);
  }

  function startListening() {
    window.app.onSocketEvent('data::gpm::hourly', function (data) {
      chartData.push([new Date(), data.point]);
      if (chartData.length > 108) chartData.shift();
      drawChart(chartData);
    });
  }

})(window);
