//connect to firebase database 
//get reference to the related child (Data)
var database = firebase.database();
var ref = database.ref("Data");

var timeFormat = "MM/DD/YYYY HH:mm";

var chartType = "line";

//console.log(newDate()); //Mon Apr 20 2020 11:42:00 GMT+0800 (Malaysia Time)
function newDate(days){
    return moment().add(days,"d").toDate();
}

//console.log(newDateString()); //04/20/2020 11:42
function newDateString(days){
    return moment().add(days,"d").format(timeFormat);
}

var fullDate = new Date();
var todayDate = fullDate.toLocaleDateString();
var todayMonth = fullDate.getMonth();

//console.log(todayDate); 5/2/2020 toLocaleDateString();
//console.log(todayDate); 5/2/2020, 5:40:56 PM toLocaleString
//console.log(todayDate); 5:41:19 PM toLocaleTimeString


var xlabel1 = [];
var points1 = [];

var xlabel2 = [];
var points2 = [];

var xlabel3 = [];
var points3 = [];

var xlabel4 = [];
var points4 = [];

var optimalDailyTemp = 0;
var warningDailyTemp = 0;
var dangerDailyTemp = 0;

var optimalWeeklyTemp = 0;
var warningWeeklyTemp = 0;
var dangerWeeklyTemp = 0;

var optimalMonthlyTemp = 0;
var warningMonthlyTemp = 0;
var dangerMonthlyTemp = 0;

var optimalTemp = 0;
var warningTemp = 0;
var dangerTemp = 0;

ref.on("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);

    console.log(dataObj);

    if(xlabel1.length > 0){
        xlabel1.splice(0,xlabel4.length);
        points1.splice(0,points4.length);
        optimalDailyTemp = 0;
        warningDailyTemp = 0;
        dangerDailyTemp = 0;
    }

    if(xlabel2.length > 0){
        xlabel2.splice(0,xlabel2.length);
        points2.splice(0,points2.length);
        optimalWeeklyTemp = 0;
        warningWeeklyTemp = 0;
        dangerWeeklyTemp = 0;
    }

    if(xlabel3.length > 0){
        xlabel3.splice(0,xlabel3.length);
        points3.splice(0,points3.length);
        optimalMonthlyTemp = 0;
        warningMonthlyTemp = 0;
        dangerMonthlyTemp = 0;
    }

    if(xlabel4.length > 0){
        xlabel4.splice(0,xlabel4.length);
        points4.splice(0,points4.length);
        optimalTemp = 0;
        warningTemp = 0;
        dangerTemp = 0;
    }
    
    for(var x = 0; x < keys.length; ++x){
        var k = keys[x];

        var d = new Date(dataObj[k].timestamp);
        var date = d.toLocaleDateString();

        var month = d.getMonth();
        
        if(dataObj[k].timestamp != undefined){
            if(date == todayDate){
                if(dataObj[k].temperature != undefined || dataObj[k].temperature != "Null"){
                    xlabel1.push(dataObj[k].timestamp);
                    points1.push(dataObj[k].temperature);
                    if(dataObj[k].temperature < 20) warningDailyTemp++;
                    else if(dataObj[k].temperature >= 20 && dataObj[k].temperature <= 30) optimalDailyTemp++;
                    else dangerDailyTemp++;
                }
            }
    
            if(d >= newDate(-7) && d <= newDate(0)){
                if(dataObj[k].temperature != undefined || dataObj[k].temperature != "Null"){
                    xlabel2.push(dataObj[k].timestamp);
                    points2.push(dataObj[k].temperature);
                    if(dataObj[k].temperature < 20) warningWeeklyTemp++;
                    else if(dataObj[k].temperature >= 20 && dataObj[k].temperature <= 30) optimalWeeklyTemp++;
                    else dangerWeeklyTemp++;
                }
            }
    
            if(month == todayMonth){
                if(dataObj[k].temperature != undefined || dataObj[k].temperature != "Null"){
                    xlabel3.push(dataObj[k].timestamp);
                    points3.push(dataObj[k].temperature);
                    if(dataObj[k].temperature < 20) warningMonthlyTemp++;
                    else if(dataObj[k].temperature >= 20 && dataObj[k].temperature <= 30) optimalMonthlyTemp++;
                    else dangerMonthlyTemp++;
                }
            }
            
            if(dataObj[k].temperature != undefined || dataObj[k].temperature != "Null"){
                xlabel4.push(dataObj[k].timestamp);
                points4.push(dataObj[k].temperature);
                if(dataObj[k].temperature < 20) warningTemp++;
                else if(dataObj[k].temperature >= 20 && dataObj[k].temperature <= 30) optimalTemp++;
                else dangerTemp++;
            }
        }
    }
    
    plot1();
    plot2();
    plot3();
    plot4();

    plotBar1();
    plotBar2();
    plotBar3();
    plotBar4();

    plotDou1();
    plotDou2();
    plotDou3();
    plotDou4();
})

