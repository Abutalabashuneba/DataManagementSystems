var timeFormat = "MM/DD/YYYY HH:mm";

function newDate(days){
    return moment().add(days,"d").toDate();
}

function newDateString(days){
    return moment().add(days,"d").format(timeFormat);
}

var fullDate = new Date();
var todayDate = fullDate.toLocaleDateString();
var todayMonth = fullDate.getMonth();

////////////////////////////////////////////////////
var myChart;
var configTemp;
var chartType = "line";
var context = document.getElementById("myChart1").getContext("2d");

var labelTempDaily = [];
var pointTempDaily = [];

var labelTempWeekly = [];
var pointTempWeekly = [];

var labelTempMonthly = [];
var pointTempMonthly = [];

var labelTempLifetime = [];
var pointTempLifetime = [];

////////////////////////////////////////////////////
var bsfChart1;
var bsfConfigTemp;
var bsfChartType1 = "line";
var bsfContext1 = document.getElementById("bsfChart1").getContext("2d");

var bsfTempDaily = [];
var bsfTempPointDaily = [];

var bsfTempWeekly = [];
var bsfTempPointWeekly = [];

var bsfTempMonthly = [];
var bsfTempPointMonthly = [];

var bsfTempLifetime = [];
var bsfTempPointLifetime = [];
////////////////////////////////////////////////////

////////////////////////////////////////////////////
var myChart2;
var configHum;
var chartTypeHum = "line";
var context2 = document.getElementById("myChart2").getContext("2d");

var labelHumidityDaily = [];
var pointHumidityDaily = [];

var labelHumidityWeekly = [];
var pointHumidityWeekly = [];

var labelHumidityMonthly = [];
var pointHumidityMonthly = [];

var labelHumidityLifetime = [];
var pointHumidityLifetime = [];
////////////////////////////////////////////////////

////////////////////////////////////////////////////
var myChart3;
var configMoist;
var chartTypeMoist = "line";
var context3 = document.getElementById("myChart3").getContext("2d");

var labelMoistDaily = [];
var pointMoistDaily = [];

var labelMoistWeekly = [];
var pointMoistWeekly = [];

var labelMoistMonthly = [];
var pointMoistMonthly = [];

var labelMoistLifetime = [];
var pointMoistLifetime = [];
////////////////////////////////////////////////////

var dataObj;
var keys;

chicken1ref.once("value", snap=>{
    dataObj = snap.val();
    keys = Object.keys(dataObj);

    for(var x = 0; x < keys.length; ++x){
        var k = keys[x];

        var d = new Date(dataObj[k].timestamp);
        var date = d.toLocaleDateString();

        var month = d.getMonth();
        
        if(dataObj[k].timestamp != undefined){
            if(date == todayDate){
                if(dataObj[k].temperature != undefined || dataObj[k].temperature != "Null"){
                    labelTempDaily.push(dataObj[k].timestamp);
                    pointTempDaily.push(dataObj[k].temperature);
                    labelHumidityDaily.push(dataObj[k].timestamp);
                    pointHumidityDaily.push(dataObj[k].humidity);
                    labelMoistDaily.push(dataObj[k].timestamp);
                    pointMoistDaily.push(dataObj[k].moisture);
                }
            }
    
            if(d >= newDate(-7) && d <= newDate(0)){
                if(dataObj[k].temperature != undefined || dataObj[k].temperature != "Null"){
                    labelTempWeekly.push(dataObj[k].timestamp);
                    pointTempWeekly.push(dataObj[k].temperature);
                    labelHumidityWeekly.push(dataObj[k].timestamp);
                    pointHumidityWeekly.push(dataObj[k].humidity);
                    labelMoistWeekly.push(dataObj[k].timestamp);
                    pointMoistWeekly.push(dataObj[k].moisture);
                }
            }
    
            if(month == todayMonth){
                if(dataObj[k].temperature != undefined || dataObj[k].temperature != "Null"){
                    labelTempMonthly.push(dataObj[k].timestamp);
                    pointTempMonthly.push(dataObj[k].temperature);
                    labelHumidityMonthly.push(dataObj[k].timestamp);
                    pointHumidityMonthly.push(dataObj[k].humidity);
                    labelMoistMonthly.push(dataObj[k].timestamp);
                    pointMoistMonthly.push(dataObj[k].moisture);
                }
            }
            
            if(dataObj[k].temperature != undefined || dataObj[k].temperature != "Null"){
                labelTempLifetime.push(dataObj[k].timestamp);
                pointTempLifetime.push(dataObj[k].temperature);
                labelHumidityLifetime.push(dataObj[k].timestamp);
                pointHumidityLifetime.push(dataObj[k].humidity);
                labelMoistLifetime.push(dataObj[k].timestamp);
                pointMoistLifetime.push(dataObj[k].moisture);
            }
        }
    }

    configTemp = {
        data:{
            labels: labelTempDaily,
            datasets:[{
                label: "Today's temperature",
                data: pointTempDaily,
                type: "line",
                pointRadius: 0,
				fill: false,
				lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                backgroundColor: "rgba(201,134,212,0.7)",
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

    configHum = {
        data:{
            labels: labelHumidityDaily,
            datasets:[{
                label: "Today's humidity",
                data: pointHumidityDaily,
                type: "line",
                pointRadius: 0,
				fill: false,
				lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                backgroundColor: "rgba(201,134,212,0.7)",
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
                        labelString : "Humidity (%)"
                    }
                }]
            }
        }
    }

    configMoist = {
        data:{
            labels: labelMoistDaily,
            datasets:[{
                label: "Today's moisture",
                data: pointMoistDaily,
                type: "line",
                pointRadius: 0,
				fill: false,
				lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                backgroundColor: "rgba(201,134,212,0.7)",
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
                        labelString : "Moisture (%)"
                    }
                }]
            }
        }
    }

    myChart = new Chart(context,configTemp);
    myChart2 = new Chart(context2,configHum);
    myChart3 = new Chart(context3,configMoist);
})

