//Permission request for notification
var requestBtn = document.querySelector("#requestBtn");

//tooltip for notify button
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

if(requestBtn){
  function onGranted(){
    requestBtn.style.background = "green";
    }
    
    function onDenied(){
    requestBtn.style.background = "red";
    }
    
    requestBtn.onclick = function(){
    console.log("Running");
    Push.Permission.request(onGranted, onDenied);
    }
}
//End of Permission request for notification

var database = firebase.database();
var ref = database.ref("Data"); 

var allObj = [];
var allKeys = [];

var bsfObj;
var bsflObj;
var chickenObj;

var chickenAreaNum = [];
var chickenTempArr = [];
var chickenHumidArr = [];
var chickenMoisArr = [];
var chickenPhArr = [];

var bsfAreaNum = [];
var bsfTempArr = [];
var bsfHumidArr = [];
var bsfLightArr = [];

var bsflAreaNum = [];
var bsflTempArr = [];
var bsflMoisArr = [];
var bsflPhArr = [];

var date;
var date2;
var date3;

var options;

var datetime;
var datetimeBSF;
var datetimeBSFL;

var areaChicken = [];
var areaBSF = [];
var areaBSFL = [];

var countC = 0;
var countBSF = 0;
var countBSFL = 0;

var chickenDate = [];
var bsfDate = [];
var bsflDate = [];

