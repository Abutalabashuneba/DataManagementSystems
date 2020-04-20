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
    });

    $("#tempWeekly").click(function(){
        $("#myChart1").hide();
        $("#myChart2").show();
        $("#myChart3").hide();
    });

    $("#tempMonthly").click(function(){
        $("#myChart1").hide();
        $("#myChart2").hide();
        $("#myChart3").show();
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
});

