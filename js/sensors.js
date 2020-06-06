//connect to firebase database 
//get reference to the related child (Data)
var database = firebase.database();
var ref = database.ref("Sensors");

var bsfObj;
var bsflObj;
var chickenObj;

var type = "Chicken";
var dropdown = document.querySelector("#chickenAreaSensor");
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
    
    populateSensor();
})

function populateSensor(){

    if(type == "Chicken"){
        if(chickenObj[areaSelected] == undefined){
            areaSelected = "Area1";
        }

        let html = "";

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
        dropdown.innerHTML = html;
        
        document.getElementById("card-1").innerHTML = "Chicken - Temp & Humidity Sensor (DHT11)";
        document.getElementById("card-2").innerHTML = "Chicken - Soil Moisture Sensor (FC-28)";

        //Read sensor status
        var dht11Status = chickenObj[areaSelected].DHT11.Status;
        var f28Status = chickenObj[areaSelected].FC28.Status;

        //Check DHT11 sensor switch
        if(dht11Status == "On" && type == "Chicken")
        {
            $(".switchTemp").prop("checked", true);
        }
        else
        {
            $(".switchTemp").prop("checked", false);
        }

        //Check DHT11 sensor switch
        if(f28Status == "On")
        {
            $(".switchMois").prop("checked", true);
        }
        else
        {
            $(".switchMois").prop("checked", false);
        }
    }
    else if(type == "BSF"){
        if(bsfObj[areaSelected] == undefined){
            areaSelected = "Area1";
        }

        let html = "";

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
        
        document.getElementById("card-3").style.display = "block";
        document.getElementById("card-1").innerHTML = "BSF - Temp & Humidity Sensor (DHT11)";
        document.getElementById("card-2").innerHTML = "BSF - Soil Moisture Sensor (FC-28)";

        //Read sensor status
        var dht11Status = bsfObj[areaSelected].DHT11.Status;
        var f28Status = bsfObj[areaSelected].FC28.Status;
        var lightStatus = bsfObj[areaSelected].LightSensor.Status;

        //Check DHT11 sensor switch
        if(dht11Status == "On" && type == "BSF")
        {
            $(".switchTemp").prop("checked", true);
        }
        else
        {
            $(".switchTemp").prop("checked", false);
        }

        //Check DHT11 sensor switch
        if(f28Status == "On")
        {
            $(".switchMois").prop("checked", true);
        }
        else
        {
            $(".switchMois").prop("checked", false);
        }

        //Check light sensor switch
        if(lightStatus == "On")
        {
            $(".switchLight").prop("checked", true);
        }
        else
        {
            $(".switchLight").prop("checked", false);
        }
    }
    else if(type == "BSFL"){
        if(bsflObj[areaSelected] == undefined){
            areaSelected = "Area1";
        }

        let html = "";

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
        
        document.getElementById("card-3").style.display = "none";
        document.getElementById("card-1").innerHTML = "BSFL - Temp & Humidity Sensor (DHT11)";
        document.getElementById("card-2").innerHTML = "BSFL - Soil Moisture Sensor (FC-28)";

        //Read sensor status
        var dht11Status = bsflObj[areaSelected].DHT11.Status;
        var f28Status = bsflObj[areaSelected].FC28.Status;
    
        //Check DHT11 sensor switch
        if(dht11Status == "On" && type == "BSFL")
        {
            $(".switchTemp").prop("checked", true);
        }
        else
        {
            $(".switchTemp").prop("checked", false);
        }

        //Check DHT11 sensor switch
        if(f28Status == "On")
        {
            $(".switchMois").prop("checked", true);
        }
        else
        {
            $(".switchMois").prop("checked", false);
        }

    }
}

//DHT11
$("#switchTemp").change(function(){
    if($(this).prop("checked") == true){
        console.log(type);
        ref.child(type+'/'+areaSelected+'/DHT11').update({Status:'On'})
    }else{
        console.log("11111");
        ref.child(type+'/'+areaSelected+'/DHT11').update({Status:'Off'})
    }
});

//FC-28
$("#switchMois").change(function(){
    if($(this).prop("checked") == true){
        ref.child(type+'/'+areaSelected+'/FC28').update({Status:'On'})
    }else{
        ref.child(type+'/'+areaSelected+'/FC28').update({Status:'Off'})
    }
});

//Light Sensor
$("#switchLight").change(function(){
    if($(this).prop("checked") == true){
        ref.child(type+'/'+areaSelected+'/LightSensor').update({Status:'On'})
    }else{
        ref.child(type+'/'+areaSelected+'/LightSensor').update({Status:'Off'})
    }
});

function dataAreaChange(){
    areaSelected = document.getElementById("chickenAreaDash").value;
    
    if(type == "Chicken"){
        populateSensor();
    }
  
    else if(type == "BSF"){
        populateSensor();
    }
  
    else if(type == "BSFL"){
        populateSensor();
    }
  }
  
  $("#sensorPage li").click(function(){
    if($(this).children().attr("id") == "sensorChicken"){
      document.getElementById("sensorTitle").innerHTML = "Chicken";
    }
  
    else if($(this).children().attr("id") == "sensorBSFAdult"){
      document.getElementById("sensorTitle").innerHTML = "BSF";
    }
  
    else if($(this).children().attr("id") == "sensorBSFLarvae"){
      document.getElementById("sensorTitle").innerHTML = "BSFL";
    }
  
    type = document.getElementById("sensorTitle").textContent;
    areaSelected = "Area1";
    populateSensor();
  })