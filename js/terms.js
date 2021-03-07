$(function () {

    // Начало выдачи классов табам

    function getClass(){
        $('#politics-tab').removeClass('tab--active')
        $('#terms-tab').removeClass('tab--active')
        $('#politics-content').removeClass('tabs-content--active')
        $('#terms-content').removeClass('tabs-content--active')
        if (localStorage.getItem('linkSelected') == 0){
            $('#politics-tab').addClass('tab--active')
            $('#politics-content').addClass('tabs-content--active')
            $('.footer').css('display', 'block')
        } else if (localStorage.getItem('linkSelected') == 1){
            $('#terms-tab').addClass('tab--active')
            $('#terms-content').addClass('tabs-content--active')
            $('.footer').css('display', 'block')
        }
    }
    getClass()

    // Конец выдачи классов табам


    // Начало анимации

    new WOW({
        offset: 125,
    }).init();

    // Конец анимации

    // Начало табов

    $('.tab').on('click', function(e) {
        e.preventDefault();

        $($(this).siblings()).removeClass('tab--active');
        $($(this).closest('.tabs-wrapper').siblings().find('div')).removeClass('tabs-content--active');

        $(this).addClass('tab--active');
        $($(this).attr('href')).addClass('tabs-content--active');
    });

    // Конец табов


    // Начало раздельной ссылки
    
    localStorage.setItem('linkSelected', 0);
    $('#terms').on('click', function(){
        localStorage.setItem('linkSelected', 1);
        getClass()
    })
    $('#politics').on('click', function(){
        localStorage.setItem('linkSelected', 0);
        getClass()
    })

    // Конец раздельной ссылки

});