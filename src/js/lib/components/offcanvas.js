import $ from "../core";

$.prototype.offcanvas = function (position = 'start') {
    for (let i = 0; i < this.length; i++) {
        const id = $(this[i]).getAttr('data-offcanvas')
        const closes = document.querySelectorAll('[data-offcanvas-close]')

        const showCanvas = () => {
            if ($('.modal-backdrop').length === 0) {
                const overlay = document.createElement('div')
                $(overlay).addClass('modal-backdrop', 'show')
                document.body.append(overlay)
            }

            document.querySelector(id).style.transform = 'translate(0)'
            document.querySelector(id).style.visibility = 'visible'

            $().lockBodyScroll()
        }

        const hideCanvas = () => {
            switch (position) {
                case 'start' :
                    document.querySelector(id).style.transform = 'translateX(-100%)'
                    break
                case 'end' :
                    document.querySelector(id).style.transform = 'translateX(100%)'
                    break
                case 'top' :
                    document.querySelector(id).style.transform = 'translateY(-100%)'
                    break
                case 'bottom' :
                    document.querySelector(id).style.transform = 'translateY(100%)'
                    break
            }

            $('.modal-backdrop').remove()
            $().unlockBodyScroll()
        }

        $(this[i]).click(() => showCanvas())

        closes.forEach(close => {
            $(close).click(() => hideCanvas())
        })

        $('body').keydown((e) => {
            if (e.code === 'Escape') hideCanvas()
        })
    }
}

$('[data-offcanvas]').offcanvas()