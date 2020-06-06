$(document).ready(function(){
    //------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
        //----------------------------Start of index page------------------------------//
    
        //Chicken
        // $("#dashChickenBtn").click(function(){
        //     $("#dashChicken").show();
        //     $("#dashBSF").hide();
        //     $("#dashBSFL").hide();
        //     $("#dashboardTitle").html("Chicken");
        //     $("#dropdownBSFRow").hide();
        //     $("#dropdownBSFLRow").hide();
        //     $("#dropdownChickenRow").show();    
        // });
    
        // //BSF
        // $("#dashBSFBtn").click(function(){
        //     $("#dashChicken").hide();
        //     $("#dashBSFL").hide();
        //     $("#dashBSF").show(); 
        //     $("#dashboardTitle").html("BSF");
        //     $("#dropdownChickenRow").hide();
        //     $("#dropdownBSFLRow").hide();
        //     $("#dropdownBSFRow").show();
        // });
    
        // //BSFL
        // $("#dashBSFLBtn").click(function(){
        //     $("#dashChicken").hide();
        //     $("#dashBSF").hide();
        //     $("#dashBSFL").show(); 
        //     $("#dashboardTitle").html("BSFL");
        //     $("#dropdownChickenRow").hide();
        //     $("#dropdownBSFRow").hide();
        //     $("#dropdownBSFLRow").show();
            
        // });
    
        // //Chicken Area-1
        // $("#dashCarea-1").click(function(){
        //     $("#chickenDashArea-2").hide();
        //     $("#chickenDashArea-1").show(); 
        //     $("#dashDropdownChicken").html("Area-1");
            
        // });
    
        // //Chicken Area-2
        // $("#dashCarea-2").click(function(){
        //     $("#chickenDashArea-1").hide();
        //     $("#chickenDashArea-2").show(); 
        //     $("#dashDropdownChicken").html("Area-2");
            
        // });
    
        // //BSF Area-1
        // $("#dashBSFarea-1").click(function(){
        //     $("#bsfDashArea-2").hide();
        //     $("#bsfDashArea-1").show(); 
        //     $("#dashDropdownBSF").html("Area-1");
            
        // });
    
        // //BSF Area-2
        // $("#dashBSFarea-2").click(function(){
        //     $("#bsfDashArea-1").hide();
        //     $("#bsfDashArea-2").show(); 
        //     $("#dashDropdownBSF").html("Area-2");
            
        // });
    
        // //BSFL Area-1
        // $("#dashBSFLarea-1").click(function(){
        //     $("#bsflDashArea-2").hide();
        //     $("#bsflDashArea-1").show(); 
        //     $("#dashDropdownBSFL").html("Area-1");
            
        // });
    
        // //BSFL Area-2
        // $("#dashBSFLarea-2").click(function(){
        //     $("#bsflDashArea-1").hide();
        //     $("#bsflDashArea-2").show(); 
        //     $("#dashDropdownBSFL").html("Area-2");
            
        // });
    
    
    
       
        //----------------------------End of index page------------------------------//
    //------------------------------------------------------------------------------------------------
        //------------------------Start of search filter----------------------//
        
        // $("#searchInput").on("keyup",function(){
        //     var value = $(this).val().toLowerCase();
        //     $("table tbody tr td:nth-child(2)").filter(function(){
        //         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        //     });
        // });

        //Date picker for search
        $(function () {
            $('#datetimepicker').datetimepicker({
                format: 'L',
            });
        });

        //search filter for Chicken
        $("#searchInput").on("input",function(){
            var value = $(this).val().toLowerCase();
            $("#chickenTable tbody tr").filter(function(){
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });

        //search filter for BSF
        $("#searchInput").on("input",function(){
            var valueBSF = $(this).val().toLowerCase();
            $("#bsfTable tbody tr").filter(function(){
                $(this).toggle($(this).text().toLowerCase().indexOf(valueBSF) > -1)
            });
        });

        //search filter for BSFL
        $("#searchInput").on("input",function(){
            var valueBSFL = $(this).val().toLowerCase();
            $("#bsflTable tbody tr").filter(function(){
                $(this).toggle($(this).text().toLowerCase().indexOf(valueBSFL) > -1)
            });
        });
    
    

        /*$("#searchInput").on("input",function(){
            $("table tbody tr .searchVar:contains('" + $(this).val() + "')").parent().show();
            $("table tbody tr .searchVar:not(:contains('" + $(this).val() + "'))").parent().hide();
        })*/

      
            
        
        //------------------------End of search filter----------------------//
    
    //------------------------------------------------------------------------------------------------
        //-----------------Start of sensor page------------------------------//
    
        //Chicken-----------------------------------------------
        // $("#sensorChicken").click(function() {
        //     $("#chickenSensor").show();
        //     $("#bsfSensor").hide();
        //     $("#bsfLarvaeSensor").hide();
        //     $("#dropdownChicken").show();
        //     $("#dropdownBSFLarvae").hide();
        //     $("#dropdownBSF").hide();
     
        // });
    
        // $("#carea-1").click(function() {
        //     $("#chickenArea-1").show();
        //     $("#chickenArea-2").hide();
        //     $("#bsfSensor").hide();
        //     $("#sensorDropdownChicken").html("Area-1");
     
        // });
    
        // $("#carea-2").click(function() {
        //     $("#chickenArea-1").hide();
        //     $("#chickenArea-2").show();
        //     $("#bsfSensor").hide();
        //     $("#sensorDropdownChicken").html("Area-2");
        // });
    
        // //-----------------------------------------------------
        // //BSF Adult
        // $("#sensorBSFAdult").click(function() {
        //     $("#chickenSensor").hide();
        //     $("#bsfSensor").show();
        //     $("#bsfLarvaeSensor").hide()
        //     $("#dropdownChicken").hide();
        //     $("#dropdownBSFLarvae").hide();
        //     $("#dropdownBSF").show();
        // });
    
        // $("#bsfarea-1").click(function() {
        //     $("#bsfArea-2").hide();
        //     $("#chickenSensor").hide();
        //     $("#bsfArea-1").show();
        //     $("#sensorDropdownBSF").html("BSF Area-1");
     
        // });
    
        // $("#bsfarea-2").click(function() {
        //     $("#bsfArea-1").hide();
        //     $("#chickenSensor").hide();
        //     $("#bsfArea-2").show();
        //     $("#sensorDropdownBSF").html("BSF Area-2");
        // });
    
        // //------------------------------------------------------
        // //BSF Larvae
        // $("#sensorBSFLarvae").click(function() {
        //     $("#chickenSensor").hide();
        //     $("#bsfSensor").hide();
        //     $("#dropdownChicken").hide();
        //     $("#dropdownBSF").hide();
        //     $("#bsfLarvaeSensor").show();
        //     $("#dropdownBSFLarvae").show();
        // });
    
        // $("#bsfLarea-1").click(function() {
        //     $("#bsfLarvaeArea-2").hide();
        //     $("#chickenSensor").hide();
        //     $("#bsfSensor").hide();
        //     $("#bsfLarvaeArea-1").show();
        //     $("#sensorDropdownBSFL").html("BSF.L Area-1");
        // });
    
        // $("#bsfLarea-2").click(function() {
        //     $("#bsfLarvaeArea-1").hide();
        //     $("#chickenSensor").hide();
        //     $("#bsfSensor").hide();
        //     $("#bsfLarvaeArea-2").show();
        //     $("#sensorDropdownBSFL").html("BSF.L Area-2");
        // });
    
       //--------------------------------------------------------
       //Pagination active
        $(".paginationBtn li").on( 'click', function() {
            $( this ).parent().find( 'li.page-item.active' ).removeClass( 'active' );
            $( this ).addClass( 'page-item active' );
        });
    
        // $(".tempPage li").on( 'click', function() {
        //     $( this ).parent().find( 'li.page-item.active' ).removeClass( 'active' );
        //     $( this ).addClass( 'page-item active' );
        // });
        
        //-------------------End of sensor page----------------------//
		
    });
	
	
    