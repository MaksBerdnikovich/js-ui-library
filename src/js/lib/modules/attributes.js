import $ from '../core';

$.prototype.setAttr = function (name, value = '') {
    if (!name) return this

    for (let i = 0; i < this.length; i++) {
        this[i].setAttribute(name, value)
    }

    return this;
};

$.prototype.getAttr = function (name) {
    if (!name) return null

    for (let i = 0; i < this.length; i++) {
        return this[i].getAttribute(name)
    }

    return this;
};

$.prototype.hasAttr = function (name) {
    if (!name) return false

    for (let i = 0; i < this.length; i++) {
        return this[i].hasAttribute(name)
    }

    return this;
};

$.prototype.removeAttr = function (name) {
    if (!name) return this

    for (let i = 0; i < this.length; i++) {
        this[i].removeAttribute(name)
    }

    return this;
};