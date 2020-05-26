var database = firebase.database();
var ref = database.ref("Data");    
var dataRef = database.ref("Data/Chicken/Area1");
var sensorRef = database.ref("Sensors");
var userRef = database.ref("account");
var cproductionRef = database.ref("Data/Production/Chicken");
var bsfproductionRef = database.ref("Data/Production/BSF");
var bsflproductionRef = database.ref("Data/Production/BSFL");
var chicken1ref = database.ref("Data/Chicken/Area1");
var bsfref = database.ref("Data/BSF/Area1");
var bsflref = database.ref("Data/BSFL/Area1");

//read database for child account
//create empty global variables
var userObj;
var userKeys;
userRef.on("value", snap=>{
    //store data into the variable
    userObj = snap.val();
    userKeys = Object.keys(userObj);

    // console.log(userObj,userKeys);{-M56-QoKaHWvywHibPZJ: {…}, -M56-r22VbjVOyxyxnFE: {…}, -M561V_gZA8dwkRCe3-B: {…}, -M6_dyvuh1GuXyDBwWP7: {…}, -M6n0Zrr6jDwTnJZZ9UX: {…}, …} (11) ["-M56-QoKaHWvywHibPZJ", "-M56-r22VbjVOyxyxnFE", "-M561V_gZA8dwkRCe3-B", "-M6_dyvuh1GuXyDBwWP7", "-M6n0Zrr6jDwTnJZZ9UX", "-M71jGx4yEjnM4Pa22tD", "-M7Rcc-mIvDiWgBr3ZiO", "-M7XkFzWs4KX9jhYkUxk", "-M7cEFHg7Ewz2yxUxT-s", "-M7cFcTb6lup1SVAqk72", "-M7cGA9gTnwUSCpHwhoH"]

    // console.log(userObj[userKeys[0]]); email: "admin@gmail.com", fullname: "admin", id: 1, password: "admin", phone: "0123456677", …}
    
    // console.log(userObj[userKeys[0]].email); admin@gmail.com
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
  
// function test(snapshot){
//     var hehe = snapshot.val();
//     var keys = Object.keys(hehe);

// }

// function getData(){
//     return userRef.once("value").then(test);
// }

// getData().then(function(snapshot){
//     console.log(snapshot);
// })


