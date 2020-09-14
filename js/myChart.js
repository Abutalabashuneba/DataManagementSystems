//Connect to Firebase
var database = firebase.database();
var ref = database.ref("Data"); 

var timeFormat = "MM/DD/YYYY HH:mm";

function newDate(days){
    return moment().add(days,"d").toDate();
}

function newDateString(days){
    return moment().add(days,"d").format(timeFormat);
}

var type = "Chicken";
var areaSelected = "Area1";
// var chartType = "line";
var chart1;
var chart2;
var config1 = {
    type: "line",
    data:{
        datasets:[{
            label: "Today",
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
                id: "yAxis-Temp",
                type: "linear",
                position: "left",
                scaleLabel:{
                    display: true,
                    labelString: "Temperature"
                },
                gridLines:{
                    display: false
                },
                ticks:{
                    beginAtZero: true,
                    max: 100,
                    stepValue: 10
                }
            },
            {
                id: "yAxis-Humidity",
                type: "linear",
                position: "left",
                scaleLabel:{
                    display: true,
                    labelString: "Humidity"
                },
                gridLines:{
                    display: false
                },
                ticks:{
                    beginAtZero: true,
                    max: 100,
                    stepValue: 10
                }
            },
            {
                id: "yAxis-Moisture",
                type: "linear",
                position: "right",
                scaleLabel:{
                    display: true,
                    labelString: "Moisture"
                },
                gridLines:{
                    display: false
                },
                ticks:{
                    beginAtZero: true,
                    max: 100,
                    stepValue: 10
                }
            },
            {
                id: "yAxis-ph",
                type: "linear",
                position: "right",
                scaleLabel:{
                    display: true,
                    labelString: "ph"
                },
                gridLines:{
                    display: false
                },
                ticks:{
                    beginAtZero: true,
                    max: 14,
                    stepValue: 1
                }
            }
            ]
        }
    }
}

var config2 = {
    type : "doughnut",
    data:{
        datasets: [{
            
        }]
    },
    options:{
        responsive: true,
        legend: {
            position: "top"
        }
    }
}

var labelDaily = [];
var labelWeekly = [];
var labelMonthly = [];
var labelAll = [];
var pointTempDaily = [];
var pointTempWeekly = [];
var pointTempMonthly = [];
var pointTempAll = [];
var pointHumidityDaily = [];
var pointHumidityWeekly = [];
var pointHumidityMonthly = [];
var pointHumidityAll = [];
var pointMoistureDaily = [];
var pointMoistureWeekly = [];
var pointMoistureMonthly = [];
var pointMoistureAll = [];
var pointpHDaily = [];
var pointpHWeekly = [];
var pointpHMonthly = [];
var pointpHAll = [];
//
var labelBSFDaily = [];
var labelBSFWeekly = [];
var labelBSFMonthly = [];
var labelBSFAll = [];
var pointTempBSFDaily = [];
var pointTempBSFWeekly = [];
var pointTempBSFMonthly = [];
var pointTempBSFAll = [];
var pointHumidityBSFDaily = [];
var pointHumidityBSFWeekly = [];
var pointHumidityBSFMonthly = [];
var pointHumidityBSFAll = [];
var pointLightBSFDaily = [];
var pointLightBSFWeekly = [];
var pointLightBSFMonthly = [];
var pointLightBSFAll = [];
//
var labelBSFLDaily = [];
var labelBSFLWeekly = [];
var labelBSFLMonthly = [];
var labelBSFLAll = [];
var pointTempBSFLDaily = [];
var pointTempBSFLWeekly = [];
var pointTempBSFLMonthly = [];
var pointTempBSFLAll = [];
var pointMoistureBSFLDaily = [];
var pointMoistureBSFLWeekly = [];
var pointMoistureBSFLMonthly = [];
var pointMoistureBSFLAll = [];
var pointpHBSFLDaily = [];
var pointpHBSFLWeekly = [];
var pointpHBSFLMonthly = [];
var pointpHBSFLAll = [];
//
var chickenAmt;
var chickenAvg;
var chickenSick;
var chickenRunt;
var chickenMort;
var chickenFeed;
var chickenLeft;
//
var bsfEgg;
var bsflLarvae;
//
var areaDrop = document.querySelector(".areaDropdown");
var chickenDrop = document.querySelector("#mixChicken");
var bsfDrop = document.querySelector("#mixBSF");
var bsflDrop = document.querySelector("#mixBSFL");
var context = document.getElementById("myChart1").getContext("2d");
var context2 = document.getElementById("myChart2").getContext("2d");
// var context3 = document.getElementById("myChart3").getContext("2d");
// var context4 = document.getElementById("myChart4").getContext("2d");
var bsfObj;
var bsfKeys;
var bsflObj;
var bsflKeys;
var chickenObj;
var chickenKeys;
var productionObj;
var productionKeys;