ref.on("value", snap=>{
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
	}
  
	bsfKeys = Object.keys(bsfObj);
	bsflKeys = Object.keys(bsflObj);
	chickenKeys = Object.keys(chickenObj);
    
	for (var x = 0; x < chickenKeys.length; x++)
	{
		areaChicken[x] = chickenKeys[x];
	}
	
	for (var b = 0; b < areaChicken.length; b++)
	{
		if (b > 0)
		{
			countC += Object.keys(chickenObj[areaChicken[b-1]]).length;
		}
		
		for (var a = 0; a < Object.keys(chickenObj[areaChicken[b]]).length; a++)
		{
			if (b > 0)
			{
				chickenAreaNum[countC + a] = chickenKeys[b];
				chickenTempArr[countC + a] = chickenObj[areaChicken[b]][Object.keys(chickenObj[areaChicken[b]])[a]].temperature;
				chickenHumidArr[countC + a] = chickenObj[areaChicken[b]][Object.keys(chickenObj[areaChicken[b]])[a]].humidity;
				chickenMoisArr[countC + a] = chickenObj[areaChicken[b]][Object.keys(chickenObj[areaChicken[b]])[a]].moisture;
				chickenPhArr[countC + a] = chickenObj[areaChicken[b]][Object.keys(chickenObj[areaChicken[b]])[a]].ph;
				
				//Convert timestamp to date
				date =  new Date(chickenObj[areaChicken[b]][Object.keys(chickenObj[areaChicken[b]])[a]].timestamp);
				options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
				datetime = date.toLocaleString('en-us', options); //format the time
				chickenDate[countC + a] = datetime;
			}
			
			else
			{
				chickenAreaNum[a] = chickenKeys[b];
				chickenTempArr[a] = chickenObj[areaChicken[b]][Object.keys(chickenObj[areaChicken[b]])[a]].temperature;
				chickenHumidArr[a] = chickenObj[areaChicken[b]][Object.keys(chickenObj[areaChicken[b]])[a]].humidity;
				chickenMoisArr[a] = chickenObj[areaChicken[b]][Object.keys(chickenObj[areaChicken[b]])[a]].moisture;
				chickenPhArr[a] = chickenObj[areaChicken[b]][Object.keys(chickenObj[areaChicken[b]])[a]].ph;
				
				date =  new Date(chickenObj[areaChicken[b]][Object.keys(chickenObj[areaChicken[b]])[a]].timestamp);
				options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
				datetime = date.toLocaleString('en-us', options); //format the time
				chickenDate[a] = datetime;
			}
		}
	}

    populateNotiChicken();
	
	for (var x = 0; x < bsfKeys.length; x++)
	{
		areaBSF[x] = bsfKeys[x];
	}
	
	for (var b = 0; b < areaBSF.length; b++)
	{
		if (b > 0)
		{
			countBSF += Object.keys(bsfObj[areaBSF[b-1]]).length;
		}
		
		for (var a = 0; a < Object.keys(bsfObj[areaBSF[b]]).length; a++)
		{
			if (b > 0)
			{
				bsfAreaNum[countBSF + a] = bsfKeys[b];
				bsfTempArr[countBSF + a] = bsfObj[areaBSF[b]][Object.keys(bsfObj[areaBSF[b]])[a]].temperature;
				bsfHumidArr[countBSF + a] = bsfObj[areaBSF[b]][Object.keys(bsfObj[areaBSF[b]])[a]].humidity;
				bsfLightArr[countBSF + a] = bsfObj[areaBSF[b]][Object.keys(bsfObj[areaBSF[b]])[a]].light;
				
				//Convert timestamp to date
				date2 =  new Date(bsfObj[areaBSF[b]][Object.keys(bsfObj[areaBSF[b]])[a]].timestamp);
				options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
				datetimeBSF = date2.toLocaleString('en-us', options); //format the time
				bsfDate[countBSF + a] = datetimeBSF;
			}
			
			else
			{
				bsfAreaNum[a] = bsfKeys[b];
				bsfTempArr[a] = bsfObj[areaBSF[b]][Object.keys(bsfObj[areaBSF[b]])[a]].temperature;
				bsfHumidArr[a] = bsfObj[areaBSF[b]][Object.keys(bsfObj[areaBSF[b]])[a]].humidity;
				bsfLightArr[a] = bsfObj[areaBSF[b]][Object.keys(bsfObj[areaBSF[b]])[a]].light;
				
				date2 =  new Date(bsfObj[areaBSF[b]][Object.keys(bsfObj[areaBSF[b]])[a]].timestamp);
				options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
				datetimeBSF = date2.toLocaleString('en-us', options); //format the time
				bsfDate[a] = datetimeBSF;
			}
		}
	}

    populateNotiBSF();
	
	for (var x = 0; x < bsflKeys.length; x++)
	{
		areaBSFL[x] = bsflKeys[x];
	}
	
	for (var b = 0; b < areaBSFL.length; b++)
	{
		if (b > 0)
		{
			countBSFL += Object.keys(bsflObj[areaBSFL[b-1]]).length;
		}
		
		for (var a = 0; a < Object.keys(bsflObj[areaBSFL[b]]).length; a++)
		{
			if (b > 0)
			{
				bsflAreaNum[countBSFL + a] = bsflKeys[b];
				bsflTempArr[countBSFL + a] = bsflObj[areaBSFL[b]][Object.keys(bsflObj[areaBSFL[b]])[a]].temperature;
				bsflMoisArr[countBSFL + a] = bsflObj[areaBSFL[b]][Object.keys(bsflObj[areaBSFL[b]])[a]].moisture;
				bsflPhArr[countBSFL + a] = bsflObj[areaBSFL[b]][Object.keys(bsflObj[areaBSFL[b]])[a]].ph;
				
				//Convert timestamp to date
				date3 =  new Date(bsflObj[areaBSFL[b]][Object.keys(bsflObj[areaBSFL[b]])[a]].timestamp);
				options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
				datetimeBSFL = date3.toLocaleString('en-us', options); //format the time
				bsflDate[countBSFL + a] = datetimeBSFL;
			}
			
			else
			{
				bsflAreaNum[a] = bsflKeys[b];
				bsflTempArr[a] = bsflObj[areaBSFL[b]][Object.keys(bsflObj[areaBSFL[b]])[a]].temperature;
				bsflMoisArr[a] = bsflObj[areaBSFL[b]][Object.keys(bsflObj[areaBSFL[b]])[a]].moisture;
				bsflPhArr[a] = bsflObj[areaBSFL[b]][Object.keys(bsflObj[areaBSFL[b]])[a]].ph;
				
				date3 =  new Date(bsflObj[areaBSFL[b]][Object.keys(bsflObj[areaBSFL[b]])[a]].timestamp);
				options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
				datetimeBSFL = date3.toLocaleString('en-us', options); //format the time
				bsflDate[a] = datetimeBSFL;
			}
		}
	}
	
	populateNotiBSFL();
})
  
