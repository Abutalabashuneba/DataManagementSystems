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

$("#logoutForm").submit(function(e){
    e.preventDefault();
   
    /*firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });*/

    sessionStorage.clear();
    window.location.replace("login.html");
});



/*--------------------------  Progess bar for Chicken /*-------------------------- */
dataref.on("value", snap =>{
  var dataObj = snap.val();
  var keys = Object.keys(dataObj);
  //console.log(dataObj);
  //console.log(keys);

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

  //Push Chicken warning notification
  if(dataTemp < 20 || dataTemp > 30)
  {
    console.log(dataTemp);
    Push.create("Temperature Warning",{
      body: "Current Chicken Temperauture is " + dataTemp + "°C",
      icon: 'images/warning.png',
      timeout: 10000,
      onClick: function () {
          window.focus();
          this.close();
      }
    });
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
  }
  //End of Push Chicken warning notification

  
  

  if(dataMois == "Too Wet")
  {
    $(document).ready(function(){
      $(".border-mois").addClass("border-warning");
    })
    
  }
  else if(dataMois == "Too Dry")
  {
    $(document).ready(function(){
      $(".border-mois").addClass("border-danger");
    })
    
  }
  else
  {
    $(document).ready(function(){
      $(".border-mois").addClass("border-primary");
    })
    
  }
  

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

  //Push BSF warning notification
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

/*--------------------------  Progess bar for BSFL /*-------------------------- */
bsflDataref.on("value", snap =>{
  var dataObjBSF = snap.val();
  var keysBSF = Object.keys(dataObjBSF);

  //Temeprature
  var dataTempBSFL = dataObjBSF[keysBSF[keysBSF.length-1]].temperature;
  var valueTempBSFL = document.getElementById("tempBSFL");
  var bsflTemperature = document.getElementById("bsflTemp");
  if(bsflTemperature) bsflTemperature.innerHTML = dataTempBSFL;
  if(valueTempBSFL) valueTempBSFL.setAttribute("data-value",dataTempBSFL);

  //pH
  var dataPhBSFL = dataObjBSF[keysBSF[keysBSF.length-1]].pH;
  var valuePhBSFL = document.getElementById("phBSFL");
  var bsflpH = document.getElementById("bsflPH");
  if(bsflpH) bsflpH.innerHTML = dataPhBSFL;
  if(valuePhBSFL) valuePhBSFL.setAttribute("data-value",dataPhBSFL);

  //Soil Moisture
  var dataMoistureBSFL = dataObjBSF[keysBSF[keysBSF.length-1]].moisture;
  var valueMoistureBSFL = document.getElementById("moistureBSFL");
  var bsflMoisture = document.getElementById("bsflMoisture");
  if(bsflMoisture) bsflMoisture.innerHTML = dataMoistureBSFL;
  if(valueMoistureBSFL) valueMoistureBSFL.setAttribute("data-value", dataMoistureBSFL);

  //Push BSF warning notification
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





    

