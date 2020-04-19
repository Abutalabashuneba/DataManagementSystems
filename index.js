var database = firebase.database();
var ref = database.ref("account");
var dataref = database.ref("Data");

if(sessionStorage.getItem("username") == null){
  window.location.replace("login.html");
}

document.getElementById("userName").innerHTML = "Welcome," + sessionStorage.getItem("username");

if(sessionStorage.getItem("type") == "Admin"){
  document.getElementById("register").style.display = "block";
}


/*firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      ref.on("value", snap =>{
        var user = firebase.auth().currentUser;
        var accObj = snap.val();
        var keys = Object.keys(accObj);
    
        for(var x = 0; x < keys.length; ++x){
          var k = keys[x];
          if(user.email == accObj[k].email){
            document.getElementById("userName").innerHTML = "Welcome," + accObj[k].username;
            if(accObj[k].type == "Admin"){
              document.getElementById("register").style.display = "block";
            }
          }
        }
    });
    } else {
      // No user is signed in.
      //window.location.replace("login.html");
    }
  });*/

$("#logoutForm").submit(function(e){
    e.preventDefault();
   
    /*firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });*/

    sessionStorage.clear();
    window.location.replace("login.html");
});

/*--------------- Progess bar-------------------------- */
dataref.on("value", snap =>{
  var dataObj = snap.val();
  var keys = Object.keys(dataObj);
  //console.log(dataObj);
  //console.log(keys);

  //Temeprature
  var dataTemp = dataObj[keys[keys.length-1]].temperature;
  var valueTemp = document.getElementById("temp");
  document.getElementById("chickenTemp").innerHTML = dataTemp;
  valueTemp.setAttribute("data-value",dataTemp);

  //Humidity
  var dataHumid = dataObj[keys[keys.length-1]].humidity;
  var valueHumid = document.getElementById("humid");
  document.getElementById("chickenHumid").innerHTML = dataHumid;
  valueHumid.setAttribute("data-value",dataHumid);

  //Moisture
  var dataMois = dataObj[keys[keys.length-1]].moisture;
  var valueMois = document.getElementById("mois");
  document.getElementById("chickenMois").innerHTML = dataMois;
  valueMois.setAttribute("data-value",100);

  $(function() {
    $(".progress").each(function() {
    console.log("Run");
    var value = $(this).attr('data-value');
    var left = $(this).find('.progress-left .progress-bar');
    var right = $(this).find('.progress-right .progress-bar');
  
  if (value > 0) {
    if (value <= 50) {
    right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
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
  
})