let d = new Date();
d.setHours(0,0,0,0);
let dayStart = +d;
d.setHours(23,59,59,999);
let dayEnd = +d;

let week = newDate(-6);
week.setHours(0,0,0,0);
let weekStart = +week;
let weekEnd = new Date().getTime();

let month = newDate(-29);
month.setHours(0,0,0,0);
let monthStart = +month;
let monthEnd = new Date().getTime();

//get JSON object from Firebase
ref.once("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);

    for(var x = 0; x < keys.length; ++x){
        var k = keys[x];
        
        if(k == "BSF"){
            bsfObj = dataObj[k];
        }

        else if(k == "BSFL"){
            bsflObj = dataObj[k];
        }

        else if(k == "Chicken"){
            chickenObj = dataObj[k];
        }

        else if(k == "Production"){
            productionObj = dataObj[k];
        }
    }

    //store the keys into variable
    bsfKeys = Object.keys(bsfObj);
    bsflKeys = Object.keys(bsflObj);
    chickenKeys = Object.keys(chickenObj);
    productionKeys = Object.keys(productionObj);

    drawCharts();
})

function drawCharts(){
    //clear the array for chicken
    labelDaily = [];
    labelWeekly = [];
    labelMonthly = [];
    labelAll = [];
    pointTempDaily = [];
    pointTempWeekly = [];
    pointTempMonthly = [];
    pointTempAll = [];
    pointHumidityDaily = [];
    pointHumidityWeekly = [];
    pointHumidityMonthly = [];
    pointHumidityAll = [];
    pointMoistureDaily = [];
    pointMoistureWeekly = [];
    pointMoistureMonthly = [];
    pointMoistureAll = [];
    pointpHDaily = [];
    pointpHWeekly = [];
    pointpHMonthly = [];
    pointpHAll = [];
    //clear the array for BSF
    labelBSFDaily = [];
    labelBSFWeekly = [];
    labelBSFMonthly = [];
    labelBSFAll = [];
    pointTempBSFDaily = [];
    pointTempBSFWeekly = [];
    pointTempBSFMonthly = [];
    pointTempBSFAll = [];
    pointHumidityBSFDaily = [];
    pointHumidityBSFWeekly = [];
    pointHumidityBSFMonthly = [];
    pointHumidityBSFAll = [];
    pointLightBSFDaily = [];
    pointLightBSFWeekly = [];
    pointLightBSFMonthly = [];
    pointLightBSFAll = [];
    //clear the array for BSFL
    labelBSFLDaily = [];
    labelBSFLWeekly = [];
    labelBSFLMonthly = [];
    labelBSFLAll = [];
    pointTempBSFLDaily = [];
    pointTempBSFLWeekly = [];
    pointTempBSFLMonthly = [];
    pointTempBSFLAll = [];
    pointMoistureBSFLDaily = [];
    pointMoistureBSFLWeekly = [];
    pointMoistureBSFLAll = [];
    pointMoistureBSFLMonthly = [];
    pointpHBSFLWeekly = [];
    pointpHBSFLDaily = [];
    pointpHBSFLAll = [];
    pointpHBSFLMonthly = [];

    //start of adding data into the array
    if(chickenObj[areaSelected] != null){
        for(var x = 0; x < Object.keys(chickenObj[areaSelected]).length; ++x){
        var k = Object.keys(chickenObj[areaSelected])[x];

        if(chickenObj[areaSelected][k].timestamp > dayStart && chickenObj[areaSelected][k].timestamp < dayEnd){
            labelDaily.push(chickenObj[areaSelected][k].timestamp);
            pointTempDaily.push(chickenObj[areaSelected][k].temperature);
            pointHumidityDaily.push(chickenObj[areaSelected][k].humidity);
            pointMoistureDaily.push(chickenObj[areaSelected][k].moisture);
            pointpHDaily.push(chickenObj[areaSelected][k].ph);
        }

        if(chickenObj[areaSelected][k].timestamp > weekStart && chickenObj[areaSelected][k].timestamp < weekEnd){
            labelWeekly.push(chickenObj[areaSelected][k].timestamp);
            pointTempWeekly.push(chickenObj[areaSelected][k].temperature);
            pointHumidityWeekly.push(chickenObj[areaSelected][k].humidity);
            pointMoistureWeekly.push(chickenObj[areaSelected][k].moisture);
            pointpHWeekly.push(chickenObj[areaSelected][k].ph);
        }

        if(chickenObj[areaSelected][k].timestamp > monthStart && chickenObj[areaSelected][k].timestamp < monthEnd){
            labelMonthly.push(chickenObj[areaSelected][k].timestamp);
            pointTempMonthly.push(chickenObj[areaSelected][k].temperature);
            pointHumidityMonthly.push(chickenObj[areaSelected][k].humidity);
            pointMoistureMonthly.push(chickenObj[areaSelected][k].moisture);
            pointpHMonthly.push(chickenObj[areaSelected][k].ph);
        }
        
        labelAll.push(chickenObj[areaSelected][k].timestamp);
        pointTempAll.push(chickenObj[areaSelected][k].temperature);
        pointHumidityAll.push(chickenObj[areaSelected][k].humidity);
        pointMoistureAll.push(chickenObj[areaSelected][k].moisture);
        pointpHAll.push(chickenObj[areaSelected][k].ph);
    }
    }
    //end of adding data into the array

    //start of adding data into the array
    if(bsfObj[areaSelected] != null){
        for(var x = 0; x < Object.keys(bsfObj[areaSelected]).length; ++x){
            var k = Object.keys(bsfObj[areaSelected])[x];
    
            if(bsfObj[areaSelected][k].timestamp > dayStart && bsfObj[areaSelected][k].timestamp < dayEnd){
                labelBSFDaily.push(bsfObj[areaSelected][k].timestamp);
                pointTempBSFDaily.push(bsfObj[areaSelected][k].temperature);
                pointHumidityBSFDaily.push(bsfObj[areaSelected][k].humidity);
                pointLightBSFDaily.push(bsfObj[areaSelected][k].light);
            }
    
            if(bsfObj[areaSelected][k].timestamp > weekStart && bsfObj[areaSelected][k].timestamp < weekEnd){
                labelBSFWeekly.push(bsfObj[areaSelected][k].timestamp);
                pointTempBSFWeekly.push(bsfObj[areaSelected][k].temperature);
                pointHumidityBSFWeekly.push(bsfObj[areaSelected][k].humidity);
                pointLightBSFWeekly.push(bsfObj[areaSelected][k].light);
            }
    
            if(bsfObj[areaSelected][k].timestamp > monthStart && bsfObj[areaSelected][k].timestamp < monthEnd){
                labelBSFMonthly.push(bsfObj[areaSelected][k].timestamp);
                pointTempBSFMonthly.push(bsfObj[areaSelected][k].temperature);
                pointHumidityBSFMonthly.push(bsfObj[areaSelected][k].humidity);
                pointLightBSFMonthly.push(bsfObj[areaSelected][k].light);
            }
    
            labelBSFAll.push(bsfObj[areaSelected][k].timestamp);
            pointTempBSFAll.push(bsfObj[areaSelected][k].temperature);
            pointHumidityBSFAll.push(bsfObj[areaSelected][k].humidity);
            pointLightBSFAll.push(bsfObj[areaSelected][k].light);
        }
    }
    //end of adding data into the array

    //start of adding data into the array
    if(bsflObj[areaSelected] != null){
        for(var x = 0; x < Object.keys(bsflObj[areaSelected]).length; ++x){
            var k = Object.keys(bsflObj[areaSelected])[x];
    
            if(bsflObj[areaSelected][k].timestamp > dayStart && bsflObj[areaSelected][k].timestamp < dayEnd){
                labelBSFLDaily.push(bsflObj[areaSelected][k].timestamp);
                pointTempBSFLDaily.push(bsflObj[areaSelected][k].temperature);
                pointMoistureBSFLDaily.push(bsflObj[areaSelected][k].moisture);
                pointpHBSFLDaily.push(bsflObj[areaSelected][k].ph);
            }
    
            if(bsflObj[areaSelected][k].timestamp > weekStart && bsflObj[areaSelected][k].timestamp < weekEnd){
                labelBSFLWeekly.push(bsflObj[areaSelected][k].timestamp);
                pointTempBSFLWeekly.push(bsflObj[areaSelected][k].temperature);
                pointMoistureBSFLWeekly.push(bsflObj[areaSelected][k].moisture);
                pointpHBSFLWeekly.push(bsflObj[areaSelected][k].ph);
            }
    
            if(bsflObj[areaSelected][k].timestamp > monthStart && bsflObj[areaSelected][k].timestamp < monthEnd){
                labelBSFLMonthly.push(bsflObj[areaSelected][k].timestamp);
                pointTempBSFLMonthly.push(bsflObj[areaSelected][k].temperature);
                pointMoistureBSFLMonthly.push(bsflObj[areaSelected][k].moisture);
                pointpHBSFLMonthly.push(bsflObj[areaSelected][k].ph);
            }
    
            labelBSFLAll.push(bsflObj[areaSelected][k].timestamp);
            pointTempBSFLAll.push(bsflObj[areaSelected][k].temperature);
            pointMoistureBSFLAll.push(bsflObj[areaSelected][k].moisture);
            pointpHBSFLAll.push(bsflObj[areaSelected][k].ph);
        }
    }
    //end of adding data into the array

    //create the area dropdown for chicken
    let html = "";
    if(type == "Chicken"){
        for(var x = 0; x < chickenKeys.length; ++x){
            let optionslist = "";
            if(areaSelected == `${chickenKeys[x]}`){
                optionslist = `
                    <option value="${chickenKeys[x]}" selected>${chickenKeys[x]}</option>
                `;
            }
    
            else{
                optionslist = `
                    <option value="${chickenKeys[x]}" >${chickenKeys[x]}</option>
                `;
            }
            html += optionslist;
        }
        areaDrop.innerHTML = html;

        if(productionObj[type][areaSelected] != null){
            var k = Object.keys(productionObj[type][areaSelected])[Object.keys(productionObj[type][areaSelected]).length - 1];
            chickenAmt = productionObj[type][areaSelected][k].amount;
            chickenAvg = productionObj[type][areaSelected][k].average;
            chickenSick = productionObj[type][areaSelected][k].sick;
            chickenRunt = productionObj[type][areaSelected][k].runt;
            chickenMort = productionObj[type][areaSelected][k].mortality;
            chickenFeed = productionObj[type][areaSelected][k].give;
            chickenLeft = productionObj[type][areaSelected][k].left;
        }
    }

    //create the area dropdown for BSF
    else if(type == "BSF"){
        for(var x = 0; x < bsfKeys.length; ++x){
            let optionslist = "";
            if(areaSelected == `${bsfKeys[x]}`){
                optionslist = `
                    <option value="${bsfKeys[x]}" selected>${bsfKeys[x]}</option>
                `;
            }

            else{
                optionslist = `
                    <option value="${bsfKeys[x]}" >${bsfKeys[x]}</option>
                `;
            }
            html += optionslist;
        }

        areaDrop.innerHTML = html;

        if(productionObj[type][areaSelected] != null){
            var k = Object.keys(productionObj[type][areaSelected])[Object.keys(productionObj[type][areaSelected]).length - 1];
            bsfEgg = productionObj[type][areaSelected][k].eggs;
        }

    }

    //create the area dropdown for BSFL
    else if(type == "BSFL"){
        for(var x = 0; x < bsflKeys.length; ++x){
            let optionslist = "";
            if(areaSelected == `${bsflKeys[x]}`){
                optionslist = `
                    <option value="${bsflKeys[x]}" selected>${bsflKeys[x]}</option>
                `;
            }

            else{
                optionslist = `
                    <option value="${bsflKeys[x]}" >${bsflKeys[x]}</option>
                `;
            }
            html += optionslist;
        }

        areaDrop.innerHTML = html;

        if(productionObj[type][areaSelected] != null){
            var k = Object.keys(productionObj[type][areaSelected])[Object.keys(productionObj[type][areaSelected]).length - 1];
            bsflLarvae = productionObj[type][areaSelected][k].eggs;
        }
    }

    if(!chart1 && !chart2){
        config1.data.datasets.splice(0,config1.data.datasets.length);

        let newDataOne = {
            label: "Chicken Temperature",
            yAxisID: "yAxis-Temp",
            data: pointTempDaily,
            pointRadius: 0,
            fill: false,
            lineTension: 0.5,
            borderWidth: 2,
            borderColor: "rgba(201,134,212,0.7)",
            backgroundColor: "rgba(201,134,212,0.7)",
            pointHoverBorderColor : "rgba(142,77,185,0.9)",
        }

        let newDataTwo = {
            label: "Chicken Humidity",
            yAxisID: "yAxis-Humidity",
            data: pointHumidityDaily,
            pointRadius: 0,
            fill: false,
            lineTension: 0.5,
            borderWidth: 2,
            borderColor: "rgba(160, 227, 226, 0.7)",
            backgroundColor: "rgba(160, 227, 226, 0.7)",
            pointHoverBorderColor : "rgba(160, 227, 226, 0.9)",
        }

        let newDataThree = {
            label: "Chicken Moisture",
            yAxisID: "yAxis-Moisture",
            data: pointMoistureDaily,
            pointRadius: 0,
            fill: false,
            lineTension: 0.5,
            borderWidth: 2,
            borderColor: "rgba(207, 89, 89, 0.7)",
            backgroundColor: "rgba(207, 89, 89, 0.7)",
            pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
        }

        let newDataFour = {
            label: "Chicken ph",
            yAxisID: "yAxis-ph",
            data: pointpHDaily,
            pointRadius: 0,
            fill: false,
            lineTension: 0.5,
            borderWidth: 2,
            borderColor: "rgba(30, 230, 140, 0.7)",
            backgroundColor: "rgba(30, 230, 140, 0.7)",
            pointHoverBorderColor : "rgba(30, 230, 140, 1)",
        }
        config1.data.labels = labelDaily;
        config1.data.datasets.push(newDataOne);
        config1.data.datasets.push(newDataTwo);
        config1.data.datasets.push(newDataThree);
        config1.data.datasets.push(newDataFour);
        config1.options.scales.xAxes[0].time.unit = "minute";
        chart1 = new Chart(context,config1);
        
        config2.data = {
            labels: ["Production","Avg Weight (kg)","Sick","Runt","Mortality","Feed Given (kg)","Feed Leftover (kg)"],
            datasets : [{
                data : [
                    chickenAmt,chickenAvg,chickenSick,chickenRunt,chickenMort,chickenFeed,chickenLeft
                ],
                backgroundColor: [
                    "rgba(255,51,51,0.7)",
                    "rgba(255,153,51,0.7)",
                    "rgba(255,255,51,0.7)",
                    "rgba(255,0,255,0.7)",
                    "rgba(51,255,51,0.7)",
                    "rgba(0,0,255,0.7)",
                    "rgba(51,255,255,0.7)",
                ],
                borderColor:[
                    "rgba(255,51,51,1.0)",
                    "rgba(255,153,51,1.0)",
                    "rgba(255,255,51,1.0)",
                    "rgba(255,0,255,1.0)",
                    "rgba(51,255,51,1.0)",
                    "rgba(0,0,255,1.0)",
                    "rgba(51,255,255,1.0)",
                ],
                borderWidth : 0.3
            }]
        }
        chart2 = new Chart(context2,config2);
    }

    else{
        if(type == "Chicken"){
            config1.data.datasets.splice(0,config1.data.datasets.length);
           
            let newDataOne = {
                label: "Chicken Temperature",
                yAxisID: "yAxis-Temp",
                data: pointTempDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                backgroundColor: "rgba(201,134,212,0.7)",
                pointHoverBorderColor : "rgba(142,77,185,0.9)",
            }
    
            let newDataTwo = {
                label: "Chicken Humidity",
                yAxisID: "yAxis-Humidity",
                data: pointHumidityDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(160, 227, 226, 0.7)",
                backgroundColor: "rgba(160, 227, 226, 0.7)",
                pointHoverBorderColor : "rgba(160, 227, 226, 0.9)",
            }
    
            let newDataThree = {
                label: "Chicken Moisture",
                yAxisID: "yAxis-Moisture",
                data: pointMoistureDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(207, 89, 89, 0.7)",
                backgroundColor: "rgba(207, 89, 89, 0.7)",
                pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
            }
    
            let newDataFour = {
                label: "Chicken ph",
                yAxisID: "yAxis-ph",
                data: pointpHDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(30, 230, 140, 0.7)",
                backgroundColor: "rgba(30, 230, 140, 0.7)",
                pointHoverBorderColor : "rgba(30, 230, 140, 1)",
            }
            config1.data.labels = labelDaily;
            config1.data.datasets.push(newDataOne);
            config1.data.datasets.push(newDataTwo);
            config1.data.datasets.push(newDataThree);
            config1.data.datasets.push(newDataFour);
            config1.options.scales.xAxes[0].time.unit = "minute";

            config2.data = {
                labels: ["Production","Avg Weight (kg)","Sick","Runt","Mortality","Feed Given (kg)","Feed Leftover (kg)"],
                datasets : [{
                    data : [
                        chickenAmt,chickenAvg,chickenSick,chickenRunt,chickenMort,chickenFeed,chickenLeft
                    ],
                    backgroundColor: [
                        "rgba(255,51,51,0.7)",
                        "rgba(255,153,51,0.7)",
                        "rgba(255,255,51,0.7)",
                        "rgba(255,0,255,0.7)",
                        "rgba(51,255,51,0.7)",
                        "rgba(0,0,255,0.7)",
                        "rgba(51,255,255,0.7)",
                    ],
                    borderColor:[
                        "rgba(255,51,51,1.0)",
                        "rgba(255,153,51,1.0)",
                        "rgba(255,255,51,1.0)",
                        "rgba(255,0,255,1.0)",
                        "rgba(51,255,51,1.0)",
                        "rgba(0,0,255,1.0)",
                        "rgba(51,255,255,1.0)",
                    ],
                    borderWidth : 0.3
                }]
            }
        }

        else if(type == "BSF"){
            config1.data.datasets.splice(0,config1.data.datasets.length);
            config2.data.datasets.splice(1,config2.data.datasets.length);
    
            let newDataBSFOne = {
                label: "BSF Temperature",
                yAxisID: "yAxis-Temp",
                data: pointTempBSFDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                backgroundColor: "rgba(201,134,212,0.7)",
                pointHoverBorderColor : "rgba(142,77,185,0.9)",
            }

            let newDataBSFTwo = {
                label: "BSF Humidity",
                yAxisID: "yAxis-Humidity",
                data: pointHumidityBSFDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(160, 227, 226, 0.7)",
                backgroundColor: "rgba(160, 227, 226, 0.7)",
                pointHoverBorderColor : "rgba(160, 227, 226, 0.9)",
            }

            let newDataBSFThree = {
                label: "BSF Light",
                yAxisID: "yAxis-Light",
                data: pointLightBSFDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(207, 89, 89, 0.7)",
                backgroundColor: "rgba(207, 89, 89, 0.7)",
                pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
            }

            config1.data.labels = labelBSFDaily;
            config1.data.datasets.push(newDataBSFOne);
            config1.data.datasets.push(newDataBSFTwo);
            config1.data.datasets.push(newDataBSFThree);
            config1.options.scales.xAxes[0].time.unit = "minute";

            config2.data = {
                labels: ["Eggs Produced"],
                datasets : [{
                    data : [
                        bsfEgg
                    ],
                    backgroundColor: [
                        "rgba(255,51,51,0.7)",
                    ],
                    borderColor:[
                        "rgba(255,51,51,1.0)",
                    ],
                    borderWidth : 0.3
                }]
            }
        }

        else if(type == "BSFL"){
            config1.data.datasets.splice(0,config1.data.datasets.length);
            
            let newDataBSFLOne = {
                label: "BSFL Temperature",
                yAxisID: "yAxis-Temp",
                data: pointTempBSFLDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(201,134,212,0.7)",
                backgroundColor: "rgba(201,134,212,0.7)",
                pointHoverBorderColor : "rgba(142,77,185,0.9)",
            }

            let newDataBSFLTwo = {
                label: "BSFL Moisture",
                yAxisID: "yAxis-Moisture",
                data: pointMoistureBSFLDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(160, 227, 226, 0.7)",
                backgroundColor: "rgba(160, 227, 226, 0.7)",
                pointHoverBorderColor : "rgba(160, 227, 226, 0.9)",
            }

            let newDataBSFLThree = {
                label: "BSFL ph",
                yAxisID: "yAxis-ph",
                data: pointpHBSFLDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(207, 89, 89, 0.7)",
                backgroundColor: "rgba(207, 89, 89, 0.7)",
                pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
            }

            config1.data.labels = labelDaily;
            config1.data.datasets.push(newDataBSFLOne);
            config1.data.datasets.push(newDataBSFLTwo);
            config1.data.datasets.push(newDataBSFLThree);
            config1.options.scales.xAxes[0].time.unit = "minute";

            config2.data = {
                labels: ["Larvae Produced"],
                datasets : [{
                    data : [
                        bsflLarvae
                    ],
                    backgroundColor: [
                        "rgba(255,51,51,0.7)",
                    ],
                    borderColor:[
                        "rgba(255,51,51,1.0)",
                    ],
                    borderWidth : 0.3
                }]
            }

        
        }
        chart1.update();
        chart2.update();
    }
}

