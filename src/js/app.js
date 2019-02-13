$(document).ready(function () {
    $('.about-slider').slick({
        arrows:false,
        dots:true
    });

    var scrollTop = $('html,body').scrollTop();

    function pageNav() {
        var pageNavItem = $('.page-nav__list-item'),
            pageNavItemActive = 'page-nav__list-item_active',
            step1 = $('#polygon-1').offset(),
            step2 = $('#technologies').offset(),
            step3 = $('#polygon-3').offset(),
            step4 = $('#w-products').offset(),
            step5 = $('#partnership').offset(),
            step6 = $('#feedback').offset(),
            headerHeight = $('#header').outerHeight();

        if(scrollTop < step1.top) {
            $(pageNavItem).removeClass(pageNavItemActive);
            pageNavItem.eq(0).addClass(pageNavItemActive);
        }

        if(scrollTop >= parseInt(step2.top - headerHeight -50) && scrollTop < parseInt(step3.top + headerHeight)) {
            $(pageNavItem).removeClass(pageNavItemActive);
            pageNavItem.eq(1).addClass(pageNavItemActive);
        }

        if(scrollTop >= parseInt(step3.top - headerHeight) && scrollTop < parseInt(step4.top + headerHeight)) {
            $(pageNavItem).removeClass(pageNavItemActive);
            pageNavItem.eq(2).addClass(pageNavItemActive);
        }

        if(scrollTop >= parseInt(step4.top - headerHeight) && scrollTop < parseInt(step5.top + headerHeight)) {
            $(pageNavItem).removeClass(pageNavItemActive);
            pageNavItem.eq(3).addClass(pageNavItemActive);
        }

        if(scrollTop >= parseInt(step5.top - headerHeight) && scrollTop < parseInt(step6.top + headerHeight)) {
            $(pageNavItem).removeClass(pageNavItemActive);
            pageNavItem.eq(4).addClass(pageNavItemActive);
        }

        if(scrollTop >= parseInt(step6.top - headerHeight)) {
            $(pageNavItem).removeClass(pageNavItemActive);
            pageNavItem.eq(5).addClass(pageNavItemActive);
        }
    }

    if($('#technologies').length) {
        $(window).scroll(function(){
            scrollTop = $('html,body').scrollTop();
            pageNav();
        });

        pageNav();
    }

    $('.page-nav__list-item span').click(function(){
        var step = $(this).data('tab'),
            stepTo = $(step).offset(),
            headerHeight = $('#header').outerHeight(),
            x =parseInt(stepTo.top - headerHeight);

        console.log(step);

        $('html,body').stop().animate({scrollTop:x}, 500);
    });

    $('.main-filters__gender-link').click(function (e) {
        e.preventDefault();

        var activeClass = 'main-filters__gender-link_active',
            item = '.main-filters__gender-item',
            linkItem = '.main-filters__gender-link';

        $(this).addClass(activeClass).parents(item).siblings(item).find(linkItem).removeClass(activeClass);
    });

    $('.main-filters__add-item').click(function () {
        $(this).toggleClass('main-filters__add-item_active');

        $("#overlay-main-filters").fadeToggle();
        $(".main-filters__dropdown").toggleClass('main-filters__dropdown_active');
    });

    $("#overlay-main-filters").click(function () {
        $("#overlay-main-filters").fadeOut();
        $(".main-filters__dropdown").removeClass('main-filters__dropdown_active');
    });

    $('.technologies-info__polygon').mouseenter(function () {
        var active = $(this).data('polygon');
        $('.technologies-info__item').removeClass('technologies-info__item_active');
        $(active).addClass('technologies-info__item_active');
    });


    $('.technologies-info__polygon').mouseleave(function () {
        $('.technologies-info__item').removeClass('technologies-info__item_active');
    });

    $('.btn-modal').click(function (e) {
        e.preventDefault();

        var modal = $(this).attr('href');

        $(modal).addClass('p-modal_active');
        $("#overlay").fadeIn();
    });

    $('#overlay,.p-modal__close').click(function (e) {
        e.preventDefault();

        $('.p-modal').removeClass('p-modal_active');
        $("#overlay").fadeOut();
    });
});


