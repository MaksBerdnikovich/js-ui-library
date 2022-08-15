import $ from "../core";

$.prototype.customizer = function ({resolution = '768', color = '#F1F1F1', scale = 1} = {}) {
    for (let i = 0; i < this.length; i++) {
        const body = document.querySelector('body')
        const wrap = document.querySelector('#page')
        const reset = document.querySelector('[data-style-changer-reset]')
        const container = document.querySelectorAll('input[name="container"]')
        const fontSize = document.querySelectorAll('input[name="size"]')
        const background = document.querySelector('input[name="background"]')

        const localContainer = localStorage.getItem('container') || resolution
        const localBackground = localStorage.getItem('background') || color
        const localFontSize = localStorage.getItem('fontSize') || scale

        const setContainer = (value) => {
            wrap.style.maxWidth = `${value}px`

            container.forEach(item => {
                $(item).removeAttr('checked')

                if ($(item).getAttr('data-value') == value) {
                    $(item).setAttr('checked', '').click()
                }
            })
        }

        const setBackground = (value) => {
            background.value = value
            body.style.backgroundColor = value
        }

        const setFontSize = (value) => {
            const recursy = (elem) => {
                elem.childNodes.forEach(node => {
                    if (node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, '').length > 0) {

                        if (!node.parentNode.getAttribute('data-fz')) {
                            let val = window.getComputedStyle(node.parentNode, null).fontSize
                            node.parentNode.setAttribute('data-fz', +val.replace(/px/g, ''))
                            node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * value + 'px'
                        } else {
                            node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * value + 'px'
                        }

                    } else {
                        recursy(node)
                    }
                })
            }
            recursy(wrap)

            fontSize.forEach(item => {
                $(item).removeAttr('checked')

                if ($(item).getAttr('data-value') == value) {
                    $(item).setAttr('checked', '').click()
                }
            })
        }

        container.forEach(item => {
            item.addEventListener('input', (e) => {
                const value = $(e.target).getAttr('data-value')
                setContainer(value)
                localStorage.setItem('container', value)
            })
        })

        background.addEventListener('input', (e) => {
            const value = e.target.value
            setBackground(value)
            localStorage.setItem('background', value)
        })

        fontSize.forEach(item => {
            item.addEventListener('input', (e) => {
                const value = $(e.target).getAttr('data-value')
                setFontSize(value)
                localStorage.setItem('fontSize', value)
            })
        })

        setContainer(localContainer)
        setBackground(localBackground)
        setFontSize(localFontSize)

        reset.addEventListener('click', () => {
            localStorage.clear()
            setContainer(resolution)
            setBackground( color)
            setFontSize(scale)
        })
    }
}

$('[data-style-changer]').customizer()