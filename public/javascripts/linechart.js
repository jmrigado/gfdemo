(function (global) {
  // Initial Data
  var lineChart;
  var timeFormat = 'MM/DD/YYYY HH:mm';
  var ts = new Date();
  ts = new Date(ts.setHours(ts.getHours() - 1));

  var dataSet = {
    labels: [],
    datasets: [
      {
        label: "Flow",
        backgroundColor: "rgba(33,150,243,0.2)",
        borderColor: "rgba(33,150,243,0.8)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(33,150,243,0.8)",
        pointBorderWidth: 1,
        pointBorderColor: "#fff",
        pointHighlightFill: "#fff",
        data: []
      }
    ]
  };

  for (value of global.initLineGraphData){
    ts = new Date(ts.setSeconds(ts.getSeconds() + 30));
    dataSet.labels.push(ts);
    dataSet.datasets[0].data.push(value[1]);
  }

  drawChart(dataSet);
  startListening();

  function drawChart(data) {
    // Create the data table.
    // Set chart options

    var config = {
      type: 'line',
      data: dataSet,
      options: {
        datasetFill : true,
        responsive: true,
        scaleShowVerticalLines: false,
        pointDotRadius : 2,
        scales: {
          xAxes: [{
            type: "time",
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }
          }, ],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'GPM'
            }
          }]
        }
      }
    }

    //create and draw the chart from DIV
    var ctx = document.getElementById("lineChart").getContext("2d");
    lineChart = new Chart(ctx, config);
  }

  function startListening() {
    window.app.onSocketEvent('data::gpm::hourly', function (data) {
      dataSet.labels.push(new Date());
      dataSet.datasets[0].data.push(data.point);

      if (dataSet.length > 108) {
        dataSet.labels.shift();
        dataSet.datasets[0].data.shift();
      }

      lineChart.update();
    });
  }

})(window);
