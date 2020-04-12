$(document).ready(function(){
    $("#btnChicken").click(function() {
        $("#chickenTable").show();
        $("#bsfTable").hide();
        $("#tableTitle").html("Chicken");
    });

    $("#btnBsf").click(function() {
        $("#chickenTable").hide();
        $("#bsfTable").show()
        $("#tableTitle").html("BSF");
    });

});