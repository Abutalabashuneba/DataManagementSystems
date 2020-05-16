var database = firebase.database();
var dataRef = database.ref("Data/Chicken/Area1");
var sensorRef = database.ref("Sensors");
var userRef = database.ref("account");
var productionRef = database.ref("Data/Productivity");

var test = {
    background : "red"
}

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


//var hello = async function() { return "Hello" };
//hello().then(console.log);

//async function hello() {
 //   return greeting = await Promise.resolve("Hello");
 // };
  
function test(snapshot){
    var hehe = snapshot.val();
    var keys = Object.keys(hehe);

}

function getData(){
    return userRef.once("value").then(test);
}

getData().then(function(snapshot){
    console.log(snapshot);
})


