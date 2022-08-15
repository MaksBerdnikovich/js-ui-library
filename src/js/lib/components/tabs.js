import $ from '../core';

$.prototype.tabs = function () {
    for (let i = 0; i < this.length; i++) {
        $(this[i]).on('click', (e) => {
            e.preventDefault()

            $(this[i])
                .addClass('active')
                .siblings().removeClass('active')

            $(this[i]).closest('.tabs')
                .find('.tabs-body-item').removeClass('active')
                .eq($(this[i]).index()).addClass('active')
        })
    }
}

$('.tabs .nav-link').tabs()