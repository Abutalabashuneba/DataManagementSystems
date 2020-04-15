var database = firebase.database();
var ref = database.ref("account");

$("#signUpForm").submit(function(e){
    e.preventDefault();

    var username = document.getElementById("uname").value;
    var pass = document.getElementById("pwd").value;
    var admin = document.getElementById("admin").checked;
    var name = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("mobile").value;
    var type = undefined;

    if(admin){
        type = "Admin";
    }else{
        type = "User";
    }

    var data = {
        username : username,
        password : pass,
        type : type,
        fullname : name,
        email : email,
        phone : phone
    }

    ref.push(data);

    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        
        window.alert("Error:" + errorMessage);
      });

      $("#signUpForm")[0].reset();
});
