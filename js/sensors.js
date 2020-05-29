//connect to firebase database 
//get reference to the related child (Data)
var database = firebase.database();
var sensorRef = database.ref("Sensors");



//Update status firebase
//DHT11
$("#switchTemp").change(function(){
    if($(this).prop("checked") == true){
       console.log("True");
       sensorRef.child('DHT11').update({'Status':'On'})
    }else{
        console.log("False");
        sensorRef.child('DHT11').update({'Status':'Off'})
    }
});

//FC-28
$("#switchMois").change(function(){
    if($(this).prop("checked") == true){
       console.log("True");
       sensorRef.child('FC28').update({'Status':'On'})
    }else{
        console.log("False");
        sensorRef.child('FC28').update({'Status':'Off'})
    }
});


//Read sensor status
sensorRef.on('value', function(snapshot) {
    var dht11Status = (snapshot.val().DHT11.Status);
    var f28Status = (snapshot.val().FC28.Status);
    console.log("DHT11: " + dht11Status);
    console.log("FC-28: " + f28Status);

    //Check DHT11 sensor switch
    if(dht11Status == "On")
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

});

