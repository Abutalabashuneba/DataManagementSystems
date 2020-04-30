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
	var dateArr = [];
	var sumOfTemp = 0;
	var count = 0;
	
    //empty the array
    while(xlabel.length > 0 || points.length > 0){
        xlabel.pop();
        points.pop();
    }

    //push data into chart array
    for(var x = 0; x < keys.length; ++x){
        var k = keys[x];
		
		var a = new Date(dataObj[k].timestamp);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		dateArr.push(date);
	}
	
	for(var x = 0; x < dateArr.length; ++x){
		if (dateArr[x] == dateArr[x+1])
		{
			var k = keys[x];
			sumOfTemp += dataObj[k].temperature;
			count++;
		}				
	
		else{
			if (x == dateArr.length - 1 && dateArr[x] != dateArr[x-1])
			{
				var k = keys[x];
				count ++;
				sumOfTemp += dataObj[k].temperature;
				points.push(sumOfTemp/count);
			}
				
			else
			{
				points.push(sumOfTemp/count);
				sumOfTemp = 0;
				count = 0;
			}
		}
	}
				
	for(var x = 0; x < dateArr.length; x++){	
		if (dateArr[x] == dateArr[x+1])
		{
			delete dateArr[x];										
		}
	}

	for(var x = 0; x < dateArr.length; x++){
		if (Number.isInteger(dateArr[x]) == true)
		{
			var u = keys[x];
			xlabel.push(dataObj[u].timestamp);	
		}
	}
    //end of pushing data
	
	//Chieken temp
    var ctx2 = document.getElementById("myChart2").getContext("2d");
    var chart = new Chart(ctx2,{
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
                xAxes: [{
					type: 'time',
					autoSkip: false,
					time: {
						unit: 'day',
						unitStepSize: 1,
					},
					scaleLabel: {
					  display: true
					},
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
