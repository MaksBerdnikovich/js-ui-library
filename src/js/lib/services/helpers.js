import $ from '../core';

const calcScroll = () => {
    const div = document.createElement('div')
    div.style.cssText = `width: 50px; height: 50px; overflow-y: scroll; visibility: hidden;`
    document.body.append(div)

    const scrollWidth = div.offsetWidth - div.clientWidth
    div.remove()

    return scrollWidth
}

$.prototype.lockBodyScroll = () => {
    document.body.style.overflow = 'hidden'
    document.body.style.marginRight = `${calcScroll()}px`
}

$.prototype.unlockBodyScroll = () => {
    document.body.style.overflow = ''
    document.body.style.marginRight = ''
}