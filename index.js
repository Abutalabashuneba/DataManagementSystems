var database = firebase.database();
var ref = database.ref("account");

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

