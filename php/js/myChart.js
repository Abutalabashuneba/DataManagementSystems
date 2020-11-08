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

var type = document.getElementById("headerCanvas1").textContent;
var areaSelected;

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
                    displayFormats : {
                        minute: 'MMM D',
                        day: 'MMM D',
                        month: 'MMM D YYYY'
                    }
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
                id: "yAxis-Light",
                type: "linear",
                position: "right",
                scaleLabel:{
                    display: true,
                    labelString: "Lux"
                },
                gridLines:{
                    display: false
                },
                ticks:{
                    beginAtZero: true,
                    max: 100000,
                    stepValue: 10000
                }
            }
            ]
        }
    }
}

var config2 = {
    type : "bar",
    data:{
        datasets: [{
            
        }]
    },
    options:{
        barValueSpacing : 20,
        scales:{
            xAxes:[{
                type: "time",
                distribution: "series",
                offset : true,
                time:{
                    unit : "day",
                    displayFormats : {
                        minute: 'h:mm a',
                        day: 'MMM D',
                        month: 'MMM D YYYY'
                    }
                },
            }],

            yAxes:[{
                ticks : {
                    beginAtZero : true
                }
            }]
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
var pointLightDaily = [];
var pointLightWeekly = [];
var pointLightMonthly = [];
var pointLightAll = [];
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
var pointHumidBSFLDaily = [];
var pointHumidBSFLWeekly = [];
var pointHumidBSFLMonthly = [];
var pointHumidBSFLAll = [];
var pointSoilBSFLDaily = [];
var pointSoilBSFLWeekly = [];
var pointSoilBSFLMonthly = [];
var pointSoilBSFLAll = [];
//
var chickenProLabel = [];
var chickenAmt = [];
var chickenAvg = [];
var chickenSick = [];
var chickenRunt = [];
var chickenMort = [];
var chickenFeed = [];
var chickenLeft = [];
//
var bsfProLabel = [];
var bsfEgg = [];
var bsflProLabel = []
var bsflLarvae = [];
//
var areaDrop = document.querySelector("#dropdown");
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
    if(bsfObj != undefined) bsfKeys = Object.keys(bsfObj);
    if(bsflObj != undefined) bsflKeys = Object.keys(bsflObj);
    if(chickenObj != undefined) chickenKeys = Object.keys(chickenObj);
    if(productionObj != undefined) productionKeys = Object.keys(productionObj);
    
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
    pointLightDaily = [];
    pointLightWeekly = [];
    pointLightMonthly = [];
    pointLightAll = [];
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
    pointHumidBSFLWeekly = [];
    pointHumidBSFLDaily = [];
    pointHumidBSFLAll = [];
    pointHumidBSFLMonthly = [];
    pointSoilBSFLWeekly = [];
    pointSoilBSFLDaily = [];
    pointSoilBSFLAll = [];
    pointSoilBSFLMonthly = [];

    //start of adding data into the array
    if(type == "Chicken"){
        if(chickenObj[areaSelected] == undefined){
            areaSelected = chickenKeys[0];
        }

        var start = moment().subtract(31,"days");
        var end = moment();

        function dp(start, end){
            labelDaily = [];
            pointTempDaily = [];
            pointHumidityDaily = [];
            pointLightDaily = [];
            $("#reportrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
            
            for(var x = 0; x < Object.keys(chickenObj[areaSelected]).length; ++x){
                var k = Object.keys(chickenObj[areaSelected])[x];
                var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));
                
                if(newstartdate <= chickenObj[areaSelected][k].timestamp && newenddate >= chickenObj[areaSelected][k].timestamp){
                    labelDaily.push(chickenObj[areaSelected][k].timestamp);
                    pointTempDaily.push(chickenObj[areaSelected][k].temperature);
                    pointHumidityDaily.push(chickenObj[areaSelected][k].humidity);
                    pointLightDaily.push(chickenObj[areaSelected][k].light);
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
                    label: "Chicken Light",
                    yAxisID: "yAxis-Light",
                    data: pointLightDaily,
                    pointRadius: 0,
                    fill: false,
                    lineTension: 0.5,
                    borderWidth: 2,
                    borderColor: "rgba(207, 89, 89, 0.7)",
                    backgroundColor: "rgba(207, 89, 89, 0.7)",
                    pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
                }
        
                config1.data.labels = labelDaily;
                config1.data.datasets.push(newDataOne);
                config1.data.datasets.push(newDataTwo);
                config1.data.datasets.push(newDataThree);
                config1.options.scales.xAxes[0].time.unit = "minute";
                chart1 = new Chart(context,config1);
                
                // config2.data = {
                //     labels: chickenProLabel,
                //     datasets : [
                //     {
                //         label : "Amount (1000/k)",
                //         backgroundColor: "rgba(255,0,0)",
                //         data : chickenAmt
                //     },
                //     {
                //         label : "Average (kg)",
                //         backgroundColor: "rgba(255,128,0)",
                //         data : chickenAvg
                //     },    
                //     {
                //         label : "Sick (1000/k)",
                //         backgroundColor: "rgba(255,255,0)",
                //         data : chickenSick
                //     },    
                //     {
                //         label : "Runt (1000/k)",
                //         backgroundColor: "rgba(128,255,0)",
                //         data : chickenRunt
                //     },    
                //     {
                //         label : "Mortality (1000/k)",
                //         backgroundColor: "rgba(255,0,255)",
                //         data : chickenMort
                //     },    
                //     {
                //         label : "Feed (kg)",
                //         backgroundColor: "rgba(0,0,255)",
                //         data : chickenFeed
                //     },    
                //     {
                //         label : "Left (kg)",
                //         backgroundColor: "rgba(0,255,255)",
                //         data : chickenLeft
                //     },    
                //     ] 
                // }
                // chart2 = new Chart(context2,config2);
            }

            else{
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
                    label: "Chicken Light",
                    yAxisID: "yAxis-Light",
                    data: pointLightDaily,
                    pointRadius: 0,
                    fill: false,
                    lineTension: 0.5,
                    borderWidth: 2,
                    borderColor: "rgba(207, 89, 89, 0.7)",
                    backgroundColor: "rgba(207, 89, 89, 0.7)",
                    pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
                }
        
                config1.data.labels = labelDaily;
                config1.data.datasets.push(newDataOne);
                config1.data.datasets.push(newDataTwo);
                config1.data.datasets.push(newDataThree);
                config1.options.scales.xAxes[0].time.unit = "minute";
                chart1.update();
            }
        }

        $("#reportrange").daterangepicker({
            startDate : start,
            endDate : end,
            ranges : {
                "Today" : [moment(), moment()],
                "Yesterday" : [moment().subtract(1, "days"), moment().subtract(1, "days")],
                "Last 7 days" : [moment().subtract(6, "days"), moment()],
                "Last 30 Days" : [moment().subtract(29, "days"), moment()],
                "This Month" : [moment().startOf("month"),moment().endOf("month")],
                "Last Month" : [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
                "Lifetime" : [moment().subtract(50,"year"), moment()]
            }
        }, dp)
        
        dp(start,end);
    }

    //start of adding data into the array
    else if(type == "BSF"){
        if(bsfObj[areaSelected] == undefined){
            areaSelected = bsfKeys[0];
        }

        var start = moment().subtract(31,"days");
        var end = moment();

        function dp(start,end){
            labelBSFDaily = [];
            pointTempBSFDaily = [];
            pointHumidityBSFDaily = [];
            pointLightBSFDaily = [];

            for(var x = 0; x < Object.keys(bsfObj[areaSelected]).length; ++x){
                var k = Object.keys(bsfObj[areaSelected])[x];
                var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));

                if(newstartdate <= bsf[areaSelected][k].timestamp && newenddate >= bsf[areaSelected][k].timestamp){
                    labelBSFDaily.push(bsfObj[areaSelected][k].timestamp);
                    pointTempBSFDaily.push(bsfObj[areaSelected][k].temperature);
                    pointHumidityBSFDaily.push(bsfObj[areaSelected][k].humidity);
                    pointLightBSFDaily.push(bsfObj[areaSelected][k].light);
                }
            }

            config1.data.datasets.splice(0,config1.data.datasets.length);
            // config2.data.datasets.splice(0,config2.data.datasets.length);

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
            chart1.update();
        }

        $("#reportrange").daterangepicker({
            startDate : start,
            endDate : end,
            ranges : {
                "Today" : [moment(), moment()],
                "Yesterday" : [moment().subtract(1, "days"), moment().subtract(1, "days")],
                "Last 7 days" : [moment().subtract(6, "days"), moment()],
                "Last 30 Days" : [moment().subtract(29, "days"), moment()],
                "This Month" : [moment().startOf("month"),moment().endOf("month")],
                "Last Month" : [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
                "Lifetime" : [moment().subtract(50,"year"), moment()]
            }
        }, dp)
        
        dp(start,end);
        // for(var x = 0; x < Object.keys(bsfObj[areaSelected]).length; ++x){
        //     var k = Object.keys(bsfObj[areaSelected])[x];
    
        //     if(bsfObj[areaSelected][k].timestamp > dayStart && bsfObj[areaSelected][k].timestamp < dayEnd){
        //         labelBSFDaily.push(bsfObj[areaSelected][k].timestamp);
        //         pointTempBSFDaily.push(bsfObj[areaSelected][k].temperature);
        //         pointHumidityBSFDaily.push(bsfObj[areaSelected][k].humidity);
        //         pointLightBSFDaily.push(bsfObj[areaSelected][k].light);
        //     }
    
        //     if(bsfObj[areaSelected][k].timestamp > weekStart && bsfObj[areaSelected][k].timestamp < weekEnd){
        //         labelBSFWeekly.push(bsfObj[areaSelected][k].timestamp);
        //         pointTempBSFWeekly.push(bsfObj[areaSelected][k].temperature);
        //         pointHumidityBSFWeekly.push(bsfObj[areaSelected][k].humidity);
        //         pointLightBSFWeekly.push(bsfObj[areaSelected][k].light);
        //     }
    
        //     if(bsfObj[areaSelected][k].timestamp > monthStart && bsfObj[areaSelected][k].timestamp < monthEnd){
        //         labelBSFMonthly.push(bsfObj[areaSelected][k].timestamp);
        //         pointTempBSFMonthly.push(bsfObj[areaSelected][k].temperature);
        //         pointHumidityBSFMonthly.push(bsfObj[areaSelected][k].humidity);
        //         pointLightBSFMonthly.push(bsfObj[areaSelected][k].light);
        //     }
    
        //     labelBSFAll.push(bsfObj[areaSelected][k].timestamp);
        //     pointTempBSFAll.push(bsfObj[areaSelected][k].temperature);
        //     pointHumidityBSFAll.push(bsfObj[areaSelected][k].humidity);
        //     pointLightBSFAll.push(bsfObj[areaSelected][k].light);
        // }
    }
    //end of adding data into the array

    //start of adding data into the array
    else if(type == "BSFL"){
        if(bsflObj[areaSelected] == undefined){
            areaSelected = bsflKeys[0];
        }

        var start = moment().subtract(31,"days");
        var end = moment();

        function dp(start,end){
            labelBSFLDaily = [];
            pointTempBSFLDaily = [];
            pointMoistureBSFLDaily = [];
            pointHumidBSFLDaily = [];
            pointSoilBSFLDaily = [];
            $("#reportrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
            
            for(var x = 0; x < Object.keys(bsflObj[areaSelected]).length; ++x){
                var k = Object.keys(bsflObj[areaSelected])[x]; 
                var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));

                if(newstartdate <= bsflObj[areaSelected][k].timestamp && newenddate >= bsflObj[areaSelected][k].timestamp){
                    labelBSFLDaily.push(bsflObj[areaSelected][k].timestamp);
                    pointTempBSFLDaily.push(bsflObj[areaSelected][k].temperature);
                    pointMoistureBSFLDaily.push(bsflObj[areaSelected][k].moisture);
                    pointHumidBSFLDaily.push(bsflObj[areaSelected][k].humidity);
                    pointSoilBSFLDaily.push(bsflObj[areaSelected][k].soilTemp);
                }
            }

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
                label: "BSFL Humidity",
                yAxisID: "yAxis-Humidity",
                data: pointHumidBSFLDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(207, 89, 89, 0.7)",
                backgroundColor: "rgba(207, 89, 89, 0.7)",
                pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
            }

            let newDataBSFLFour = {
                label: "BSFL Soil Temperature",
                yAxisID: "yAxis-Soil",
                data: pointSoilBSFLDaily,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(207, 207, 89, 0.7)",
                backgroundColor: "rgba(207, 207, 89, 0.7)",
                pointHoverBorderColor : "rgba(207, 207, 89, 0.9)",
            }

            config1.data.labels = labelBSFLDaily;
            config1.data.datasets.push(newDataBSFLOne);
            config1.data.datasets.push(newDataBSFLTwo);
            config1.data.datasets.push(newDataBSFLThree);
            config1.data.datasets.push(newDataBSFLFour);
            config1.options.scales.xAxes[0].time.unit = "minute";
            
            chart1.update();
        }

        $("#reportrange").daterangepicker({
            startDate : start,
            endDate : end,
            ranges : {
                "Today" : [moment(), moment()],
                "Yesterday" : [moment().subtract(1, "days"), moment().subtract(1, "days")],
                "Last 7 days" : [moment().subtract(6, "days"), moment()],
                "Last 30 Days" : [moment().subtract(29, "days"), moment()],
                "This Month" : [moment().startOf("month"),moment().endOf("month")],
                "Last Month" : [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
                "Lifetime" : [moment().subtract(50,"year"), moment()]
            }
        }, dp)
        
        dp(start,end);

        // for(var x = 0; x < Object.keys(bsflObj[areaSelected]).length; ++x){
        //     var k = Object.keys(bsflObj[areaSelected])[x];
    
        //     if(bsflObj[areaSelected][k].timestamp > dayStart && bsflObj[areaSelected][k].timestamp < dayEnd){
        //         labelBSFLDaily.push(bsflObj[areaSelected][k].timestamp);
        //         pointTempBSFLDaily.push(bsflObj[areaSelected][k].temperature);
        //         pointMoistureBSFLDaily.push(bsflObj[areaSelected][k].moisture);
        //         pointHumidBSFLDaily.push(bsflObj[areaSelected][k].humidity);
        //         pointSoilBSFLDaily.push(bsflObj[areaSelected][k].soilTemp);
        //     }
    
        //     if(bsflObj[areaSelected][k].timestamp > weekStart && bsflObj[areaSelected][k].timestamp < weekEnd){
        //         labelBSFLWeekly.push(bsflObj[areaSelected][k].timestamp);
        //         pointTempBSFLWeekly.push(bsflObj[areaSelected][k].temperature);
        //         pointMoistureBSFLWeekly.push(bsflObj[areaSelected][k].moisture);
        //         pointHumidBSFLWeekly.push(bsflObj[areaSelected][k].humidity);
        //         pointSoilBSFLWeekly.push(bsflObj[areaSelected][k].soilTemp);
        //     }
    
        //     if(bsflObj[areaSelected][k].timestamp > monthStart && bsflObj[areaSelected][k].timestamp < monthEnd){
        //         labelBSFLMonthly.push(bsflObj[areaSelected][k].timestamp);
        //         pointTempBSFLMonthly.push(bsflObj[areaSelected][k].temperature);
        //         pointMoistureBSFLMonthly.push(bsflObj[areaSelected][k].moisture);
        //         pointHumidBSFLMonthly.push(bsflObj[areaSelected][k].humidity);
        //         pointSoilBSFLMonthly.push(bsflObj[areaSelected][k].soilTemp);
        //     }
    
        //     labelBSFLAll.push(bsflObj[areaSelected][k].timestamp);
        //     pointTempBSFLAll.push(bsflObj[areaSelected][k].temperature);
        //     pointMoistureBSFLAll.push(bsflObj[areaSelected][k].moisture);
        //     pointHumidBSFLAll.push(bsflObj[areaSelected][k].humidity);
        //     pointSoilBSFLAll.push(bsflObj[areaSelected][k].soilTemp);
        // }
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

        chickenProLabel = [];
        chickenAmt = [];
        chickenAvg = [];
        chickenSick = [];
        chickenRunt = [];
        chickenMort = [];
        chickenFeed = [];
        chickenLeft = [];
        
        // if(productionObj[type][areaSelected] != null){
        //     for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
        //         var k = Object.keys(productionObj[type][areaSelected])[x];
        //         chickenProLabel.push(productionObj[type][areaSelected][k].timestamp);
        //         chickenAmt.push(productionObj[type][areaSelected][k].amount);
        //         chickenAvg.push(productionObj[type][areaSelected][k].average);
        //         chickenSick.push(productionObj[type][areaSelected][k].sick);
        //         chickenRunt.push(productionObj[type][areaSelected][k].runt);
        //         chickenMort.push(productionObj[type][areaSelected][k].mortality);
        //         chickenFeed.push(productionObj[type][areaSelected][k].give);
        //         chickenLeft.push(productionObj[type][areaSelected][k].left);
        //     }
        // }
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

        bsfProLabel = [];
        bsfEgg = [];
        
        if(productionObj[type][areaSelected] != null){
            for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
                var k = Object.keys(productionObj[type][areaSelected])[x];
                bsfProLabel.push(productionObj[type][areaSelected][k].timestamp);
                bsfEgg.push(productionObj[type][areaSelected][k].eggs);
            }
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
        bsflProLabel = [];
        bsflLarvae = [];
        // if(productionObj[type][areaSelected] != null){
        //     for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
        //         var k = Object.keys(productionObj[type][areaSelected])[x];
        //         bsflProLabel.push(productionObj[type][areaSelected][k].timestamp);
        //         bsflLarvae.push(productionObj[type][areaSelected][k].eggs);
        //     }
        // }

    }

    // Previous else for chart
    // else{
    //     if(type == "Chicken"){
    //         console.log("Update");
    //         config1.data.datasets.splice(0,config1.data.datasets.length);
    //         config2.data.datasets.splice(0,config2.data.datasets.length);
           
    //         let newDataOne = {
    //             label: "Chicken Temperature",
    //             yAxisID: "yAxis-Temp",
    //             data: pointTempDaily,
    //             pointRadius: 0,
    //             fill: false,
    //             lineTension: 0.5,
    //             borderWidth: 2,
    //             borderColor: "rgba(201,134,212,0.7)",
    //             backgroundColor: "rgba(201,134,212,0.7)",
    //             pointHoverBorderColor : "rgba(142,77,185,0.9)",
    //         }
    
    //         let newDataTwo = {
    //             label: "Chicken Humidity",
    //             yAxisID: "yAxis-Humidity",
    //             data: pointHumidityDaily,
    //             pointRadius: 0,
    //             fill: false,
    //             lineTension: 0.5,
    //             borderWidth: 2,
    //             borderColor: "rgba(160, 227, 226, 0.7)",
    //             backgroundColor: "rgba(160, 227, 226, 0.7)",
    //             pointHoverBorderColor : "rgba(160, 227, 226, 0.9)",
    //         }
    
    //         let newDataThree = {
    //             label: "Chicken Light",
    //             yAxisID: "yAxis-Light",
    //             data: pointLightDaily,
    //             pointRadius: 0,
    //             fill: false,
    //             lineTension: 0.5,
    //             borderWidth: 2,
    //             borderColor: "rgba(207, 89, 89, 0.7)",
    //             backgroundColor: "rgba(207, 89, 89, 0.7)",
    //             pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
    //         }
    
    //         config1.data.labels = labelDaily;
    //         config1.data.datasets.push(newDataOne);
    //         config1.data.datasets.push(newDataTwo);
    //         config1.data.datasets.push(newDataThree);
    //         config1.options.scales.xAxes[0].time.unit = "minute";

    //         // config2.data = {
    //         //     labels: chickenProLabel,
    //         //     datasets : [
    //         //     {
    //         //         label : "Amount (1000/k)",
    //         //         backgroundColor: "rgba(255,0,0)",
    //         //         data : chickenAmt
    //         //     },
    //         //     {
    //         //         label : "Average (kg)",
    //         //         backgroundColor: "rgba(255,128,0)",
    //         //         data : chickenAvg
    //         //     },    
    //         //     {
    //         //         label : "Sick (1000/k)",
    //         //         backgroundColor: "rgba(255,255,0)",
    //         //         data : chickenSick
    //         //     },    
    //         //     {
    //         //         label : "Runt (1000/k)",
    //         //         backgroundColor: "rgba(128,255,0)",
    //         //         data : chickenRunt
    //         //     },    
    //         //     {
    //         //         label : "Mortality (1000/k)",
    //         //         backgroundColor: "rgba(255,0,255)",
    //         //         data : chickenMort
    //         //     },    
    //         //     {
    //         //         label : "Feed (kg)",
    //         //         backgroundColor: "rgba(0,0,255)",
    //         //         data : chickenFeed
    //         //     },    
    //         //     {
    //         //         label : "Left (kg)",
    //         //         backgroundColor: "rgba(0,255,255)",
    //         //         data : chickenLeft
    //         //     },    
    //         //     ] 
    //         // }
    //     }

    //     else if(type == "BSF"){
    //         config1.data.datasets.splice(0,config1.data.datasets.length);
    //         config2.data.datasets.splice(0,config2.data.datasets.length);
    
    //         let newDataBSFOne = {
    //             label: "BSF Temperature",
    //             yAxisID: "yAxis-Temp",
    //             data: pointTempBSFDaily,
    //             pointRadius: 0,
    //             fill: false,
    //             lineTension: 0.5,
    //             borderWidth: 2,
    //             borderColor: "rgba(201,134,212,0.7)",
    //             backgroundColor: "rgba(201,134,212,0.7)",
    //             pointHoverBorderColor : "rgba(142,77,185,0.9)",
    //         }

    //         let newDataBSFTwo = {
    //             label: "BSF Humidity",
    //             yAxisID: "yAxis-Humidity",
    //             data: pointHumidityBSFDaily,
    //             pointRadius: 0,
    //             fill: false,
    //             lineTension: 0.5,
    //             borderWidth: 2,
    //             borderColor: "rgba(160, 227, 226, 0.7)",
    //             backgroundColor: "rgba(160, 227, 226, 0.7)",
    //             pointHoverBorderColor : "rgba(160, 227, 226, 0.9)",
    //         }

    //         let newDataBSFThree = {
    //             label: "BSF Light",
    //             yAxisID: "yAxis-Light",
    //             data: pointLightBSFDaily,
    //             pointRadius: 0,
    //             fill: false,
    //             lineTension: 0.5,
    //             borderWidth: 2,
    //             borderColor: "rgba(207, 89, 89, 0.7)",
    //             backgroundColor: "rgba(207, 89, 89, 0.7)",
    //             pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
    //         }

    //         config1.data.labels = labelBSFDaily;
    //         config1.data.datasets.push(newDataBSFOne);
    //         config1.data.datasets.push(newDataBSFTwo);
    //         config1.data.datasets.push(newDataBSFThree);
    //         config1.options.scales.xAxes[0].time.unit = "minute";

    //         config2.data = {
    //             labels: bsfProLabel,
    //             datasets : [
    //             {
    //                 label : "Eggs (1000/k)",
    //                 backgroundColor: "rgba(255,0,0)",
    //                 data : bsfEgg
    //             }
    //             ] 
    //         }
    //     }

    //     else if(type == "BSFL"){
    //         config1.data.datasets.splice(0,config1.data.datasets.length);
    //         // config2.data.labels.splice(0,config2.data.labels.length);
    //         // config2.data.datasets.splice(0,config2.data.datasets.length);
            
    //         let newDataBSFLOne = {
    //             label: "BSFL Temperature",
    //             yAxisID: "yAxis-Temp",
    //             data: pointTempBSFLDaily,
    //             pointRadius: 0,
    //             fill: false,
    //             lineTension: 0.5,
    //             borderWidth: 2,
    //             borderColor: "rgba(201,134,212,0.7)",
    //             backgroundColor: "rgba(201,134,212,0.7)",
    //             pointHoverBorderColor : "rgba(142,77,185,0.9)",
    //         }

    //         let newDataBSFLTwo = {
    //             label: "BSFL Moisture",
    //             yAxisID: "yAxis-Moisture",
    //             data: pointMoistureBSFLDaily,
    //             pointRadius: 0,
    //             fill: false,
    //             lineTension: 0.5,
    //             borderWidth: 2,
    //             borderColor: "rgba(160, 227, 226, 0.7)",
    //             backgroundColor: "rgba(160, 227, 226, 0.7)",
    //             pointHoverBorderColor : "rgba(160, 227, 226, 0.9)",
    //         }

    //         let newDataBSFLThree = {
    //             label: "BSFL Humidity",
    //             yAxisID: "yAxis-Humidity",
    //             data: pointHumidBSFLDaily,
    //             pointRadius: 0,
    //             fill: false,
    //             lineTension: 0.5,
    //             borderWidth: 2,
    //             borderColor: "rgba(207, 89, 89, 0.7)",
    //             backgroundColor: "rgba(207, 89, 89, 0.7)",
    //             pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
    //         }

    //         let newDataBSFLFour = {
    //             label: "BSFL Soil Temperature",
    //             yAxisID: "yAxis-Soil",
    //             data: pointSoilBSFLDaily,
    //             pointRadius: 0,
    //             fill: false,
    //             lineTension: 0.5,
    //             borderWidth: 2,
    //             borderColor: "rgba(207, 207, 89, 0.7)",
    //             backgroundColor: "rgba(207, 207, 89, 0.7)",
    //             pointHoverBorderColor : "rgba(207, 207, 89, 0.9)",
    //         }

    //         config1.data.labels = labelBSFLDaily;
    //         config1.data.datasets.push(newDataBSFLOne);
    //         config1.data.datasets.push(newDataBSFLTwo);
    //         config1.data.datasets.push(newDataBSFLThree);
    //         config1.data.datasets.push(newDataBSFLFour);
    //         config1.options.scales.xAxes[0].time.unit = "minute";
    //         // config2.data = {
    //         //     labels: bsflProLabel,
    //         //     datasets : [
    //         //     {
    //         //         label : "Larvae (1000/k)",
    //         //         backgroundColor: "rgba(0,255,0)",
    //         //         data : bsflLarvae
    //         //     }
    //         //     ] 
    //         // }
    //     }
    //     chart1.update();
    //     // chart2.update();
    // }
}

