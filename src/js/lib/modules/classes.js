import $ from '../core';

$.prototype.addClass = function (...classNames) {
    for (let i = 0; i < this.length; i++) {
        if (typeof this[i] === 'undefined') continue

        this[i].classList.add(...classNames)
    }

    return this;
};

$.prototype.removeClass = function (...classNames) {
    for (let i = 0; i < this.length; i++) {
        if (typeof this[i] === 'undefined') continue

        this[i].classList.remove(...classNames)
    }

    return this;
};

$.prototype.toggleClass = function(className){
    for (let i = 0; i < this.length; i++) {
        if (typeof this[i] === 'undefined') continue

        this[i].classList.toggle(className);
    }

    return this;
};

$.prototype.hasClass = function(className){
    for (let i = 0; i < this.length; i++) {
        if (typeof this[i] === 'undefined') continue

        if (this[i].classList.contains(className)) return true
    }

    return this;
};