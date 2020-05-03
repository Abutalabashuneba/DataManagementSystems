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

//console.log(todayDate); 5/2/2020 toLocaleDateString();
//console.log(todayDate); 5/2/2020, 5:40:56 PM toLocaleString
//console.log(todayDate); 5:41:19 PM toLocaleTimeString


var xlabel1 = [];
var points1 = [];

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
        
        if(date == todayDate){
            xlabel1.push(dataObj[k].timestamp);
            
            if(dataObj[k].temperature == undefined){
                points1.push(0);
            }else{
                points1.push(dataObj[k].temperature);
            }
        }
        
        xlabel4.push(dataObj[k].timestamp);
        if(dataObj[k].temperature == undefined){
            points4.push(0);
        }else{
            points4.push(dataObj[k].temperature);
        }
    }
    //console.log(xlabel1,xlabel4);
    
    
    plot1();
    plot4();
})

var chart1;
function plot1(){
    var ctx = document.getElementById("myChart1").getContext("2d");
    //if(chart1 != undefined) chart1.destroy();
    chart1 = new Chart(ctx,{
        data:{
            labels: xlabel1,
            datasets:[{
                label: "Temperature",
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
            scales:{
                xAxes:[{
                    type: "time",
                    distribution: "linear",
                    offset : false,
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
    chart1.update();
}

var chart4;
function plot4(){
    var ctx = document.getElementById("myChart4").getContext("2d");

    chart4 = new Chart(ctx, {
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
                borderWidth: 2,
            }]
        },
        options:{
            scales:{
                xAxes: [{
                    type: "time",
                    distribution : "linear",
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

    chart4.update();

    //console.log(json.labels);
    //console.log(json.data.rate);
}