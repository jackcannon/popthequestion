(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils.js');

var _questions = require('./questions.js');

var _questions2 = _interopRequireDefault(_questions);

var _confetti = require('./confetti.js');

var _confetti2 = _interopRequireDefault(_confetti);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Balloon = function () {
    function Balloon() {
        var finale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        _classCallCheck(this, Balloon);

        this.game = null;
        this.finale = finale;
        this.id = _utils.idGen.create();
        this.question = '';
        this.x = (0, _utils.rand)(10000) / 100;
        this.delay = (0, _utils.rand)(8000);
        this.durations = [(0, _utils.rand)(3500, 5000), (0, _utils.rand)(4000, 12000)];
        this.color = ['red', 'green', 'blue', 'purple', 'orange'][(0, _utils.rand)(5)];
        this.element = null;
        this.confetti = null;
        this.popped = false;
        this.finalePopTimeoutId = null;
    }

    _createClass(Balloon, [{
        key: 'setGameReference',
        value: function setGameReference(game) {
            this.game = game;
        }
    }, {
        key: 'setFinale',
        value: function setFinale(finale) {
            var _this = this;

            this.finale = finale;
            if (finale && !this.finalePopTimeoutId) {
                this.finalePopTimeoutId = setTimeout(function () {
                    if (!_this.popped) {
                        _this.pop();
                    }
                }, (0, _utils.rand)(3000, 12000));
            }
        }
    }, {
        key: 'isCorrect',
        value: function isCorrect() {
            return _questions2.default.current && this.question === _questions2.default.current.questions[0];
        }
    }, {
        key: 'pop',
        value: function pop() {
            if (this.isCorrect()) {
                _confetti2.default.addBurst(this);
                var el = this.getElement();
                _utils.jq.addClass(el, 'popped');
                this.popped = true;
                this.remove();
                this.game.nextQuestion();
            } else if (this.finale) {
                _confetti2.default.addBurst(this);
                var _el = this.getElement();
                _utils.jq.addClass(_el, 'popped');
                this.popped = true;
                this.remove();
                this.game.addNewBalloon(true);
            }
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            if (this.element !== null) {
                return this.element;
            }
            this.element = document.getElementById('balloon-' + this.id);
            return this.element;
        }
    }, {
        key: 'getConfettiElement',
        value: function getConfettiElement() {
            if (this.confetti !== null) {
                return this.confetti;
            }
            this.confetti = document.getElementById('confetti-' + this.id);
            return this.confetti;
        }
    }, {
        key: 'generateHTML',
        value: function generateHTML() {
            return '<div id="balloon-' + this.id + '" class="balloon balloon-' + this.color + ' ' + (this.finale ? 'finale' : '') + '" style="left: ' + this.x + '%; animation-delay: ' + this.delay + 'ms; animation-duration: ' + this.durations[0] + 'ms, ' + this.durations[1] + 'ms;"><span>' + (this.finale ? '' : this.question) + '</span></div>';
        }
    }, {
        key: 'generateConfettiHTML',
        value: function generateConfettiHTML() {
            return '<div id="confetti-' + this.id + '"></div>';
        }
    }, {
        key: 'remove',
        value: function remove() {
            var _this2 = this;

            var removeFromGame = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.getElement().remove();
            setTimeout(function () {
                return _this2.getConfettiElement().remove();
            }, 5000);
            if (removeFromGame) {
                var index = this.game.balloons.indexOf(this);
                if (index !== -1) {
                    this.game.balloons.splice(index, 1);
                }
            }
        }
    }, {
        key: 'updateView',
        value: function updateView() {
            var el = this.getElement();
            _utils.jq.removeClass(el, 'correct');
            _utils.jq.removeClass(el, 'finale');
            if (this.isCorrect()) {
                _utils.jq.addClass(el, 'correct');
            }
            if (this.finale) {
                _utils.jq.addClass(el, 'finale');
            }
            var span = el.querySelector('span');
            if (span.innerHTML !== this.question) {
                _utils.jq.changeText(span, this.question);
            }
        }
    }]);

    return Balloon;
}();

exports.default = Balloon;

},{"./confetti.js":3,"./questions.js":7,"./utils.js":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coor = function () {
    function Coor(x, y) {
        _classCallCheck(this, Coor);

        this.x = x;
        this.y = y;
    }

    _createClass(Coor, [{
        key: 'distanceTo',
        value: function distanceTo(coor) {
            var x = Math.abs(this.x - coor.x);
            var y = Math.abs(this.y - coor.y);
            return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }
    }], [{
        key: 'random',
        value: function random(w, h) {
            var centre = new Coor(w / 2, h / 2);
            var rnd = null;
            while (rnd === null) {
                rnd = new Coor((0, _utils.rand)(w), (0, _utils.rand)(h));
                if (rnd.distanceTo(centre) > Math.min(w, h) / 2) {
                    rnd = null;
                }
            }
            return rnd;
        }
    }]);

    return Coor;
}();

exports.default = Coor;

},{"./utils.js":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils.js');

var _elements = require('./elements.js');

var _elements2 = _interopRequireDefault(_elements);

var _Coor = require('./Coor.js');

var _Coor2 = _interopRequireDefault(_Coor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confetti = {
    addBurst: function addBurst(balloon) {
        var _this = this;

        var bound = balloon.getElement().getBoundingClientRect();
        var centre = new _Coor2.default(bound.left, bound.top);
        balloon.getConfettiElement().innerHTML = new Array(50).fill(1).map(function () {
            return _this.generateHTML(centre);
        }).join('');
    },
    // DO NOT USE. It's really laggy
    finale: function finale() {
        var _this2 = this;

        var maxWidth = window.innerWidth;
        var maxHeight = window.innerHeight / 2;
        new Array(50).fill(1).forEach(function () {
            var id = _utils.idGen.create();
            var centre = new _Coor2.default((0, _utils.rand)(maxWidth), (0, _utils.rand)(maxHeight));
            _elements2.default.confetti.innerHTML += '<div id="confetti-finale-' + id + '"></div>';
            var html = new Array(50).fill(1).map(function () {
                return _this2.generateHTML(centre);
            }).join('');
            setTimeout(function () {
                document.getElementById('confetti-finale-' + id).innerHTML = html;
            }, (0, _utils.rand)(10000));
        });
    },
    generateHTML: function generateHTML(centre) {
        var dir = (0, _utils.rand)(1, 4); // direction
        var color = ['red', 'green', 'blue', 'purple', 'orange'][(0, _utils.rand)(5)];
        var coor = _Coor2.default.random(126, 180);
        var d = (0, _utils.rand)(15) / 100; // animation delay

        var clss = 'particle particle-ani-' + dir + ' particle-' + color;
        var styl = 'top: ' + (centre.y + coor.y) + 'px; left: ' + (centre.x + coor.x) + 'px; animation-delay: -' + d + 's;';
        return '<span class="' + clss + '" style="' + styl + '"></span>';
    }
};

exports.default = confetti;

},{"./Coor.js":2,"./elements.js":4,"./utils.js":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    game: document.getElementById('game'),
    confetti: document.getElementById('confetti-box'),
    caption: document.getElementById('caption'),
    answer: document.getElementById('answer'),
    welcome: document.getElementById('welcome'),
    startBtn: document.getElementById('start-btn'),
    titleCard: {
        orig: document.getElementById('title-card-orig'),
        real: document.getElementById('title-card-real')
    },
    celeImgs: [document.getElementById('cele-gorilla'), document.getElementById('cele-diddy'), document.getElementById('cele-elmo'), document.getElementById('cele-giroud'), document.getElementById('cele-bear')]
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _elements = require('./elements.js');

var _elements2 = _interopRequireDefault(_elements);

var _questions = require('./questions.js');

var _questions2 = _interopRequireDefault(_questions);

var _Balloon = require('./Balloon.js');

var _Balloon2 = _interopRequireDefault(_Balloon);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var game = {
    balloons: [],
    addNewBalloons: function addNewBalloons() {
        var _this = this;

        var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var finale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        new Array(10).fill(1).map(function () {
            return new _Balloon2.default();
        }).forEach(function (balloon) {
            return _this.addBalloon(balloon, finale);
        });
    },
    addNewBalloon: function addNewBalloon() {
        var finale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.addBalloon(new _Balloon2.default(), finale);
    },
    addBalloon: function addBalloon() {
        var balloon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _Balloon2.default();
        var finale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (this.balloons.indexOf(balloon) === -1) {
            this.balloons.push(balloon);
        }
        balloon.setGameReference(game);
        balloon.setFinale(finale);

        _elements2.default.game.insertAdjacentHTML('beforeend', balloon.generateHTML());
        _elements2.default.confetti.insertAdjacentHTML('beforeend', balloon.generateConfettiHTML());

        balloon.getElement().addEventListener('click', function () {
            return balloon.pop();
        });
    },
    nextQuestion: function nextQuestion() {
        if (_questions2.default.nextQuestion()) {
            this.balloons.filter(function (balloon) {
                return !balloon.popped;
            }).reverse().forEach(function (balloon, index) {
                balloon.question = _questions2.default.current.questions[index];
                balloon.updateView();
            });
            _elements2.default.caption.style.opacity = '1';
            _utils.jq.changeText(_elements2.default.answer, _questions2.default.current.answer);
            if (_questions2.default.more.length === 0) {
                document.title = 'Pop the Question';
                _utils.jq.removeClass(_elements2.default.titleCard.orig, 'show');
                _utils.jq.addClass(_elements2.default.titleCard.real, 'show');
            }
        } else {
            _elements2.default.caption.style.opacity = '0';
            _elements2.default.answer.style.opacity = '0';
            this.addNewBalloons(10, true);
            _elements2.default.celeImgs.forEach(function (el) {
                return _utils.jq.addClass(el, 'show');
            });
        }
    }
};

window.cheat = function () {
    [].concat(_toConsumableArray(document.getElementsByClassName('correct'))).forEach(function (el) {
        return el.click();
    });
};

exports.default = game;

},{"./Balloon.js":1,"./elements.js":4,"./questions.js":7,"./utils.js":8}],6:[function(require,module,exports){
'use strict';

var _game = require('./game.js');

var _game2 = _interopRequireDefault(_game);

var _elements = require('./elements.js');

var _elements2 = _interopRequireDefault(_elements);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_game2.default.addNewBalloons(10);
_elements2.default.startBtn.addEventListener('click', function () {
    _game2.default.nextQuestion();
    _elements2.default.welcome.style.display = 'none';
    _utils.jq.addClass(_elements2.default.titleCard.orig, 'show');
});

},{"./elements.js":4,"./game.js":5,"./utils.js":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    current: null,
    more: [{
        answer: 'Andy Murray',
        questions: ['Who won Wimbledon in 2016?', 'Who won an Olympic Gold in Cycling?', 'Who is as tall as a leprechaun?', 'Who is a world-famous caber-tosser?', 'Who has three nipples?', 'Who is 19 years old?', 'Who built Rome in 7 days?', 'Who has a fear of Morocco?', 'Who is Batman?', 'Who has an IQ of 263?']
    }, {
        answer: 'Katniss Everdeen',
        questions: ['Who won the Hunger Games?', 'Who was Harry Potter’s best friend?', 'Who sang ‘Gangnam Style’?', 'Who painted the ‘Mona Lisa’?', 'Who has a vertical leap of 9 feet?', 'What is a village in Southern Italy?', 'What is a brand of Slug Repellent?', 'Who is the Gym Leader in Pallet Town?', 'Who is stuck on Mars in ‘The Martian’?']
    }, {
        answer: 'Arsenal',
        questions: ['Who play at the Emirates Stadium?', 'Who are the domestic champions of France?', 'Which team\'s mascot is an eagle?', 'Where would one store their boating oars?', 'Where are<br/>the 13 most expensive rabbits?', 'What is the ‘Jewel of California Bay’?', 'What is the 13th month called?', 'Who founded Facebook?']
    }, {
        answer: 'Nice, France',
        questions: ['Where is the Promenade des Anglais?', 'What is a type of biscuit?', 'What is an inland french town?', 'How do you spell ‘millennium’?', 'What letter comes after ‘J’?', 'Where does the Queen get buried?', 'Where are weetabix made?']
    }, {
        answer: 'Canterbury Cathedral',
        questions: ['Where did<br/>we both graduate from university?', 'Where did Andy Murray win the US Open?', 'Where is<br/>the world’s largest swimming pool?', 'Where are the Crown Jewels kept?', 'Where did Charles Darwin write Origin of Species?', 'Which UK Building is taller than Everest?']
    }, {
        answer: 'Pride and Prejudice',
        questions: ['What movie will I never watch again?', 'What is a great Xbox game?', 'What does the Pope’s tattoo say?', 'What is JK Rowling’s best selling book?', 'What is UKIP’s official motto?']
    }, {
        answer: 'Penguin',
        questions: ['What is the best, cutest animal?', 'What is the fastest animal on earth?', 'What is bright red?', 'What does Pikachu evolve into?']
    }, {
        answer: 'Origins Bar, Darwin College',
        questions: ['Where did we meet?', 'Dude, where’s my car?', 'Where have all the muffins gone?']
    }, {
        answer: 'Five',
        questions: ['How many years have we been together?', 'How old is Elvis Presley?']
    }, {
        answer: 'YES!',
        questions: ['Manny,<br/>will you<br/>marry me?']
    }],
    nextQuestion: function nextQuestion() {
        this.current = this.more.shift();
        return !!this.current;
    }
};

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var jq = {
    addClass: function addClass(el, className) {
        el.classList.add(className);
    },
    removeClass: function removeClass(el, className) {
        el.classList.remove(className);
    },
    hasClass: function hasClass(el, className) {
        el.classList.contains(className);
    },
    changeText: function changeText(el, newText) {
        var action = function action() {
            el.removeEventListener('transitionend', action);
            el.innerHTML = newText;
            el.style.opacity = '1';
        };
        el.style.opacity = '0';
        el.addEventListener('transitionend', action);
    }
};

var rand = function rand() {
    var frm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return Math.floor(Math.random() * Math.abs(to - frm)) + Math.min(frm, to);
};

var idGen = {
    chars: 'abcdefghijklmnopqrstuvwxyz0123456789',
    old: [],
    create: function create() {
        var gen = this.gen();
        if (this.old.indexOf(gen) !== -1) {
            return this.create();
        }
        this.old.push(gen);
        return gen;
    },
    gen: function gen() {
        var _this = this;

        return new Array(16).fill(1).map(function () {
            return _this.chars[rand(_this.chars.length)];
        }).join('');
    }
};

exports.jq = jq;
exports.idGen = idGen;
exports.rand = rand;

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvQmFsbG9vbi5qcyIsImFwcC9qcy9Db29yLmpzIiwiYXBwL2pzL2NvbmZldHRpLmpzIiwiYXBwL2pzL2VsZW1lbnRzLmpzIiwiYXBwL2pzL2dhbWUuanMiLCJhcHAvanMvbWFpbi5qcyIsImFwcC9qcy9xdWVzdGlvbnMuanMiLCJhcHAvanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sTztBQUNGLHVCQUE0QjtBQUFBLFlBQWhCLE1BQWdCLHVFQUFQLEtBQU87O0FBQUE7O0FBQ3hCLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxFQUFMLEdBQVUsYUFBTSxNQUFOLEVBQVY7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxhQUFLLENBQUwsR0FBUyxpQkFBSyxLQUFMLElBQWMsR0FBdkI7QUFDQSxhQUFLLEtBQUwsR0FBYSxpQkFBSyxJQUFMLENBQWI7QUFDQSxhQUFLLFNBQUwsR0FBaUIsQ0FBQyxpQkFBSyxJQUFMLEVBQVcsSUFBWCxDQUFELEVBQW1CLGlCQUFLLElBQUwsRUFBVyxLQUFYLENBQW5CLENBQWpCO0FBQ0EsYUFBSyxLQUFMLEdBQWEsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixNQUFqQixFQUF5QixRQUF6QixFQUFtQyxRQUFuQyxFQUE2QyxpQkFBSyxDQUFMLENBQTdDLENBQWI7QUFDQSxhQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsS0FBZDtBQUNBLGFBQUssa0JBQUwsR0FBMEIsSUFBMUI7QUFDSDs7Ozt5Q0FDZ0IsSSxFQUFNO0FBQ25CLGlCQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0g7OztrQ0FDUyxNLEVBQVE7QUFBQTs7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QVA7QUFDSDtBQUNELGFBQUssR0FBTCxDQUFTLElBQVQsQ0FBYyxHQUFkO0FBQ0EsZUFBTyxHQUFQO0FBQ0gsS0FWUztBQVdWLFNBQUssZUFBVztBQUFBOztBQUNaLGVBQU8sSUFBSSxLQUFKLENBQVUsRUFBVixFQUFjLElBQWQsQ0FBbUIsQ0FBbkIsRUFBc0IsR0FBdEIsQ0FBMEIsWUFBTTtBQUNuQyxtQkFBTyxNQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUssS0FBTCxDQUFXLE1BQWhCLENBQVgsQ0FBUDtBQUNILFNBRk0sRUFFSixJQUZJLENBRUMsRUFGRCxDQUFQO0FBR0g7QUFmUyxDQUFkOztRQW1CSSxFLEdBQUEsRTtRQUNBLEssR0FBQSxLO1FBQ0EsSSxHQUFBLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsganEsIGlkR2VuLCByYW5kIH0gZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgcXVlc3Rpb25zIGZyb20gJy4vcXVlc3Rpb25zLmpzJztcbmltcG9ydCBjb25mZXR0aSBmcm9tICcuL2NvbmZldHRpLmpzJztcblxuY2xhc3MgQmFsbG9vbiB7XG4gICAgY29uc3RydWN0b3IoZmluYWxlID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5maW5hbGUgPSBmaW5hbGU7XG4gICAgICAgIHRoaXMuaWQgPSBpZEdlbi5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9ICcnO1xuICAgICAgICB0aGlzLnggPSByYW5kKDEwMDAwKSAvIDEwMDtcbiAgICAgICAgdGhpcy5kZWxheSA9IHJhbmQoODAwMCk7XG4gICAgICAgIHRoaXMuZHVyYXRpb25zID0gW3JhbmQoMzUwMCwgNTAwMCksIHJhbmQoNDAwMCwgMTIwMDApXTtcbiAgICAgICAgdGhpcy5jb2xvciA9IFsncmVkJywgJ2dyZWVuJywgJ2JsdWUnLCAncHVycGxlJywgJ29yYW5nZSddW3JhbmQoNSldO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbmZldHRpID0gbnVsbDtcbiAgICAgICAgdGhpcy5wb3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5maW5hbGVQb3BUaW1lb3V0SWQgPSBudWxsO1xuICAgIH1cbiAgICBzZXRHYW1lUmVmZXJlbmNlKGdhbWUpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB9XG4gICAgc2V0RmluYWxlKGZpbmFsZSkge1xuICAgICAgICB0aGlzLmZpbmFsZSA9IGZpbmFsZTtcbiAgICAgICAgaWYgKGZpbmFsZSAmJiAhdGhpcy5maW5hbGVQb3BUaW1lb3V0SWQpIHtcbiAgICAgICAgICAgIHRoaXMuZmluYWxlUG9wVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBvcHBlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHJhbmQoMzAwMCwgMTIwMDApKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpc0NvcnJlY3QoKSB7XG4gICAgICAgIHJldHVybiBxdWVzdGlvbnMuY3VycmVudCAmJiB0aGlzLnF1ZXN0aW9uID09PSBxdWVzdGlvbnMuY3VycmVudC5xdWVzdGlvbnNbMF07XG4gICAgfVxuICAgIHBvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDb3JyZWN0KCkpIHtcbiAgICAgICAgICAgIGNvbmZldHRpLmFkZEJ1cnN0KHRoaXMpO1xuICAgICAgICAgICAgbGV0IGVsID0gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICBqcS5hZGRDbGFzcyhlbCwgJ3BvcHBlZCcpO1xuICAgICAgICAgICAgdGhpcy5wb3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5uZXh0UXVlc3Rpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZpbmFsZSkge1xuICAgICAgICAgICAgY29uZmV0dGkuYWRkQnVyc3QodGhpcyk7XG4gICAgICAgICAgICBsZXQgZWwgPSB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICAgICAgICAgIGpxLmFkZENsYXNzKGVsLCAncG9wcGVkJyk7XG4gICAgICAgICAgICB0aGlzLnBvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmFkZE5ld0JhbGxvb24odHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0RWxlbWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFsbG9vbi0nICsgdGhpcy5pZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gICAgfVxuICAgIGdldENvbmZldHRpRWxlbWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmV0dGkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmZldHRpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uZmV0dGkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uZmV0dGktJyArIHRoaXMuaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5jb25mZXR0aTtcbiAgICB9XG4gICAgZ2VuZXJhdGVIVE1MKCkge1xuICAgICAgICByZXR1cm4gYDxkaXYgaWQ9XCJiYWxsb29uLSR7dGhpcy5pZH1cIiBjbGFzcz1cImJhbGxvb24gYmFsbG9vbi0ke3RoaXMuY29sb3J9ICR7KHRoaXMuZmluYWxlKSA/ICdmaW5hbGUnIDogJyd9XCIgc3R5bGU9XCJsZWZ0OiAke3RoaXMueH0lOyBhbmltYXRpb24tZGVsYXk6ICR7dGhpcy5kZWxheX1tczsgYW5pbWF0aW9uLWR1cmF0aW9uOiAke3RoaXMuZHVyYXRpb25zWzBdfW1zLCAke3RoaXMuZHVyYXRpb25zWzFdfW1zO1wiPjxzcGFuPiR7KHRoaXMuZmluYWxlKSA/ICcnIDogdGhpcy5xdWVzdGlvbn08L3NwYW4+PC9kaXY+YDtcbiAgICB9XG4gICAgZ2VuZXJhdGVDb25mZXR0aUhUTUwoKSB7XG4gICAgICAgIHJldHVybiBgPGRpdiBpZD1cImNvbmZldHRpLSR7dGhpcy5pZH1cIj48L2Rpdj5gO1xuICAgIH1cbiAgICByZW1vdmUocmVtb3ZlRnJvbUdhbWUgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnJlbW92ZSgpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZ2V0Q29uZmV0dGlFbGVtZW50KCkucmVtb3ZlKCksIDUwMDApO1xuICAgICAgICBpZiAocmVtb3ZlRnJvbUdhbWUpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2FtZS5iYWxsb29ucy5pbmRleE9mKHRoaXMpO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWxsb29ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHVwZGF0ZVZpZXcoKSB7XG4gICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgICBqcS5yZW1vdmVDbGFzcyhlbCwgJ2NvcnJlY3QnKTtcbiAgICAgICAganEucmVtb3ZlQ2xhc3MoZWwsICdmaW5hbGUnKTtcbiAgICAgICAgaWYgKHRoaXMuaXNDb3JyZWN0KCkpIHtcbiAgICAgICAgICAgIGpxLmFkZENsYXNzKGVsLCAnY29ycmVjdCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZpbmFsZSkge1xuICAgICAgICAgICAganEuYWRkQ2xhc3MoZWwsICdmaW5hbGUnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3BhbiA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgICAgICAgaWYgKHNwYW4uaW5uZXJIVE1MICE9PSB0aGlzLnF1ZXN0aW9uKSB7XG4gICAgICAgICAgICBqcS5jaGFuZ2VUZXh0KHNwYW4sIHRoaXMucXVlc3Rpb24pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYWxsb29uOyIsImltcG9ydCB7IHJhbmQgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuY2xhc3MgQ29vciB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cbiAgICBkaXN0YW5jZVRvKGNvb3IpIHtcbiAgICAgICAgbGV0IHggPSBNYXRoLmFicyh0aGlzLnggLSBjb29yLngpO1xuICAgICAgICBsZXQgeSA9IE1hdGguYWJzKHRoaXMueSAtIGNvb3IueSk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeCwgMikgKyBNYXRoLnBvdyh5LCAyKSk7XG4gICAgfVxuICAgIHN0YXRpYyByYW5kb20odywgaCkge1xuICAgICAgICBsZXQgY2VudHJlID0gbmV3IENvb3IodyAvIDIsIGggLyAyKTtcbiAgICAgICAgbGV0IHJuZCA9IG51bGw7XG4gICAgICAgIHdoaWxlKHJuZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcm5kID0gbmV3IENvb3IocmFuZCh3KSwgcmFuZChoKSk7XG4gICAgICAgICAgICBpZiAocm5kLmRpc3RhbmNlVG8oY2VudHJlKSA+IChNYXRoLm1pbih3LCBoKSAvIDIpKSB7XG4gICAgICAgICAgICAgICAgcm5kID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm5kO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29vcjsiLCJpbXBvcnQgeyByYW5kLCBpZEdlbiB9IGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IGVsZW1lbnRzIGZyb20gJy4vZWxlbWVudHMuanMnO1xuaW1wb3J0IENvb3IgZnJvbSAnLi9Db29yLmpzJztcblxuY29uc3QgY29uZmV0dGkgPSB7XG4gICAgYWRkQnVyc3Q6IGZ1bmN0aW9uKGJhbGxvb24pIHtcbiAgICAgICAgbGV0IGJvdW5kID0gYmFsbG9vbi5nZXRFbGVtZW50KCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGxldCBjZW50cmUgPSBuZXcgQ29vcihib3VuZC5sZWZ0LCBib3VuZC50b3ApO1xuICAgICAgICBiYWxsb29uLmdldENvbmZldHRpRWxlbWVudCgpLmlubmVySFRNTCA9IG5ldyBBcnJheSg1MCkuZmlsbCgxKS5tYXAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVIVE1MKGNlbnRyZSk7XG4gICAgICAgIH0pLmpvaW4oJycpO1xuICAgIH0sXG4gICAgLy8gRE8gTk9UIFVTRS4gSXQncyByZWFsbHkgbGFnZ3lcbiAgICBmaW5hbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgbWF4V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgbGV0IG1heEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG4gICAgICAgIG5ldyBBcnJheSg1MCkuZmlsbCgxKS5mb3JFYWNoKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBpZCA9IGlkR2VuLmNyZWF0ZSgpO1xuICAgICAgICAgICAgbGV0IGNlbnRyZSA9IG5ldyBDb29yKHJhbmQobWF4V2lkdGgpLCByYW5kKG1heEhlaWdodCkpO1xuICAgICAgICAgICAgZWxlbWVudHMuY29uZmV0dGkuaW5uZXJIVE1MICs9IGA8ZGl2IGlkPVwiY29uZmV0dGktZmluYWxlLSR7aWR9XCI+PC9kaXY+YDtcbiAgICAgICAgICAgIGxldCBodG1sID0gbmV3IEFycmF5KDUwKS5maWxsKDEpLm1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVIVE1MKGNlbnRyZSk7XG4gICAgICAgICAgICB9KS5qb2luKCcnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjb25mZXR0aS1maW5hbGUtJHtpZH1gKS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICAgICAgfSwgcmFuZCgxMDAwMCkpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdlbmVyYXRlSFRNTDogZnVuY3Rpb24oY2VudHJlKSB7XG4gICAgICAgIGxldCBkaXIgPSByYW5kKDEsIDQpOyAvLyBkaXJlY3Rpb25cbiAgICAgICAgbGV0IGNvbG9yID0gWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICdwdXJwbGUnLCAnb3JhbmdlJ11bcmFuZCg1KV07XG4gICAgICAgIGxldCBjb29yID0gQ29vci5yYW5kb20oMTI2LCAxODApO1xuICAgICAgICBsZXQgZCA9IHJhbmQoMTUpIC8gMTAwOyAvLyBhbmltYXRpb24gZGVsYXlcblxuICAgICAgICBsZXQgY2xzcyA9IGBwYXJ0aWNsZSBwYXJ0aWNsZS1hbmktJHtkaXJ9IHBhcnRpY2xlLSR7Y29sb3J9YDtcbiAgICAgICAgbGV0IHN0eWwgPSBgdG9wOiAke2NlbnRyZS55ICsgY29vci55fXB4OyBsZWZ0OiAke2NlbnRyZS54ICsgY29vci54fXB4OyBhbmltYXRpb24tZGVsYXk6IC0ke2R9cztgO1xuICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwiJHtjbHNzfVwiIHN0eWxlPVwiJHtzdHlsfVwiPjwvc3Bhbj5gO1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZldHRpOyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBnYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpLFxuICAgIGNvbmZldHRpOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uZmV0dGktYm94JyksXG4gICAgY2FwdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcHRpb24nKSxcbiAgICBhbnN3ZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbnN3ZXInKSxcbiAgICB3ZWxjb21lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VsY29tZScpLFxuICAgIHN0YXJ0QnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtYnRuJyksXG4gICAgdGl0bGVDYXJkOiB7XG4gICAgICAgIG9yaWc6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZS1jYXJkLW9yaWcnKSxcbiAgICAgICAgcmVhbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlLWNhcmQtcmVhbCcpLFxuICAgIH0sXG4gICAgY2VsZUltZ3M6IFtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGUtZ29yaWxsYScpLFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsZS1kaWRkeScpLFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsZS1lbG1vJyksXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxlLWdpcm91ZCcpLFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsZS1iZWFyJylcbiAgICBdXG59OyIsImltcG9ydCBlbGVtZW50cyBmcm9tICcuL2VsZW1lbnRzLmpzJztcbmltcG9ydCBxdWVzdGlvbnMgZnJvbSAnLi9xdWVzdGlvbnMuanMnO1xuaW1wb3J0IEJhbGxvb24gZnJvbSAnLi9CYWxsb29uLmpzJztcbmltcG9ydCB7IGpxIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmNvbnN0IGdhbWUgPSB7XG4gICAgYmFsbG9vbnM6IFtdLFxuICAgIGFkZE5ld0JhbGxvb25zOiBmdW5jdGlvbihudW1iZXIgPSAxMCwgZmluYWxlID0gZmFsc2UpIHtcbiAgICAgICAgbmV3IEFycmF5KDEwKS5maWxsKDEpXG4gICAgICAgICAgICAubWFwKCgpID0+IG5ldyBCYWxsb29uKCkpXG4gICAgICAgICAgICAuZm9yRWFjaChiYWxsb29uID0+IHRoaXMuYWRkQmFsbG9vbihiYWxsb29uLCBmaW5hbGUpKTtcbiAgICB9LFxuICAgIGFkZE5ld0JhbGxvb246IGZ1bmN0aW9uKGZpbmFsZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuYWRkQmFsbG9vbihuZXcgQmFsbG9vbigpLCBmaW5hbGUpO1xuICAgIH0sXG4gICAgYWRkQmFsbG9vbjogZnVuY3Rpb24oYmFsbG9vbiA9IG5ldyBCYWxsb29uKCksIGZpbmFsZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmJhbGxvb25zLmluZGV4T2YoYmFsbG9vbikgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxvb25zLnB1c2goYmFsbG9vbik7XG4gICAgICAgIH1cbiAgICAgICAgYmFsbG9vbi5zZXRHYW1lUmVmZXJlbmNlKGdhbWUpO1xuICAgICAgICBiYWxsb29uLnNldEZpbmFsZShmaW5hbGUpO1xuXG4gICAgICAgIGVsZW1lbnRzLmdhbWUuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBiYWxsb29uLmdlbmVyYXRlSFRNTCgpKTtcbiAgICAgICAgZWxlbWVudHMuY29uZmV0dGkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBiYWxsb29uLmdlbmVyYXRlQ29uZmV0dGlIVE1MKCkpO1xuXG4gICAgICAgIGJhbGxvb24uZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gYmFsbG9vbi5wb3AoKSk7XG4gICAgfSxcbiAgICBuZXh0UXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocXVlc3Rpb25zLm5leHRRdWVzdGlvbigpKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxvb25zLmZpbHRlcihiYWxsb29uID0+ICFiYWxsb29uLnBvcHBlZCkucmV2ZXJzZSgpLmZvckVhY2goKGJhbGxvb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgYmFsbG9vbi5xdWVzdGlvbiA9IHF1ZXN0aW9ucy5jdXJyZW50LnF1ZXN0aW9uc1tpbmRleF07XG4gICAgICAgICAgICAgICAgYmFsbG9vbi51cGRhdGVWaWV3KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnRzLmNhcHRpb24uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIGpxLmNoYW5nZVRleHQoZWxlbWVudHMuYW5zd2VyLCBxdWVzdGlvbnMuY3VycmVudC5hbnN3ZXIpO1xuICAgICAgICAgICAgaWYgKHF1ZXN0aW9ucy5tb3JlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gJ1BvcCB0aGUgUXVlc3Rpb24nO1xuICAgICAgICAgICAgICAgIGpxLnJlbW92ZUNsYXNzKGVsZW1lbnRzLnRpdGxlQ2FyZC5vcmlnLCAnc2hvdycpO1xuICAgICAgICAgICAgICAgIGpxLmFkZENsYXNzKGVsZW1lbnRzLnRpdGxlQ2FyZC5yZWFsLCAnc2hvdycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudHMuY2FwdGlvbi5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgICAgICAgZWxlbWVudHMuYW5zd2VyLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgICAgICB0aGlzLmFkZE5ld0JhbGxvb25zKDEwLCB0cnVlKTtcbiAgICAgICAgICAgIGVsZW1lbnRzLmNlbGVJbWdzLmZvckVhY2goZWwgPT4ganEuYWRkQ2xhc3MoZWwsICdzaG93JykpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxud2luZG93LmNoZWF0ID0gZnVuY3Rpb24oKSB7XG4gICAgWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvcnJlY3QnKV0uZm9yRWFjaChlbCA9PiBlbC5jbGljaygpKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWU7IiwiaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lLmpzJztcbmltcG9ydCBlbGVtZW50cyBmcm9tICcuL2VsZW1lbnRzLmpzJztcbmltcG9ydCB7IGpxIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmdhbWUuYWRkTmV3QmFsbG9vbnMoMTApO1xuZWxlbWVudHMuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZ2FtZS5uZXh0UXVlc3Rpb24oKTtcbiAgICBlbGVtZW50cy53ZWxjb21lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAganEuYWRkQ2xhc3MoZWxlbWVudHMudGl0bGVDYXJkLm9yaWcsICdzaG93Jyk7XG59KTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgY3VycmVudDogbnVsbCxcbiAgICBtb3JlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ0FuZHkgTXVycmF5JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaG8gd29uIFdpbWJsZWRvbiBpbiAyMDE2PycsXG4gICAgICAgICAgICAgICAgJ1dobyB3b24gYW4gT2x5bXBpYyBHb2xkIGluIEN5Y2xpbmc/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIGFzIHRhbGwgYXMgYSBsZXByZWNoYXVuPycsXG4gICAgICAgICAgICAgICAgJ1dobyBpcyBhIHdvcmxkLWZhbW91cyBjYWJlci10b3NzZXI/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGhhcyB0aHJlZSBuaXBwbGVzPycsXG4gICAgICAgICAgICAgICAgJ1dobyBpcyAxOSB5ZWFycyBvbGQ/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGJ1aWx0IFJvbWUgaW4gNyBkYXlzPycsXG4gICAgICAgICAgICAgICAgJ1dobyBoYXMgYSBmZWFyIG9mIE1vcm9jY28/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIEJhdG1hbj8nLFxuICAgICAgICAgICAgICAgICdXaG8gaGFzIGFuIElRIG9mIDI2Mz8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ0thdG5pc3MgRXZlcmRlZW4nLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ1dobyB3b24gdGhlIEh1bmdlciBHYW1lcz8nLFxuICAgICAgICAgICAgICAgICdXaG8gd2FzIEhhcnJ5IFBvdHRlcuKAmXMgYmVzdCBmcmllbmQ/JyxcbiAgICAgICAgICAgICAgICAnV2hvIHNhbmcg4oCYR2FuZ25hbSBTdHlsZeKAmT8nLFxuICAgICAgICAgICAgICAgICdXaG8gcGFpbnRlZCB0aGUg4oCYTW9uYSBMaXNh4oCZPycsXG4gICAgICAgICAgICAgICAgJ1dobyBoYXMgYSB2ZXJ0aWNhbCBsZWFwIG9mIDkgZmVldD8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIGEgdmlsbGFnZSBpbiBTb3V0aGVybiBJdGFseT8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIGEgYnJhbmQgb2YgU2x1ZyBSZXBlbGxlbnQ/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIHRoZSBHeW0gTGVhZGVyIGluIFBhbGxldCBUb3duPycsXG4gICAgICAgICAgICAgICAgJ1dobyBpcyBzdHVjayBvbiBNYXJzIGluIOKAmFRoZSBNYXJ0aWFu4oCZPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnQXJzZW5hbCcsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnV2hvIHBsYXkgYXQgdGhlIEVtaXJhdGVzIFN0YWRpdW0/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGFyZSB0aGUgZG9tZXN0aWMgY2hhbXBpb25zIG9mIEZyYW5jZT8nLFxuICAgICAgICAgICAgICAgICdXaGljaCB0ZWFtXFwncyBtYXNjb3QgaXMgYW4gZWFnbGU/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgd291bGQgb25lIHN0b3JlIHRoZWlyIGJvYXRpbmcgb2Fycz8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBhcmU8YnIvPnRoZSAxMyBtb3N0IGV4cGVuc2l2ZSByYWJiaXRzPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgdGhlIOKAmEpld2VsIG9mIENhbGlmb3JuaWEgQmF54oCZPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgdGhlIDEzdGggbW9udGggY2FsbGVkPycsXG4gICAgICAgICAgICAgICAgJ1dobyBmb3VuZGVkIEZhY2Vib29rPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnTmljZSwgRnJhbmNlJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGVyZSBpcyB0aGUgUHJvbWVuYWRlIGRlcyBBbmdsYWlzPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgYSB0eXBlIG9mIGJpc2N1aXQ/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyBhbiBpbmxhbmQgZnJlbmNoIHRvd24/JyxcbiAgICAgICAgICAgICAgICAnSG93IGRvIHlvdSBzcGVsbCDigJhtaWxsZW5uaXVt4oCZPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgbGV0dGVyIGNvbWVzIGFmdGVyIOKAmErigJk/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgZG9lcyB0aGUgUXVlZW4gZ2V0IGJ1cmllZD8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBhcmUgd2VldGFiaXggbWFkZT8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ0NhbnRlcmJ1cnkgQ2F0aGVkcmFsJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGVyZSBkaWQ8YnIvPndlIGJvdGggZ3JhZHVhdGUgZnJvbSB1bml2ZXJzaXR5PycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGRpZCBBbmR5IE11cnJheSB3aW4gdGhlIFVTIE9wZW4/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgaXM8YnIvPnRoZSB3b3JsZOKAmXMgbGFyZ2VzdCBzd2ltbWluZyBwb29sPycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGFyZSB0aGUgQ3Jvd24gSmV3ZWxzIGtlcHQ/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgZGlkIENoYXJsZXMgRGFyd2luIHdyaXRlIE9yaWdpbiBvZiBTcGVjaWVzPycsXG4gICAgICAgICAgICAgICAgJ1doaWNoIFVLIEJ1aWxkaW5nIGlzIHRhbGxlciB0aGFuIEV2ZXJlc3Q/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdQcmlkZSBhbmQgUHJlanVkaWNlJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGF0IG1vdmllIHdpbGwgSSBuZXZlciB3YXRjaCBhZ2Fpbj8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIGEgZ3JlYXQgWGJveCBnYW1lPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgZG9lcyB0aGUgUG9wZeKAmXMgdGF0dG9vIHNheT8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIEpLIFJvd2xpbmfigJlzIGJlc3Qgc2VsbGluZyBib29rPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgVUtJUOKAmXMgb2ZmaWNpYWwgbW90dG8/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdQZW5ndWluJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGF0IGlzIHRoZSBiZXN0LCBjdXRlc3QgYW5pbWFsPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgdGhlIGZhc3Rlc3QgYW5pbWFsIG9uIGVhcnRoPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgYnJpZ2h0IHJlZD8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGRvZXMgUGlrYWNodSBldm9sdmUgaW50bz8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ09yaWdpbnMgQmFyLCBEYXJ3aW4gQ29sbGVnZScsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnV2hlcmUgZGlkIHdlIG1lZXQ/JyxcbiAgICAgICAgICAgICAgICAnRHVkZSwgd2hlcmXigJlzIG15IGNhcj8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBoYXZlIGFsbCB0aGUgbXVmZmlucyBnb25lPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnRml2ZScsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnSG93IG1hbnkgeWVhcnMgaGF2ZSB3ZSBiZWVuIHRvZ2V0aGVyPycsXG4gICAgICAgICAgICAgICAgJ0hvdyBvbGQgaXMgRWx2aXMgUHJlc2xleT8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ1lFUyEnLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ01hbm55LDxici8+d2lsbCB5b3U8YnIvPm1hcnJ5IG1lPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIF0sXG4gICAgbmV4dFF1ZXN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5tb3JlLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiAhISh0aGlzLmN1cnJlbnQpO1xuICAgIH1cbn07XG4iLCJjb25zdCBqcSA9IHtcbiAgICBhZGRDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfSxcbiAgICByZW1vdmVDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfSxcbiAgICBoYXNDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgICB9LFxuICAgIGNoYW5nZVRleHQ6IGZ1bmN0aW9uKGVsLCBuZXdUZXh0KSB7XG4gICAgICAgIGxldCBhY3Rpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYWN0aW9uKTtcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IG5ld1RleHQ7XG4gICAgICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICB9O1xuICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYWN0aW9uKTtcbiAgICB9XG59O1xuXG5jb25zdCByYW5kID0gKGZybSA9IDAsIHRvID0gMCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5hYnModG8gLSBmcm0pKSArIE1hdGgubWluKGZybSwgdG8pO1xuXG5jb25zdCBpZEdlbiA9IHtcbiAgICBjaGFyczogJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OScsXG4gICAgb2xkOiBbXSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZ2VuID0gdGhpcy5nZW4oKTtcbiAgICAgICAgaWYgKHRoaXMub2xkLmluZGV4T2YoZ2VuKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2xkLnB1c2goZ2VuKTtcbiAgICAgICAgcmV0dXJuIGdlbjtcbiAgICB9LFxuICAgIGdlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXkoMTYpLmZpbGwoMSkubWFwKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJzW3JhbmQodGhpcy5jaGFycy5sZW5ndGgpXTtcbiAgICAgICAgfSkuam9pbignJyk7XG4gICAgfVxufTtcblxuZXhwb3J0IHtcbiAgICBqcSxcbiAgICBpZEdlbixcbiAgICByYW5kXG59OyJdfQ==