//var chart1;
function plot1(){
    var ctx = document.getElementById("myChart1").getContext("2d");
    
    var cfg = {
        data:{
            labels: xlabel1,
            datasets:[{
                label: "Today's temperature",
                data: points1,
                type: "line",
                pointRadius: 0,
				fill: false,
				lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                pointHoverBorderColor : "rgba(142,77,185,0.9)",
            }],
        },
        options:{
            tooltips:{
                intersect: false,
                mode: "index"
            },
            scales:{
                xAxes:[{
                    type: "time",
                    distribution: "series",
                    offset : false,
                    ticks:{
                        autoSkip: true,
						autoSkipPadding: 75,
                    },
                    time:{
                        unit : "minute",
                        unitStepSize : 3,
                    },
                }],
                yAxes:[{
                    ticks:{
                        beginAtZero: true,
                        max : 100,
                        stepValue: 10
                    },
                    scaleLabel : {
                        display : true,
                        labelString : "Temperature"
                    }
                }]
            }
        }
    }

   var chart = new Chart(ctx,cfg);
}

function plot2(){
    var ctx = document.getElementById("myChart2").getContext("2d");
    
    var cfg = {
        data:{
            labels: xlabel2,
            datasets:[{
                label: "Weekly's temperature",
                data: points2,
                type: "line",
                pointRadius: 0,
				fill: false,
				lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                pointHoverBorderColor : "rgba(142,77,185,0.9)",
            }],
        },
        options:{
            tooltips:{
                intersect: false,
                mode: "index"
            },
            scales:{
                xAxes:[{
                    type: "time",
                    distribution: "series",
                    offset : false,
                    ticks:{
                        autoSkip: true,
						autoSkipPadding: 75,
                    },
                    time:{
                        unit : "day",
                        unitStepSize : 1,
                    },
                }],
                yAxes:[{
                    ticks:{
                        beginAtZero: true,
                        max : 100,
                        stepValue: 10
                    },
                    scaleLabel : {
                        display : true,
                        labelString : "Temperature"
                    }
                }]
            }
        }
    }
    var chart = new Chart(ctx,cfg);
}

function plot3(){
    var ctx = document.getElementById("myChart3").getContext("2d");
   
    var cfg = {
        data:{
            labels: xlabel3,
            datasets:[{
                label: "Monthly's temperature",
                data: points3,
                type: "line",
                pointRadius: 0,
				fill: false,
				lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                pointHoverBorderColor : "rgba(142,77,185,0.9)",
            }],
        },
        options:{
            tooltips:{
                intersect: false,
                mode: "index"
            },
            scales:{
                xAxes:[{
                    type: "time",
                    distribution: "series",
                    offset : false,
                    ticks:{
                        autoSkip: true,
						autoSkipPadding: 75,
                    },
                    time:{
                        unit : "day",
                        unitStepSize : 1,
                    },
                }],
                yAxes:[{
                    ticks:{
                        beginAtZero: true,
                        max : 100,
                        stepValue: 10
                    },
                    scaleLabel : {
                        display : true,
                        labelString : "Temperature"
                    }
                }]
            }
        },
    }

    var chart = new Chart(ctx,cfg);
}

function plot4(){
    var ctx = document.getElementById("myChart4").getContext("2d");
     
    var cfg = {
        data:{
            labels: xlabel4,
            datasets:[{
                label: "Lifetime's temperature",
                data: points4,
                type: "line",
                pointRadius: 0,
				fill: false,
				lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                pointHoverBorderColor : "rgba(142,77,185,0.9)",
            }],
        },
        options:{
            tooltips:{
                intersect: false,
                mode: "index"
            },
            scales:{
                xAxes:[{
                    type: "time",
                    distribution: "series",
                    offset : false,
                    ticks:{
                        autoSkip: true,
						autoSkipPadding: 75,
                    },
                    time:{
                        unit : "month",
                        unitStepSize : 1,
                    },
                }],
                yAxes:[{
                    ticks:{
                        beginAtZero: true,
                        max : 100,
                        stepValue: 10
                    },
                    scaleLabel : {
                        display : true,
                        labelString : "Temperature"
                    }
                }]
            }
        },
    }

    var chart = new Chart(ctx,cfg);
}

