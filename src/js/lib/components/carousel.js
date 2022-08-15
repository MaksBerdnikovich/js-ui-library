import $ from '../core';

$.prototype.carousel = function (innerSelector, itemSelector, autoplay = false) {
    for (let i = 0; i < this.length; i++) {
        const width = window.getComputedStyle(this[i].querySelector(innerSelector)).width
        const wValue = +width.replace(/\D/g, '')
        const slides = this[i].querySelectorAll(itemSelector)
        const slidesField = this[i].querySelector(innerSelector)
        const prevBtn = this[i].querySelector('[data-slide="prev"]')
        const nextBtn = this[i].querySelector('[data-slide="next"]')
        const dots = this[i].querySelectorAll('[data-slide-to]')
        let offset = 0, currentIndex = 0, autoplayInterval

        const setRotate = (param) => {
            slidesField.style.transform = `translateX(-${param}px)`
        }
        const setDotsActive = (index) => {
            dots.forEach(dot => $(dot).removeClass('active'))
            $(dots[index]).addClass('active')
        }

        slidesField.style.width = `${100 * slides.length}%`
        slides.forEach(slide => slide.style.width = width)

        if (autoplay) {
            autoplayInterval = setInterval(() => $(nextBtn).click(), 5000);
        }

        $(nextBtn).on('click', (e) => {
            e.preventDefault()

            if (offset === (wValue * (slides.length - 1))) {
                offset = 0
            } else {
                offset += wValue
            }

            if (currentIndex === (slides.length - 1)) {
                currentIndex = 0
            } else {
                currentIndex++
            }

            setDotsActive(currentIndex)
            setRotate(offset)
        })

        $(prevBtn).on('click', (e) => {
            e.preventDefault()

            if (offset === 0) {
                offset = wValue * (slides.length - 1)
            } else {
                offset -= wValue
            }

            if (currentIndex === 0) {
                currentIndex = slides.length - 1
            } else {
                currentIndex--
            }

            setDotsActive(currentIndex)
            setRotate(offset)
        })

        dots.forEach(dot => {
            $(dot).on('click', (e) => {
                e.preventDefault()

                const slideTo = +$(e.target).getAttr('data-slide-to') - 1

                setDotsActive(slideTo)
                setRotate(wValue * slideTo)
            })
        })
    }
}

$('.carousel').carousel('.carousel-inner', '.carousel-item')