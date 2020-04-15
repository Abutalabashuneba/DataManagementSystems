firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.location.href = "index.html";
    } else {
      // No user is signed in.
    }
  });

$("#loginForm").submit(function(e){
    e.preventDefault();

    var pass = document.getElementById("pwd").value;
    //var admin = document.getElementById("admin").checked;
    var email = document.getElementById("email").value;
    var type = undefined;

    /*if(admin){
        type = "Admin";
    }else{
        type = "User";
    }*/
    
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        document.getElementById("loginError").innerHTML = errorMessage;
      });
});



