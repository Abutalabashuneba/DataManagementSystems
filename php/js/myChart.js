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
var chart3;
var chart4;
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
                        minute: 'MMM D',
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

var config3 = {
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
                        minute: 'MMM D',
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

var config4 = {
    type : "line",
    data : {
        datasets: [{

        }]
    },
    options : {
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        scales : {
            xAxes: [{
                type : "time",
                distribution : "series",
                offset : false,
                time : {
                    unit : "day",
                    displayFormats : {
                        minute: 'MMM D',
                        day: 'MMM D',
                        month: 'MMM D YYYY'
                    }
                }
            }],
            yAxes : [{
                ticks : {
                    beginAtZero : true
                }
            }]
        }
    }
}

var labelAll = [];
var pointTempAll = [];
var pointHumidityAll = [];
var pointLightAll = [];

var labelBSFAll = [];
var pointTempBSFAll = [];
var pointHumidityBSFAll = [];
var pointLightBSFAll = [];

var labelBSFLAll = [];
var pointTempBSFLAll = [];
var pointMoistureBSFLAll = [];
var pointHumidBSFLDaily = [];
var pointSoilBSFLAll = [];

var chickenFeed = [];
var feedConsume = [];
var feedLeft = [];
var waterConsume = [];
var waterLeft = [];

var healthLabel = [];
var healthy = [];
var cull = [];
var dead = [];
var injured = [];
var sick = [];

var fcrLabel = [];
var fcr = [];

var eggLabel = [];
var egg = [];

var larvaeLabel = [];
var larvae = [];

var areaDrop = document.querySelector("#dropdown");
var chickenDrop = document.querySelector("#mixChicken");
var bsfDrop = document.querySelector("#mixBSF");
var bsflDrop = document.querySelector("#mixBSFL");
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
    //start of adding data into the array
    if(type == "Chicken"){
        if(chickenObj[areaSelected] == undefined){
            areaSelected = chickenKeys[0];
        }

        var start = moment().subtract(31,"days");
        var end = moment();

        function dp(start, end){
            labelAll = [];
            pointTempAll = [];
            pointHumidityAll = [];
            pointLightAll = [];
            chickenFeed = [];
            feedConsume = [];
            feedLeft = [];
            waterConsume = [];
            waterLeft = [];
            healthy = [];
            cull = [];
            injured = [];
            sick = [];
            dead = [];
            healthLabel = [];
            fcrLabel = [];
            fcr = [];

            $("#reportrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
            
            if(chickenObj != undefined){
                for(var x = 0; x < Object.keys(chickenObj[areaSelected]).length; ++x){
                    var k = Object.keys(chickenObj[areaSelected])[x];
                    var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                    var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));
                    
                    if(newstartdate <= chickenObj[areaSelected][k].timestamp && newenddate >= chickenObj[areaSelected][k].timestamp){
                        labelAll.push(chickenObj[areaSelected][k].timestamp);
                        pointTempAll.push(chickenObj[areaSelected][k].temperature);
                        pointHumidityAll.push(chickenObj[areaSelected][k].humidity);
                        pointLightAll.push(chickenObj[areaSelected][k].light);
                    }
                }
            }

            if(productionObj != undefined){
                for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
                    var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                    var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));
                    var k = Object.keys(productionObj[type][areaSelected])[x];
                    if(x == 0){
                        for(var i = 0; i < Object.keys(productionObj[type][areaSelected][k]).length; ++i){
                            var key = Object.keys(productionObj[type][areaSelected][k])[i];
                            if(newstartdate <= productionObj[type][areaSelected][k][key].timestamp && newenddate >= productionObj[type][areaSelected][k][key].timestamp){
                                chickenFeed.push(productionObj[type][areaSelected][k][key].timestamp);
                                feedConsume.push(productionObj[type][areaSelected][k][key].feedGiven);
                                feedLeft.push(productionObj[type][areaSelected][k][key].feedLeft);
                                waterConsume.push(productionObj[type][areaSelected][k][key].waterGiven);
                                waterLeft.push(productionObj[type][areaSelected][k][key].waterLeft);
                            }
                        }
                    }

                    else if(x == 1){
                        for(var i = 0; i < Object.keys(productionObj[type][areaSelected][k]).length; ++i){
                            var key = Object.keys(productionObj[type][areaSelected][k])[i];
                            if(newstartdate <= productionObj[type][areaSelected][k][key].timestamp && newenddate >= productionObj[type][areaSelected][k][key].timestamp){
                                healthLabel.push(productionObj[type][areaSelected][k][key].timestamp);
                                dead.push(productionObj[type][areaSelected][k][key].dead);
                                cull.push(productionObj[type][areaSelected][k][key].cull);
                                sick.push(productionObj[type][areaSelected][k][key].sick);
                                healthy.push(productionObj[type][areaSelected][k][key].healthy);
                                injured.push(productionObj[type][areaSelected][k][key].injured);
                            }
                        }
                    }

                    else{
                        for(var i = 0; i < Object.keys(productionObj[type][areaSelected][k]).length; ++i){
                            var key = Object.keys(productionObj[type][areaSelected][k])[i];
                            if(newstartdate <= productionObj[type][areaSelected][k][key].timestamp && newenddate >= productionObj[type][areaSelected][k][key].timestamp){
                                fcrLabel.push(productionObj[type][areaSelected][k][key].timestamp);
                                fcr.push(productionObj[type][areaSelected][k][key].avgFeedChix/productionObj[type][areaSelected][k][key].avgWeightChix);
                            }
                        }
                    }
                }
            }
            
            if(!chart1 && !chart2 && !chart3 && !chart4){
                config1.data.datasets.splice(0,config1.data.datasets.length);
        
                let newDataOne = {
                    label: "Chicken Temperature",
                    yAxisID: "yAxis-Temp",
                    data: pointTempAll,
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
                    data: pointHumidityAll,
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
                    data: pointLightAll,
                    pointRadius: 0,
                    fill: false,
                    lineTension: 0.5,
                    borderWidth: 2,
                    borderColor: "rgba(207, 89, 89, 0.7)",
                    backgroundColor: "rgba(207, 89, 89, 0.7)",
                    pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
                }
        
                config1.data.labels = labelAll;
                config1.data.datasets.push(newDataOne);
                config1.data.datasets.push(newDataTwo);
                config1.data.datasets.push(newDataThree);
                config1.options.scales.xAxes[0].time.unit = "minute";
                chart1 = new Chart(context,config1);
                
                config2.data = {
                    labels: chickenFeed,
                    datasets : [
                        {
                            label : "Feed Given (KG)",
                            backgroundColor: '#22aa99',
                            data : feedConsume,
                            stack : 'feed'
                        },
                        {
                            label : "Feed Left (KG)",
                            backgroundColor : '#994499',
                            data : feedLeft,
                            stack : 'feed'
                        },
                        {
                            label : "Water Given (KG)",
                            backgroundColor : '#dc3912',
                            data : waterConsume,
                            stack : 'water'
                        },
                        {
                            label : "Water Left (KG)",
                            backgroundColor : '#109618',
                            data : waterLeft,
                            stack : 'water'
                        }
                    ]
                }
                chart2 = new Chart(context2,config2);

                config3.data = {
                    labels : healthLabel,
                    datasets : [
                        {
                            label : "Healthy",
                            backgroundColor : '#22aa99',
                            data : healthy
                        },
                        {
                            label : "Dead",
                            backgroundColor : '#994499',
                            data : dead
                        },
                        {
                            label : "Sick",
                            backgroundColor : '#dc3912',
                            data : sick
                        },
                        {
                            label : "Cull",
                            backgroundColor : '#dc3912',
                            data : cull
                        },
                        {
                            label : "Injured",
                            backgroundColor : '#3366cc',
                            data : injured
                        }
                    ]
                }
                chart3 = new Chart(context3,config3);

                config4.data = {
                    labels : fcrLabel,
                    datasets : [
                        {
                            label : "FCR",
                            backgroundColor : '#3366cc',
                            borderColor : '#3366cc',
                            data : fcr,
                            fill : false
                        }
                    ]
                }

                chart4 = new Chart(context4, config4);
            }

            else{
                config1.data.datasets.splice(0,config1.data.datasets.length);
                config2.data.datasets.splice(0,config2.data.datasets.length);
                
                let newDataOne = {
                    label: "Chicken Temperature",
                    yAxisID: "yAxis-Temp",
                    data: pointTempAll,
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
                    data: pointHumidityAll,
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
                    data: pointLightAll,
                    pointRadius: 0,
                    fill: false,
                    lineTension: 0.5,
                    borderWidth: 2,
                    borderColor: "rgba(207, 89, 89, 0.7)",
                    backgroundColor: "rgba(207, 89, 89, 0.7)",
                    pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
                }
        
                config1.data.labels = labelAll;
                config1.data.datasets.push(newDataOne);
                config1.data.datasets.push(newDataTwo);
                config1.data.datasets.push(newDataThree);
                config1.options.scales.xAxes[0].time.unit = "minute";
                chart1.update();

                config2.data = {
                    labels: chickenFeed,
                    datasets : [
                        {
                            label : "Feed Given (KG)",
                            backgroundColor: '#22aa99',
                            data : feedConsume,
                            stack : 'feed'
                        },
                        {
                            label : "Feed Left (KG)",
                            backgroundColor : '#994499',
                            data : feedLeft,
                            stack : 'feed'
                        },
                        {
                            label : "Water Given (KG)",
                            backgroundColor : '#dc3912',
                            data : waterConsume,
                            stack : 'water'
                        },
                        {
                            label : "Water Left (KG)",
                            backgroundColor : '#109618',
                            data : waterLeft,
                            stack : 'water'
                        }
                    ]
                }
                chart2.update();

                config3.data = {
                    labels : healthLabel,
                    datasets : [
                        {
                            label : "Healthy",
                            backgroundColor : '#22aa99',
                            data : healthy
                        },
                        {
                            label : "Dead",
                            backgroundColor : '#994499',
                            data : dead
                        },
                        {
                            label : "Sick",
                            backgroundColor : '#dc3912',
                            data : sick
                        },
                        {
                            label : "Cull",
                            backgroundColor : '#dc3912',
                            data : cull
                        },
                        {
                            label : "Injured",
                            backgroundColor : '#3366cc',
                            data : injured
                        }
                    ]
                }

                chart3.update();

                config4.data = {
                    labels : fcrLabel,
                    datasets : [
                        {
                            label : "FCR",
                            backgroundColor : '#3366cc',
                            borderColor : '#3366cc',
                            data : fcr,
                            fill : false
                        }
                    ]
                }

                chart4.update();
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
            labelBSFAll = [];
            pointTempBSFAll = [];
            pointHumidityBSFAll = [];
            pointLightBSFAll = [];
            eggLabel = [];
            egg = [];

            if(bsfObj != undefined){
                for(var x = 0; x < Object.keys(bsfObj[areaSelected]).length; ++x){
                    var k = Object.keys(bsfObj[areaSelected])[x];
                    var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                    var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));
    
                    if(newstartdate <= bsfObj[areaSelected][k].timestamp && newenddate >= bsfObj[areaSelected][k].timestamp){
                        labelBSFAll.push(bsfObj[areaSelected][k].timestamp);
                        pointTempBSFAll.push(bsfObj[areaSelected][k].temperature);
                        pointHumidityBSFAll.push(bsfObj[areaSelected][k].humidity);
                        pointLightBSFAll.push(bsfObj[areaSelected][k].light);
                    }
                }
            }

            if(productionObj != undefined){
                for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
                    var key = Object.keys(productionObj[type][areaSelected])[x];
                    var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                    var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));
    
                    if(newstartdate <= productionObj[type][areaSelected][key].timestamp && newenddate >= productionObj[type][areaSelected][key].timestamp){
                        eggLabel.push(productionObj[type][areaSelected][key].timestamp);
                        egg.push(productionObj[type][areaSelected][key].eggProduce);
                    }
                }
            }

            config1.data.datasets.splice(0,config1.data.datasets.length);
            config2.data.datasets.splice(0,config2.data.datasets.length);

            let newDataBSFOne = {
                label: "BSF Temperature",
                yAxisID: "yAxis-Temp",
                data: pointTempBSFAll,
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
                data: pointHumidityBSFAll,
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
                data: pointLightBSFAll,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(207, 89, 89, 0.7)",
                backgroundColor: "rgba(207, 89, 89, 0.7)",
                pointHoverBorderColor : "rgba(207, 89, 89, 0.9)",
            }

            config1.data.labels = labelBSFAll;
            config1.data.datasets.push(newDataBSFOne);
            config1.data.datasets.push(newDataBSFTwo);
            config1.data.datasets.push(newDataBSFThree);
            config1.options.scales.xAxes[0].time.unit = "minute";
            chart1.update();

            config2.data = {
                labels : eggLabel,
                datasets : [
                    {
                        label : "Eggs Produced (Grams)",
                        backgroundColor : '#3366cc',
                        data : egg
                    }
                ]
            }
            chart2.update();
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
    //end of adding data into the array

    //start of adding data into the array
    else if(type == "BSFL"){
        if(bsflObj[areaSelected] == undefined){
            areaSelected = bsflKeys[0];
        }

        var start = moment().subtract(31,"days");
        var end = moment();

        function dp(start,end){
            labelBSFLAll = [];
            pointTempBSFLAll = [];
            pointMoistureBSFLAll = [];
            pointHumidBSFLDaily = [];
            pointSoilBSFLAll = [];
            larvaeLabel = [];
            larvae = [];
            $("#reportrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
            
            if(bsflObj != undefined){
                for(var x = 0; x < Object.keys(bsflObj[areaSelected]).length; ++x){
                    var k = Object.keys(bsflObj[areaSelected])[x]; 
                    var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                    var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));
    
                    if(newstartdate <= bsflObj[areaSelected][k].timestamp && newenddate >= bsflObj[areaSelected][k].timestamp){
                        labelBSFLAll.push(bsflObj[areaSelected][k].timestamp);
                        pointTempBSFLAll.push(bsflObj[areaSelected][k].temperature);
                        pointMoistureBSFLAll.push(bsflObj[areaSelected][k].moisture);
                        pointHumidBSFLDaily.push(bsflObj[areaSelected][k].humidity);
                        pointSoilBSFLAll.push(bsflObj[areaSelected][k].soilTemp);
                    }
                }
            }

            if(productionObj != undefined){
                for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
                    var key = Object.keys(productionObj[type][areaSelected])[x];
                    var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                    var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));
    
                    if(newstartdate <= productionObj[type][areaSelected][key].timestamp && newenddate >= productionObj[type][areaSelected][key].timestamp){
                        larvaeLabel.push(productionObj[type][areaSelected][key].timestamp);
                        larvae.push(productionObj[type][areaSelected][key].larvaHarvest);
                    }
                }
            }

            config1.data.datasets.splice(0,config1.data.datasets.length);
            config2.data.datasets.splice(0,config2.data.datasets.length);

            let newDataBSFLOne = {
                label: "BSFL Temperature",
                yAxisID: "yAxis-Temp",
                data: pointTempBSFLAll,
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
                data: pointMoistureBSFLAll,
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
                data: pointSoilBSFLAll,
                pointRadius: 0,
                fill: false,
                lineTension: 0.5,
                borderWidth: 2,
                borderColor: "rgba(207, 207, 89, 0.7)",
                backgroundColor: "rgba(207, 207, 89, 0.7)",
                pointHoverBorderColor : "rgba(207, 207, 89, 0.9)",
            }

            config1.data.labels = labelBSFLAll;
            config1.data.datasets.push(newDataBSFLOne);
            config1.data.datasets.push(newDataBSFLTwo);
            config1.data.datasets.push(newDataBSFLThree);
            config1.data.datasets.push(newDataBSFLFour);
            config1.options.scales.xAxes[0].time.unit = "minute";
            
            chart1.update();

            config2.data = {
                labels : larvaeLabel,
                datasets : [
                    {
                        label : "Larvae Harvested (KG)",
                        backgroundColor : '#22aa99',
                        data : larvae
                    }
                ]
            }
            chart2.update();
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
}

$("#typePage li").click(function(){
    if($(this).children().attr("id") == "chickenVisualization"){
        document.getElementById("healthChart").style.display = "block";
        document.getElementById("weightChart").style.display = "block";
        type = "Chicken";
        document.getElementById("dropdown").style.display = "block";
        document.getElementById("headerCanvas1").innerHTML = "Chicken";
        document.getElementById("headerCanvas2").innerHTML = "Production - Feed";

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
        document.getElementById("healthChart").style.display = "none";
        document.getElementById("weightChart").style.display = "none";
        document.getElementById("headerCanvas1").innerHTML = "BSF";
        document.getElementById("headerCanvas2").innerHTML = "Production - Eggs";
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
        document.getElementById("healthChart").style.display = "none";
        document.getElementById("weightChart").style.display = "none";
        document.getElementById("headerCanvas1").innerHTML = "BSFL";
        document.getElementById("headerCanvas2").innerHTML = "Production - Larvae Harvested";
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

function onAreaChange(){
    areaSelected = document.getElementById("dropdown").value;
    drawCharts();
}


