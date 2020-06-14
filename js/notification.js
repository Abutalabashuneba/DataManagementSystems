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

var chickenTempArea1;
var chickenHumidArea1;
var chickenMoisArea1;
var chickenPHArea1;
var datetime;

var bsfTempArea1;
var bsfHumidArea1;
var bsfLightArea1;
var datetimeBSF;

var bsflTempArea1;
var bsflMoisArea1;
var bsflPHArea1;
var datetimeBSFL;

ref.on("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);
    var area1 = "Area1";
    var area2 = "Area2";
    
  
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
    
    
    //var dataTemp = chickenObj[areaSelected][keys].temperature;
    var keys = Object.keys(chickenObj[area1])[Object.keys(chickenObj[area1]).length-1];
    
    chickenTempArea1 = chickenObj[area1][keys].temperature;
    chickenHumidArea1 = chickenObj[area1][keys].humidity;
    chickenMoisArea1 = chickenObj[area1][keys].moisture;
    chickenPHArea1 = chickenObj[area1][keys].ph;

    //Convert timestamp to date
    var date =  new Date(chickenObj[area1][keys].timestamp);
    var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    datetime = date.toLocaleString('en-us', options); //format the time 
    

    populateNotiChicken();

    var keysBSF = Object.keys(bsfObj[area1])[Object.keys(bsfObj[area1]).length-1];
    bsfTempArea1 = bsfObj[area1][keysBSF].temperature;
    bsfHumidArea1 = bsfObj[area1][keysBSF].humidity;
    bsfLightArea1 = bsfObj[area1][keysBSF].light;

    //Convert timestamp to date
    var date2 =  new Date(bsfObj[area1][keysBSF].timestamp);
    var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    datetimeBSF = date2.toLocaleString('en-us', options); //format the time 

    populateNotiBSF();

    var keysBSFL = Object.keys(bsflObj[area1])[Object.keys(bsflObj[area1]).length-1];
    bsflTempArea1 = bsflObj[area1][keysBSFL].temperature;
    bsflMoisArea1 = bsflObj[area1][keysBSFL].moisture;
    bsflPHArea1 = bsflObj[area1][keysBSFL].ph;

    //Convert timestamp to date
    var date3 =  new Date(bsfObj[area1][keysBSF].timestamp);
    var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    datetimeBSFL = date3.toLocaleString('en-us', options); //format the time 

    populateNotiBSFL();
})
  
function populateNotiChicken(){
    if(chickenTempArea1 < 20 || chickenTempArea1 > 30 )
    {
        Push.create("Temperature Warning",{
            body: "Current Chicken Temperauture at Area-1 is " + chickenTempArea1 + "°C",
            icon: 'images/warning.png',
            onClick: function () {
                window.focus();
                this.close();
        }
        });
    
      
        //Toast messages
        var dateTemp = document.getElementById("date-temp")
        if(dateTemp) dateTemp.innerHTML = datetime;
        var msgTemp = document.getElementById("msg-temp");
        if(msgTemp) msgTemp.innerHTML = "The temperature of the Chicken environment is " + chickenTempArea1 + "°C";
        $('.toast-temp').toast('show');
    }
    if(chickenHumidArea1 < 60 || chickenHumidArea1 > 80)
    {
        Push.create("Humidity Warning",{
            body: "Current Chicken Humidity Area-1 is " + chickenHumidArea1 + "%",
            icon: 'images/warning.png',
            onClick: function () {
                window.focus();
                this.close();
        }
    });

        //Toast messages
        var dateHumid = document.getElementById("date-temp");
        if(dateHumid) dateHumid.innerHTML = datetime;
        var msgHumid = document.getElementById("msg-humid");
        if(msgHumid) msgHumid.innerHTML = "The humidity of the Chicken environment is " + chickenHumidArea1 + "%";
        $('.toast-humid').toast('show');
    }
    if(chickenMoisArea1 > 10)
    {
        Push.create("Soil Moisture Warning",{
          body: "Current Chicken Soil Moisture Area-1 is " + chickenMoisArea1 + "%",
          icon: 'images/warning.png',
          timeout: 100000,
          onClick: function () {
              window.focus();
              this.close();
          }
        });
  
        //Toast messages
        var dateMois = document.getElementById("date-mois");
        if(dateMois) dateMois.innerHTML = datetime;
        var msgMois = document.getElementById("msg-mois");
        if(msgMois) msgMois.innerHTML = "The Soil Moisture of the Chicken environment is " + chickenMoisArea1 + "%";
        $('.toast-mois').toast('show');
    }
}

