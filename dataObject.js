var database = firebase.database();
var dataRef = database.ref("Data");
var sensorRef = database.ref("Sensors");
var userRef = database.ref("account");


//read database for child account
//create empty global variables
var userObj;
var userKeys;
userRef.on("value", snap=>{
    //ensure that the variable is empty
    if(userObj != undefined || userObj != null) userObj.splice(0,userObj.length);
    if(userKeys != undefined || userKeys != null) userKeys.splice(0,userKeys.length);

    //store data into the variable
    userObj = snap.val();
    userKeys = Object.keys(userObj);
})

//read database for child data
//create empty global variables
var dataObj;
var dataKeys;
dataRef.on("value", snap=>{
    //ensure that the variable is empty
    if(dataObj != undefined || dataObj != null) dataObj.splice(0,dataObj.length);
    if(dataKeys != undefined || dataKeys != null) dataKeys.splice(0,dataKeys.length);

    //store data into the variable
    dataObj = snap.val();
    dataKeys = Object.keys(dataObj);
})


