$('.button').click(function(){
    $(this).addClass('active');
    setTimeout(function(){
        $('.popup').fadeOut();
    }, 500)
})

$('#info').click(function(){
    $('.popup').removeClass('active').delay(500).fadeIn();
    $('.button').removeClass('active');
    $('.ok-reply').removeClass('active');
})