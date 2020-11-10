var database = firebase.database();
var ref = database.ref("Data");

var dataObj;
var bsfObj;
var bsflObj;
var chickenObj;

ref.on("value", snap=>{
    dataObj = snap.val();
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

    checkThreshold();
})

function checkThreshold(){
    var chickenArea = Object.keys(chickenObj);
    var bsfArea = Object.keys(bsfObj);
    var bsflArea = Object.keys(bsflObj);
    var chickenLast = [];
    var bsfLast = [];
    var bsflLast = [];

    for(var x = 0; x < chickenArea.length; ++x){
        var k = chickenArea[x];
        
        chickenLast.push(chickenObj[k][Object.keys(chickenObj[k])[Object.keys(chickenObj[k]).length - 1]]);
    }

    for(var x = 0; x < bsfArea.length; ++x){
        var k = bsfArea[x];

        bsfLast.push(bsfObj[k][Object.keys(bsfObj[k])[Object.keys(bsfObj[k]).length - 1]]);
    }

    for(var x = 0; x < bsflArea.length; ++x){
        var k = bsflArea[x];

        bsflLast.push(bsflObj[k][Object.keys(bsflObj[k])[Object.keys(bsflObj[k]).length - 1]]);
    }
    
    for(var x = 0; x < chickenLast.length; ++x){
        var bodyMsg = "";
        
        if(chickenLast[x].temperature < 20 || chickenLast[x].temperature > 30){
            bodyMsg += "Tempearature Warning (20 - 30) : " + chickenLast[x].temperature + "\n";
        }

        if(chickenLast[x].humidity < 60 || chickenLast[x].humidity > 80){
            bodyMsg += "Humidity Warning (60 - 80) : " + chickenLast[x].humidity + "\n";
        }

        if(chickenLast[x].light >= 1000){
            bodyMsg += "Light Warning (< 1000) : " + chickenLast[x].light + "\n";
        }

        if(bodyMsg != ""){
            Push.create("Threshold Warning for : " + chickenkeys[x], {
                body : bodyMsg,
                icon : "images/warning.png",
                timeout : 5000,
                onClick : function() {
                    window.focus();
                    this.close();
                }
            });
        }
    }

    for(var x = 0; x < bsfLast.length; ++x){
        var bodyMsg = "";

        if(bsfLast[x].temperature < 25 || bsfLast[x].temperature > 35){
            bodyMsg += "Temperature Warning (25 - 35) : " + bsfLast[x].temperature + "\n";
        }

        if(bsflLast[x].humidity >= 60){
            bodyMsg += "Humidity Warning (< 60) : " + bsfLast[x].humidity + "\n";
        }

        if(bsfLast[x].light >= 1000){
            bodyMsg += "Light Warning (< 1000) : " + bsfLast[x].light + "\n";
        }

        if(bodyMsg != ""){
            Push.create("Threshold Warning for : " + bsfkeys[x], {
                body : bodyMsg,
                icon : "images/warning.png",
                timeout : 5000,
                onClick : function() {
                    window.focus();
                    this.close();
                }
            })
        }
    }

    for(var x = 0; x < bsflLast.length; ++x){
        var bodyMsg = "";
        
        if(bsflLast[x].temperature < 30 || bsflLast[x].temperature > 36){
            bodyMsg += "Temperature Warning (30 - 36) : " + bsflLast[x].temperature + "\n";
        }

        if(bsflLast[x].humidity < 60 || bsflLast[x].humidity > 80){
            bodyMsg += "Humidity Warning (60 - 80) : " + bsflLast[x].humidity + "\n";
        }

        if(bsflLast[x].moisture < 60 || bsflLast[x].moisture > 80){
            bodyMsg += "Moisture Warning (60 - 80) : " + bsflLast[x].moisture + "\n";
        }

        if(bsflLast[x].soilTemp < 20 || bsfLast[x].soilTemp > 30){
            bodyMsg += "Soil Temperature Warning (20 - 30) : " + bsflLast[x].soilTemp + "\n";
        }

        if(bodyMsg != ""){
            Push.create("Threshold Warning for : " + bsflkeys[x],{
                body : bodyMsg,
                icon : "images/warning.png",
                timeout : 5000,
                onClick : function(){
                    window.focus();
                    this.close();
                }
            })
        }
    }
}