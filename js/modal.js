var database = firebase.database();
var refAcc = database.ref("account");

function registerForm(){
    $.showModal({
        title : "Register Account",
        body: 
            '<form><div class="form-group px-5">' +
            '<input type="text" name="uname" id="uname" class="form-control registerInput" placeholder="Enter username" required/></div>' + 
            '<div class="form-group px-5">' +
            '<input type="text" name="fullname" id="fullname" class="form-control registerInput" placeholder="Enter fullname" required/></div>' + 
            '<div class="form-group px-5">' + 
            '<input type="email" name="email" id="email" class="form-control registerInput" placeholder="Enter email" required/></div>' + 
            '<div class="form-group px-5">' + 
            '<input type="text" name="mobile" id="mobile" class="form-control registerInput" placeholder="Enter mobile no" required/></div>' + 
            '<div class="form-group px-5">' +
            '<input type="password" name="pwd" id="pwd" placeholder="Enter password" class="form-control registerInput" required/></div>' + 
            '<div class="form-group px-5">' + 
            '<input type="password" name="pwdCon" id="pwdCon" placeholder="Re-enter password" class="form-control registerInput" required/></div>' +
            '<div class="form-group text-center"><span>For: </span><label>' + 
            '<input type="radio" name="accountType" id="admin" required value="Admin">Admin</label>' + 
            '<label><input type="radio" name="accountType" id="user" required value="User">User</label></div>' + 
            '<button type="submit" name="signup" class="btn  btn-block signupBtn text-white">SignUp</button></form>',
        onCreate: function(modal){
            $(modal.element).on("click","button[type='submit']", function(event){
                event.preventDefault()
                var $form = $(modal.element).find("form")
                var accType;
                var validate = true;

                if($form.find("#admin").is(':checked')){
                    accType = "Admin";
                }else{
                    accType = "User";
                }

                $.showConfirm({
                    title: "Account information summary",
                    textTrue: "Yes",
                    textFalse: "No",
                    body:
                        '<b>Username</b>: ' + $form.find('#uname').val() + "<br/>" +
                        '<b>Fullname</b>: ' + $form.find('#fullname').val() + "<br/>" +
                        '<b>Email</b>: ' + $form.find('#email').val() + "<br/>" +
                        '<b>Mobile No.</b>: ' + $form.find('#mobile').val() + "<br/>" +
                        '<b>Type</b>: ' + accType,
                        onSubmit: function(result){
                            if(result){
                                refAcc.once("value",snap=>{
                                    if(snap.val() == null){
                                        var len = 0;

                                        if($form.find('#pwd').val() == $form.find('#pwdCon').val()){
                                            var data = {
                                                id : len + 1,
                                                username : $form.find('#uname').val(),
                                                password : $form.find('#pwd').val(),
                                                type : accType,
                                                fullname : $form.find('#fullname').val(),
                                                email : $form.find('#email').val(),
                                                phone : $form.find('#mobile').val()
                                            }
                                            refAcc.push(data);
                                        }
                                    }else{
                                        var accObj = snap.val();
                                        var keys = Object.keys(accObj);
                                        var len = keys.length;

                                        for(var x = 0; x < len; ++x){
                                            var k = keys[x];
                            
                                            if($form.find('#email').val() == accObj[k].email || $form.find('#uname').val() == accObj[k].username || $form.find('#mobile').val() == accObj[k].phone){
                                                validate = false;
                                                errorMessage = "Email/Username/Phone existed";
                                            }
                                        }

                                        if(validate){
                                            if($form.find('#pwd').val() == $form.find('#pwdCon').val()){
                                                var data = {
                                                    id : len + 1,
                                                    username : $form.find('#uname').val(),
                                                    password : $form.find('#pwd').val(),
                                                    type : accType,
                                                    fullname : $form.find('#fullname').val(),
                                                    email : $form.find('#email').val(),
                                                    phone : $form.find('#mobile').val()
                                                }
                                                refAcc.push(data);
                                                console.log("pushed");
                                            }
                                        }else{
                                            //
                                        }
                                    }
                                })
                            }
                        }
                })
                modal.hide()  
            })
        }
    })
}

function logoutModal(){
    $.showConfirm({
        title : "Confirm Logout",
        textTrue : "OK",
        textFalse : "No",
        body : "Are you sure you want to logout?",
        onSubmit: function(result){
            if(result){
                sessionStorage.clear();
                window.location.replace("login.html");
            }
        }
    })
}