function drawDaily(context,envData){
    if(type == "Chicken"){
        if(envData == "temperature"){
            config1.data.labels = labelDaily;
            config1.data.datasets[0].data = pointTempDaily;
            config1.data.datasets[1].data = pointHumidityDaily;
            config1.data.datasets[2].data = pointMoistureDaily;
            config1.data.datasets[3].data = pointpHDaily;
            config1.options.scales.xAxes[0].time.unit = "minute";
        }
    }

    else if(type == "BSF"){
        if(envData == "temperature"){
            config1.data.labels = labelBSFDaily;
            config1.data.datasets[0].data = pointTempBSFDaily;
            config1.data.datasets[1].data = pointHumidityBSFDaily;
            config1.data.datasets[2].data = pointLightBSFDaily;
            config1.options.scales.xAxes[0].time.unit = "minute";
        }
    }

    else if(type == "BSFL"){
        if(envData == "temperature"){
            config1.data.labels = labelBSFLDaily;
            config1.data.datasets[0].data = pointTempBSFLDaily;
            config1.data.datasets[1].data = pointMoistureBSFLDaily;
            config1.data.datasets[2].data = pointpHBSFLDaily;
            config1.options.scales.xAxes[0].time.unit = "minute";
        }
    }
    context.update();
}

function drawWeekly(context,envData){
    if(type == "Chicken"){
        if(envData == "temperature"){
            config1.data.labels = labelWeekly;
            config1.data.datasets[0].data = pointTempWeekly;
            config1.data.datasets[1].data = pointHumidityWeekly;
            config1.data.datasets[2].data = pointMoistureWeekly;
            config1.data.datasets[3].data = pointpHWeekly;
            config1.options.scales.xAxes[0].time.unit = "day";
        }
    }

    else if(type == "BSF"){
        if(envData == "temperature"){
            config1.data.labels = labelBSFWeekly;
            config1.data.datasets[0].data = pointTempBSFWeekly;
            config1.data.datasets[1].data = pointHumidityBSFWeekly;
            config1.data.datasets[2].data = pointLightBSFWeekly;
            config1.options.scales.xAxes[0].time.unit = "day";
        }
    }

    else if(type == "BSFL"){
        if(envData == "temperature"){
            config1.data.labels = labelBSFLWeekly;
            config1.data.datasets[0].data = pointTempBSFLWeekly;
            config1.data.datasets[1].data = pointMoistureBSFLWeekly;
            config1.data.datasets[2].data = pointpHBSFLWeekly;
            config1.options.scales.xAxes[0].time.unit = "day";
        }
    }
    context.update();
}

