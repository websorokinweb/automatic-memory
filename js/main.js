$(function () {

    // Начало анимации

    new WOW({
        offset: 125,
    }).init();

    // Конец анимации


    // Начало нициализации селекта

    $('.form__select--vacancy').selectric({
        maxHeight: 80,
        disableOnMobile: false,
        nativeOnMobile: false,
    });

    // Конец нициализации селекта


    // Начало бегущей строки

    $('.company__items').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 0,
        arrows: false,
        easing: 'linear',
        cssEase: 'linear',
        waitForAnimate: false,
        speed: 7000,
        centerMode: true,
        edgeFriction: 0,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        autoSlidesToShow: true,
        variableWidth: true,
        swipe: false,
    });

    // Конец бегущей строки


    // Начало инициализации автокомплита

    $(".form__input--city").autocomplete({
        source: [cities],
        minLength: 2,
        dropdownWidth: 'auto',
        limit: 1,
        autoselect: true,
        closeOnBlur: false,
    });

    // Конец инициализации автокомплита


    // Начало проверки формы на валидность

    function checkForm() {
        if ($('.form__elem--done').length === 4) {
            $('.form__btn').attr('disabled', false)
            $('.form__btn').addClass('form__btn--active')
        } else {
            $('.form__btn').removeClass('form__btn--active')
        }
    }

    window.checkForm = setInterval(checkForm, 100);

    // Конец проверки формы на валидность


    // Начало проверки селекта

    function checkSelectValue(){
        if ($('.label').text().replace(/\s+/g, ' ').trim() === 'Кем хотите работать?' || $('.label').text().replace(/\s+/g, ' ').trim() === 'Выбрать еще'){
            $('.selectric').closest('.form__input-wrapper').addClass('form__elem--error')
            $('.selectric').css('borderColor', '#FF7D7D')
            $('.form__select--vacancy').css('marginBottom', '19px')
        }
    }

    $('.selectric').on('click', function(){
        $('.selectric').css('borderColor', 'unset')
    })

    function checkSelect(){
        
        window.elementInQuestion = $('.selectric-wrapper');

        function checkClass() {
            if (window.elementInQuestion.hasClass('selectric-open')) {

            } else {
                if (window.innerWidth < 1160){
                    $('.selectric').css('marginBottom', '0px')
                } else{
                    $('.form__inner').css('paddingBottom', '128px')
                }
            }
        }

        
        window.classCheckerInterval = setInterval(checkClass, 100);

        $(document).bind('selectric-open', function () {
            let listHeight = $('.selectric-scroll ul').height()
            if (window.innerWidth < 1160){
                $('.selectric').css('marginBottom', `${listHeight + 29}px`)
            } else{
                $('.form__inner').css('paddingBottom', `${listHeight + 50}px`)
            }
        });

        $('.label').addClass('label--placeholder')
        $('.selectric-scroll ul li').on('click', function () {
            $('.label').removeClass('label--placeholder')
        });

        $('.form__select').change(function () {
            $(this).closest('.form__input-wrapper').addClass('form__elem--done')
        });
    }

    checkSelect()

    // Конец проверки селекта


    // Начало. Сбивает шрифт Regular с плейсхолдера формы

    $('.selectric').on('click', function(){
        $('.selectric .label').attr('style', false)
        $(this).closest('.form__input-wrapper').removeClass('form__elem--error')
    })

    // конец. Сбивает шрифт Regular с плейсхолдера формы


    // Начало проверки города

    function checkCity(cityInput) {
        let cityValue = cityInput.val()
        if (cities.indexOf(cityValue) != -1) {
            cityInput.closest('.form__input-wrapper').addClass('form__elem--done')
            cityInput.closest('.form__input-wrapper').removeClass('form__elem--error')
        } else if (cities.indexOf(cityValue) === -1 && $('.form__form').hasClass('.form__form--cheking') ){
            cityInput.closest('.form__input-wrapper').addClass('form__elem--error')
            cityInput.closest('.form__input-wrapper').removeClass('form__elem--done')
        } else {
            cityInput.closest('.form__input-wrapper').addClass('form__elem--error')
            cityInput.closest('.form__input-wrapper').removeClass('form__elem--done')
        }
    }

    let cityInput = $(".form__input--city");
    function checkValue() {
        if (true) {
            checkCity(cityInput)
        }
    }

    function cityMargin(){
        if (window.innerWidth < 1160){
            let dropdownStyles = $('.xdsoft_autocomplete_dropdown').attr('style')
            if (dropdownStyles.indexOf('display: block;') != -1){
                cityInput.css('marginBottom', '78px')
            } else if (cityInput.val() === '' && dropdownStyles.indexOf('display: none;') != -1){
                cityInput.css('marginBottom', '19px')
            } else if (cityInput.closest('.form__input-wrapper').hasClass('form__elem--done')){
                cityInput.css('marginBottom', '0')
            }
        }
    }
    
    window.cityMarginInterval = setInterval(cityMargin, 100);

    cityInput.on('click', function () {
        window.valueCheckerInterval = setInterval(checkValue, 100);
    })
    
    // Конец проверки города

    
    // Начало проверки телефона

    let inputPhone = $('.form__input--phone');
    inputPhone.inputmask("+7 999 999 99 99");

    function checkPhoneOnce(inputPhone){
        let phoneValue = inputPhone.val()
        if (phoneValue.includes('_') === false && phoneValue.length > 0){

        } else {
            inputPhone.closest('.form__input-wrapper').removeClass('form__elem--done')
            inputPhone.closest('.form__input-wrapper').addClass('form__elem--error')
        }
    }

    function checkPhone(inputPhone) {
        let phoneValue = inputPhone.val()
        if (phoneValue.includes('_') === false && phoneValue.length > 0) {
            inputPhone.closest('.form__input-wrapper').addClass('form__elem--done')
            inputPhone.closest('.form__input-wrapper').removeClass('form__elem--error')
            checkForm()
        } else {
            inputPhone.closest('.form__input-wrapper').removeClass('form__elem--done')
            inputPhone.closest('.form__input-wrapper').removeClass('form__elem--error')
            checkForm()
        }
    }

    inputPhone.on('input', function () {
        checkPhone(inputPhone)
    });

    // Конец проверки телефона


    // Начало проверки инициалов

    let inputInitials = $('.form__input--name')

    function checkInitialsOnce(inputInitials){
        let initialsValue = inputInitials.val()
        if (initialsValue.split(" ").length - 1 > 1){
            inputInitials.closest('.form__input-wrapper').addClass('form__elem--done')
            inputInitials.closest('.form__input-wrapper').removeClass('form__elem--error')
            checkForm()
        } else{
            inputInitials.closest('.form__input-wrapper').addClass('form__elem--error')
            inputInitials.closest('.form__input-wrapper').removeClass('form__elem--done')
        }
    }

    function checkInitials(inputInitials) {
        let initialsValue = inputInitials.val()
        if (initialsValue.split(" ").length - 1 > 1) {
            inputInitials.closest('.form__input-wrapper').addClass('form__elem--done')
            inputInitials.closest('.form__input-wrapper').removeClass('form__elem--error')
            checkForm()
        } else if (initialsValue === '') {
            inputInitials.closest('.form__input-wrapper').addClass('form__elem--error')
            inputInitials.closest('.form__input-wrapper').removeClass('form__elem--done')
            checkForm()
        } else {
            inputInitials.closest('.form__input-wrapper').removeClass('form__elem--error')
            inputInitials.closest('.form__input-wrapper').removeClass('form__elem--done')
        }
    }

    inputInitials.on('input', function () {
        checkInitials(inputInitials)
    });

    // Конец проверки инициалов


    // Начало отправки формы

    let postbody = $("#form").serialize();
    $('.form__btn').on('click', function () {
        if ($('.form__elem--done').length === 4){
            $('.form__form').addClass('form__form--send')
            $('.form__warn').hide()
            $.ajax({
                url:  "../server.php",
                type: "POST",
                data: postbody,
                success: function(data) {
                    console.log('Y')
                },
                error: function(data) {
                    console.log('E')
                }
            });
        } else{
            $('.form__form').addClass('form__form--cheking')
            checkCity(cityInput)
            checkSelectValue()
            checkPhoneOnce(inputPhone)
            checkInitialsOnce(inputInitials)
        }
    })

    // Конец отправки формы


    // Начало кнопки "Начать работать"

    $('.how__inner-link').on('click', function () {
        $('.selectric-wrapper').addClass('selectric-open selectric-below selectric-focus')
        
        let listHeight = $('.selectric-scroll ul').height()
        let selectWidth = $('.form__input-wrapper').width()

        $('.selectric-items .selectric-scroll ul').css('width', `${selectWidth - 4}px`)
        if (window.innerWidth < 1160){
            $('.selectric').css('marginBottom', `${listHeight + 29}px`)
        } else{
            $('.form__inner').css('paddingBottom', `${listHeight + 50}px`)
        }
    });

    // Конец кнопки "Начать работать"


    // Начало кнопки "Отправить еще одну вакансию"

    $('.form__button--sendmore').on('click', function(){
        $('.selectric-wrapper').addClass('selectric-open selectric-below selectric-focus')

        let listHeight = $('.selectric-scroll ul').height()
        if (window.innerWidth < 1160){
            $('.selectric').css('marginBottom', `${listHeight + 29}px`)
        } else{
            $('.form__inner').css('paddingBottom', `${listHeight + 50}px`)
        }


        $('.form__form').removeClass('form__form--send')
        $('.form__input').val() === $('.form__input').attr('placeholder')

        $('.selectric-scroll ul li.selected').remove()
        $('.form__select').closest('.form__input-wrapper').removeClass('form__elem--done')
        $('.label').css({'fontFamily': "'Montserrat-Regular', sans-serif", 'fontWeight': '400'})
        $('.selectric .label').text('Выбрать еще')
        $('.form__select--vacancy').selectric('open');
    })

    // Конец кнопки "Отправить еще одну вакансию"


    // Начало раздельной ссылки

    localStorage.setItem('linkSelected', 0);
    $('#terms').on('click', function(){
        localStorage.setItem('linkSelected', 1);
    })
    $('#politics').on('click', function(){
        localStorage.setItem('linkSelected', 0);
    })

    // Конец раздельной ссылки





    $(function () {
        $('.form__warn-open').magnificPopup({
            type: 'inline',
            preloader: false,
            focus: '#username',
            modal: true
        });
        $(document).on('click', '.mfp-container', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
        });
    });
});