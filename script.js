$(document).ready(function(){
//------------------------------------------------------------------------------------------------
    //Start of data page
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

    $(".paginationBtn li").on( 'click', function() {
        $( this ).parent().find( 'li.page-item.active' ).removeClass( 'active' );
        $( this ).addClass( 'page-item active' );
    });
    //End of data page
    
//------------------------------------------------------------------------------------------------
    //Start of index page
    $("#chickenDash").click(function(){
        $("#dashTitle").html("Chicken");
        $("#chickenRow").show();
        $("#bsfRow").hide();
    });

    $("#bsfDash").click(function() {
        $("#dashTitle").html("BSF");
        $("#chickenRow").hide();
        $("#bsfRow").show();
    });
    //End of index page

//------------------------------------------------------------------------------------------------
    $("#tempToday").click(function(){
        $("#myChart1").show();
        $("#myChart2").hide();
        $("#myChart3").hide();
        $("#myChart4").hide();
    });

    $("#tempWeekly").click(function(){
        $("#myChart1").hide();
        $("#myChart2").show();
        $("#myChart3").hide();
        $("#myChart4").hide();
    });

    $("#tempMonthly").click(function(){
        $("#myChart1").hide();
        $("#myChart2").hide();
        $("#myChart3").show();
        $("#myChart4").hide();
    });

    $("#tempAll").click(function(){
        $("#myChart1").hide();
        $("#myChart2").hide();
        $("#myChart3").hide();
        $("#myChart4").show();
    });

    $(".tempPage li").on( 'click', function() {
        $( this ).parent().find( 'li.page-item.active' ).removeClass( 'active' );
        $( this ).addClass( 'page-item active' );
    });

//------------------------------------------------------------------------------------------------
    $("#searchInput").on("keyup",function(){
        var value = $(this).val().toLowerCase();
        $("#chickenTable tbody tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

//------------------------------------------------------------------------------------------------
    //Start of sensor page
    //Chicken-----------------------------------------------
    $("#sensorChicken").click(function() {
        $("#chickenSensor").show();
        $("#bsfSensor").hide();
        $("#bsfLarvaeSensor").hide();
        $("#dropdownChicken").show();
        $("#dropdownBSFLarvae").hide();
        $("#dropdownBSF").hide();
 
    });

    $("#carea-1").click(function() {
        $("#chickenArea-1").show();
        $("#chickenArea-2").hide();
        $("#bsfSensor").hide();
        $("#sensorDropdownChicken").html("Area-1");
 
    });

    $("#carea-2").click(function() {
        $("#chickenArea-1").hide();
        $("#chickenArea-2").show();
        $("#bsfSensor").hide();
        $("#sensorDropdownChicken").html("Area-2");
    });

    //-----------------------------------------------------
    //BSF Adult
    $("#sensorBSFAdult").click(function() {
        $("#chickenSensor").hide();
        $("#bsfSensor").show();
        $("#bsfLarvaeSensor").hide()
        $("#dropdownChicken").hide();
        $("#dropdownBSFLarvae").hide();
        $("#dropdownBSF").show();
    });

    $("#bsfarea-1").click(function() {
        $("#bsfArea-2").hide();
        $("#chickenSensor").hide();
        $("#bsfArea-1").show();
        $("#sensorDropdownBSF").html("BSF Area-1");
 
    });

    $("#bsfarea-2").click(function() {
        $("#bsfArea-1").hide();
        $("#chickenSensor").hide();
        $("#bsfArea-2").show();
        $("#sensorDropdownBSF").html("BSF Area-2");
    });

    //------------------------------------------------------
    //BSF Larvae
    $("#sensorBSFLarvae").click(function() {
        $("#chickenSensor").hide();
        $("#bsfSensor").hide();
        $("#dropdownChicken").hide();
        $("#dropdownBSF").hide();
        $("#bsfLarvaeSensor").show();
        $("#dropdownBSFLarvae").show();
    });

    $("#bsfLarea-1").click(function() {
        $("#bsfLarvaeArea-2").hide();
        $("#chickenSensor").hide();
        $("#bsfSensor").hide();
        $("#bsfLarvaeArea-1").show();
        $("#sensorDropdownBSFL").html("BSF.L Area-1");
    });

    $("#bsfLarea-2").click(function() {
        $("#bsfLarvaeArea-1").hide();
        $("#chickenSensor").hide();
        $("#bsfSensor").hide();
        $("#bsfLarvaeArea-2").show();
        $("#sensorDropdownBSFL").html("BSF.L Area-2");
    });

   //--------------------------------------------------------
   //Pagination active
    $(".paginationBtn li").on( 'click', function() {
        $( this ).parent().find( 'li.page-item.active' ).removeClass( 'active' );
        $( this ).addClass( 'page-item active' );
    });

    
    
    //End of sensor page



});



