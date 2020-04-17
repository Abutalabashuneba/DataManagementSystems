var database = firebase.database();
var ref = database.ref("account");

/*firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //window.location.href = "index.html";
    } else {
      // No user is signed in.
    }
  });*/

$("#loginForm").submit(function(e){
    e.preventDefault();

    var pass = document.getElementById("pwd").value;
    var admin = document.getElementById("admin").checked;
    var email = document.getElementById("email").value;
    var type = undefined;
    var validate = false;

    if(admin){
        type = "Admin";
    }else{
        type = "User";
    }
    
    /*firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        document.getElementById("loginError").innerHTML = errorMessage;
      });*/

    ref.on("value", snap =>{
      var accObj = snap.val();
      var keys = Object.keys(accObj);
      var errorMessage = "";

      for(var x = 0; x < keys.length; ++x){
        var k = keys[x];
        if(email == accObj[k].email || email == accObj[k].username){
          if(type == accObj[k].type){
            if(pass == accObj[k].password){
              //console.log("success");
              validate = true;
              sessionStorage.setItem("username",accObj[k].username);
              sessionStorage.setItem("type",accObj[k].type);
            }else{
              errorMessage = "Wrong password";
            }
          }else{
            errorMessage = "Wrong account type";
          }
        }else{
          errorMessage = "No user found";
        }
      }
      
      if(validate){
          window.location.href = "index.html";
          errorMessage = "";
      }

      document.getElementById("loginError").innerHTML = errorMessage;
    })
});