function plotBar1(){
    var ctx = document.getElementById("myBarChart1").getContext("2d");
    
    var cfg = {
        data:{
            labels: xlabel1,
            datasets:[{
                label: "Today's temperature",
                data: points1,
                type: "bar",
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                backgroundColor: "rgba(201,134,212,0.7)",
                HoverBorderColor : "rgba(142,77,185,0.9)",
                HoverBackgroundColor : "rgba(142,77,185,0.9)"
            }],
        },
        options:{
            tooltips:{
                intersect: false,
                mode: "index"
            },
            scales:{
                xAxes:[{
                    type: "time",
                    distribution: "series",
                    offset : false,
                    ticks:{
                        autoSkip: true,
						autoSkipPadding: 75,
                    },
                    time:{
                        unit : "minute",
                        unitStepSize : 3,
                    },
                }],
                yAxes:[{
                    ticks:{
                        beginAtZero: true,
                        max : 100,
                        stepValue: 10
                    },
                    scaleLabel : {
                        display : true,
                        labelString : "Temperature"
                    }
                }]
            }
        }
    }

   var chart = new Chart(ctx,cfg);
}

function plotBar2(){
    var ctx = document.getElementById("myBarChart2").getContext("2d");
    
    var cfg = {
        data:{
            labels: xlabel2,
            datasets:[{
                label: "Weekly's temperature",
                data: points2,
                type: "bar",
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                backgroundColor: "rgba(201,134,212,0.7)",
                HoverBorderColor : "rgba(142,77,185,0.9)",
                HoverBackgroundColor : "rgba(142,77,185,0.9)"
            }],
        },
        options:{
            tooltips:{
                intersect: false,
                mode: "index"
            },
            scales:{
                xAxes:[{
                    type: "time",
                    distribution: "series",
                    offset : false,
                    ticks:{
                        autoSkip: true,
						autoSkipPadding: 75,
                    },
                    time:{
                        unit : "day",
                        unitStepSize : 1,
                    },
                }],
                yAxes:[{
                    ticks:{
                        beginAtZero: true,
                        max : 100,
                        stepValue: 10
                    },
                    scaleLabel : {
                        display : true,
                        labelString : "Temperature"
                    }
                }]
            }
        }
    }
    var chart = new Chart(ctx,cfg);
}

function plotBar3(){
    var ctx = document.getElementById("myBarChart3").getContext("2d");
   
    var cfg = {
        data:{
            labels: xlabel3,
            datasets:[{
                label: "Monthly's temperature",
                data: points3,
                type: "bar",
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                backgroundColor: "rgba(201,134,212,0.7)",
                HoverBorderColor : "rgba(142,77,185,0.9)",
                HoverBackgroundColor : "rgba(142,77,185,0.9)"
            }],
        },
        options:{
            tooltips:{
                intersect: false,
                mode: "index"
            },
            scales:{
                xAxes:[{
                    type: "time",
                    distribution: "series",
                    offset : false,
                    ticks:{
                        autoSkip: true,
						autoSkipPadding: 75,
                    },
                    time:{
                        unit : "day",
                        unitStepSize : 1,
                    },
                }],
                yAxes:[{
                    ticks:{
                        beginAtZero: true,
                        max : 100,
                        stepValue: 10
                    },
                    scaleLabel : {
                        display : true,
                        labelString : "Temperature"
                    }
                }]
            }
        },
    }

    var chart = new Chart(ctx,cfg);
}

function plotBar4(){
    var ctx = document.getElementById("myBarChart4").getContext("2d");

    var cfg = {
        data:{
            labels: xlabel4,
            datasets:[{
                label: "Lifetime's temperature",
                data: points4,
                type: "bar",
                barThickness: "flex",
                borderWidth: 1,
                borderColor: "rgba(201,134,212,0.7)",
                backgroundColor: "rgba(201,134,212,0.7)",
                HoverBorderColor : "rgba(142,77,185,0.9)",
                HoverBackgroundColor : "rgba(142,77,185,0.9)"
            }],
        },
        options:{
            tooltips:{
                intersect: false,
                mode: "index"
            },
            scales:{
                xAxes:[{
                    type: "time",
                    distribution: "series",
                    offset : false,
                    ticks:{
                        autoSkip: true,
						autoSkipPadding: 75,
                    },
                    time:{
                        unit : "month",
                        unitStepSize : 1,
                    },
                }],
                yAxes:[{
                    ticks:{
                        beginAtZero: true,
                        max : 100,
                        stepValue: 10
                    },
                    scaleLabel : {
                        display : true,
                        labelString : "Temperature"
                    }
                }]
            }
        }
    }

    var chart = new Chart(ctx,cfg);
}