function populateNotiChicken(){
	for (var i = 0; i < chickenTempArr.length; ++i)
	{
		if(chickenTempArr[i] < 20 || chickenTempArr[i] > 30 )
		{
			Push.create("Temperature Warning",{
				body: "Current Chicken Temperauture in " + chickenAreaNum[i] + " is " + chickenTempArr[i] + "°C",
				icon: 'images/warning.png',
				timeout: 10000,
				onClick: function () {
					window.focus();
					this.close();
				}
			});
			
			$('#chickenT').append('<div class="toast toast-temp mx-auto" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" style="width:500px;"><div class="toast-header text-warning"><strong class="mr-auto">Chicken Temperature</strong><small id="date-temp'+ i +'"></small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="toast-body" id="msg-temp'+ i +'"></div></div>');
			
			//Toast messages
			var dateTemp = document.getElementById("date-temp" + i)
			if(dateTemp) dateTemp.innerHTML = chickenDate[i];
			
			var msgTemp = document.getElementById("msg-temp" + i);
			if(msgTemp) msgTemp.innerHTML = "The temperature of the Chicken environment in " + chickenAreaNum[i] + " is " + chickenTempArr[i] + "°C";
			
			$('.toast-temp').toast('show');
		}
		
		if(chickenHumidArr[i] < 60 || chickenHumidArr[i] > 80)
		{
			Push.create("Humidity Warning",{
				body: "Current Chicken Area Humidity in " + chickenAreaNum[i] + " is " + chickenHumidArr[i] + "%",
				icon: 'images/warning.png',
				timeout: 10000,
				onClick: function () {
					window.focus();
					this.close();
				}
			});
	
			$('#chickenH').append('<div class="toast toast-humid mx-auto" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" style="width:500px;"><div class="toast-header text-warning"><strong class="mr-auto">Chicken Humidity</strong><small id="date-humid'+ i +'"></small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="toast-body" id="msg-humid'+ i +'"></div></div>');
			
			//Toast messages
			var dateHumid = document.getElementById("date-humid" + i);
			if(dateHumid) dateHumid.innerHTML = chickenDate[i];
			
			var msgHumid = document.getElementById("msg-humid" + i);
			if(msgHumid) msgHumid.innerHTML = "The humidity of the Chicken environment in " + chickenAreaNum[i] + " is " + chickenHumidArr[i] + "%<br>";
			
			$('.toast-humid').toast('show');
		}
	
		if(chickenMoisArr[i] > 10)
		{
			Push.create("Soil Moisture Warning",{
				body: "Current Chicken Area Soil Moisture in " + chickenAreaNum[i] + " is " + chickenMoisArr[i] + "%",
				icon: 'images/warning.png',
				timeout: 10000,
				onClick: function () {
					window.focus();
					this.close();
				}
			});
			
			$('#chickenM').append('<div class="toast toast-mois mx-auto" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" style="width:500px;"><div class="toast-header text-warning"><strong class="mr-auto">Chicken Soil Moisture</strong><small id="date-mois'+ i +'"></small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="toast-body" id="msg-mois'+ i +'"></div></div>');
	  
			//Toast messages
			var dateMois = document.getElementById("date-mois" + i);
			if(dateMois) dateMois.innerHTML = chickenDate[i];
			
			var msgMois = document.getElementById("msg-mois" + i);
			if(msgMois) msgMois.innerHTML = "The Soil Moisture of the Chicken environment in " + chickenAreaNum[i] + " is " + chickenMoisArr[i] + "%";
			
			$('.toast-mois').toast('show');
		}
	}
}

