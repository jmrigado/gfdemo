$('.button').click(function(){
    $(this).addClass('active');
    setTimeout(function(){
        $('.popup').fadeOut();
    }, 250)
})

$('#info').click(function(){
    $('.popup').removeClass('active').delay(250).fadeIn();
    $('.button').removeClass('active');
    $('.ok-reply').removeClass('active');
})