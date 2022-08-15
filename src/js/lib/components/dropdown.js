import $ from '../core';

$.prototype.dropdown = function () {
    for (let i = 0; i < this.length; i++) {
        const id = $(this[i]).getAttr('id')
        const hide = () => {
            $(`[data-toggle-id="${id}"]`).fadeOut(200)
        }

        $(this[i]).click(() => {
            $(`[data-toggle-id="${id}"]`).fadeToggle(200)
        })

        $('body').click((e) => {
            if (e.target !== this[i] && e.target !== this[i].children[0]) hide()
        })

        $('body').keydown((e) => {
            if (e.code === 'Escape') hide()
        })
    }
}

$('.dropdown-toggle').dropdown()