(function (global) {
  // Initial Data
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
        pointBackgroundColor: "rgba(33,150,243,0.8)",
        pointBorderColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
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
    var lineChart = new Chart(ctx, config);
  }

  function startListening() {
    window.app.onSocketEvent('data::gpm::hourly', function (data) {
      dataSet.labels.push(new Date());
      dataSet.datasets[0].data.push(data.point);

      if (dataSet.length > 108) {
        dataSet.labels.shift();
        dataSet.datasets[0].data.shift();
      }
      drawChart(dataSet);
    });
  }

})(window);
