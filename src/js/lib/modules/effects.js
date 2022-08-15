import $ from '../core';

$.prototype.animateOverTime = function (duration, callback, finish) {
    let timeStart

    function _animateOverTime(time) {
        if (!timeStart) timeStart = time

        let timeElapsed = time - timeStart
        let complection = Math.min(timeElapsed / duration, 1)

        callback(complection)

        if (timeElapsed < duration) {
            requestAnimationFrame(_animateOverTime)
        } else {
            if (typeof finish === 'function') finish()
        }
    }

    return _animateOverTime
}

$.prototype.animateFadeInAction = function (i, dur, dsp, fnl) {
    this[i].style.display = dsp

    const _fadeIn = (complection) => {
        this[i].style.opacity = complection
    }

    const animation = this.animateOverTime(dur, _fadeIn, fnl)
    requestAnimationFrame(animation)
}

$.prototype.animateFadeOutAction = function (i, dur, fnl) {
    const _fadeOut = (complection) => {
        this[i].style.opacity = 1 - complection

        if (complection === 1) {
            this[i].style.display = 'none'
        }
    }

    const animation = this.animateOverTime(dur, _fadeOut, fnl)
    requestAnimationFrame(animation)
}


$.prototype.fadeIn = function (duration = 300, display = 'block', finish) {
    for (let i = 0; i < this.length; i++) {
        this.animateFadeInAction(i, duration, display, finish)
    }

    return this
}

$.prototype.fadeOut = function (duration = 300, finish) {
    for (let i = 0; i < this.length; i++) {
        this.animateFadeOutAction(i, duration, finish)
    }

    return this
}

$.prototype.fadeToggle = function (duration = 300, display = 'block', finish) {
    for (let i = 0; i < this.length; i++) {
        if (window.getComputedStyle(this[i]).display === 'none') {
            this.animateFadeInAction(i, duration, display, finish)
        } else {
            this.animateFadeOutAction(i, duration, finish)
        }
    }

    return this
}