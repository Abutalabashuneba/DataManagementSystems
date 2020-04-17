var database = firebase.database();
var ref = database.ref("account");

if(sessionStorage.getItem("username") == null){
    window.location.replace("login.html");
  }

$("#signUpForm").submit(function(e){
    e.preventDefault();
    
    var username = document.getElementById("uname").value;
    var pass = document.getElementById("pwd").value;
    var pwdCon = document.getElementById("pwdCon").value;
    var admin = document.getElementById("admin").checked;
    var name = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("mobile").value;
    var type = undefined;
    var errorMessage = "";
    var validate = true;

    if(admin){
        type = "Admin";
    }else{
        type = "User";
    }

    ref.once("value", snap => {
        if(snap.val() == null){
            var len = 0;

            if(pwdCon == pass){
                var data = {
                    id : len + 1,
                    username : username,
                    password : pass,
                    type : type,
                    fullname : name,
                    email : email,
                    phone : phone
                }
    
                ref.push(data);
                $("#signUpForm")[0].reset();
                errorMessage = "";
            }else{
                errorMessage = "Password did not match";
            }
        }else{
            var accObj = snap.val();
            var keys = Object.keys(accObj);
            var len = keys.length;

            for(var x = 0; x < len; ++x){
                var k = keys[x];

                if(email == accObj[k].email || username == accObj[k].username || phone == accObj[k].phone){
                    validate = false;
                    errorMessage = "Email/Username/Phone existed";
                }
            }

            if(validate){
                if(pwdCon == pass){
                    var data = {
                        id : len + 1,
                        username : username,
                        password : pass,
                        type : type,
                        fullname : name,
                        email : email,
                        phone : phone
                    }
        
                    ref.push(data);
                    $("#signUpForm")[0].reset();
                    errorMessage = "";
                }else{
                    errorMessage = "Password did not match";
                }
            }
        }
        document.getElementById("signUpMsg").innerHTML = errorMessage;
    });
    
});