function populateNotiBSF(){
	for (var i = 0; i < bsfTempArr.length; ++i)
	{
		if(bsfTempArr[i] < 25 || bsfTempArr[i] > 35)
		{
			Push.create("Temperature Warning",{
				body: "Current Black Soldier Fly Area Temperauture in " + bsfAreaNum[i] + " is " + bsfTempArr[i] + "°C",
				icon: 'images/warning.png',
				timeout: 10000,
				onClick: function () {
					window.focus();
					this.close();
				}
			});
			
			$('#bsfT').append('<div class="toast toast-tempBSF mx-auto" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" style="width:500px;"><div class="toast-header text-warning"><strong class="mr-auto">BSF Temperature</strong><small id="date-tempBSF'+ i +'"></small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="toast-body" id="msg-tempBSF'+ i +'"></div></div>');

			//Toast messages
			var dateTempBSF = document.getElementById("date-tempBSF" + i);
			if(dateTempBSF) dateTempBSF.innerHTML = bsfDate[i];
			
			var msgTempBSF = document.getElementById("msg-tempBSF" + i);
			if(msgTempBSF) msgTempBSF.innerHTML = "The temperature of the BSF environment in " + bsfAreaNum[i] + " is " + bsfTempArr[i] + "°C";
			
			$('.toast-tempBSF').toast('show');
		}
		
		if(bsfHumidArr[i] < 60)
		{
			Push.create("Humidity Warning",{
				body: "Current Black Soldier Fly Humidity in " + bsfAreaNum[i] + " is " + bsfHumidArr[i] + "%",
				icon: 'images/warning.png',
				timeout: 10000,
				onClick: function () {
					window.focus();
					this.close();
				}
			});
			
			$('#bsfH').append('<div class="toast toast-humidBSF mx-auto" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" style="width:500px;"><div class="toast-header text-warning"><strong class="mr-auto">BSF Humidity</strong><small id="date-humidBSF'+ i +'"></small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="toast-body" id="msg-humidBSF'+ i +'"></div></div>');

			//Toast messages
			var dateHumidBSF = document.getElementById("date-humidBSF" + i)
			if(dateHumidBSF) dateHumidBSF.innerHTML = bsfDate[i];
		  
			var msgHumidBSF = document.getElementById("msg-humidBSF" + i);
			if(msgHumidBSF) msgHumidBSF.innerHTML = "The humidity of the BSF environment " + bsfAreaNum[i] + " is " + bsfHumidArr[i] + "%";
		  
			$('.toast-humidBSF').toast('show');
		}
		
		if(bsfLightArr[i] < 1000)
		{
			Push.create("Light Intensity Warning",{
				body: "Current Black Soldier Fly intensity of light in " + bsfAreaNum[i] + " is " + bsfLightArr[i]  + " LUX",
				icon: 'images/warning.png',
				timeout: 10000,
				onClick: function () {
					window.focus();
					this.close();
				}
			});
			
			$('#bsfM').append('<div class="toast toast-luxBSF mx-auto" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" style="width:500px;"><div class="toast-header text-warning"><strong class="mr-auto">BSF Light Intensity</strong><small id="date-luxBSF'+ i +'"></small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="toast-body" id="msg-luxBSF'+ i +'"></div></div>');

			//Toast messages
			var dateLuxBSF = document.getElementById("date-luxBSF" + i);
			if(dateLuxBSF) dateLuxBSF.innerHTML = bsfDate[i];
			
			var msgLuxBSF = document.getElementById("msg-luxBSF" + i);
			if(msgLuxBSF) msgLuxBSF.innerHTML = "The Light Intensity of the BSF environment in " + bsfAreaNum[i] + " is " + bsfLightArr[i] + " LUX";
			
			$('.toast-luxBSF').toast('show');
		}
	}
}

