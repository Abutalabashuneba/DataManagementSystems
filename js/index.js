var database = firebase.database();
var ref = database.ref("Data");   

var allObj = [];
var allKeys = [];

var bsfObj;
var bsflObj;
var chickenObj;

var type = "Chicken";
var dropdown = document.querySelector("#chickenAreaDash");
var areaSelected = "Area1";

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

  populateDashboard();
})

if(sessionStorage.getItem("username") == null){
  window.location.replace("login.html");
}

document.getElementById("userName").innerHTML = "Welcome," + sessionStorage.getItem("username");

if(sessionStorage.getItem("type") == "Admin"){
  document.getElementById("register").style.display = "block";
  document.getElementById("sensor").style.display = "block";
}

/*--------------------------  Progess bar for Chicken /*-------------------------- */
function populateDashboard(){

  if(type == "Chicken"){
    if(chickenObj[areaSelected] == undefined){
      areaSelected = "Area1";
    }


    let html = "";

    var keys = Object.keys(chickenObj[areaSelected])[Object.keys(chickenObj[areaSelected]).length-1];

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
    if(dropdown) dropdown.innerHTML = html;

    var card4 = document.getElementById("card4");
    if(card4) card4.style.display = "block";
    //Change card title
    var title1 = document.getElementById("dashCard1Title");
    if(title1) title1.innerHTML = "Chicken - Temperature";
    var title2 = document.getElementById("dashCard2Title");
    if(title2) title2.innerHTML = "Chicken - Humidity";
    var title3 = document.getElementById("dashCard3Title");
    if(title3) title3.innerHTML = "Chicken - Moisture";
    //Change card symbol
    var symbol1 = document.getElementById("symbolCard2");
    if(symbol1) symbol1.innerHTML = "%";

    var symbol2 = document.getElementById("symbolCard3");
    if(symbol2) symbol2.innerHTML = "%";

    //Temeprature
    var dataTemp = chickenObj[areaSelected][keys].temperature;
    var valueTemp = document.getElementById("temp");
    var chkTemp = document.getElementById("dashCard-1");
    if(chkTemp) chkTemp.innerHTML = dataTemp;
    if(valueTemp) valueTemp.setAttribute("data-value",dataTemp);

    //Humidity
    var dataHumid = chickenObj[areaSelected][keys].humidity;
    var valueHumid = document.getElementById("humid");
    var chkHumid = document.getElementById("dashCard-2");
    if(chkHumid) chkHumid.innerHTML = dataHumid;
    if(valueHumid) valueHumid.setAttribute("data-value",dataHumid);

    //Moisture
    var dataMois = chickenObj[areaSelected][keys].moisture;
    var valueMois = document.getElementById("mois");
    var chkMois = document.getElementById("dashCard-3");
    if(chkMois) chkMois.innerHTML = dataMois;
    if(valueMois) valueMois.setAttribute("data-value", dataMois);

    //PH value
    var dataPh = chickenObj[areaSelected][keys].ph;
    var valuePh = document.getElementById("ph");
    var chkPh = document.getElementById("dashCard-4");
    if(chkPh) chkPh.innerHTML = dataPh;
    if(valueMois) valuePh.setAttribute("data-value", dataPh);

    //-------------------Push Chicken warning notification----------------------------------//

    //Convert timestamp to date
    // var date =  new Date(chickenObj[areaSelected][keys].timestamp);
    // var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    // var datetime = date.toLocaleString('en-us', options); //format the time 

    // if(dataTemp < 20 || dataTemp > 30 && datetime != datetime)
    // {
    //   Push.create("Temperature Warning",{
    //     body: "Current Chicken Temperauture is " + dataTemp + "°C",
    //     icon: 'images/warning.png',
    //     timeout: 10000,
    //     onClick: function () {
    //         window.focus();
    //         this.close();
    //     }
    //   });

    //   //Toast messages
    //   var dateTemp = document.getElementById("date-temp")
    //   if(dateTemp) dateTemp.innerHTML = datetime;
    //   var msgTemp = document.getElementById("msg-temp");
    //   if(msgTemp) msgTemp.innerHTML = "The temperature of the Chicken environment is " + dataTemp + "°C";
    //   $('.toast-temp').toast('show');
    // }
    // if(dataHumid < 60 || dataHumid > 80)
    // {
    //   Push.create("Humidity Warning",{
    //     body: "Current Chicken Humidity is " + dataHumid + "%",
    //     icon: 'images/warning.png',
    //     timeout: 100000,
    //     onClick: function () {
    //         window.focus();
    //         this.close();
    //     }
    //   });

    //   //Toast messages
    //   var dateHumid = document.getElementById("date-humid");
    //   if(dateHumid) dateHumid.innerHTML = datetime;
    //   var msgHumid = document.getElementById("msg-humid");
    //   if(msgHumid) msgHumid.innerHTML = "The humidity of the Chicken environment is " + dataHumid + "%";
    //   $('.toast-humid').toast('show');
    // }
    // if(dataMois > 10)
    // {
    //   Push.create("Soil Moisture Warning",{
    //     body: "Current Chicken Soil Moisture is " + dataMois + "%",
    //     icon: 'images/warning.png',
    //     timeout: 100000,
    //     onClick: function () {
    //         window.focus();
    //         this.close();
    //     }
    //   });

    //   //Toast messages
    //   var dateMois = document.getElementById("date-mois");
    //   if(dateMois) dateMois.innerHTML = datetime;
    //   var msgMois = document.getElementById("msg-mois");
    //   if(msgMois) msgMois.innerHTML = "The Soil Moisture of the Chicken environment is " + dataMois + "%";
    //   $('.toast-mois').toast('show');
    // }
    //-------------------End Chicken warning notification----------------------------------//
    

    $(function() {
      $(".progress").each(function() {
      var value = $(this).attr('data-value');
      var left = $(this).find('.progress-left .progress-bar');
      var right = $(this).find('.progress-right .progress-bar');
    console.log(value);
        
    if (value > 0) {
      if (value <= 50) {
      right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
      left.css("transform", "rotate(" + percentageToDegrees(0) + "deg)")
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

  }
  else if(type == "BSF"){
    if(bsfObj[areaSelected] == undefined){
      areaSelected = "Area1";
    }

    let html = "";
    var keys = Object.keys(bsfObj[areaSelected])[Object.keys(bsfObj[areaSelected]).length-1];

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
    dropdown.innerHTML = html;

    //Remove 4th card
    document.getElementById("card4").style.display = "none";
    //Change card title
    document.getElementById("dashCard1Title").innerHTML = "BSF - Temperature";
    document.getElementById("dashCard2Title").innerHTML = "BSF - Humidity";
    document.getElementById("dashCard3Title").innerHTML = "BSF - Light Intensity";
    //Change card symbol
    document.getElementById("symbolCard2").innerHTML = "%";
    document.getElementById("symbolCard3").innerHTML = "Lux";

    //Temeprature
    var dataTempBSF = bsfObj[areaSelected][keys].temperature;
    var valueTempBSF = document.getElementById("temp");
    var bsfTemperature = document.getElementById("dashCard-1");
    if(bsfTemperature) bsfTemperature.innerHTML = dataTempBSF;
    if(valueTempBSF) valueTempBSF.setAttribute("data-value",dataTempBSF);


    //Humidity
    var dataHumidBSF = bsfObj[areaSelected][keys].humidity;
    var valueHumidBSF = document.getElementById("humid");
    var bsfHumidity = document.getElementById("dashCard-2");
    if(bsfHumidity) bsfHumidity.innerHTML = dataHumidBSF;
    if(valueHumidBSF) valueHumidBSF.setAttribute("data-value",dataHumidBSF);

    //Light
    var dataLightBSF = bsfObj[areaSelected][keys].light;
    var valueLightBSF = document.getElementById("mois");
    var bsfLig = document.getElementById("dashCard-3");
    if(bsfLig) bsfLig.innerHTML = dataLightBSF;
    if(valueLightBSF) valueLightBSF.setAttribute("data-value", dataLightBSF);

    //-----------------Push BSF warning notification--------------------------------//
    //Convert timestamp to date
    var dateBSF =  new Date(bsfObj[areaSelected][keys].timestamp);
    var optionsBSF = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    var datetimeBSF = dateBSF.toLocaleString('en-us', optionsBSF); //format the time 

    // if(dataTempBSF < 25 || dataTempBSF > 35)
    // {
    //   Push.create("Temperature Warning",{
    //     body: "Current Black Soldier Fly Temperauture is " + dataTempBSF + "°C",
    //     icon: 'images/warning.png',
    //     timeout: 10000,
    //     onClick: function () {
    //         window.focus();
    //         this.close();
    //     }
    //   });

    //   //Toast messages
    //   var dateTempBSF = document.getElementById("date-tempBSF");
    //   if(dateTempBSF) dateTempBSF.innerHTML = datetimeBSF;
    //   var msgTempBSF = document.getElementById("msg-tempBSF");
    //   if(msgTempBSF) msgTempBSF.innerHTML = "The temperature of the BSF environment is " + dataTempBSF + "°C";
    //   $('.toast-tempBSF').toast('show');
    // }
    // if(dataHumidBSF < 60)
    // {
    //   Push.create("Humidity Warning",{
    //     body: "Current Black Soldier Fly Humidity is " + dataHumidBSF + "%",
    //     icon: 'images/warning.png',
    //     timeout: 10000,
    //     onClick: function () {
    //         window.focus();
    //         this.close();
    //     }
    //   });

    //   //Toast messages
    //   var dateHumidBSF = document.getElementById("date-humidBSF")
    //   if(dateHumidBSF) dateHumidBSF.innerHTML = datetimeBSF;
    //   var msgHumidBSF = document.getElementById("msg-humidBSF");
    //   if(msgHumidBSF) msgHumidBSF.innerHTML = "The humidity of the BSF environment is " + dataHumidBSF + "%";
    //   $('.toast-humidBSF').toast('show');
    // }
    // if(dataLightBSF < 1000)
    // {
    //   Push.create("Light Intensity Warning",{
    //     body: "Current Black Soldier Fly intensity of light is " + dataLightBSF  + "LUX",
    //     icon: 'images/warning.png',
    //     timeout: 10000,
    //     onClick: function () {
    //         window.focus();
    //         this.close();
    //     }
    //   });

    //   //Toast messages
    //   var dateLuxBSF = document.getElementById("date-luxBSF");
    //   if(dateLuxBSF) dateLuxBSF.innerHTML = datetimeBSF;
    //   var msgLuxBSF = document.getElementById("msg-luxBSF");
    //   if(msgLuxBSF) msgLuxBSF.innerHTML = "The Light Intensity of the BSF environment is " + dataLightBSF + "LUX";
    //   $('.toast-luxBSF').toast('show');
    // }
    //-----------------End of Push BSF warning notification--------------------------------//

    $(function() {
      $(".progress").each(function() {
      var value = $(this).attr('data-value');
      var left = $(this).find('.progress-left .progress-bar');
      var right = $(this).find('.progress-right .progress-bar');
      console.log(value);
    if (value > 0) {
      if (value <= 50) {
        right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
        left.css("transform", "rotate(" + percentageToDegrees(0) + "deg)")
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

  }
  else if(type == "BSFL"){
    if(bsflObj[areaSelected] == undefined){
      areaSelected = "Area1";
    }

    let html = "";
    var keys = Object.keys(bsflObj[areaSelected])[Object.keys(bsflObj[areaSelected]).length-1];


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
    dropdown.innerHTML = html;
    //Remove 4th card
    document.getElementById("card4").style.display = "none";
    //Change card title
    document.getElementById("dashCard1Title").innerHTML = "BSFL - Temperature";
    document.getElementById("dashCard2Title").innerHTML = "BSFL - pH Value";
    document.getElementById("dashCard3Title").innerHTML = "BSFL - Soil Moisture";
    //Change card symbol
    document.getElementById("symbolCard2").innerHTML = "pH";
    document.getElementById("symbolCard3").innerHTML = "%";

    //Temeprature
    var dataTempBSFL = bsflObj[areaSelected][keys].temperature;
    var valueTempBSFL = document.getElementById("tempBSFL");
    var bsflTemperature = document.getElementById("dashCard-1");
    if(bsflTemperature) bsflTemperature.innerHTML = dataTempBSFL;
    if(valueTempBSFL) valueTempBSFL.setAttribute("data-value",dataTempBSFL);
    console.log(dataTempBSFL);
    //pH
    var dataPhBSFL = bsflObj[areaSelected][keys].ph;
    var valuePhBSFL = document.getElementById("phBSFL");
    var bsflpH = document.getElementById("dashCard-2");
    if(bsflpH) bsflpH.innerHTML = dataPhBSFL;
    if(valuePhBSFL) valuePhBSFL.setAttribute("data-value",dataPhBSFL);

    //Soil Moisture
    var dataMoistureBSFL = bsflObj[areaSelected][keys].moisture;
    var valueMoistureBSFL = document.getElementById("moistureBSFL");
    var bsflMoisture = document.getElementById("dashCard-3");
    if(bsflMoisture) bsflMoisture.innerHTML = dataMoistureBSFL;
    if(valueMoistureBSFL) valueMoistureBSFL.setAttribute("data-value", dataMoistureBSFL);

    //----------------------------Push BSFL warning notification-----------------------------------//
    //Convert timestamp to datetime
    // var dateBSFL =  new Date(bsflObj[bsflKeys[bsflKeys.length-1]].timestamp);
    // var optionsBSF = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    // var datetimeBSFL = dateBSFL.toLocaleString('en-us', optionsBSF); //format the time 

    // if(dataTempBSFL < 30 || dataTempBSFL > 36)
    // {
    //   Push.create("Temperature Warning",{
    //     body: "Current Black Soldier Fly Larvae Temperauture is " + dataTempBSFL + "°C",
    //     icon: 'images/warning.png',
    //     timeout: 10000,
    //     onClick: function () {
    //         window.focus();
    //         this.close();
    //     }
    //   });

    //   //Toast messages
    //   var tempBSFL = document.getElementById("date-tempBSFL");
    //   if(tempBSFL) tempBSFL.innerHTML = datetimeBSFL;
    //   var msgTempBSFL = document.getElementById("msg-tempBSFL");
    //   if(msgTempBSFL) msgTempBSFL.innerHTML = "The temperature of the BSFL environment is " + dataTempBSFL + "°C";
    //   $('.toast-tempBSFL').toast('show');
    // }
    // if(dataPhBSFL < 6 || dataPhBSFL > 10)
    // {
    //   Push.create("pH Value Warning",{
    //     body: "Current Black Soldier Fly Larvae pH value is " + dataPhBSFL + "pH",
    //     icon: 'images/warning.png',
    //     timeout: 10000,
    //     onClick: function () {
    //         window.focus();
    //         this.close();
    //     }
    //   });

    //   //Toast messages
    //   var datephBSFL = document.getElementById("date-phBSFL");
    //   if(datephBSFL) datephBSFL.innerHTML = datetimeBSFL;
    //   var msgphBSFL = document.getElementById("msg-phBSFL");
    //   if(msgphBSFL) msgphBSFL.innerHTML = "The pH soil of the BSFL environment is " + dataPhBSFL + "pH";
    //   $('.toast-phBSFL').toast('show');
    // }
    // if(dataMoistureBSFL < 60 || dataMoistureBSFL > 80)
    // {
    //   Push.create("Soil Moisture Warning",{
    //     body: "Current Black Soldier Fly Larvae Soil Moisture is " + dataMoistureBSFL + "%",
    //     icon: 'images/warning.png',
    //     timeout: 10000,
    //     onClick: function () {
    //         window.focus();
    //         this.close();
    //     }
    //   });

    //   //Toast messages
    //   var dateMoistBSFL = document.getElementById("date-moisBSFL");
    //   if(dateMoistBSFL) dateMoistBSFL.innerHTML = datetimeBSFL;
    //   var msgMoistBSFL = document.getElementById("msg-moisBSFL");
    //   if(msgMoistBSFL) msgMoistBSFL.innerHTML = "The soil moisture of the BSFL environment is " + dataMoistureBSFL + "%";
    //   $('.toast-moisBSFL').toast('show');
    // }
    
    //End of Push BSF warning notification

    $(function() {
      $(".progress").each(function() {
      var value = $(this).attr('data-value');
      var left = $(this).find('.progress-left .progress-bar');
      var right = $(this).find('.progress-right .progress-bar');
        console.log(value);
      if (value > 0) {
        if (value <= 50) {
        right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
        } else {
        right.css('transform', 'rotate(180deg)')
        left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
        }
      }})
    
      function percentageToDegrees(percentage) {
        return percentage / 100 * 360
      }
    
    });
  }
  

    



}



function dataAreaChange(){
  areaSelected = document.getElementById("chickenAreaDash").value;
  
  if(type == "Chicken"){
    populateDashboard();
  }

  else if(type == "BSF"){
    populateDashboard();
  }

  else if(type == "BSFL"){
    populateDashboard();
  }
}

$("#dashPage li").click(function(){
  if($(this).children().attr("id") == "dashChickenBtn"){
    document.getElementById("dashboardTitle").innerHTML = "Chicken";
  }

  else if($(this).children().attr("id") == "dashBSFBtn"){
    document.getElementById("dashboardTitle").innerHTML = "BSF";
  }

  else if($(this).children().attr("id") == "dashBSFLBtn"){
    document.getElementById("dashboardTitle").innerHTML = "BSFL";
  }

  type = document.getElementById("dashboardTitle").textContent;
  areaSelected = "Area1";
  populateDashboard();
})


    

