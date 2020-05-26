//Permission request for notification
var requestBtn = document.querySelector("#requestBtn");
//tooltip for notify button
$(function () {
$('[data-toggle="tooltip"]').tooltip()
})


function onGranted(){
requestBtn.style.background = "green";
}

function onDenied(){
requestBtn.style.background = "red";
}

requestBtn.onclick = function(){
console.log("Running");
Push.Permission.request(onGranted, onDenied);
}
//End of Permission request for notification