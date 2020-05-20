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
var config;
var chartType = "line";
var context = document.getElementById("myChart1").getContext("2d");
////////////////////////////////////////////////////

var xlabel1 = [];
var points1 = [];

var xlabel2 = [];
var points2 = [];

var xlabel3 = [];
var points3 = [];

var xlabel4 = [];
var points4 = [];

var dataObj;
var keys;

chicken1ref.once("value", snap=>{
    dataObj = snap.val();
    keys = Object.keys(dataObj);

    if(xlabel1.length > 0){
        xlabel1.splice(0,xlabel4.length);
        points1.splice(0,points4.length);
    }

    if(xlabel2.length > 0){
        xlabel2.splice(0,xlabel2.length);
        points2.splice(0,points2.length);
    }

    if(xlabel3.length > 0){
        xlabel3.splice(0,xlabel3.length);
        points3.splice(0,points3.length);
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
        
        if(dataObj[k].timestamp != undefined){
            if(date == todayDate){
                if(dataObj[k].temperature != undefined || dataObj[k].temperature != "Null"){
                    xlabel1.push(dataObj[k].timestamp);
                    points1.push(dataObj[k].temperature);
                }
            }
    
            if(d >= newDate(-7) && d <= newDate(0)){
                if(dataObj[k].temperature != undefined || dataObj[k].temperature != "Null"){
                    xlabel2.push(dataObj[k].timestamp);
                    points2.push(dataObj[k].temperature);
                }
            }
    
            if(month == todayMonth){
                if(dataObj[k].temperature != undefined || dataObj[k].temperature != "Null"){
                    xlabel3.push(dataObj[k].timestamp);
                    points3.push(dataObj[k].temperature);
                }
            }
            
            if(dataObj[k].temperature != undefined || dataObj[k].temperature != "Null"){
                xlabel4.push(dataObj[k].timestamp);
                points4.push(dataObj[k].temperature);
            }
        }
    }

    config = {
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
    myChart = new Chart(context,config);
})

function onTypeChange(){
    chartType = document.getElementById("chartType").value;
    config.data.datasets[0].type = chartType;
    myChart.update();
}

$(document).ready(function(){
    $(".tempPage li").on( 'click', function() {
        //change the active pagination on click
        $( this ).parent().find( 'li.page-item.active' ).removeClass( 'active' );
        $( this ).addClass( 'page-item active' );
        
        //update chart on pagination click
        if($(this).children().attr("id") == "tempToday"){
            config.data.datasets[0].data = points1;
            config.data.labels = xlabel1;
            config.data.datasets[0].label = "Today's temperature";
            config.options.scales.xAxes[0].time.unit = "minute";
            myChart.update();
        }else if($(this).children().attr("id") == "tempWeekly"){
            config.data
            config.data.datasets[0].data = points2;
            config.data.labels = xlabel2;
            config.data.datasets[0].label = "Weekly temperature";
            config.options.scales.xAxes[0].time.unit = "day";
            myChart.update();
        }else if($(this).children().attr("id") == "tempMonthly"){
            config.data.datasets[0].data = points3;
            config.data.labels = xlabel3;
            config.data.datasets[0].label = "Monthly temperature";
            config.options.scales.xAxes[0].time.unit = "day";
            myChart.update();
        }else if($(this).children().attr("id") == "tempAll"){
            config.data.datasets[0].data = points4;
            config.data.labels = xlabel4;
            config.data.datasets[0].label = "Lifetime temperature";
            config.options.scales.xAxes[0].time.unit = "month";
            myChart.update();
        }
    });
})