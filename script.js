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

    $("#dataPage li").on( 'click', function() {
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
});