function populateNotiBSFL(){
	for (var i = 0; i < bsflTempArr.length; ++i)
	{
		if(bsflTempArr[i] < 30 || bsflTempArr[i] > 36)
		{
			Push.create("Temperature Warning",{
				body: "Current Black Soldier Fly Larvae Temperauture in " + bsflAreaNum[i] + " is " + bsflTempArr[i] + "°C",
				icon: 'images/warning.png',
				timeout: 10000,
				onClick: function () {
					window.focus();
					this.close();
				}
			});
			
			$('#bsflT').append('<div class="toast toast-tempBSFL mx-auto" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" style="width:500px;"><div class="toast-header text-warning"><strong class="mr-auto">BSFL Temperature</strong><small id="date-tempBSFL'+ i +'"></small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="toast-body" id="msg-tempBSFL'+ i +'"></div></div>');

			//Toast messages
			var tempBSFL = document.getElementById("date-tempBSFL" + i);
			if(tempBSFL) tempBSFL.innerHTML = bsflDate[i];
		  
			var msgTempBSFL = document.getElementById("msg-tempBSFL" + i);
			if(msgTempBSFL) msgTempBSFL.innerHTML = "The temperature of the BSFL environment in " + bsflAreaNum[i] + " is " + bsflTempArr[i] + "°C";
		  
			$('.toast-tempBSFL').toast('show');
		}
		
		if(bsflPhArr[i] < 6 || bsflPhArr[i] > 10)
		{
			Push.create("pH Value Warning",{
				body: "Current Black Soldier Fly Larvae pH value in " + bsflAreaNum[i] + " is " + bsflPhArr[i] + "pH",
				icon: 'images/warning.png',
				timeout: 10000,
				onClick: function () {
					window.focus();
					this.close();
				}
			});
			
			$('#bsflP').append('<div class="toast toast-phBSFL mx-auto" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" style="width:500px;"><div class="toast-header text-warning"><strong class="mr-auto">BSFL Soil pH</strong><small id="date-phBSFL'+ i +'"></small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="toast-body" id="msg-phBSFL'+ i +'"></div></div>');

			//Toast messages
			var datephBSFL = document.getElementById("date-phBSFL" + i);
			if(datephBSFL) datephBSFL.innerHTML = bsflDate[i];
			
			var msgphBSFL = document.getElementById("msg-phBSFL" + i);
			if(msgphBSFL) msgphBSFL.innerHTML = "The pH soil of the BSFL environment in " + bsflAreaNum[i] + " is " + bsflPhArr[i] + "pH";
			
			$('.toast-phBSFL').toast('show');
		}
		
		if(bsflMoisArr[i] < 60 || bsflMoisArr[i] > 80)
		{
			Push.create("Soil Moisture Warning",{
				body: "Current Black Soldier Fly Larvae Soil Moisture in " + bsflAreaNum[i] + " is " + bsflMoisArr[i] + "%",
				icon: 'images/warning.png',
				timeout: 10000,
				onClick: function () {
					window.focus();
					this.close();
				}
			});
			
			$('#bsflM').append('<div class="toast toast-moisBSFL mx-auto" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" ><div class="toast-header text-warning"><strong class="mr-auto">BSFL Moisture</strong><small id="date-moisBSFL'+ i +'"></small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="toast-body" id="msg-moisBSFL'+ i +'"></div></div>');

			//Toast messages
			var dateMoistBSFL = document.getElementById("date-moisBSFL" + i);
			if(dateMoistBSFL) dateMoistBSFL.innerHTML = bsflDate[i];
			
			var msgMoistBSFL = document.getElementById("msg-moisBSFL" + i);
			if(msgMoistBSFL) msgMoistBSFL.innerHTML = "The soil moisture of the BSFL environment in " + bsflAreaNum[i] + " is " + bsflMoisArr[i] + "%";
			
			$('.toast-moisBSFL').toast('show');
		}
	}
}