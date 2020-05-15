$(document).ready(function(){
//------------------------------------------------------------------------------------------------
    //----------------------------Start of data page------------------------------//
    //Chicken
    $("#dataChickenBtn").click(function() {
        $("#chickenTable").show();
        $("#bsfTable").hide();
        $("#bsflTable").hide();
        $("#dropdownBSFRow-data").hide();
        $("#dropdownBSFLRow-data").hide();
        $("#dropdownChickenRow-data").show();
        $("#dataTitle").html("Chicken");
    });

    //BSF
    $("#dataBSFBtn").click(function() {
        $("#bsfTable").show();
        $("#chickenTable").hide();
        $("#bsflTable").hide();
        $("#dropdownChickenRow-data").hide();
        $("#dropdownBSFLRow-data").hide();
        $("#dropdownBSFRow-data").show();
        $("#dataTitle").html("BSF");
    });
    
    //BSFL
    $("#dataBSFLBtn").click(function() {
        $("#chickenTable").hide();
        $("#bsfTable").hide();
        $("#bsflTable").show();
        $("#dropdownChickenRow-data").hide();
        $("#dropdownBSFRow-data").hide();
        $("#dropdownBSFLRow-data").show();
        $("#dataTitle").html("BSFL");
    });

    //Chicken Area-1
    $("#dataCarea-1").click(function(){
        $("#chickenTable-Area2").hide();
        $("#chickenTable-Area1").show(); 
        $("#dataDropdownChicken").html("Area-1");
        
    });

    //Chicken Area-2
    $("#dataCarea-2").click(function(){
        $("#chickenDashArea-1").hide();
        $("#chickenDashArea-2").show(); 
        $("#dataDropdownChicken").html("Area-2");
        
    });

    //BSF Area-1
    $("#dataBSFarea-1").click(function(){
        $("#bsfTable-Area2").hide();
        $("#bsfTable-Area1").show(); 
        $("#dataDropdownBSF").html("Area-1");
        
    });

    //BSF Area-2
    $("#dataBSFarea-2").click(function(){
        $("#bsfTable-Area1").hide();
        $("#bsfTable-Area2").show(); 
        $("#dataDropdownBSF").html("Area-2");
        
    });

    //BSFL Area-1
    $("#dataBSFLarea-1").click(function(){
        $("#bsflTable-Area2").hide();
        $("#bsflTable-Area1").show(); 
        $("#dataDropdownBSFL").html("Area-1");
        
    });

    //BSFL Area-2
    $("#dataBSFLarea-2").click(function(){
        $("#bsflTable-Area1").hide();
        $("#bsflTable-Area2").show(); 
        $("#dataDropdownBSFL").html("Area-2");
        
    });


    $(".paginationBtn li").on( 'click', function() {
        $( this ).parent().find( 'li.page-item.active' ).removeClass( 'active' );
        $( this ).addClass( 'page-item active' );
    });
    //----------------------------End of data page------------------------------//
    
//------------------------------------------------------------------------------------------------
    //----------------------------Start of index page------------------------------//

    //Chicken
    $("#dashChickenBtn").click(function(){
        $("#dashChicken").show();
        $("#dashBSF").hide();
        $("#dashBSFL").hide();
        $("#dashboardTitle").html("Chicken");
        $("#dropdownBSFRow").hide();
        $("#dropdownBSFLRow").hide();
        $("#dropdownChickenRow").show();    
    });

    //BSF
    $("#dashBSFBtn").click(function(){
        $("#dashChicken").hide();
        $("#dashBSFL").hide();
        $("#dashBSF").show(); 
        $("#dashboardTitle").html("BSF");
        $("#dropdownChickenRow").hide();
        $("#dropdownBSFLRow").hide();
        $("#dropdownBSFRow").show();
    });

    //BSFL
    $("#dashBSFLBtn").click(function(){
        $("#dashChicken").hide();
        $("#dashBSF").hide();
        $("#dashBSFL").show(); 
        $("#dashboardTitle").html("BSFL");
        $("#dropdownChickenRow").hide();
        $("#dropdownBSFRow").hide();
        $("#dropdownBSFLRow").show();
        
    });

    //Chicken Area-1
    $("#dashCarea-1").click(function(){
        $("#chickenDashArea-2").hide();
        $("#chickenDashArea-1").show(); 
        $("#dashDropdownChicken").html("Area-1");
        
    });

    //Chicken Area-2
    $("#dashCarea-2").click(function(){
        $("#chickenDashArea-1").hide();
        $("#chickenDashArea-2").show(); 
        $("#dashDropdownChicken").html("Area-2");
        
    });

    //BSF Area-1
    $("#dashBSFarea-1").click(function(){
        $("#bsfDashArea-2").hide();
        $("#bsfDashArea-1").show(); 
        $("#dashDropdownBSF").html("Area-1");
        
    });

    //BSF Area-2
    $("#dashBSFarea-2").click(function(){
        $("#bsfDashArea-1").hide();
        $("#bsfDashArea-2").show(); 
        $("#dashDropdownBSF").html("Area-2");
        
    });

    //BSFL Area-1
    $("#dashBSFLarea-1").click(function(){
        $("#bsflDashArea-2").hide();
        $("#bsflDashArea-1").show(); 
        $("#dashDropdownBSFL").html("Area-1");
        
    });

    //BSFL Area-2
    $("#dashBSFLarea-2").click(function(){
        $("#bsflDashArea-1").hide();
        $("#bsflDashArea-2").show(); 
        $("#dashDropdownBSFL").html("Area-2");
        
    });



   
    //----------------------------Start of index page------------------------------//

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
    //-----------------Start of sensor page------------------------------//

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

    
    
    //-------------------End of sensor page----------------------//



});