function drawMonthly(context,envData){
    if(type == "Chicken"){
        if(envData == "temperature"){
            config1.data.labels = labelMonthly;
            config1.data.datasets[0].data = pointTempMonthly;
            config1.data.datasets[1].data = pointHumidityMonthly;
            config1.data.datasets[2].data = pointMoistureMonthly;
            config1.data.datasets[3].data = pointpHMonthly;
            config1.options.scales.xAxes[0].time.unit = "day";
        }
    }

    else if(type == "BSF"){
        if(envData == "temperature"){
            config1.data.labels = labelBSFMonthly;
            config1.data.datasets[0].data = pointTempBSFMonthly;
            config1.data.datasets[1].data = pointHumidityBSFMonthly;
            config1.data.datasets[2].data = pointLightBSFMonthly;
            config1.options.scales.xAxes[0].time.unit = "day";
        }
    }

    else if(type == "BSFL"){
        if(envData == "temperature"){
            config1.data.labels = labelBSFLMonthly;
            config1.data.datasets[0].data = pointTempBSFLMonthly;
            config1.data.datasets[1].data = pointMoistureBSFLMonthly;
            config1.data.datasets[2].data = pointpHBSFLMonthly;
            config1.options.scales.xAxes[0].time.unit = "day";
        }
    }
    context.update();
}

