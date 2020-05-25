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
var bsfChart2;
var bsfConfigHum;
var bsfChartType2 = "line";
var bsfContext2 = document.getElementById("bsfChart2").getContext("2d");

var bsfHumDaily = [];
var bsfHumPointDaily = [];

var bsfHumWeekly = [];
var bsfHumPointWeekly = [];

var bsfHumMonthly = [];
var bsfHumPointMonthly = [];

var bsfHumLifetime = [];
var bsfHumPointLifetime = [];
////////////////////////////////////////////////////

////////////////////////////////////////////////////
var bsfChart3;
var bsfConfigLight;
var bsfChartType3 = "line";
var bsfContext3 = document.getElementById("bsfChart3").getContext("2d");

var bsfLightDaily = [];
var bsfLightPointDaily = [];

var bsfLightWeekly = [];
var bsfLightPointWeekly = [];

var bsfLightMonthly = [];
var bsfLightPointMonthly = [];

var bsfLightLifetime = [];
var bsfLightPointLifetime = [];
////////////////////////////////////////////////////

////////////////////////////////////////////////////
var bsflChart1;
var bsflConfigTemp;
var bsflChartType1 = "line";
var bsflContext1 = document.getElementById("bsflChart1").getContext("2d");

var bsflTempDaily = [];
var bsflTempPointDaily = [];

var bsflTempWeekly = [];
var bsflTempPointWeekly = [];

var bsflTempMonthly = [];
var bsflTempPointMonthly = [];

var bsflTempLifetime = [];
var bsflTempPointLifetime = [];
////////////////////////////////////////////////////

////////////////////////////////////////////////////
var bsflChart2;
var bsflConfigpH;
var bsflChartType2 = "line";
var bsflContext2 = document.getElementById("bsflChart2").getContext("2d");

var bsflpHDaily = [];
var bsflpHPointDaily = [];

var bsflpHWeekly = [];
var bsflpHPointWeekly = [];

var bsflpHMonthly = [];
var bsflpHPointMonthly = [];

var bsflpHLifetime = [];
var bsflpHPointLifetime = [];
////////////////////////////////////////////////////

////////////////////////////////////////////////////
var bsflChart3;
var bsflConfigMoist;
var bsflChartType3 = "line";
var bsflContext3 = document.getElementById("bsflChart3").getContext("2d");

var bsflMoistDaily = [];
var bsflMoistPointDaily = [];

var bsflMoistWeekly = [];
var bsflMoistPointWeekly = [];

var bsflMoistMonthly = [];
var bsflMoistPointMonthly = [];

var bsflMoistLifetime = [];
var bsflMoistPointLifetime = [];
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
                    bsfHumDaily.push(bsfObject[k].timestamp);
                    bsfHumPointDaily.push(bsfObject[k].humidity);
                    bsfLightDaily.push(bsfObject[k].timestamp);
                    bsfLightPointDaily.push(bsfObject[k].light);
                }
            }
    
            if(d >= newDate(-7) && d <= newDate(0)){
                if(bsfObject[k].temperature != undefined || bsfObject[k].temperature != "Null"){
                    bsfTempWeekly.push(bsfObject[k].timestamp);
                    bsfTempPointWeekly.push(bsfObject[k].temperature);
                    bsfHumWeekly.push(bsfObject[k].timestamp);
                    bsfHumPointWeekly.push(bsfObject[k].humidity);
                    bsfLightWeekly.push(bsfObject[k].timestamp);
                    bsfLightPointWeekly.push(bsfObject[k].light);
                }
            }
    
            if(month == todayMonth){
                if(bsfObject[k].temperature != undefined || bsfObject[k].temperature != "Null"){
                    bsfTempMonthly.push(bsfObject[k].timestamp);
                    bsfTempPointMonthly.push(bsfObject[k].temperature);
                    bsfHumMonthly.push(bsfObject[k].timestamp);
                    bsfHumPointMonthly.push(bsfObject[k].humidity);
                    bsfLightMonthly.push(bsfObject[k].timestamp);
                    bsfLightPointMonthly.push(bsfObject[k].light);
                }
            }
            
            if(bsfObject[k].temperature != undefined || bsfObject[k].temperature != "Null"){
                bsfTempLifetime.push(bsfObject[k].timestamp);
                bsfTempPointLifetime.push(bsfObject[k].temperature);
                bsfHumLifetime.push(bsfObject[k].timestamp);
                bsfHumPointLifetime.push(bsfObject[k].humidity);
                bsfLightLifetime.push(bsfObject[k].timestamp);
                bsfLightPointLifetime.push(bsfObject[k].light);
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

    bsfConfigHum = {
        data:{
            labels: bsfHumDaily,
            datasets:[{
                label: "Today's humidity",
                data: bsfHumPointDaily,
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
                        labelString : "Humidity"
                    }
                }]
            }
        }
    }

    bsfConfigLight = {
        data:{
            labels: bsfLightDaily,
            datasets:[{
                label: "Today's Light",
                data: bsfLightPointDaily,
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
                        // beginAtZero: true,
                        // max : 100,
                        // stepValue: 10
                    },
                    scaleLabel : {
                        display : true,
                        labelString : "Light (Lux)"
                    }
                }]
            }
        }
    }
    bsfChart1 = new Chart(bsfContext1,bsfConfigTemp);
    bsfChart2 = new Chart(bsfContext2,bsfConfigHum);
    bsfChart3 = new Chart(bsfContext3,bsfConfigLight);
})

