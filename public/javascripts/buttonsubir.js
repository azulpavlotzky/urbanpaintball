jQuery('document').ready(function($){
    var subir = $('#up')
    subir.click(function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 400);
    });
    subir.hide();
    $(window).scroll(function(){
    if( $(this).scrollTop() > 400 ) {
        subir.fadeIn();
    } else{
    subir.fadeOut();
    }
    });
});