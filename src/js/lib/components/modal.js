import $ from '../core';

$.prototype.modal = function (created) {
    for (let i = 0; i < this.length; i++) {
        const target = $(this[i]).getAttr('data-target')
        const modals = document.querySelectorAll('[data-modal]')
        const closes = document.querySelectorAll('[data-modal-close]')

        const showModal = () => {
            if ($('.modal-backdrop').length === 0) {
                const overlay = document.createElement('div')
                $(overlay).addClass('modal-backdrop', 'show')
                document.body.append(overlay)
            }

            $(target).fadeIn(300)

            $().lockBodyScroll()
        }

        const hideModal = () => {
            $('.modal-backdrop').remove()
            $(target).fadeOut(100)

            if (created) {
                $(target).remove()
            }

            $().unlockBodyScroll()
        }

        $(this[i]).click(() => showModal())

        closes.forEach(close => {
            $(close).click(() => hideModal())
        })

        modals.forEach(item => {
            $(item).click((e) => {
                if (e.target === item) hideModal()
            })
        })

        $('body').keydown((e) => {
            if (e.code === 'Escape') hideModal()
        })
    }
}

$('[data-toggle="modal"]').modal()

$.prototype.createModal = function ({text, btns} = {}) {
    for (let i = 0; i < this.length; i++) {
        const modal = document.createElement('div')
        $(modal)
            .setAttr('id', $(this[i]).getAttr('data-target').slice(1))
            .addClass('modal')
            .setAttr('data-modal')

        // btns = {count: num, settings: [[text, classNmae=[], close, cb]]}
        const buttons = []
        for (let j = 0; j < btns.count; j++) {
            let btn = document.createElement('button')

            $(btn).addClass('btn', ...btns.settings[j][1])
            $(btn).html(btns.settings[j][0])

            if (btns.settings[j][2]) {
                $(btn).setAttr('data-modal-close')
            }

            if (btns.settings[j][3] && typeof btns.settings[j][3] === 'function') {
                $(btn).click(btns.settings[j][3])
            }

            buttons.push(btn)
        }

        $(modal).html(`
             <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${text.title}</h5>
                        <button type="button" class="btn-close" data-modal-close></button>
                    </div>
                    <div class="modal-body">${text.body}</div>
                    <div class="modal-footer"></div>
                </div>
            </div>
        `)

        modal.querySelector(".modal-footer").append(...buttons);
        document.body.appendChild(modal);
        $(this[i]).modal(true);
        $(this[i].getAttribute('data-target')).fadeIn(300);
    }
}