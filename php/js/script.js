$(".paginationBtn li").on( 'click', function() {
    $( this ).parent().find( 'li.page-item.active' ).removeClass( 'active' );
    $( this ).addClass( 'page-item active' );
});