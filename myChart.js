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

ref.on("value", snap =>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);
    
    //console.log(dataObj); //object
    //console.log(keys); //array

    //chicken temp data
    var xlabel = [];
    var points = [];

    //empty the array
    while(xlabel.length > 0){
        xlabel.pop();
        points.pop();
    }

    //push data into chart array
    for(var x = 0; x < keys.length; ++x){
        var k = keys[x];

        xlabel.push(dataObj[k].timestamp);
        points.push(dataObj[k].temperature);
    }
    //end of pushing data

    //Chieken temp
    var ctx = document.getElementById("myChart1").getContext("2d");
    var chart = new Chart(ctx,{
        type: "line",
        data:{
            labels: xlabel,
            datasets:[{
                label: "Temperature",
                data: points,
                fill: false,
            }],
        },
        options:{
            scales:{
                xAxes:[{
                    type: "time",
                    distribution: "linear",
                    time:{
                        displayFormats:{
                            quarter: 'MMM DD'
                        }
                    }
                }],
                yAxes:[{
                    ticks:{
                        beginAtZero: true,
                    }
                }]
            }
        }
    });
    //End of chicken temp
})
