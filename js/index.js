var database = firebase.database();
var ref = database.ref("account");
var dataref = database.ref("Data/Chicken/Area1");
var bsfDataref = database.ref("Data/BSF/Area1");
var bsflDataref = database.ref("Data/BSFL/Area1");

if(sessionStorage.getItem("username") == null){
  window.location.replace("login.html");
}

document.getElementById("userName").innerHTML = "Welcome," + sessionStorage.getItem("username");

if(sessionStorage.getItem("type") == "Admin"){
  document.getElementById("register").style.display = "block";
}

/*--------------------------  Progess bar for Chicken /*-------------------------- */
dataref.on("value", snap =>{
  var dataObj = snap.val();
  var keys = Object.keys(dataObj);

  //Temeprature
  var dataTemp = dataObj[keys[keys.length-1]].temperature;
  var valueTemp = document.getElementById("temp");
  var chkTemp = document.getElementById("chickenTemp");
  if(chkTemp) chkTemp.innerHTML = dataTemp;
  if(valueTemp) valueTemp.setAttribute("data-value",dataTemp);

  //Humidity
  var dataHumid = dataObj[keys[keys.length-1]].humidity;
  var valueHumid = document.getElementById("humid");
  var chkHumid = document.getElementById("chickenHumid");
  if(chkHumid) chkHumid.innerHTML = dataHumid;
  if(valueHumid) valueHumid.setAttribute("data-value",dataHumid);

  //Moisture
  var dataMois = dataObj[keys[keys.length-1]].moisture;
  var valueMois = document.getElementById("mois");
  var chkMois = document.getElementById("chickenMois");
  if(chkMois) chkMois.innerHTML = dataMois;
  if(valueMois) valueMois.setAttribute("data-value", dataMois);

  //PH value
  var dataPh = dataObj[keys[keys.length-1]].ph;
  var valuePh = document.getElementById("ph");
  var chkPh = document.getElementById("chickenPh");
  if(chkPh) chkPh.innerHTML = dataPh;
  if(valueMois) valuePh.setAttribute("data-value", dataPh);

  //-------------------Push Chicken warning notification----------------------------------//

  //Convert timestamp to date
  var date =  new Date(dataObj[keys[keys.length-1]].timestamp);
  var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  var datetime = date.toLocaleString('en-us', options); //format the time 

  if(dataTemp < 20 || dataTemp > 30)
  {
    Push.create("Temperature Warning",{
      body: "Current Chicken Temperauture is " + dataTemp + "°C",
      icon: 'images/warning.png',
      timeout: 10000,
      onClick: function () {
          window.focus();
          this.close();
      }
    });

    //Toast messages
    var dateTemp = document.getElementById("date-temp")
    if(dateTemp) dateTemp.innerHTML = datetime;
    var msgTemp = document.getElementById("msg-temp");
    if(msgTemp) msgTemp.innerHTML = "The temperature of the Chicken environment is " + dataTemp + "°C";
    $('.toast-temp').toast('show');
  }
  if(dataHumid < 60 || dataHumid > 80)
  {
    Push.create("Humidity Warning",{
      body: "Current Chicken Humidity is " + dataHumid + "%",
      icon: 'images/warning.png',
      timeout: 100000,
      onClick: function () {
          window.focus();
          this.close();
      }
    });

    //Toast messages
    var dateHumid = document.getElementById("date-humid");
    if(dateHumid) dateHumid.innerHTML = datetime;
    var msgHumid = document.getElementById("msg-humid");
    if(msgHumid) msgHumid.innerHTML = "The humidity of the Chicken environment is " + dataHumid + "%";
    $('.toast-humid').toast('show');
  }
  if(dataMois > 10)
  {
    Push.create("Soil Moisture Warning",{
      body: "Current Chicken Soil Moisture is " + dataMois + "%",
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
    if(msgMois) msgMois.innerHTML = "The Soil Moisture of the Chicken environment is " + dataMois + "%";
    $('.toast-mois').toast('show');
  }
  //-------------------End Chicken warning notification----------------------------------//
  

  $(function() {
    $(".progress").each(function() {
    var value = $(this).attr('data-value');
    var left = $(this).find('.progress-left .progress-bar');
    var right = $(this).find('.progress-right .progress-bar');
  
  if (value > 0) {
    if (value <= 50) {
    right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
    } else {
    right.css('transform', 'rotate(180deg)')
    left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
    }
  }
  
  })
  
  function percentageToDegrees(percentage) {
    return percentage / 100 * 360
  }
  
  });
  
})


/*--------------------------  Progess bar for BSF /*-------------------------- */
bsfDataref.on("value", snap =>{
  var dataObjBSF = snap.val();
  var keysBSF = Object.keys(dataObjBSF);

  //Temeprature
  var dataTempBSF = dataObjBSF[keysBSF[keysBSF.length-1]].temperature;
  var valueTempBSF = document.getElementById("tempBSF");
  var bsfTemperature = document.getElementById("bsfTemp");
  if(bsfTemperature) bsfTemperature.innerHTML = dataTempBSF;
  if(valueTempBSF) valueTempBSF.setAttribute("data-value",dataTempBSF);


  //Humidity
  var dataHumidBSF = dataObjBSF[keysBSF[keysBSF.length-1]].humidity;
  var valueHumidBSF = document.getElementById("humidBSF");
  var bsfHumidity = document.getElementById("bsfHumid");
  if(bsfHumidity) bsfHumidity.innerHTML = dataHumidBSF;
  if(valueHumidBSF) valueHumidBSF.setAttribute("data-value",dataHumidBSF);

  //Light
  var dataLightBSF = dataObjBSF[keysBSF[keysBSF.length-1]].light;
  var valueLightBSF = document.getElementById("lightBSF");
  var bsfLig = document.getElementById("bsfLight");
  if(bsfLig) bsfLig.innerHTML = dataLightBSF;
  if(valueLightBSF) valueLightBSF.setAttribute("data-value", dataLightBSF);

  //-----------------Push BSF warning notification--------------------------------//
  //Convert timestamp to date
  var dateBSF =  new Date(dataObjBSF[keysBSF[keysBSF.length-1]].timestamp);
  var optionsBSF = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  var datetimeBSF = dateBSF.toLocaleString('en-us', optionsBSF); //format the time 

  if(dataTempBSF < 25 || dataTempBSF > 35)
  {
    Push.create("Temperature Warning",{
      body: "Current Black Soldier Fly Temperauture is " + dataTempBSF + "°C",
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
    if(msgTempBSF) msgTempBSF.innerHTML = "The temperature of the BSF environment is " + dataTempBSF + "°C";
    $('.toast-tempBSF').toast('show');
  }
  if(dataHumidBSF < 60)
  {
    Push.create("Humidity Warning",{
      body: "Current Black Soldier Fly Humidity is " + dataHumidBSF + "%",
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
    if(msgHumidBSF) msgHumidBSF.innerHTML = "The humidity of the BSF environment is " + dataHumidBSF + "%";
    $('.toast-humidBSF').toast('show');
  }
  if(dataLightBSF < 1000)
  {
    Push.create("Light Intensity Warning",{
      body: "Current Black Soldier Fly intensity of light is " + dataLightBSF  + "LUX",
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
    if(msgLuxBSF) msgLuxBSF.innerHTML = "The Light Intensity of the BSF environment is " + dataLightBSF + "LUX";
    $('.toast-luxBSF').toast('show');
  }
  //-----------------End of Push BSF warning notification--------------------------------//

  $(function() {
    $(".progress").each(function() {
    var value = $(this).attr('data-value');
    var left = $(this).find('.progress-left .progress-bar');
    var right = $(this).find('.progress-right .progress-bar');
  
  if (value > 0) {
    if (value <= 50) {
    right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
    } else {
    right.css('transform', 'rotate(180deg)')
    left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
    }
  }
  
  })
  
  function percentageToDegrees(percentage) {
    return percentage / 100 * 360
  }
  
  });
  
})

/*--------------------------  Progess bar for BSFL /*-------------------------- */
bsflDataref.on("value", snap =>{
  var dataObjBSFL = snap.val();
  var keysBSFL = Object.keys(dataObjBSFL);

  //Temeprature
  var dataTempBSFL = dataObjBSFL[keysBSFL[keysBSFL.length-1]].temperature;
  var valueTempBSFL = document.getElementById("tempBSFL");
  var bsflTemperature = document.getElementById("bsflTemp");
  if(bsflTemperature) bsflTemperature.innerHTML = dataTempBSFL;
  if(valueTempBSFL) valueTempBSFL.setAttribute("data-value",dataTempBSFL);

  //pH
  var dataPhBSFL = dataObjBSFL[keysBSFL[keysBSFL.length-1]].pH;
  var valuePhBSFL = document.getElementById("phBSFL");
  var bsflpH = document.getElementById("bsflPH");
  if(bsflpH) bsflpH.innerHTML = dataPhBSFL;
  if(valuePhBSFL) valuePhBSFL.setAttribute("data-value",dataPhBSFL);

  //Soil Moisture
  var dataMoistureBSFL = dataObjBSFL[keysBSFL[keysBSFL.length-1]].moisture;
  var valueMoistureBSFL = document.getElementById("moistureBSFL");
  var bsflMoisture = document.getElementById("bsflMoisture");
  if(bsflMoisture) bsflMoisture.innerHTML = dataMoistureBSFL;
  if(valueMoistureBSFL) valueMoistureBSFL.setAttribute("data-value", dataMoistureBSFL);

  //----------------------------Push BSFL warning notification-----------------------------------//
  //Convert timestamp to datetime
  var dateBSFL =  new Date(dataObjBSFL[keysBSFL[keysBSFL.length-1]].timestamp);
  var optionsBSF = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  var datetimeBSFL = dateBSFL.toLocaleString('en-us', optionsBSF); //format the time 

  if(dataTempBSFL < 30 || dataTempBSFL > 36)
  {
    Push.create("Temperature Warning",{
      body: "Current Black Soldier Fly Larvae Temperauture is " + dataTempBSFL + "°C",
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
    if(msgTempBSFL) msgTempBSFL.innerHTML = "The temperature of the BSFL environment is " + dataTempBSFL + "°C";
    $('.toast-tempBSFL').toast('show');
  }
  if(dataPhBSFL < 6 || dataPhBSFL > 10)
  {
    Push.create("pH Value Warning",{
      body: "Current Black Soldier Fly Larvae pH value is " + dataPhBSFL + "pH",
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
    if(msgphBSFL) msgphBSFL.innerHTML = "The pH soil of the BSFL environment is " + dataPhBSFL + "pH";
    $('.toast-phBSFL').toast('show');
  }
  if(dataMoistureBSFL < 60 || dataMoistureBSFL > 80)
  {
    Push.create("Soil Moisture Warning",{
      body: "Current Black Soldier Fly Larvae Soil Moisture is " + dataMoistureBSFL + "%",
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
    if(msgMoistBSFL) msgMoistBSFL.innerHTML = "The soil moisture of the BSFL environment is " + dataMoistureBSFL + "%";
    $('.toast-moisBSFL').toast('show');
  }
  
  //End of Push BSF warning notification

  $(function() {
    $(".progress").each(function() {
    var value = $(this).attr('data-value');
    var left = $(this).find('.progress-left .progress-bar');
    var right = $(this).find('.progress-right .progress-bar');
  
  if (value > 0) {
    if (value <= 50) {
    right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
    } else {
    right.css('transform', 'rotate(180deg)')
    left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
    }
  }
  
  })
  
  function percentageToDegrees(percentage) {
    return percentage / 100 * 360
  }
  
  });
  
})





    

