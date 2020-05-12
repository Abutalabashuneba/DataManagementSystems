var database = firebase.database();
var dataRef = database.ref("Data");
var sensorRef = database.ref("Sensors");
var userRef = database.ref("account");
var productionRef = database.ref("Data/Productivity");

//read database for child account
//create empty global variables
var userObj;
var userKeys;
userRef.on("value", snap=>{
    //store data into the variable
    userObj = snap.val();
    userKeys = Object.keys(userObj);
})

//read database for child data
//create empty global variables
var dataObj;
var dataKeys;
dataRef.on("value", snap=>{
    //store data into the variable
    dataObj = snap.val();
    dataKeys = Object.keys(dataObj);
})

var productionObj;
var productionKeys;
productionRef.on("value", snap=>{
    //store data into the variable
    productionObj = snap.val();
    productionKeys = Object.keys(productionObj);
})




