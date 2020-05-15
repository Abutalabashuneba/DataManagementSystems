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
        $("#dashboardTitle").html("Chicken Area-1");
        $("#dashDropdownChicken").html("Area-1");
        
    });

    //Chicken Area-2
    $("#dashCarea-2").click(function(){
        $("#chickenDashArea-1").hide();
        $("#chickenDashArea-2").show(); 
        $("#dashboardTitle").html("Chicken Area-2");
        $("#dashDropdownChicken").html("Area-2");
        
    });

    //BSF Area-1
    $("#dashBSFarea-1").click(function(){
        $("#bsfDashArea-2").hide();
        $("#bsfDashArea-1").show(); 
        $("#dashboardTitle").html("BSF Area-1");
        $("#dashDropdownBSF").html("Area-1");
        
    });

    //BSF Area-2
    $("#dashBSFarea-2").click(function(){
        $("#bsfDashArea-1").hide();
        $("#bsfDashArea-2").show(); 
        $("#dashboardTitle").html("BSF Area-2");
        $("#dashDropdownBSF").html("Area-2");
        
    });

    //BSFL Area-1
    $("#dashBSFLarea-1").click(function(){
        $("#bsflDashArea-2").hide();
        $("#bsflDashArea-1").show(); 
        $("#dashboardTitle").html("BSFL Area-1");
        $("#dashDropdownBSFL").html("Area-1");
        
    });

    //BSFL Area-2
    $("#dashBSFLarea-2").click(function(){
        $("#bsflDashArea-1").hide();
        $("#bsflDashArea-2").show(); 
        $("#dashboardTitle").html("BSFL Area-2");
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

    //
    $("#tempBarToday").click(function(){
        $("#myBarChart1").show();
        $("#myBarChart2").hide();
        $("#myBarChart3").hide();
        $("#myBarChart4").hide();
    });

    $("#tempBarWeekly").click(function(){
        $("#myBarChart1").hide();
        $("#myBarChart2").show();
        $("#myBarChart3").hide();
        $("#myBarChart4").hide();
    });

    $("#tempBarMonthly").click(function(){
        $("#myBarChart1").hide();
        $("#myBarChart2").hide();
        $("#myBarChart3").show();
        $("#myBarChart4").hide();
    });

    $("#tempBarAll").click(function(){
        $("#myBarChart1").hide();
        $("#myBarChart2").hide();
        $("#myBarChart3").hide();
        $("#myBarChart4").show();
    });

    //
    $("#tempDouToday").click(function(){
        $("#myDouChart1").show();
        $("#myDouChart2").hide();
        $("#myDouChart3").hide();
        $("#myDouChart4").hide();
    });

    $("#tempDouWeekly").click(function(){
        $("#myDouChart1").hide();
        $("#myDouChart2").show();
        $("#myDouChart3").hide();
        $("#myDouChart4").hide();
    });

    $("#tempDouMonthly").click(function(){
        $("#myDouChart1").hide();
        $("#myDouChart2").hide();
        $("#myDouChart3").show();
        $("#myDouChart4").hide();
    });

    $("#tempDouAll").click(function(){
        $("#myDouChart1").hide();
        $("#myDouChart2").hide();
        $("#myDouChart3").hide();
        $("#myDouChart4").show();
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