var bsfObject;
var bsfKeys;

bsfref.once("value", snap=>{
    bsfObject = snap.val();
    bsfKeys = Object.keys(bsfObject);

    for(var x = 0; x < bsfKeys.length; ++x){
        var k = bsfKeys[x];

        var d = new Date(bsfObject[k].timestamp);
        var date = d.toLocaleDateString();

        var month = d.getMonth();
        
        if(bsfObject[k].timestamp != undefined){
            if(date == todayDate){
                if(bsfObject[k].temperature != undefined || bsfObject[k].temperature != "Null"){
                    bsfTempDaily.push(bsfObject[k].timestamp);
                    bsfTempPointDaily.push(bsfObject[k].temperature);
                }
            }
    
            if(d >= newDate(-7) && d <= newDate(0)){
                if(bsfObject[k].temperature != undefined || bsfObject[k].temperature != "Null"){
                    bsfTempWeekly.push(bsfObject[k].timestamp);
                    bsfTempPointWeekly.push(bsfObject[k].temperature);
                }
            }
    
            if(month == todayMonth){
                if(bsfObject[k].temperature != undefined || bsfObject[k].temperature != "Null"){
                    bsfTempMonthly.push(bsfObject[k].timestamp);
                    bsfTempPointMonthly.push(bsfObject[k].temperature);
                }
            }
            
            if(bsfObject[k].temperature != undefined || bsfObject[k].temperature != "Null"){
                bsfTempLifetime.push(bsfObject[k].timestamp);
                bsfTempPointLifetime.push(bsfObject[k].temperature);
            }
        }
    }

    bsfConfigTemp = {
        data:{
            labels: bsfTempDaily,
            datasets:[{
                label: "Today's temperature",
                data: bsfTempPointDaily,
                type: "line",
                pointRadius: 0,
				fill: false,
				lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                backgroundColor: "rgba(201,134,212,0.7)",
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

    bsfChart1 = new Chart(bsfContext1,bsfConfigTemp);
})

function onTypeChange(){
    chartType = document.getElementById("chartType").value;
    configTemp.data.datasets[0].type = chartType;
    myChart.update();
    
    chartTypeHum = document.getElementById("chartTypeHumid").value;
    configHum.data.datasets[0].type = chartTypeHum;
    myChart2.update();

    chartTypeMoist = document.getElementById("chartTypeMoist").value;
    configMoist.data.datasets[0].type = chartTypeMoist;
    myChart3.update();

    bsfChartType1 = document.getElementById("bsfChartType1").value;
    bsfConfigTemp.data.datasets[0].type = bsfChartType1;
    bsfChart1.update();
}

$(document).ready(function(){
    $(".pagination li").click(function(){
        //change the active pagination on click
        $( this ).parent().find( 'li.page-item.active' ).removeClass( 'active' );
        $( this ).addClass( 'page-item active' );
        
        //update temperature chart
        if($(this).children().attr("id") == "tempToday"){
            configTemp.data.datasets[0].data = pointTempDaily;
            configTemp.data.labels = labelTempDaily;
            configTemp.data.datasets[0].label = "Today's temperature";
            configTemp.options.scales.xAxes[0].time.unit = "minute";
        }else if($(this).children().attr("id") == "tempWeekly"){
            configTemp.data.datasets[0].data = pointTempWeekly;
            configTemp.data.labels = labelTempWeekly;
            configTemp.data.datasets[0].label = "Weekly temperature";
            configTemp.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "tempMonthly"){
            configTemp.data.datasets[0].data = pointTempMonthly;
            configTemp.data.labels = labelTempMonthly;
            configTemp.data.datasets[0].label = "Monthly temperature";
            configTemp.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "tempAll"){
            configTemp.data.datasets[0].data = pointTempLifetime;
            configTemp.data.labels = labelTempLifetime;
            configTemp.data.datasets[0].label = "Lifetime temperature";
            configTemp.options.scales.xAxes[0].time.unit = "month";
        }

        //update humidy chart
        if($(this).children().attr("id") == "humToday"){
            configHum.data.datasets[0].data = pointHumidityDaily;
            configHum.data.labels = labelHumidityDaily;
            configHum.data.datasets[0].label = "Today's humidity";
            configHum.options.scales.xAxes[0].time.unit = "minute";
        }else if($(this).children().attr("id") == "humWeekly"){
            configHum.data.datasets[0].data = pointHumidityWeekly;
            configHum.data.labels = labelHumidityWeekly;
            configHum.data.datasets[0].label = "Weekly humidity";
            configHum.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "humMonthly"){
            configHum.data.datasets[0].data = pointHumidityMonthly;
            configHum.data.labels = labelHumidityMonthly;
            configHum.data.datasets[0].label = "Monthly humidity";
            configHum.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "humAll"){
            configHum.data.datasets[0].data = pointHumidityLifetime;
            configHum.data.labels = labelHumidityLifetime;
            configHum.data.datasets[0].label = "Lifetime humidity";
            configHum.options.scales.xAxes[0].time.unit = "month";
        }

        //update moisture chart
        if($(this).children().attr("id") == "moistToday"){
            configMoist.data.datasets[0].data = pointMoistDaily;
            configMoist.data.labels = labelMoistDaily;
            configMoist.data.datasets[0].label = "Today's moisture";
            configMoist.options.scales.xAxes[0].time.unit = "minute";
        }else if($(this).children().attr("id") == "moistWeekly"){
            configMoist.data.datasets[0].data = pointMoistWeekly;
            configMoist.data.labels = labelMoistWeekly;
            configMoist.data.datasets[0].label = "Weekly moisture";
            configMoist.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "moistMonthly"){
            configMoist.data.datasets[0].data = pointMoistMonthly;
            configMoist.data.labels = labelMoistMonthly;
            configMoist.data.datasets[0].label = "Monthly moisture";
            configMoist.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "moistAll"){
            configMoist.data.datasets[0].data = pointMoistLifetime;
            configMoist.data.labels = labelHumidityLifetime;
            configMoist.data.datasets[0].label = "Lifetime moisture";
            configMoist.options.scales.xAxes[0].time.unit = "month";
        }

       //update temperature chart
        if($(this).children().attr("id") == "bsfTempToday"){
            bsfConfigTemp.data.datasets[0].data = bsfTempPointDaily;
            bsfConfigTemp.data.labels = bsfTempDaily;
            bsfConfigTemp.data.datasets[0].label = "Today's temperature";
            bsfConfigTemp.options.scales.xAxes[0].time.unit = "minute";
        }else if($(this).children().attr("id") == "bsfTempWeekly"){
            bsfConfigTemp.data.datasets[0].data = bsfTempPointWeekly;
            bsfConfigTemp.data.labels = bsfTempWeekly;
            bsfConfigTemp.data.datasets[0].label = "Weekly temperature";
            bsfConfigTemp.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "bsfTempMonthly"){
            bsfConfigTemp.data.datasets[0].data = bsfTempPointMonthly;
            bsfConfigTemp.data.labels = bsfTempMonthly;
            bsfConfigTemp.data.datasets[0].label = "Monthly temperature";
            bsfConfigTemp.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "bsfTempAll"){
            bsfConfigTemp.data.datasets[0].data = bsfTempPointLifetime;
            bsfConfigTemp.data.labels = bsfTempLifetime;
            bsfConfigTemp.data.datasets[0].label = "Lifetime temperature";
            bsfConfigTemp.options.scales.xAxes[0].time.unit = "month";
        }

        myChart.update();
        myChart2.update();
        myChart3.update();
        bsfChart1.update();
    });

    $("#chickenVisualization").click(function(){
        $("#chickenChart").show();
        $("#bsfChart").hide();
    })

    $("#bsfVisualization").click(function(){
        $("#chickenChart").hide();
        $("#bsfChart").show();
    })

    $("#bsflVisualization").click(function(){
        $("#chickenChart").hide();
        $("#bsfChart").hide();
    })
})