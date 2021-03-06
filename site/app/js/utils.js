const jq = {
    addClass: function(el, className) {
        el.classList.add(className);
    },
    removeClass: function(el, className) {
        el.classList.remove(className);
    },
    hasClass: function(el, className) {
        el.classList.contains(className);
    },
    changeText: function(el, newText) {
        let action = () => {
            el.removeEventListener('transitionend', action);
            el.innerHTML = newText;
            el.style.opacity = '1';
        };
        el.style.opacity = '0';
        el.addEventListener('transitionend', action);
    }
};

const rand = (frm = 0, to = 0) => Math.floor(Math.random() * Math.abs(to - frm)) + Math.min(frm, to);

const idGen = {
    chars: 'abcdefghijklmnopqrstuvwxyz0123456789',
    old: [],
    create: function() {
        let gen = this.gen();
        if (this.old.indexOf(gen) !== -1) {
            return this.create();
        }
        this.old.push(gen);
        return gen;
    },
    gen: function() {
        return new Array(16).fill(1).map(() => {
            return this.chars[rand(this.chars.length)];
        }).join('');
    }
};

export {
    jq,
    idGen,
    rand
};