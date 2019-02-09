$(document).ready(function () {
    if($(".parallax").length) {
        $('.parallax').parallax();
    }

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
});