$("#typePage li").click(function(){
    if($(this).children().attr("id") == "chickenVisualization"){
        type = "Chicken";
        document.getElementById("dropdown").style.display = "block";
        document.getElementById("headerCanvas1").innerHTML = "Chicken";

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
                labelString: "Lux"
            },
            gridLines:{
              display: false  
            },
            ticks:{
                beginAtZero: true,
                max: 100000,
                stepValue: 10000
            }
        },
        ];
        drawCharts();
    }

    else if($(this).children().attr("id") == "bsfVisualization"){
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
        document.getElementById("headerCanvas1").innerHTML = "BSFL";
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
            id: "yAxis-Humidity",
            type: "linear",
            position: "right",
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
            id: "yAxis-Soil",
            type: "linear",
            position: "right",
            scaleLabel:{
                display: true,
                labelString: "Soil Temperature"
            },
            gridLines:{
              display: false  
            },
            ticks:{
                beginAtZero: true,
                max: 100,
                stepValue: 10
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
        drawDaily(chart1);
    }

    else if($(this).children().attr("id") == "tempWeekly"){
        drawWeekly(chart1);
    }

    else if($(this).children().attr("id") == "tempMonthly"){
        drawMonthly(chart1);
    }

    else if($(this).children().attr("id") == "tempAll"){
        drawLifetime(chart1);
    }
})

function onAreaChange(){
    areaSelected = document.getElementById("dropdown").value;
    $(".card-footer .paginationBtn li").parent().find( 'li.page-item.active' ).removeClass( 'active' );
    $(".tempPage li").first().addClass("page-item active");
    drawCharts();
}


