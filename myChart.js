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

ref.on("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);

    if(xlabel1.length > 0){
        xlabel1.splice(0,xlabel4.length);
        points1.splice(0,points4.length);
    }

    if(xlabel4.length > 0){
        xlabel4.splice(0,xlabel4.length);
        points4.splice(0,points4.length);
    }
    
    for(var x = 0; x < keys.length; ++x){
        var k = keys[x];

        var d = new Date(dataObj[k].timestamp);
        var date = d.toLocaleDateString();

        var month = d.getMonth();
        
        if(date == todayDate){
            xlabel1.push(dataObj[k].timestamp);
            
            if(dataObj[k].temperature == undefined || dataObj[k].temperature == null){
                points1.push(0);
            }else{
                points1.push(dataObj[k].temperature);
            }
        }

        if(d >= newDate(-6) && d <= newDate(0)){
            xlabel2.push(dataObj[k].timestamp);

            if(dataObj[k].temperature == undefined || dataObj[k].temperature == null){
                points2.push(0);
            }else{
                points2.push(dataObj[k].temperature);
            }
        }

        if(month == todayMonth){
            xlabel3.push(dataObj[k].timestamp);

            if(dataObj[k].temperature == undefined || dataObj[k].temperature == null){
                points3.push(0);
            }else{
                points3.push(dataObj[k].temperature);
            }
        }

        xlabel4.push(dataObj[k].timestamp);
        if(dataObj[k].temperature == undefined || dataObj[k].temperature == null){
            points4.push(0);
        }else{
            points4.push(dataObj[k].temperature);
        }
    }
    
    plot1();
    plot2();
    plot3();
    plot4();
})

//var chart1;
function plot1(){
    var ctx = document.getElementById("myChart1").getContext("2d");
    //if(chart1 != undefined) chart1.destroy();
    
    var chart = new Chart(ctx,{
        data:{
            labels: xlabel1,
            datasets:[{
                label: "Today's temperature",
                data: points1,
                type: "line",
                pointRadius: 1,
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
                        unit : "hour",
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
    });
    chart.update();
}

function plot2(){
    var ctx = document.getElementById("myChart2").getContext("2d");
    //if(chart1 != undefined) chart1.destroy();
    
    var chart = new Chart(ctx,{
        data:{
            labels: xlabel2,
            datasets:[{
                label: "Weekly's temperature",
                data: points2,
                type: "line",
                pointRadius: 1,
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
    });
    chart.update();
}

function plot3(){
    var ctx = document.getElementById("myChart3").getContext("2d");
    //if(chart1 != undefined) chart1.destroy();
    
    var chart = new Chart(ctx,{
        data:{
            labels: xlabel3,
            datasets:[{
                label: "Monthly's temperature",
                data: points3,
                type: "line",
                pointRadius: 1,
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
    });
    chart.update();
}

//var chart4;
function plot4(){
    var ctx = document.getElementById("myChart4").getContext("2d");

    var chart = new Chart(ctx, {
        type: "line",
        data:{
            labels: xlabel4,
            datasets: [{
                label : "Lifetime temperature",
                data: points4,
                fill : false,
                borderColor: "rgba(201,134,212,0.7)",
                pointHoverBorderColor : "rgba(142,77,185,0.9)",
                lineTension: 0.5,
                pointRadius: 1,
                //pointHitRadius: 4,
                borderWidth: 2,
            }]
        },
        options:{
            tooltips:{
                intersect : false,
                mode: "index"
            },
            scales:{
                xAxes: [{
                    type: "time",
                    distribution : "series",
                    ticks:{
                        autoSkip : true,
                        autoSkipPadding : 75, 
                    },
                    time:{
                        unit : "day",
                        unitStepSize : 5,
                        displayFormats:{
                            hour : "H:mm"
                        }
                    },
                }],
                yAxes: [{
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
    })

    chart.update();

    //console.log(json.labels);
    //console.log(json.data.rate);
}