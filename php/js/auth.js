if(sessionStorage.getItem("username") == null){
    window.location.replace("login.php");
}

else{
    document.getElementsByClassName("content")[0].style.display = "block";
    document.getElementById("userName").innerHTML = "Welcome, " + sessionStorage.getItem("username");

    if(sessionStorage.getItem("type") == "Admin"){
        document.getElementById("register").style.display = "block";
        // document.getElementById("sensor").style.display = "block";
    }
}

$(document).ready(function(){
    if(window.location.href.search("index.php") > 0){
        $("#myNavUl").children().eq(0).addClass("current");
        $("#myNavUl").children().eq(1).addClass("sideNavLink");
        $("#myNavUl").children().eq(2).addClass("sideNavLink");
        $("#myNavUl").children().eq(3).addClass("sideNavLink");
        $("#myNavUl").children().eq(4).addClass("sideNavLink");
        $("#myNavUl").children().eq(5).addClass("sideNavLink");
        $("#text").html("Dashboard");
    }

    else if(window.location.href.search("data.php") > 0){
        $("#myNavUl").children().eq(1).addClass("current");
        $("#myNavUl").children().eq(0).addClass("sideNavLink");
        $("#myNavUl").children().eq(2).addClass("sideNavLink");
        $("#myNavUl").children().eq(3).addClass("sideNavLink");
        $("#myNavUl").children().eq(4).addClass("sideNavLink");
        $("#myNavUl").children().eq(5).addClass("sideNavLink");
        $("#text").html("Data");
    }

    else if(window.location.href.search("production.php") > 0){
        $("#myNavUl").children().eq(2).addClass("current");
        $("#myNavUl").children().eq(0).addClass("sideNavLink");
        $("#myNavUl").children().eq(1).addClass("sideNavLink");
        $("#myNavUl").children().eq(3).addClass("sideNavLink");
        $("#myNavUl").children().eq(4).addClass("sideNavLink");
        $("#myNavUl").children().eq(5).addClass("sideNavLink");
        $("#text").html("Production");
    }

    else if(window.location.href.search("sensors.php") > 0){
        $("#myNavUl").children().eq(3).addClass("current");
        $("#myNavUl").children().eq(0).addClass("sideNavLink");
        $("#myNavUl").children().eq(1).addClass("sideNavLink");
        $("#myNavUl").children().eq(2).addClass("sideNavLink");
        $("#myNavUl").children().eq(4).addClass("sideNavLink");
        $("#myNavUl").children().eq(5).addClass("sideNavLink");
        $("#text").html("Sensor");
    }

    else if(window.location.href.search("dataVisualization.php") > 0){
        $("#myNavUl").children().eq(4).addClass("current");
        $("#myNavUl").children().eq(0).addClass("sideNavLink");
        $("#myNavUl").children().eq(1).addClass("sideNavLink");
        $("#myNavUl").children().eq(2).addClass("sideNavLink");
        $("#myNavUl").children().eq(3).addClass("sideNavLink");
        $("#myNavUl").children().eq(5).addClass("sideNavLink");
        $("#text").html("Visualization");
    }

    else if(window.location.href.search("notification.php") > 0){
        $("#myNavUl").children().eq(5).addClass("current");
        $("#myNavUl").children().eq(0).addClass("sideNavLink");
        $("#myNavUl").children().eq(1).addClass("sideNavLink");
        $("#myNavUl").children().eq(2).addClass("sideNavLink");
        $("#myNavUl").children().eq(3).addClass("sideNavLink");
        $("#myNavUl").children().eq(4).addClass("sideNavLink");
        $("#text").html("Notification");
    }
})