function plotDou1(){
    var ctx = document.getElementById("myDouChart1").getContext("2d");

    var cfg = {
        type : "doughnut",
        data:{
            datasets:[{
                data : [
                    warningDailyTemp,
                    optimalDailyTemp,
                    dangerDailyTemp
                ],
                backgroundColor: [
                    "rgba(189, 88, 5, 1.0)",
                    "rgba(0,255,0, 1.0)",
                    "rgba(255,0,0, 1.0)"
                ],
                hoverBackgroundColor: [
                    "rgba(189, 88, 5, 0.9)",
                    "rgba(0,255,0, 0.9)",
                    "rgba(255,0,0, 0.9)"
                ],
                hoverBorderWidth: 2,
                label: "Temperature",
            }],
            labels: [
                "Below Optimal",
                "Optimal",
                "Above Optimal"
            ]
        },
        options :{
            responsive : true
        }
    }

    var chart = new Chart(ctx,cfg);
}

function plotDou2(){
    var ctx = document.getElementById("myDouChart2").getContext("2d");

    var cfg = {
        type : "doughnut",
        data:{
            datasets:[{
                data : [
                    warningWeeklyTemp,
                    optimalWeeklyTemp,
                    dangerWeeklyTemp
                ],
                backgroundColor: [
                    "rgba(189, 88, 5, 1.0)",
                    "rgba(0,255,0, 1.0)",
                    "rgba(255,0,0, 1.0)"
                ],
                hoverBackgroundColor: [
                    "rgba(189, 88, 5, 0.9)",
                    "rgba(0,255,0, 0.9)",
                    "rgba(255,0,0, 0.9)"
                ],
                hoverBorderWidth: 2,
                label: "Temperature",
            }],
            labels: [
                "Below Optimal",
                "Optimal",
                "Above Optimal"
            ]
        },
        options :{
            responsive : true
        }
    }

    var chart = new Chart(ctx,cfg);
}

function plotDou3(){
    var ctx = document.getElementById("myDouChart3").getContext("2d");

    var cfg = {
        type : "doughnut",
        data:{
            datasets:[{
                data : [
                    warningMonthlyTemp,
                    optimalMonthlyTemp,
                    dangerMonthlyTemp
                ],
                backgroundColor: [
                    "rgba(189, 88, 5, 1.0)",
                    "rgba(0,255,0, 1.0)",
                    "rgba(255,0,0, 1.0)"
                ],
                hoverBackgroundColor: [
                    "rgba(189, 88, 5, 0.9)",
                    "rgba(0,255,0, 0.9)",
                    "rgba(255,0,0, 0.9)"
                ],
                hoverBorderWidth: 2,
                label: "Temperature",
            }],
            labels: [
                "Below Optimal",
                "Optimal",
                "Above Optimal"
            ]
        },
        options :{
            responsive : true
        }
    }

    var chart = new Chart(ctx,cfg);
}

function plotDou4(){
    var ctx = document.getElementById("myDouChart4").getContext("2d");

    var cfg = {
        type : "doughnut",
        data:{
            datasets:[{
                data : [
                    warningTemp,
                    optimalTemp,
                    dangerTemp
                ],
                backgroundColor: [
                    "rgba(189, 88, 5, 1.0)",
                    "rgba(0,255,0, 1.0)",
                    "rgba(255,0,0, 1.0)"
                ],
                hoverBackgroundColor: [
                    "rgba(189, 88, 5, 0.9)",
                    "rgba(0,255,0, 0.9)",
                    "rgba(255,0,0, 0.9)"
                ],
                hoverBorderWidth: 2,
                label: "Temperature",
            }],
            labels: [
                "Below Optimal",
                "Optimal",
                "Above Optimal"
            ]
        },
        options :{
            responsive : true
        }
    }

    var chart = new Chart(ctx,cfg);
}