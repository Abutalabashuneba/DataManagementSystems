let database = firebase.database();
let ref = database.ref("Data");    
let dataRef = database.ref("Data/Chicken/Area1");
let sensorRef = database.ref("Sensors");
let userRef = database.ref("account");
let cproductionRef = database.ref("Data/Production/Chicken");
let bsfproductionRef = database.ref("Data/Production/BSF");
let bsflproductionRef = database.ref("Data/Production/BSFL");
let chicken1ref = database.ref("Data/Chicken/Area1");
let chicken2ref = database.ref("Data/Chicken/Area2");
let bsfref = database.ref("Data/BSF/Area1");
let bsflref = database.ref("Data/BSFL/Area1");

//read database for child account
//create empty global variables
let userObj;
let userKeys;
userRef.on("value", snap=>{
    //store data into the variable
    userObj = snap.val();
    userKeys = Object.keys(userObj);
})

//read database for child data
//create empty global variables
let dataObj;
let dataKeys;
dataRef.on("value", snap=>{
    //store data into the variable
    dataObj = snap.val();
    dataKeys = Object.keys(dataObj);
})

chicken1ref.on("value", snap=>{
    let x = snap.val();
    let k = Object.keys(x);

    // console.log(x);
})


