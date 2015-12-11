(function () {
  google.load('visualization', '1', {'packages':['line']});
  google.setOnLoadCallback(startListening);

  var chartData = [];

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
      chartData.push([new Date(data.ts), data.point]);
      if (chartData.length > 10) chartData.shift();
      drawChart(chartData);
    });
  }
})();
