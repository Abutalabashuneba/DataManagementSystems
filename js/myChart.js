var database = firebase.database();
var ref = database.ref("Data"); 

var timeFormat = "MM/DD/YYYY HH:mm";

function newDate(days){
    return moment().add(days,"d").toDate();
}

function newDateString(days){
    return moment().add(days,"d").format(timeFormat);
}

var range = $(".tempPage").find("li.page-item.active").children().attr("id");

var type = "Chicken";
var areaSelected = "Area1";
var chartType = "line";
var chart1;
var chart2;
var chart3;
var chart4;
var config1 = {
    type: "line",
    data:{
        datasets:[{
            type: chartType,
            label: "Today temperature",
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
var config2 = {
    type: "line",
    data:{
        datasets:[{
            type: chartType,
            label: "Today humidity",
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
var config3 = {
    type: "line",
    data:{
        datasets:[{
            type: chartType,
            label: "Today moisture",
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
                    labelString : "Moisture"
                }
            }]
        }
    }
}
var config4 = {
    type: "line",
    data:{
        datasets:[{
            type: chartType,
            label: "Today pH",
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
                    labelString : "pH"
                }
            }]
        }
    }
}
var configMix = {
    type: "line",
    data:{
        // labels: labelTempDaily,
        datasets:[{
            label: "Chicken Temperature",
            // data: pointTempDaily,
            pointRadius: 0,
            fill: false,
            lineTension: 0.5,
            borderWidth: 2,
            borderColor: "rgba(201,134,212,0.7)",
            backgroundColor: "rgba(201,134,212,0.7)",
            pointHoverBorderColor : "rgba(142,77,185,0.9)",
        },{
            label: "Chicken Humidity",
            // data: pointHumidityDaily,
            pointRadius: 0,
            fill: false,
            lineTension: 0.5,
            borderWidth: 2,
            borderColor: "rgba(160, 227, 226, 0.7)",
            backgroundColor: "rgba(160, 227, 226, 0.7)",
            pointHoverBorderColor : "rgba(160, 227, 226, 0.9)",
        },{
            label: "Chicken Moisture",
            // data: pointMoistDaily,
            pointRadius: 0,
            fill: false,
            lineTension: 0.5,
            borderWidth: 2,
            borderColor: "rgba(207, 89, 89, 0.7)",
            backgroundColor: "rgba(207, 89, 89, 0.7)",
            pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
        },
        {
            label: "Chicken ph",
            pointRadius: 0,
            fill: false,
            lineTension: 0.5,
            borderWidth: 2,
            borderColor: "rgba(207, 89, 89, 0.7)",
            backgroundColor: "rgba(207, 89, 89, 0.7)",
            pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
        }]
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
var areaDrop = document.querySelector(".areaDropdown");
var context = document.getElementById("myChart1").getContext("2d");
var context2 = document.getElementById("myChart2").getContext("2d");
var context3 = document.getElementById("myChart3").getContext("2d");
var context4 = document.getElementById("myChart4").getContext("2d");
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

    bsfKeys = Object.keys(bsfObj);
    bsflKeys = Object.keys(bsflObj);
    chickenKeys = Object.keys(chickenObj);
    productionKeys = Object.keys(productionObj);

    drawCharts();
})

function drawCharts(){
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
    //
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
    //
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
    //

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
    }

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
    }

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
    }

    if(!chart1 && !chart2 && !chart3 && !chart4){
        config1.data.labels = labelDaily;
        config1.data.datasets[0].data = pointTempDaily;
        chart1 = new Chart(context,config1);

        config2.data.labels = labelDaily;
        config2.data.datasets[0].data = pointHumidityDaily;
        chart2 = new Chart(context2,config2);

        config3.data.labels = labelDaily;
        config3.data.datasets[0].data = pointMoistureDaily;
        chart3 = new Chart(context3,config3);

        config4.data.labels = labelDaily;
        config4.data.datasets[0].data = pointpHDaily;
        chart4 = new Chart(context4,config4);
    }

    else{
        if(type == "Chicken"){
            config1.data.datasets.splice(1,config1.data.datasets.length);
            config2.data.datasets.splice(1,config2.data.datasets.length);
            config3.data.datasets.splice(1,config3.data.datasets.length);
            config4.data.datasets.splice(1,config4.data.datasets.length);

            config1.data.labels = labelDaily;
            config1.data.datasets[0].data = pointTempDaily;
            config1.options.scales.xAxes[0].time.unit = "minute";

            config2.data.labels = labelDaily;
            config2.data.datasets[0].data = pointHumidityDaily;
            config2.options.scales.xAxes[0].time.unit = "minute";

            config3.data.labels = labelDaily;
            config3.data.datasets[0].data = pointMoistureDaily;
            config3.options.scales.xAxes[0].time.unit = "minute";

            config4.data.labels = labelDaily;
            config4.data.datasets[0].data = pointpHDaily;
            config4.options.scales.xAxes[0].time.unit = "minute";
        }

        else if(type == "BSF"){
            config1.data.datasets.splice(1,config1.data.datasets.length);
            config2.data.datasets.splice(1,config2.data.datasets.length);
            config3.data.datasets.splice(1,config3.data.datasets.length);
            
            config1.data.labels = labelBSFDaily;
            config1.data.datasets[0].data = pointTempBSFDaily;
            config1.options.scales.xAxes[0].time.unit = "minute";

            config2.data.labels = labelBSFDaily;
            config2.data.datasets[0].data = pointHumidityBSFDaily;
            config2.options.scales.xAxes[0].time.unit = "minute";

            config3.data.labels = labelBSFDaily;
            config3.data.datasets[0].data = pointLightBSFDaily;
            config3.options.scales.xAxes[0].time.unit = "minute";
        }

        else if(type == "BSFL"){
            config1.data.datasets.splice(1,config1.data.datasets.length);
            config2.data.datasets.splice(1,config2.data.datasets.length);
            config3.data.datasets.splice(1,config3.data.datasets.length);

            config1.data.labels = labelBSFLDaily;
            config1.data.datasets[0].data = pointTempBSFLDaily;
            config1.options.scales.xAxes[0].time.unit = "minute";

            config2.data.labels = labelBSFLDaily;
            config2.data.datasets[0].data = pointMoistureBSFLDaily;
            config2.options.scales.xAxes[0].time.unit = "minute";

            config3.data.labels = labelBSFLDaily;
            config3.data.datasets[0].data = pointpHBSFLDaily;
            config3.options.scales.xAxes[0].time.unit = "minute";
        }

        else if(type == "mix"){
            config1.data.datasets.splice(0,config1.data.datasets.length);
            config2.data.datasets.splice(0,config2.data.datasets.length);
            config3.data.datasets.splice(0,config3.data.datasets.length);
        
            let newDataOne = {
                label: "Chicken Temperature",
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


            let newDataBSFOne = {
                label: "BSF Temperature",
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
                data: pointLightBSFDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(207, 89, 89, 0.7)",
                backgroundColor: "rgba(207, 89, 89, 0.7)",
                pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
            }

            config2.data.labels = labelDaily;
            config2.data.datasets.push(newDataBSFOne);
            config2.data.datasets.push(newDataBSFTwo);
            config2.data.datasets.push(newDataBSFThree);
            config2.options.scales.xAxes[0].time.unit = "minute";

            let newDataBSFLOne = {
                label: "BSFL Temperature",
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
                data: pointpHDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(207, 89, 89, 0.7)",
                backgroundColor: "rgba(207, 89, 89, 0.7)",
                pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
            }

            config3.data.labels = labelDaily;
            config3.data.datasets.push(newDataBSFLOne);
            config3.data.datasets.push(newDataBSFLTwo);
            config3.data.datasets.push(newDataBSFLThree);
            config3.options.scales.xAxes[0].time.unit = "minute";
        }

        chart1.update();
        chart2.update();
        chart3.update();
        chart4.update();
    }
}

function drawDaily(context,envData){
    if(type == "Chicken"){
        if(envData == "temperature"){
            config1.data.datasets[0].label = "Today Temperature";
            config1.data.labels = labelDaily;
            config1.options.scales.xAxes[0].time.unit = "minute";
            config1.data.datasets[0].data = pointTempDaily;
        }

        else if(envData == "humidity"){
            config2.data.datasets[0].label = "Today humidity";
            config2.data.labels = labelDaily;
            config2.options.scales.xAxes[0].time.unit = "minute";
            config2.data.datasets[0].data = pointHumidityDaily;
        }

        else if(envData == "moisture"){
            config3.data.datasets[0].label = "Today moisture";
            config3.options.scales.xAxes[0].time.unit = "minute";
            config3.data.labels = labelDaily;
            config3.data.datasets[0].data = pointMoistureDaily;
        }

        else if(envData == "ph"){
            config4.options.scales.xAxes[0].time.unit = "minute";
            config4.data.labels = labelDaily;
            config4.data.datasets[0].data = pointpHDaily;
        }
    }

    else if(type == "BSF"){
        if(envData == "temperature"){
            config1.data.datasets[0].label = "Today Temperature";
            config1.data.labels = labelBSFDaily;
            config1.options.scales.xAxes[0].time.unit = "minute";
            config1.data.datasets[0].data = pointTempBSFDaily;
        }

        else if(envData == "humidity"){
            config1.data.datasets[0].label = "Today humidity";
            config2.data.labels = labelBSFDaily;
            config2.options.scales.xAxes[0].time.unit = "minute";
            config2.data.datasets[0].data = pointHumidityBSFDaily;
        }

        else if(envData == "moisture"){
            config1.data.datasets[0].label = "Today light";
            config3.options.scales.xAxes[0].time.unit = "minute";
            config3.data.labels = labelBSFDaily;
            config3.data.datasets[0].data = pointLightBSFDaily;
        }
    }

    else if(type == "BSFL"){
        if(envData == "temperature"){
            config1.data.datasets[0].label = "Today Temperature";
            config1.data.labels = labelBSFLDaily;
            config1.options.scales.xAxes[0].time.unit = "minute";
            config1.data.datasets[0].data = pointTempBSFLDaily;
        }

        else if(envData == "humidity"){
            config1.data.datasets[0].label = "Today moisture";
            config2.data.labels = labelBSFLDaily;
            config2.options.scales.xAxes[0].time.unit = "minute";
            config2.data.datasets[0].data = pointMoistureBSFLDaily;
        }

        else if(envData == "moisture"){
            config1.data.datasets[0].label = "Today ph";
            config3.options.scales.xAxes[0].time.unit = "minute";
            config3.data.labels = labelBSFLDaily;
            config3.data.datasets[0].data = pointpHBSFLDaily;
        }
    }

    else if(type == "mix"){
        if(envData == "temperature"){
            config1.data.labels = labelDaily;
            config1.data.datasets[0].data = pointTempDaily;
            config1.data.datasets[1].data = pointHumidityDaily;
            config1.data.datasets[2].data = pointMoistureDaily;
            config1.data.datasets[3].data = pointpHDaily;
            config1.options.scales.xAxes[0].time.unit = "minute";
        }

        else if(envData == "humidity"){
            config2.data.labels = labelBSFDaily;
            config2.data.datasets[0].data = pointTempBSFDaily;
            config2.data.datasets[1].data = pointHumidityBSFDaily;
            config2.data.datasets[2].data = pointLightBSFDaily;
            config2.options.scales.xAxes[0].time.unit = "minute";

        }

        else if(envData == "moisture"){
            config3.data.labels = labelBSFLDaily;
            config3.data.datasets[0].data = pointTempBSFLDaily;
            config3.data.datasets[1].data = pointMoistureBSFLDaily;
            config3.data.datasets[2].data = pointpHBSFLDaily;
            config3.options.scales.xAxes[0].time.unit = "minute";
        }
    }

    context.update();
}

function drawWeekly(context,envData){
    if(type == "Chicken"){
        if(envData == "temperature"){
            config1.data.datasets[0].label = "Weekly Temperature";
            config1.data.labels = labelWeekly;
            config1.options.scales.xAxes[0].time.unit = "day";
            config1.data.datasets[0].data = pointTempWeekly;
        }

        else if(envData == "humidity"){
            config2.data.datasets[0].label = "Weekly humidity";
            config2.data.labels = labelWeekly;
            config2.options.scales.xAxes[0].time.unit = "day";
            config2.data.datasets[0].data = pointHumidityWeekly;
        }

        else if(envData == "moisture"){
            config3.data.datasets[0].label = "Weekly moisture";
            config3.data.labels = labelWeekly;
            config3.options.scales.xAxes[0].time.unit = "day";
            config3.data.datasets[0].data = pointMoistureWeekly;
        }

        else if(envData == "ph"){
            config4.data.datasets[0].label = "Weekly ph";
            config4.data.labels = labelWeekly;
            config4.options.scales.xAxes[0].time.unit = "day";
            config4.data.datasets[0].data = pointpHWeekly;
        }
    }

    else if(type == "BSF"){
        if(envData == "temperature"){
            config1.data.datasets[0].label = "Weekly Temperature";
            config1.data.labels = labelBSFWeekly;
            config1.options.scales.xAxes[0].time.unit = "day";
            config1.data.datasets[0].data = pointTempBSFWeekly;
        }

        else if(envData == "humidity"){
            config2.data.datasets[0].label = "Weekly humidity";
            config2.data.labels = labelBSFWeekly;
            config2.options.scales.xAxes[0].time.unit = "day";
            config2.data.datasets[0].data = pointHumidityBSFWeekly;
        }

        else if(envData == "moisture"){
            config3.data.datasets[0].label = "Weekly light";
            config3.options.scales.xAxes[0].time.unit = "day";
            config3.data.labels = labelBSFWeekly;
            config3.data.datasets[0].data = pointLightBSFWeekly;
        }
    }

    else if(type == "BSFL"){
        if(envData == "temperature"){
            config1.data.datasets[0].label = "Weekly Temperature";
            config1.data.labels = labelBSFLWeekly;
            config1.options.scales.xAxes[0].time.unit = "day";
            config1.data.datasets[0].data = pointTempBSFLWeekly;
        }

        else if(envData == "humidity"){
            config2.data.datasets[0].label = "Weekly moisture";
            config2.data.labels = labelBSFLWeekly;
            config2.options.scales.xAxes[0].time.unit = "day";
            config2.data.datasets[0].data = pointMoistureBSFLWeekly;
        }

        else if(envData == "moisture"){
            config3.data.datasets[0].label = "Weekly ph";
            config3.options.scales.xAxes[0].time.unit = "day";
            config3.data.labels = labelBSFLWeekly;
            config3.data.datasets[0].data = pointpHBSFLWeekly;
        }
    }

    else if(type == "mix"){
        if(envData == "temperature"){
            config1.data.labels = labelWeekly;
            config1.data.datasets[0].data = pointTempWeekly;
            config1.data.datasets[1].data = pointHumidityWeekly;
            config1.data.datasets[2].data = pointMoistureWeekly;
            config1.data.datasets[3].data = pointpHWeekly;
            config1.options.scales.xAxes[0].time.unit = "day";
        }

        else if(envData == "humidity"){
            config2.data.labels = labelBSFWeekly;
            config2.data.datasets[0].data = pointTempBSFWeekly;
            config2.data.datasets[1].data = pointHumidityBSFWeekly;
            config2.data.datasets[2].data = pointLightBSFWeekly;
            config2.options.scales.xAxes[0].time.unit = "day";

        }

        else if(envData == "moisture"){
            config3.data.labels = labelBSFLWeekly;
            config3.data.datasets[0].data = pointTempBSFLWeekly;
            config3.data.datasets[1].data = pointMoistureBSFLWeekly;
            config3.data.datasets[2].data = pointpHBSFLWeekly;
            config3.options.scales.xAxes[0].time.unit = "day";
        }
    }

    context.update();
}

function drawMonthly(context,envData){
    if(type == "Chicken"){
        if(envData == "temperature"){
            config1.data.datasets[0].label = "Monthly Temperature";
            config1.data.labels = labelMonthly;
            config1.options.scales.xAxes[0].time.unit = "day";
            config1.data.datasets[0].data = pointTempMonthly;
        }

        else if(envData == "humidity"){
            config2.data.datasets[0].label = "Monthly humidity";
            config2.data.labels = labelMonthly;
            config2.options.scales.xAxes[0].time.unit = "day";
            config2.data.datasets[0].data = pointHumidityMonthly;
        }

        else if(envData == "moisture"){
            config3.data.datasets[0].label = "Monthly moisture";
            config3.data.labels = labelMonthly;
            config3.options.scales.xAxes[0].time.unit = "day";
            config3.data.datasets[0].data = pointMoistureMonthly;
        }

        else if(envData == "ph"){
            config4.data.datasets[0].label = "Monthly ph";
            config4.data.labels = labelMonthly;
            config4.options.scales.xAxes[0].time.unit = "day";
            config4.data.datasets[0].data = pointpHMonthly;
        }
    }

    else if(type == "BSF"){
        if(envData == "temperature"){
            config1.data.datasets[0].label = "Monthly Temperature";
            config1.data.labels = labelBSFMonthly;
            config1.options.scales.xAxes[0].time.unit = "day";
            config1.data.datasets[0].data = pointTempBSFMonthly;
        }

        else if(envData == "humidity"){
            config2.data.datasets[0].label = "Monthly humidity";
            config2.data.labels = labelBSFMonthly;
            config2.options.scales.xAxes[0].time.unit = "day";
            config2.data.datasets[0].data = pointHumidityBSFMonthly;
        }

        else if(envData == "moisture"){
            config3.data.datasets[0].label = "Monthly light";
            config3.options.scales.xAxes[0].time.unit = "day";
            config3.data.labels = labelBSFMonthly;
            config3.data.datasets[0].data = pointLightBSFMonthly;
        }
    }

    else if(type == "BSFL"){
        if(envData == "temperature"){
            config1.data.datasets[0].label = "Monthly Temperature";
            config1.data.labels = labelBSFLMonthly;
            config1.options.scales.xAxes[0].time.unit = "day";
            config1.data.datasets[0].data = pointTempBSFLMonthly;
        }

        else if(envData == "humidity"){
            config2.data.datasets[0].label = "Monthly moisture";
            config2.data.labels = labelBSFLMonthly;
            config2.options.scales.xAxes[0].time.unit = "day";
            config2.data.datasets[0].data = pointMoistureBSFLMonthly;
        }

        else if(envData == "moisture"){
            config3.data.datasets[0].label = "Monthly ph";
            config3.options.scales.xAxes[0].time.unit = "day";
            config3.data.labels = labelBSFLMonthly;
            config3.data.datasets[0].data = pointpHBSFLMonthly;
        }
    }

    else if(type == "mix"){
        if(envData == "temperature"){
            config1.data.labels = labelMonthly;
            config1.data.datasets[0].data = pointTempMonthly;
            config1.data.datasets[1].data = pointHumidityMonthly;
            config1.data.datasets[2].data = pointMoistureMonthly;
            config1.data.datasets[3].data = pointpHMonthly;
            config1.options.scales.xAxes[0].time.unit = "day";
        }

        else if(envData == "humidity"){
            config2.data.labels = labelBSFMonthly;
            config2.data.datasets[0].data = pointTempBSFMonthly;
            config2.data.datasets[1].data = pointHumidityBSFMonthly;
            config2.data.datasets[2].data = pointLightBSFMonthly;
            config2.options.scales.xAxes[0].time.unit = "day";

        }

        else if(envData == "moisture"){
            config3.data.labels = labelBSFLMonthly;
            config3.data.datasets[0].data = pointTempBSFLMonthly;
            config3.data.datasets[1].data = pointMoistureBSFLMonthly;
            config3.data.datasets[2].data = pointpHBSFLMonthly;
            config3.options.scales.xAxes[0].time.unit = "day";
        }
    }

    context.update();
}

function drawLifetime(context,envData){
    if(type == "Chicken"){
        if(envData == "temperature"){
            config1.data.datasets[0].label = "Lifetime Temperature";
            config1.data.labels = labelAll;
            config1.options.scales.xAxes[0].time.unit = "month";
            config1.data.datasets[0].data = pointTempAll;
        }

        else if(envData == "humidity"){
            config2.data.datasets[0].label = "Lifetime Humidity";
            config2.data.labels = labelAll;
            config2.options.scales.xAxes[0].time.unit = "month";
            config2.data.datasets[0].data = pointHumidityAll;
        }

        else if(envData == "moisture"){
            config3.data.datasets[0].label = "Lifetime moisture";
            config3.data.labels = labelAll;
            config3.options.scales.xAxes[0].time.unit = "month";
            config3.data.datasets[0].data = pointMoistureAll;
        }

        else if(envData == "ph"){
            config4.data.datasets[0].label = "Lifetime ph";
            config4.data.labels = labelAll;
            config4.options.scales.xAxes[0].time.unit = "month";
            config4.data.datasets[0].data = pointpHAll;
        }
    }

    else if(type == "BSF"){
        if(envData == "temperature"){
            config1.data.datasets[0].label = "Lifetime Temperature";
            config1.data.labels = labelBSFAll;
            config1.options.scales.xAxes[0].time.unit = "month";
            config1.data.datasets[0].data = pointTempBSFAll;
        }

        else if(envData == "humidity"){
            config2.data.datasets[0].label = "Lifetime humidity";
            config2.data.labels = labelBSFAll;
            config2.options.scales.xAxes[0].time.unit = "month";
            config2.data.datasets[0].data = pointHumidityBSFAll;
        }

        else if(envData == "moisture"){
            config3.data.datasets[0].label = "Lifetime light";
            config3.options.scales.xAxes[0].time.unit = "month";
            config3.data.labels = labelBSFAll;
            config3.data.datasets[0].data = pointLightBSFAll;
        }
    }

    else if(type == "BSFL"){
        if(envData == "temperature"){
            config1.data.datasets[0].label = "Lifetime Temperature";
            config1.data.labels = labelBSFLAll;
            config1.options.scales.xAxes[0].time.unit = "day";
            config1.data.datasets[0].data = pointTempBSFLAll;
        }

        else if(envData == "humidity"){
            config2.data.datasets[0].label = "Lifetime moisture";
            config2.data.labels = labelBSFLAll;
            config2.options.scales.xAxes[0].time.unit = "day";
            config2.data.datasets[0].data = pointMoistureBSFLAll;
        }

        else if(envData == "moisture"){
            config3.data.datasets[0].label = "Lifetime ph";
            config3.options.scales.xAxes[0].time.unit = "day";
            config3.data.labels = labelBSFLAll;
            config3.data.datasets[0].data = pointpHBSFLAll;
        }
    }

    else if(type == "mix"){
        if(envData == "temperature"){
            config1.data.labels = labelAll;
            config1.data.datasets[0].data = pointTempAll;
            config1.data.datasets[1].data = pointHumidityAll;
            config1.data.datasets[2].data = pointMoistureAll;
            config1.data.datasets[3].data = pointpHAll;
            config1.options.scales.xAxes[0].time.unit = "month";
        }

        else if(envData == "humidity"){
            config2.data.labels = labelBSFAll;
            config2.data.datasets[0].data = pointTempBSFAll;
            config2.data.datasets[1].data = pointHumidityBSFAll;
            config2.data.datasets[2].data = pointLightBSFAll;
            config2.options.scales.xAxes[0].time.unit = "month";

        }

        else if(envData == "moisture"){
            config3.data.labels = labelBSFLAll;
            config3.data.datasets[0].data = pointTempBSFLAll;
            config3.data.datasets[1].data = pointMoistureBSFLAll;
            config3.data.datasets[2].data = pointpHBSFLAll;
            config3.options.scales.xAxes[0].time.unit = "month";
        }
    }

    context.update();
}

$("#typePage li").click(function(){
    if($(this).children().attr("id") == "chickenVisualization"){
        document.getElementById("canvas4").style.display = "block";
        config1.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        config2.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        config3.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        config4.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        areaSelected = "Area1";
        type = "Chicken";
        document.getElementById("headerCanvas1").innerHTML = "Temperature";
        document.getElementById("headerCanvas2").innerHTML = "Humidity";
        document.getElementById("headerCanvas3").innerHTML = "Moisture";
        config1.data.datasets[0].label = "Today temperature";
        config2.data.datasets[0].label = "Today humidity";
        config3.data.datasets[0].label = "Today moisture";
        drawCharts();
    }

    else if($(this).children().attr("id") == "bsfVisualization"){
        document.getElementById("canvas4").style.display = "none";
        config1.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        config2.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        config3.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        config4.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        areaSelected = "Area1";
        type = "BSF";
        document.getElementById("headerCanvas1").innerHTML = "Temperature";
        document.getElementById("headerCanvas2").innerHTML = "Humidity";
        document.getElementById("headerCanvas3").innerHTML = "Light";
        config1.data.datasets[0].label = "Today temperature";
        config2.data.datasets[0].label = "Today humidity";
        config3.data.datasets[0].label = "Today light";
        drawCharts();
    }

    else if($(this).children().attr("id") == "bsflVisualization"){
        document.getElementById("canvas4").style.display = "none";
        config1.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        config2.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        config3.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        config4.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        areaSelected = "Area1";
        type = "BSFL";
        document.getElementById("headerCanvas1").innerHTML = "Temperature";
        document.getElementById("headerCanvas2").innerHTML = "Moisture";
        document.getElementById("headerCanvas3").innerHTML = "ph";
        config1.data.datasets[0].label = "Today temperature";
        config2.data.datasets[0].label = "Today moisture";
        config3.data.datasets[0].label = "Today ph";
        drawCharts();
    }

    else if($(this).children().attr("id") == "mix"){
        document.getElementById("canvas4").style.display = "none";
        config1.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        config2.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        config3.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        config4.data.datasets[0].type = document.getElementById("typeChart").value = "line";
        areaSelected = "Area1";
        type = "mix";
        document.getElementById("headerCanvas1").innerHTML = "Chicken - Mix";
        document.getElementById("headerCanvas2").innerHTML = "BSF - Mix";
        document.getElementById("headerCanvas3").innerHTML = "BSFL - Mix";
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

$(".humPage li").click(function(){
    if($(this).children().attr("id") == "humToday"){
        drawDaily(chart2,"humidity");
    }

    else if($(this).children().attr("id") == "humWeekly"){
        drawWeekly(chart2,"humidity");
    }

    else if($(this).children().attr("id") == "humMonthly"){
        drawMonthly(chart2,"humidity");
    }

    else if($(this).children().attr("id") == "humAll"){
        drawLifetime(chart2,"humidity");
    }
})

$(".moistPage li").click(function(){
    if($(this).children().attr("id") == "moistToday"){
        drawDaily(chart3,"moisture");
    }

    else if($(this).children().attr("id") == "moistWeekly"){
        drawWeekly(chart3,"moisture");
    }

    else if($(this).children().attr("id") == "moistMonthly"){
        drawMonthly(chart3,"moisture");
    }

    else if($(this).children().attr("id") == "moistAll"){
        drawLifetime(chart3,"moisture");
    }
})

$(".phPage li").click(function(){
    if($(this).children().attr("id") == "phToday"){
        drawDaily(chart4,"ph");
    }

    else if($(this).children().attr("id") == "phWeekly"){
        drawWeekly(chart4,"ph");
    }

    else if($(this).children().attr("id") == "phMonthly"){
        drawMonthly(chart4,"ph");
    }

    else if($(this).children().attr("id") == "phAll"){
        drawLifetime(chart4,"ph");
    }
})

function onTypeChange(){
    config1.data.datasets[0].type = document.getElementById("typeChart").value;
    config2.data.datasets[0].type = document.getElementById("typeChart").value;
    config3.data.datasets[0].type = document.getElementById("typeChart").value;
    config4.data.datasets[0].type = document.getElementById("typeChart").value;
    chart1.update();
    chart2.update();
    chart3.update();
    chart4.update();
}

function onAreaChange(){
    areaSelected = document.getElementById("dropdown").value;

    $(".card-footer .paginationBtn li").parent().find( 'li.page-item.active' ).removeClass( 'active' );
    $(".tempPage li").first().addClass("page-item active");
    $(".humPage li").first().addClass("page-item active");
    $(".moistPage li").first().addClass("page-item active");
    $(".phPage li").first().addClass("page-item active");

    drawCharts();
}