function drawLifetime(context,envData){
    if(type == "Chicken"){
        if(envData == "temperature"){
            config1.data.labels = labelAll;
            config1.data.datasets[0].data = pointTempAll;
            config1.data.datasets[1].data = pointHumidityAll;
            config1.data.datasets[2].data = pointMoistureAll;
            config1.data.datasets[3].data = pointpHAll;
            config1.options.scales.xAxes[0].time.unit = "month";
        }
    }

    else if(type == "BSF"){
        if(envData == "temperature"){
            config1.data.labels = labelBSFAll;
            config1.data.datasets[0].data = pointTempBSFAll;
            config1.data.datasets[1].data = pointHumidityBSFAll;
            config1.data.datasets[2].data = pointLightBSFAll;
            config1.options.scales.xAxes[0].time.unit = "month";
        }
    }

    else if(type == "BSFL"){
        if(envData == "temperature"){
            config1.data.labels = labelBSFLAll;
            config1.data.datasets[0].data = pointTempBSFLAll;
            config1.data.datasets[1].data = pointMoistureBSFLAll;
            config1.data.datasets[2].data = pointpHBSFLAll;
            config1.options.scales.xAxes[0].time.unit = "month";
        }
    }
    context.update();
}

$("#typePage li").click(function(){
    if($(this).children().attr("id") == "chickenVisualization"){
        areaSelected = "Area1";
        type = "Chicken";
        document.getElementById("dropdown").style.display = "block";

        config1.options.scales.yAxes = [{
            id: "yAxis-Temp",
            type: "linear",
            position: "left",
            scaleLabel:{
                display: true,
                labelString: "Temperature"
            },
            gridLines:{
              display: false  
            },
            ticks:{
                beginAtZero: true,
                max: 100,
                stepValue: 10
            }
        },
        {
            id: "yAxis-Humidity",
            type: "linear",
            position: "left",
            scaleLabel:{
                display: true,
                labelString: "Humidity"
            },
            gridLines:{
              display: false  
            },
            ticks:{
                beginAtZero: true,
                max: 100,
                stepValue: 10
            }
        },
        {
            id: "yAxis-Moisture",
            type: "linear",
            position: "right",
            scaleLabel:{
                display: true,
                labelString: "Moisture"
            },
            gridLines:{
              display: false  
            },
            ticks:{
                beginAtZero: true,
                max: 100,
                stepValue: 1000
            }
        },
        {
            id: "yAxis-ph",
            type: "linear",
            position: "right",
            scaleLabel:{
                display: true,
                labelString: "ph"
            },
            gridLines:{
              display: false  
            },
            ticks:{
                beginAtZero: true,
                max: 14,
                stepValue: 1
            }
        }];
        drawCharts();
    }

    else if($(this).children().attr("id") == "bsfVisualization"){
        areaSelected = "Area1";
        type = "BSF";
        document.getElementById("dropdown").style.display = "block";
    
        config1.options.scales.yAxes = [{
            id: "yAxis-Temp",
            type: "linear",
            position: "left",
            scaleLabel:{
                display: true,
                labelString: "Temperature"
            },
            gridLines:{
              display: false  
            },
            ticks:{
                beginAtZero: true,
                max: 100,
                stepValue: 10
            }
        },
        {
            id: "yAxis-Humidity",
            type: "linear",
            position: "left",
            scaleLabel:{
                display: true,
                labelString: "Humidity"
            },
            gridLines:{
              display: false  
            },
            ticks:{
                beginAtZero: true,
                max: 100,
                stepValue: 10
            }
        },
        {
            id: "yAxis-Light",
            type: "linear",
            position: "right",
            scaleLabel:{
                display: true,
                labelString: "Light (Lux)"
            },
            gridLines:{
              display: false  
            },
            ticks:{
                beginAtZero: true,
                max: 100000,
                min: 1000,
                stepValue: 1000
            }
        }];
        drawCharts();
    }

    else if($(this).children().attr("id") == "bsflVisualization"){
        areaSelected = "Area1";
        type = "BSFL";
        document.getElementById("dropdown").style.display = "block";

        config1.options.scales.yAxes = [{
            id: "yAxis-Temp",
            type: "linear",
            position: "left",
            scaleLabel:{
                display: true,
                labelString: "Temperature"
            },
            gridLines:{
              display: false  
            },
            ticks:{
                beginAtZero: true,
                max: 100,
                stepValue: 10
            }
        },
        {
            id: "yAxis-Moisture",
            type: "linear",
            position: "left",
            scaleLabel:{
                display: true,
                labelString: "Moisture"
            },
            gridLines:{
              display: false  
            },
            ticks:{
                beginAtZero: true,
                max: 100,
                stepValue: 10
            }
        },
        {
            id: "yAxis-ph",
            type: "linear",
            position: "right",
            scaleLabel:{
                display: true,
                labelString: "ph"
            },
            gridLines:{
              display: false  
            },
            ticks:{
                beginAtZero: true,
                max: 14,
                stepValue: 1
            }
        }];

        drawCharts();
    }

    $(".paginationBtn li").parent().find( 'li.page-item.active' ).removeClass( 'active' );
    $(".tempPage li").first().addClass("page-item active");
    $(".humPage li").first().addClass("page-item active");
    $(".moistPage li").first().addClass("page-item active");
    $(".phPage li").first().addClass("page-item active");
})

$(".tempPage li").click(function(){
    if($(this).children().attr("id") == "tempToday"){
        drawDaily(chart1,"temperature");
    }

    else if($(this).children().attr("id") == "tempWeekly"){
        drawWeekly(chart1,"temperature");
    }

    else if($(this).children().attr("id") == "tempMonthly"){
        drawMonthly(chart1,"temperature");
    }

    else if($(this).children().attr("id") == "tempAll"){
        drawLifetime(chart1,"temperature");
    }
})

function onAreaChange(){
    areaSelected = document.getElementById("dropdown").value;
    $(".card-footer .paginationBtn li").parent().find( 'li.page-item.active' ).removeClass( 'active' );
    $(".tempPage li").first().addClass("page-item active");
    drawCharts();
}