var bsflObject;
var bsflKeys;

bsflref.once("value", snap=>{
    bsflObject = snap.val();
    bsflKeys = Object.keys(bsflObject);

    for(var x = 0; x < bsflKeys.length; ++x){
        var k = bsflKeys[x];

        var d = new Date(bsflObject[k].timestamp);
        var date = d.toLocaleDateString();

        var month = d.getMonth();
        
        if(bsflObject[k].timestamp != undefined){
            if(date == todayDate){
                if(bsflObject[k].temperature != undefined || bsflObject[k].temperature != "Null"){
                    bsflTempDaily.push(bsflObject[k].timestamp);
                    bsflTempPointDaily.push(bsflObject[k].temperature);
                    bsflpHDaily.push(bsflObject[k].timestamp);
                    bsflpHPointDaily.push(bsflObject[k].pH);
                    bsflMoistDaily.push(bsflObject[k].timestamp);
                    bsflMoistPointDaily.push(bsflObject[k].moisture);
                }
            }
    
            if(d >= newDate(-7) && d <= newDate(0)){
                if(bsflObject[k].temperature != undefined || bsflObject[k].temperature != "Null"){
                    bsflTempWeekly.push(bsflObject[k].timestamp);
                    bsflTempPointWeekly.push(bsflObject[k].temperature);
                    bsflpHWeekly.push(bsflObject[k].timestamp);
                    bsflpHPointWeekly.push(bsflObject[k].pH);
                    bsflMoistWeekly.push(bsflObject[k].timestamp);
                    bsflMoistPointWeekly.push(bsflObject[k].moisture);
                }
            }
    
            if(month == todayMonth){
                if(bsflObject[k].temperature != undefined || bsflObject[k].temperature != "Null"){
                    bsflTempMonthly.push(bsflObject[k].timestamp);
                    bsflTempPointMonthly.push(bsflObject[k].temperature);
                    bsflpHMonthly.push(bsflObject[k].timestamp);
                    bsflpHPointMonthly.push(bsflObject[k].pH);
                    bsflMoistMonthly.push(bsflObject[k].timestamp);
                    bsflMoistPointMonthly.push(bsflObject[k].moisture);
                }
            }
            
            if(bsflObject[k].temperature != undefined || bsflObject[k].temperature != "Null"){
                bsflTempLifetime.push(bsflObject[k].timestamp);
                bsflTempPointLifetime.push(bsflObject[k].temperature);
                bsflpHLifetime.push(bsflObject[k].timestamp);
                bsflpHPointLifetime.push(bsflObject[k].pH);
                bsflMoistLifetime.push(bsflObject[k].timestamp);
                bsflMoistPointLifetime.push(bsflObject[k].moisture);
            }
        }
    }

    bsflConfigTemp = {
        data:{
            labels: bsflTempDaily,
            datasets:[{
                label: "Today's temperature",
                data: bsflTempPointDaily,
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

    bsflConfigpH = {
        data:{
            labels: bsflpHDaily,
            datasets:[{
                label: "Today's pH",
                data: bsflpHPointDaily,
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
                        labelString : "pH value"
                    }
                }]
            }
        }
    }

    bsflConfigMoist = {
        data:{
            labels: bsflMoistDaily,
            datasets:[{
                label: "Today's Moisture",
                data: bsflMoistPointDaily,
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
                        labelString : "Moisutre"
                    }
                }]
            }
        }
    }
    bsflChart1 = new Chart(bsflContext1,bsflConfigTemp);
    bsflChart2 = new Chart(bsflContext2,bsflConfigpH);
    bsflChart3 = new Chart(bsflContext3,bsflConfigMoist);
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

    bsfChartType2 = document.getElementById("bsfChartType2").value;
    bsfConfigHum.data.datasets[0].type = bsfChartType2;
    bsfChart2.update();

    bsfChartType3 = document.getElementById("bsfChartType3").value;
    bsfConfigLight.data.datasets[0].type = bsfChartType3;
    bsfChart3.update();

    bsflChartType1 = document.getElementById("bsflChartType1").value;
    bsflConfigTemp.data.datasets[0].type = bsflChartType1;
    bsflChart1.update();

    bsflChartType2 = document.getElementById("bsflChartType2").value;
    bsflConfigpH.data.datasets[0].type = bsflChartType2;
    bsflChart2.update();

    bsflChartType3 = document.getElementById("bsflChartType3").value;
    bsflConfigMoist.data.datasets[0].type = bsflChartType3;
    bsflChart3.update();
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

        //update humidity chart
        if($(this).children().attr("id") == "bsfHumToday"){
            bsfConfigHum.data.datasets[0].data = bsfHumPointDaily;
            bsfConfigHum.data.labels = bsfHumDaily;
            bsfConfigHum.data.datasets[0].label = "Today's humidity";
            bsfConfigHum.options.scales.xAxes[0].time.unit = "minute";
        }else if($(this).children().attr("id") == "bsfHumWeekly"){
            bsfConfigHum.data.datasets[0].data = bsfHumPointWeekly;
            bsfConfigHum.data.labels = bsfHumWeekly;
            bsfConfigHum.data.datasets[0].label = "Weekly humidity";
            bsfConfigHum.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "bsfHumMonthly"){
            bsfConfigHum.data.datasets[0].data = bsfHumPointMonthly;
            bsfConfigHum.data.labels = bsfHumMonthly;
            bsfConfigHum.data.datasets[0].label = "Monthly humidity";
            bsfConfigHum.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "bsfHumAll"){
            bsfConfigHum.data.datasets[0].data = bsfHumPointLifetime;
            bsfConfigHum.data.labels = bsfHumLifetime;
            bsfConfigHum.data.datasets[0].label = "Lifetime humidity";
            bsfConfigHum.options.scales.xAxes[0].time.unit = "month";
        }

        //update moisture chart
        if($(this).children().attr("id") == "bsfLightToday"){
            bsfConfigLight.data.datasets[0].data = bsfLightPointDaily;
            bsfConfigLight.data.labels = bsfLightDaily;
            bsfConfigLight.data.datasets[0].label = "Today's light";
            bsfConfigLight.options.scales.xAxes[0].time.unit = "minute";
        }else if($(this).children().attr("id") == "bsfLightWeekly"){
            bsfConfigLight.data.datasets[0].data = bsfLightPointWeekly;
            bsfConfigLight.data.labels = bsfLightWeekly;
            bsfConfigLight.data.datasets[0].label = "Weekly light";
            bsfConfigLight.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "bsfLightMonthly"){
            bsfConfigLight.data.datasets[0].data = bsfLightPointMonthly;
            bsfConfigLight.data.labels = bsfLightMonthly;
            bsfConfigLight.data.datasets[0].label = "Monthly light";
            bsfConfigLight.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "bsfLightAll"){
            bsfConfigLight.data.datasets[0].data = bsfLightPointLifetime;
            bsfConfigLight.data.labels = bsfLightLifetime;
            bsfConfigLight.data.datasets[0].label = "Lifetime light";
            bsfConfigLight.options.scales.xAxes[0].time.unit = "month";
        }

        //update bsfl temperature chart
        if($(this).children().attr("id") == "bsflTempToday"){
            bsflConfigTemp.data.datasets[0].data = bsflTempPointDaily;
            bsflConfigTemp.data.labels = bsflTempDaily;
            bsflConfigTemp.data.datasets[0].label = "Today's temperature";
            bsflConfigTemp.options.scales.xAxes[0].time.unit = "minute";
        }else if($(this).children().attr("id") == "bsflTempWeekly"){
            bsflConfigTemp.data.datasets[0].data = bsflTempPointWeekly;
            bsflConfigTemp.data.labels = bsflTempWeekly;
            bsflConfigTemp.data.datasets[0].label = "Weekly temperature";
            bsflConfigTemp.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "bsflTempMonthly"){
            bsflConfigTemp.data.datasets[0].data = bsflTempPointMonthly;
            bsflConfigTemp.data.labels = bsflTempMonthly;
            bsflConfigTemp.data.datasets[0].label = "Monthly temperature";
            bsflConfigTemp.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "bsflTempAll"){
            bsflConfigTemp.data.datasets[0].data = bsflTempPointLifetime;
            bsflConfigTemp.data.labels = bsflTempLifetime;
            bsflConfigTemp.data.datasets[0].label = "Lifetime temperature";
            bsflConfigTemp.options.scales.xAxes[0].time.unit = "month";
        }

        //update bsfl ph chart
        if($(this).children().attr("id") == "bsflpHToday"){
            bsflConfigpH.data.datasets[0].data = bsflpHPointDaily;
            bsflConfigpH.data.labels = bsflpHDaily;
            bsflConfigpH.data.datasets[0].label = "Today's pH";
            bsflConfigpH.options.scales.xAxes[0].time.unit = "minute";
        }else if($(this).children().attr("id") == "bsflpHWeekly"){
            bsflConfigpH.data.datasets[0].data = bsflpHPointWeekly;
            bsflConfigpH.data.labels = bsflpHWeekly;
            bsflConfigpH.data.datasets[0].label = "Weekly pH";
            bsflConfigpH.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "bsflpHMonthly"){
            bsflConfigpH.data.datasets[0].data = bsflpHPointMonthly;
            bsflConfigpH.data.labels = bsflpHMonthly;
            bsflConfigpH.data.datasets[0].label = "Monthly pH";
            bsflConfigpH.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "bsflpHAll"){
            bsflConfigpH.data.datasets[0].data = bsflpHPointLifetime;
            bsflConfigpH.data.labels = bsflpHLifetime;
            bsflConfigpH.data.datasets[0].label = "Lifetime pH";
            bsflConfigpH.options.scales.xAxes[0].time.unit = "month";
        }

        //update bsfl moisture chart
        if($(this).children().attr("id") == "bsflMoistToday"){
            bsflConfigMoist.data.datasets[0].data = bsflMoistPointDaily;
            bsflConfigMoist.data.labels = bsflMoistDaily;
            bsflConfigMoist.data.datasets[0].label = "Today's moisture";
            bsflConfigMoist.options.scales.xAxes[0].time.unit = "minute";
        }else if($(this).children().attr("id") == "bsflMoistWeekly"){
            bsflConfigMoist.data.datasets[0].data = bsflMoistPointWeekly;
            bsflConfigMoist.data.labels = bsflMoistWeekly;
            bsflConfigMoist.data.datasets[0].label = "Weekly moisture";
            bsflConfigMoist.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "bsflMoistMonthly"){
            bsflConfigMoist.data.datasets[0].data = bsflMoistPointMonthly;
            bsflConfigMoist.data.labels = bsflMoistMonthly;
            bsflConfigMoist.data.datasets[0].label = "Monthly moisture";
            bsflConfigMoist.options.scales.xAxes[0].time.unit = "day";
        }else if($(this).children().attr("id") == "bsflMoistAll"){
            bsflConfigMoist.data.datasets[0].data = bsflMoistPointLifetime;
            bsflConfigMoist.data.labels = bsflMoistLifetime;
            bsflConfigMoist.data.datasets[0].label = "Lifetime moisture";
            bsflConfigMoist.options.scales.xAxes[0].time.unit = "month";
        }


        myChart.update();
        myChart2.update();
        myChart3.update();
        bsfChart1.update();
        bsfChart2.update();
        bsfChart3.update();
        bsflChart1.update();
        bsflChart2.update();
        bsflChart3.update();
    });

    $("#chickenVisualization").click(function(){
        $("#chickenChart").show();
        $("#bsfChart").hide();
        $("#bsflChart").hide();
    })

    $("#bsfVisualization").click(function(){
        $("#chickenChart").hide();
        $("#bsfChart").show();
        $("#bsflChart").hide();
    })

    $("#bsflVisualization").click(function(){
        $("#chickenChart").hide();
        $("#bsfChart").hide();
        $("#bsflChart").show();
    })
})