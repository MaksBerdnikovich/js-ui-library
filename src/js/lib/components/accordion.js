import $ from '../core';

$.prototype.accordion = function () {
    for (let i = 0; i < this.length; i++) {
        $(this[i]).on('click', (e) => {
            e.preventDefault()

            const type = $(this[i]).closest('.accordion').getAttr('data-accordion')

            if (type === 'flush') {
                $(this[i])
                    .closest('.accordion-item')
                    .addClass('active')
                    .closest('.accordion-item').siblings().removeClass('active')
            } else {
                $(this[i])
                    .closest('.accordion-item')
                    .toggleClass('active')
            }
        })
    }
}

$('.accordion .accordion-header').accordion()