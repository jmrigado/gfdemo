google.load('visualization', '1', {'packages':['line']});
google.setOnLoadCallback(drawChart);

function drawChart() {

    var chartData = [];

    // Create the data table.
    var data = google.visualization.arrayToDataTable([
        ['Time', 'GPM'],
        ['5:30',  45],
        ['6:00',  50],
        ['6:30',  68],
        ['7:00',  52],
        ['7:30',  42],
        ['8:00',  30],
        ['8:30',  44]
    ]);

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