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

var allChickenTempLabel = [];
var allChickenTempPoint = [];

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

var allChickenHumLabel = [];
var allChickenHumPoint = [];

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

var allChickenMoistLabel = [];
var allChickenMoistPoint = [];

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

var allBSFTempLabel = [];
var allBSFTempPoint = [];

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

var allBSFHumLabel = [];
var allBSFHumPoint = [];

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

var allBSFLightLabel = [];
var allBSFLightPoint = [];

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

var allBSFLTempLabel = []
var allBSFLTempPoint = []

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

var allBSFLpHLabel = []
var allBSFLoHPoint = []

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

var allBSFLMoistLabel = []
var allBSFLMoistPoint = []

var bsflMoistDaily = [];
var bsflMoistPointDaily = [];

var bsflMoistWeekly = [];
var bsflMoistPointWeekly = [];

var bsflMoistMonthly = [];
var bsflMoistPointMonthly = [];

var bsflMoistLifetime = [];
var bsflMoistPointLifetime = [];
////////////////////////////////////////////////////

ref.once("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);

    var bsfObj;
    var bsflObj;
    var chickenObj;
    var productionObj;

    var bsfKeys;
    var bsflKeys;
    var chickenKeys;
    var productionKeys;

    var allObj = [];
    var allKeys = [];
 
    //push object into an array
    for(var x = 0; x < keys.length; ++x){
        var k = keys[x];

        allObj.push(dataObj[k]);
        allKeys.push(Object.keys(allObj[x]));
    }

    
    bsfObj = allObj[0];
    bsfKeys = Object.keys(bsfObj);
    bsfData = [];

    bsflObj = allObj[1];
    bsflKeys = Object.keys(bsflObj);
    bsflData = [];

    chickenObj = allObj[2];
    chickenKeys = Object.keys(chickenObj);
    chickenData = [];

    productionObj = allObj[3];
    productionKeys = Object.keys(productionObj);
    productionData = [];

    for(var x = 0; x < bsfKeys.length; ++x){
        var keys = Object.keys(bsfObj[bsfKeys[x]]);
        var tempArr = [];
        for (var y = 0; y < keys.length; ++y){
            // console.log(bsfObj[bsfKeys[x]][keys[y]]);
            tempArr.push(bsfObj[bsfKeys[x]][keys[y]]);
        }
        // console.log("Break");
        bsfData.push(tempArr);
    }

    for(var x = 0; x < bsflKeys.length; ++x){
        var keys = Object.keys(bsflObj[bsflKeys[x]]);
        var tempArr = [];
        for (var y = 0; y < keys.length; ++y){
            // console.log(bsflObj[bsflKeys[x]][keys[y]]);
            tempArr.push(bsflObj[bsflKeys[x]][keys[y]]);
        }
        bsflData.push(tempArr);
    }

    for(var x = 0; x < chickenKeys.length; ++x){
        var keys = Object.keys(chickenObj[chickenKeys[x]]);
        var tempArr = [];
        for (var y = 0; y < keys.length; ++y){
            // console.log(chickenObj[chickenKeys[x]][keys[y]]);
            tempArr.push(chickenObj[chickenKeys[x]][keys[y]]);
        }
        chickenData.push(tempArr);
    }

    for(var x = 0; x < productionKeys.length; ++x){
        var keys = Object.keys(productionObj[productionKeys[x]]);
        var tempArr = [];
        for (var y = 0; y < keys.length; ++y){
            // console.log(productionObj[productionKeys[x]][keys[y]]);
            tempArr.push(productionObj[productionKeys[x]][keys[y]]);
        }
        productionData.push(tempArr);
    }

    //
    for(var x = 0; x < chickenData.length; ++x){
        var tempTempPoint = [];
        var tempTempLabel = [];
        var tempHumPoint = [];
        var tempHumLabel = [];
        var tempMoistPoint = [];
        var tempMoistLabel = [];
        for(var y = 0; y < chickenData[x].length; y++){
            tempTempLabel.push(chickenData[x][y].timestamp);
            tempTempPoint.push(chickenData[x][y].temperature);
            tempHumLabel.push(chickenData[x][y].timestamp);
            tempHumPoint.push(chickenData[x][y].humidity);
            tempMoistLabel.push(chickenData[x][y].timestamp);
            tempMoistPoint.push(chickenData[x][y].moisture);
        }
    
        allChickenTempLabel.push(tempTempLabel);
        allChickenTempPoint.push(tempTempPoint);
        allChickenHumLabel.push(tempHumLabel);
        allChickenHumPoint.push(tempHumPoint);
        allChickenMoistLabel.push(tempMoistLabel);
        allChickenMoistPoint.push(tempMoistPoint);
    }

    for(var x = 0; x < bsfData.length; ++x){
        var tempTempPoint = [];
        var tempTempLabel = [];
        var tempHumPoint = [];
        var tempHumLabel = [];
        var tempLightPoint = [];
        var tempLightLabel = [];
        for(var y = 0; y < bsfData[x].length; y++){
            tempTempLabel.push(bsfData[x][y].timestamp);
            tempTempPoint.push(bsfData[x][y].temperature);
            tempHumLabel.push(bsfData[x][y].timestamp);
            tempHumPoint.push(bsfData[x][y].humidity);
            tempLightLabel.push(bsfData[x][y].timestamp);
            tempLightPoint.push(bsfData[x][y].light);
        }
    
        allBSFTempLabel.push(tempTempLabel);
        allBSFTempPoint.push(tempTempPoint);
        allBSFHumLabel.push(tempHumLabel);
        allBSFHumPoint.push(tempHumPoint);
        allBSFLightLabel.push(tempLightLabel);
        allBSFLightPoint.push(tempLightPoint);
    }

    for(var x = 0; x < bsflData.length; ++x){
        var tempTempPoint = [];
        var tempTempLabel = [];
        var temppHPoint = [];
        var temppHLabel = [];
        var tempMoistPoint = [];
        var tempMoistLabel = [];
        for(var y = 0; y < bsflData[x].length; y++){
            tempTempLabel.push(bsflData[x][y].timestamp);
            tempTempPoint.push(bsflData[x][y].temperature);
            temppHLabel.push(bsflData[x][y].timestamp);
            temppHPoint.push(bsflData[x][y].pH);
            tempMoistLabel.push(bsflData[x][y].timestamp);
            tempMoistPoint.push(bsflData[x][y].moisture);
        }
    
        allBSFLTempLabel.push(tempTempLabel);
        allBSFLTempPoint.push(tempTempPoint);
        allBSFLpHLabel.push(temppHLabel);
        allBSFLoHPoint.push(temppHPoint);
        allBSFLMoistLabel.push(tempMoistLabel);
        allBSFLMoistPoint.push(tempMoistPoint);
    }

    for(var x = 0; x < allChickenTempPoint.length; ++x){
        for(var y = 0; y < allChickenTempPoint[x].length; ++y){
            var d = new Date(allChickenTempLabel[x][y]);
            var date = d.toLocaleDateString();
            var month = d.getMonth();
            if(x == 0){ //to be changed
                if(date == todayDate){
                    labelTempDaily.push(allChickenTempLabel[x][y]);
                    pointTempDaily.push(allChickenTempPoint[x][y]);
                    labelHumidityDaily.push(allChickenHumLabel[x][y]);
                    pointHumidityDaily.push(allChickenHumPoint[x][y]);
                    labelMoistDaily.push(allChickenMoistLabel[x][y]);
                    pointMoistDaily.push(allChickenMoistPoint[x][y]);
                }

                if(d >= newDate(-7) && d <= newDate(0)){
                    labelTempWeekly.push(allChickenTempLabel[x][y]);
                    pointTempWeekly.push(allChickenTempPoint[x][y]);
                    labelHumidityWeekly.push(allChickenHumLabel[x][y]);
                    pointHumidityWeekly.push(allChickenHumPoint[x][y]);
                    labelMoistWeekly.push(allChickenMoistLabel[x][y]);
                    pointMoistWeekly.push(allChickenMoistPoint[x][y]);
                }

                if(month == todayMonth){
                    labelTempMonthly.push(allChickenTempLabel[x][y]);
                    pointTempMonthly.push(allChickenTempPoint[x][y]);
                    labelHumidityMonthly.push(allChickenHumLabel[x][y]);
                    pointHumidityMonthly.push(allChickenHumPoint[x][y]);
                    labelMoistMonthly.push(allChickenMoistLabel[x][y]);
                    pointMoistMonthly.push(allChickenMoistPoint[x][y]);
                }

                labelTempLifetime.push(allChickenTempLabel[x][y]);
                pointTempLifetime.push(allChickenTempPoint[x][y]);
                labelHumidityLifetime.push(allChickenHumLabel[x][y]);
                pointHumidityLifetime.push(allChickenHumPoint[x][y]);
                labelMoistLifetime.push(allChickenMoistLabel[x][y]);
                pointMoistLifetime.push(allChickenMoistPoint[x][y]);
            }
        }
    }

    for(var x = 0; x < allBSFTempPoint.length; ++x){
        for(var y = 0; y < allBSFTempPoint[x].length; ++y){
            var d = new Date(allBSFTempLabel[x][y]);
            var date = d.toLocaleDateString();
            var month = d.getMonth();
            if(x == 0){ //to be changed
                if(date == todayDate){
                    bsfTempDaily.push(allBSFTempLabel[x][y]);
                    bsfTempPointDaily.push(allBSFTempPoint[x][y]);
                    bsfHumDaily.push(allBSFHumLabel[x][y]);
                    bsfHumPointDaily.push(allBSFHumPoint[x][y]);
                    bsfLightDaily.push(allBSFLightLabel[x][y]);
                    bsfLightPointDaily.push(allBSFLightPoint[x][y]);
                }

                if(d >= newDate(-7) && d <= newDate(0)){
                    bsfTempWeekly.push(allBSFTempLabel[x][y]);
                    bsfTempPointWeekly.push(allBSFTempPoint[x][y]);
                    bsfHumWeekly.push(allBSFHumLabel[x][y]);
                    bsfHumPointWeekly.push(allBSFHumPoint[x][y]);
                    bsfLightWeekly.push(allBSFLightLabel[x][y]);
                    bsfLightPointWeekly.push(allBSFLightPoint[x][y]);
                }

                if(month == todayMonth){
                    bsfTempMonthly.push(allBSFTempLabel[x][y]);
                    bsfTempPointMonthly.push(allBSFTempPoint[x][y]);
                    bsfHumMonthly.push(allBSFHumLabel[x][y]);
                    bsfHumPointMonthly.push(allBSFHumPoint[x][y]);
                    bsfLightMonthly.push(allBSFLightLabel[x][y]);
                    bsfLightPointMonthly.push(allBSFLightPoint[x][y]);
                }

                bsfTempLifetime.push(allBSFTempLabel[x][y]);
                bsfTempPointLifetime.push(allBSFTempPoint[x][y]);
                bsfHumLifetime.push(allBSFHumLabel[x][y]);
                bsfHumPointLifetime.push(allBSFHumPoint[x][y]);
                bsfLightLifetime.push(allBSFLightLabel[x][y]);
                bsfLightPointLifetime.push(allBSFLightPoint[x][y]);
            }
        }
    }

    for(var x = 0; x < allBSFLTempPoint.length; ++x){
        for(var y = 0; y < allBSFLTempPoint[x].length; ++y){
            var d = new Date(allBSFLTempLabel[x][y]);
            var date = d.toLocaleDateString();
            var month = d.getMonth();
            if(x == 0){ //to be changed
                if(date == todayDate){
                    bsflTempDaily.push(allBSFLTempLabel[x][y]);
                    bsflTempPointDaily.push(allBSFLTempPoint[x][y]);
                    bsflpHDaily.push(allBSFLpHLabel[x][y]);
                    bsflpHPointDaily.push(allBSFLoHPoint[x][y]);
                    bsflMoistDaily.push(allBSFLMoistLabel[x][y]);
                    bsflMoistPointDaily.push(allBSFLMoistPoint[x][y]);
                }

                if(d >= newDate(-7) && d <= newDate(0)){
                    bsflTempWeekly.push(allBSFLTempLabel[x][y]);
                    bsflTempPointWeekly.push(allBSFLTempPoint[x][y]);
                    bsflpHWeekly.push(allBSFLpHLabel[x][y]);
                    bsflpHPointWeekly.push(allBSFLoHPoint[x][y]);
                    bsflMoistWeekly.push(allBSFLMoistLabel[x][y]);
                    bsflMoistPointWeekly.push(allBSFLMoistPoint[x][y]);
                }

                if(month == todayMonth){
                    bsflTempMonthly.push(allBSFLTempLabel[x][y]);
                    bsflTempPointMonthly.push(allBSFLTempPoint[x][y]);
                    bsflpHMonthly.push(allBSFLpHLabel[x][y]);
                    bsflpHPointMonthly.push(allBSFLoHPoint[x][y]);
                    bsflMoistMonthly.push(allBSFLMoistLabel[x][y]);
                    bsflMoistPointMonthly.push(allBSFLMoistPoint[x][y]);
                }

                bsflTempLifetime.push(allBSFLTempLabel[x][y]);
                bsflTempPointLifetime.push(allBSFLTempPoint[x][y]);
                bsflpHLifetime.push(allBSFLpHLabel[x][y]);
                bsflpHPointLifetime.push(allBSFLoHPoint[x][y]);
                bsflMoistLifetime.push(allBSFLMoistLabel[x][y]);
                bsflMoistPointLifetime.push(allBSFLMoistPoint[x][y]);
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
    
    myChart = new Chart(context,configTemp);
    myChart2 = new Chart(context2,configHum);
    myChart3 = new Chart(context3,configMoist);
    bsfChart1 = new Chart(bsfContext1,bsfConfigTemp);
    bsfChart2 = new Chart(bsfContext2,bsfConfigHum);
    bsfChart3 = new Chart(bsfContext3,bsfConfigLight);
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