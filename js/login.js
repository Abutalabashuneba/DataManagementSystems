var database = firebase.database();
var userRef = database.ref("account");

$("#loginForm").submit(function(e){
    e.preventDefault();
    var pass = document.getElementById("pwd").value;
    // var admin = document.getElementById("admin").checked;
    var email = document.getElementById("email").value;
    // var type = undefined;
    var validate = false;
    var errorMessage = "";

    // if(admin) type = "Admin";
    // else type = "User";

    userRef.on("value", snap=>{
      var userObj = snap.val();
      var userKeys = Object.keys(userObj);

      for(var x = 0; x < userKeys.length; ++x){
        var k = userKeys[x];
  
        if(email == userObj[k].email || email == userObj[k].username){
          if(pass == userObj[k].password){
            validate = true;
            sessionStorage.setItem("username",userObj[k].username);
            sessionStorage.setItem("type",userObj[k].type);
            break;
          }else{
            errorMessage = "Wrong password";
            break;
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