function populateNotiBSF(){
    if(bsfTempArea1 < 25 || bsfTempArea1 > 35)
    {
      Push.create("Temperature Warning",{
        body: "Current Black Soldier Fly Temperauture is " + bsfTempArea1 + "°C",
        icon: 'images/warning.png',
        timeout: 10000,
        onClick: function () {
            window.focus();
            this.close();
        }
      });

      //Toast messages
      var dateTempBSF = document.getElementById("date-tempBSF");
      if(dateTempBSF) dateTempBSF.innerHTML = datetimeBSF;
      var msgTempBSF = document.getElementById("msg-tempBSF");
      if(msgTempBSF) msgTempBSF.innerHTML = "The temperature of the BSF environment is " + bsfTempArea1 + "°C";
      $('.toast-tempBSF').toast('show');
    }
    if(bsfHumidArea1 < 60)
    {
      Push.create("Humidity Warning",{
        body: "Current Black Soldier Fly Humidity is " + bsfHumidArea1 + "%",
        icon: 'images/warning.png',
        timeout: 10000,
        onClick: function () {
            window.focus();
            this.close();
        }
      });

      //Toast messages
      var dateHumidBSF = document.getElementById("date-humidBSF")
      if(dateHumidBSF) dateHumidBSF.innerHTML = datetimeBSF;
      var msgHumidBSF = document.getElementById("msg-humidBSF");
      if(msgHumidBSF) msgHumidBSF.innerHTML = "The humidity of the BSF environment is " + bsfHumidArea1 + "%";
      $('.toast-humidBSF').toast('show');
    }
    if(bsfLightArea1 < 1000)
    {
      Push.create("Light Intensity Warning",{
        body: "Current Black Soldier Fly intensity of light is " + bsfLightArea1  + " LUX",
        icon: 'images/warning.png',
        timeout: 10000,
        onClick: function () {
            window.focus();
            this.close();
        }
      });

      //Toast messages
      var dateLuxBSF = document.getElementById("date-luxBSF");
      if(dateLuxBSF) dateLuxBSF.innerHTML = datetimeBSF;
      var msgLuxBSF = document.getElementById("msg-luxBSF");
      if(msgLuxBSF) msgLuxBSF.innerHTML = "The Light Intensity of the BSF environment is " + bsfLightArea1 + " LUX";
      $('.toast-luxBSF').toast('show');
    }

}

function populateNotiBSFL(){
    if(bsflTempArea1 < 30 || bsflTempArea1 > 36)
    {
      Push.create("Temperature Warning",{
        body: "Current Black Soldier Fly Larvae Temperauture is " + bsflTempArea1 + "°C",
        icon: 'images/warning.png',
        timeout: 10000,
        onClick: function () {
            window.focus();
            this.close();
        }
      });

      //Toast messages
      var tempBSFL = document.getElementById("date-tempBSFL");
      if(tempBSFL) tempBSFL.innerHTML = datetimeBSFL;
      var msgTempBSFL = document.getElementById("msg-tempBSFL");
      if(msgTempBSFL) msgTempBSFL.innerHTML = "The temperature of the BSFL environment is " + bsflTempArea1 + "°C";
      $('.toast-tempBSFL').toast('show');
    }
    if(bsflPHArea1 < 6 || bsflPHArea1 > 10)
    {
      Push.create("pH Value Warning",{
        body: "Current Black Soldier Fly Larvae pH value is " + bsflPHArea1 + "pH",
        icon: 'images/warning.png',
        timeout: 10000,
        onClick: function () {
            window.focus();
            this.close();
        }
      });

      //Toast messages
      var datephBSFL = document.getElementById("date-phBSFL");
      if(datephBSFL) datephBSFL.innerHTML = datetimeBSFL;
      var msgphBSFL = document.getElementById("msg-phBSFL");
      if(msgphBSFL) msgphBSFL.innerHTML = "The pH soil of the BSFL environment is " + bsflPHArea1 + "pH";
      $('.toast-phBSFL').toast('show');
    }
    if(bsflMoisArea1 < 60 || bsflMoisArea1 > 80)
    {
      Push.create("Soil Moisture Warning",{
        body: "Current Black Soldier Fly Larvae Soil Moisture is " + bsflMoisArea1 + "%",
        icon: 'images/warning.png',
        timeout: 10000,
        onClick: function () {
            window.focus();
            this.close();
        }
      });

      //Toast messages
      var dateMoistBSFL = document.getElementById("date-moisBSFL");
      if(dateMoistBSFL) dateMoistBSFL.innerHTML = datetimeBSFL;
      var msgMoistBSFL = document.getElementById("msg-moisBSFL");
      if(msgMoistBSFL) msgMoistBSFL.innerHTML = "The soil moisture of the BSFL environment is " + bsflMoisArea1 + "%";
      $('.toast-moisBSFL').toast('show');
    }
    
}