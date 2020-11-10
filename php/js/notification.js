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

    for(var x = 0; x < chickenLast.length; ++x){
        // console.log(chickenLast[x].humidity);
        // console.log(chickenLast[x].temperature);
        // console.log(chickenLast[x].light);
        if(chickenLast[x].temperature < 20 || chickenLast[x].temperature > 30){
            Push.create("Tempareature Warning", {
                body : "Current Chicken Temperature is ",
                icon : "images/warning.png",
                timeout : 5000,
                onClick : function() {
                    window.focus();
                    this.close();
                }
            });
        }
    }
}