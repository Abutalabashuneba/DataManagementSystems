//connect to firebase database 
//get reference to the related child (Data)
var database = firebase.database();
var ref = database.ref("Data");

var timeFormat = "MM/DD/YYYY HH:mm";

var chartType = "line";

var points1 = [];
var xlabel1 = [];

function newDate(days){
    return moment().add(days,"d").toDate();
}

function newDateString(days){
    return moment().add(days,"d").format(timeFormat);
}

function chart(){
    chartType = document.getElementById("chartType").value;
    console.log(chartType);
    tempChart(xlabel1,points1);
}

ref.on("value", snap => {
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);

    var fullDate = new Date();
    var todayDate = fullDate.toLocaleDateString();
    //variable for today line chart
    
    //variable for weekly line chart
    var month = fullDate.getMonth();
    var monthName = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    var points2 = [];
    var xlabel2 = [];
    //variable for monthly line chart
    var points3 = [];
    var xlabel3 = [];

    for(var x = 0; x < keys.length; ++x){
        var k = keys[x];
        //console.log(dataObj[k].temperature);
        var d = new Date(dataObj[k].timestamp);
        var date = d.toLocaleDateString();
        var mth = d.getMonth();

        if(date == todayDate){
            points1.push(dataObj[k].temperature);
            xlabel1.push(d.toLocaleTimeString());
        }

        if(mth == month){
            //console.log(dataObj[k].temperature)
            points3.push(dataObj[k].temperature);
            xlabel3.push(date);
        }
    }

    //var d = new Date(); //Sun Apr 19 2020 15:10:48 GMT+0800 (Malaysia Time)
    //var m = d.toLocaleDateString(); //4/19/2020
    //var c = d.toLocaleString(); //4/19/2020, 3:12:29 PM
    //console.log(c);

    //console.log(xlabel1);
    //console.log(points1);
    

    tempChart(xlabel1,points1);

    var data1 = {
        label: 's1',
        fill: false,
        data: [
                { x: '2017-01-06 18:39:30', y: points1[0] },
                { x: '2017-01-15 18:39:28', y: points1[1] },
                { x: '2017-03-07 18:39:28', y: points1[2] },
                { x: '2017-09-30 11:22:22', y: points1[3] },
            ]
    };

    var ctx2 = $("#myChart2");
    var chart = new Chart(ctx2, {
        type: 'line',
        data: {
            datasets:[data1],
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            quarter: 'MMM YYYY'
                        }
                    }
                }]
            }
        }
    });

    

    var ctx3 = $("#myChart3");
    var myLineChart3 = new Chart(ctx3, {
        type: 'line',
        data: {
            //xlabel
            labels: xlabel3,
            datasets: [
                {
                    label: "Month" ,
                    data: points3,
                    fill: false,
                }
            ]
        }
    });
})

/*var xlabel = [];
var points = [];

todayLineChart();

async function getData(){
    ref.on("value", snap => {
        var dataObj = snap.val();
        var keys = Object.keys(dataObj);

        for(var x = 0; x < keys.length; ++x){
            var k  = keys[x];

            xlabel.push(dataObj[k].timestamp);
            points.push(dataObj[k].temperature);
        }
    })
}

async function todayLineChart(){
    await getData();
    var ctx1 = $("#myChart1");
    var myLineChart = new Chart(ctx1, {
        type: 'line',
        data: {
            //xlabel
            labels: xlabel,
            datasets: [
                {
                    label: "Today" ,
                    data: points
                }
            ]
        }
    });
}*/

function tempChart(xlabel,points){
    var ctx1 = $("#myChart1");
    var myLineChart = new Chart(ctx1, {
        type: chartType,
        data: {
            //xlabel
            labels: xlabel,
            datasets: [
                {
                    label: "Today Data" ,
                    data: points,
                    fill: false,
                    //backgroundColor:'rgba(0, 0, 0, 0.9)',
                    //borderColor: 'rgba(0, 0, 0, 0.9)',
                }
            ]
        }
    });
}