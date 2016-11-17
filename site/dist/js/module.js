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
    balloons: new Array(10).fill(1).map(function () {
        return new _Balloon2.default();
    }),
    placeBalloons: function placeBalloons() {
        var _this = this;

        var finale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (finale) {
            this.balloons = this.balloons.concat(new Array(10).fill(1).map(function () {
                return new _Balloon2.default();
            }));
        }

        this.balloons.filter(function (balloon) {
            return !balloon.popped;
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
    tidyUp: function tidyUp() {
        this.balloons.filter(function (balloon) {
            return balloon.popped;
        }).forEach(function (balloon) {
            return balloon.remove(false);
        });
        this.balloons = this.balloons.filter(function (balloon) {
            return !balloon.popped;
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
            this.placeBalloons(true);
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

_game2.default.placeBalloons();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvQmFsbG9vbi5qcyIsImFwcC9qcy9Db29yLmpzIiwiYXBwL2pzL2NvbmZldHRpLmpzIiwiYXBwL2pzL2VsZW1lbnRzLmpzIiwiYXBwL2pzL2dhbWUuanMiLCJhcHAvanMvbWFpbi5qcyIsImFwcC9qcy9xdWVzdGlvbnMuanMiLCJhcHAvanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sTztBQUNGLHVCQUE0QjtBQUFBLFlBQWhCLE1BQWdCLHVFQUFQLEtBQU87O0FBQUE7O0FBQ3hCLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxFQUFMLEdBQVUsYUFBTSxNQUFOLEVBQVY7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxhQUFLLENBQUwsR0FBUyxpQkFBSyxLQUFMLElBQWMsR0FBdkI7QUFDQSxhQUFLLEtBQUwsR0FBYSxpQkFBSyxJQUFMLENBQWI7QUFDQSxhQUFLLFNBQUwsR0FBaUIsQ0FBQyxpQkFBSyxJQUFMLEVBQVcsSUFBWCxDQUFELEVBQW1CLGlCQUFLLElBQUwsRUFBVyxLQUFYLENBQW5CLENBQWpCO0FBQ0EsYUFBSyxLQUFMLEdBQWEsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixNQUFqQixFQUF5QixRQUF6QixFQUFtQyxRQUFuQyxFQUE2QyxpQkFBSyxDQUFMLENBQTdDLENBQWI7QUFDQSxhQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsS0FBZDtBQUNBLGFBQUssa0JBQUwsR0FBMEIsSUFBMUI7QUFDSDs7Ozt5Q0FDZ0IsSSxFQUFNO0FBQ25CLGlCQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0g7OztrQ0FDUyxNLEVBQVE7QUFBQTs7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QW9CLGVBQXBCLEVBQXFDLE1BQXJDO0FBQ0g7QUFsQk0sQ0FBWDs7QUFxQkEsSUFBTSxPQUFPLFNBQVAsSUFBTztBQUFBLFFBQUMsR0FBRCx1RUFBTyxDQUFQO0FBQUEsUUFBVSxFQUFWLHVFQUFlLENBQWY7QUFBQSxXQUFxQixLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsS0FBSyxHQUFMLENBQVMsS0FBSyxHQUFkLENBQTNCLElBQWlELEtBQUssR0FBTCxDQUFTLEdBQVQsRUFBYyxFQUFkLENBQXRFO0FBQUEsQ0FBYjs7QUFFQSxJQUFNLFFBQVE7QUFDVixXQUFPLHNDQURHO0FBRVYsU0FBSyxFQUZLO0FBR1YsWUFBUSxrQkFBVztBQUNmLFlBQUksTUFBTSxLQUFLLEdBQUwsRUFBVjtBQUNBLFlBQUksS0FBSyxHQUFMLENBQVMsT0FBVCxDQUFpQixHQUFqQixNQUEwQixDQUFDLENBQS9CLEVBQWtDO0FBQzlCLG1CQUFPLEtBQUssTUFBTCxFQUFQO0FBQ0g7QUFDRCxhQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsR0FBZDtBQUNBLGVBQU8sR0FBUDtBQUNILEtBVlM7QUFXVixTQUFLLGVBQVc7QUFBQTs7QUFDWixlQUFPLElBQUksS0FBSixDQUFVLEVBQVYsRUFBYyxJQUFkLENBQW1CLENBQW5CLEVBQXNCLEdBQXRCLENBQTBCLFlBQU07QUFDbkMsbUJBQU8sTUFBSyxLQUFMLENBQVcsS0FBSyxNQUFLLEtBQUwsQ0FBVyxNQUFoQixDQUFYLENBQVA7QUFDSCxTQUZNLEVBRUosSUFGSSxDQUVDLEVBRkQsQ0FBUDtBQUdIO0FBZlMsQ0FBZDs7UUFtQkksRSxHQUFBLEU7UUFDQSxLLEdBQUEsSztRQUNBLEksR0FBQSxJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGpxLCBpZEdlbiwgcmFuZCB9IGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IHF1ZXN0aW9ucyBmcm9tICcuL3F1ZXN0aW9ucy5qcyc7XG5pbXBvcnQgY29uZmV0dGkgZnJvbSAnLi9jb25mZXR0aS5qcyc7XG5cbmNsYXNzIEJhbGxvb24ge1xuICAgIGNvbnN0cnVjdG9yKGZpbmFsZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZmluYWxlID0gZmluYWxlO1xuICAgICAgICB0aGlzLmlkID0gaWRHZW4uY3JlYXRlKCk7XG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSAnJztcbiAgICAgICAgdGhpcy54ID0gcmFuZCgxMDAwMCkgLyAxMDA7XG4gICAgICAgIHRoaXMuZGVsYXkgPSByYW5kKDgwMDApO1xuICAgICAgICB0aGlzLmR1cmF0aW9ucyA9IFtyYW5kKDM1MDAsIDUwMDApLCByYW5kKDQwMDAsIDEyMDAwKV07XG4gICAgICAgIHRoaXMuY29sb3IgPSBbJ3JlZCcsICdncmVlbicsICdibHVlJywgJ3B1cnBsZScsICdvcmFuZ2UnXVtyYW5kKDUpXTtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb25mZXR0aSA9IG51bGw7XG4gICAgICAgIHRoaXMucG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmluYWxlUG9wVGltZW91dElkID0gbnVsbDtcbiAgICB9XG4gICAgc2V0R2FtZVJlZmVyZW5jZShnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgfVxuICAgIHNldEZpbmFsZShmaW5hbGUpIHtcbiAgICAgICAgdGhpcy5maW5hbGUgPSBmaW5hbGU7XG4gICAgICAgIGlmIChmaW5hbGUgJiYgIXRoaXMuZmluYWxlUG9wVGltZW91dElkKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmFsZVBvcFRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wb3BwZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCByYW5kKDMwMDAsIDEyMDAwKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNDb3JyZWN0KCkge1xuICAgICAgICByZXR1cm4gcXVlc3Rpb25zLmN1cnJlbnQgJiYgdGhpcy5xdWVzdGlvbiA9PT0gcXVlc3Rpb25zLmN1cnJlbnQucXVlc3Rpb25zWzBdO1xuICAgIH1cbiAgICBwb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ29ycmVjdCgpKSB7XG4gICAgICAgICAgICBjb25mZXR0aS5hZGRCdXJzdCh0aGlzKTtcbiAgICAgICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgICAgICAganEuYWRkQ2xhc3MoZWwsICdwb3BwZWQnKTtcbiAgICAgICAgICAgIHRoaXMucG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmdhbWUubmV4dFF1ZXN0aW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5maW5hbGUpIHtcbiAgICAgICAgICAgIGNvbmZldHRpLmFkZEJ1cnN0KHRoaXMpO1xuICAgICAgICAgICAgbGV0IGVsID0gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICBqcS5hZGRDbGFzcyhlbCwgJ3BvcHBlZCcpO1xuICAgICAgICAgICAgdGhpcy5wb3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5hZGROZXdCYWxsb29uKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEVsZW1lbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhbGxvb24tJyArIHRoaXMuaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgIH1cbiAgICBnZXRDb25mZXR0aUVsZW1lbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZldHRpICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb25mZXR0aTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbmZldHRpID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmZldHRpLScgKyB0aGlzLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmV0dGk7XG4gICAgfVxuICAgIGdlbmVyYXRlSFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGlkPVwiYmFsbG9vbi0ke3RoaXMuaWR9XCIgY2xhc3M9XCJiYWxsb29uIGJhbGxvb24tJHt0aGlzLmNvbG9yfSAkeyh0aGlzLmZpbmFsZSkgPyAnZmluYWxlJyA6ICcnfVwiIHN0eWxlPVwibGVmdDogJHt0aGlzLnh9JTsgYW5pbWF0aW9uLWRlbGF5OiAke3RoaXMuZGVsYXl9bXM7IGFuaW1hdGlvbi1kdXJhdGlvbjogJHt0aGlzLmR1cmF0aW9uc1swXX1tcywgJHt0aGlzLmR1cmF0aW9uc1sxXX1tcztcIj48c3Bhbj4keyh0aGlzLmZpbmFsZSkgPyAnJyA6IHRoaXMucXVlc3Rpb259PC9zcGFuPjwvZGl2PmA7XG4gICAgfVxuICAgIGdlbmVyYXRlQ29uZmV0dGlIVE1MKCkge1xuICAgICAgICByZXR1cm4gYDxkaXYgaWQ9XCJjb25mZXR0aS0ke3RoaXMuaWR9XCI+PC9kaXY+YDtcbiAgICB9XG4gICAgcmVtb3ZlKHJlbW92ZUZyb21HYW1lID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5yZW1vdmUoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmdldENvbmZldHRpRWxlbWVudCgpLnJlbW92ZSgpLCA1MDAwKTtcbiAgICAgICAgaWYgKHJlbW92ZUZyb21HYW1lKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdhbWUuYmFsbG9vbnMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuYmFsbG9vbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVWaWV3KCkge1xuICAgICAgICBsZXQgZWwgPSB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICAgICAganEucmVtb3ZlQ2xhc3MoZWwsICdjb3JyZWN0Jyk7XG4gICAgICAgIGpxLnJlbW92ZUNsYXNzKGVsLCAnZmluYWxlJyk7XG4gICAgICAgIGlmICh0aGlzLmlzQ29ycmVjdCgpKSB7XG4gICAgICAgICAgICBqcS5hZGRDbGFzcyhlbCwgJ2NvcnJlY3QnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5maW5hbGUpIHtcbiAgICAgICAgICAgIGpxLmFkZENsYXNzKGVsLCAnZmluYWxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNwYW4gPSBlbC5xdWVyeVNlbGVjdG9yKCdzcGFuJyk7XG4gICAgICAgIGlmIChzcGFuLmlubmVySFRNTCAhPT0gdGhpcy5xdWVzdGlvbikge1xuICAgICAgICAgICAganEuY2hhbmdlVGV4dChzcGFuLCB0aGlzLnF1ZXN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFsbG9vbjsiLCJpbXBvcnQgeyByYW5kIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmNsYXNzIENvb3Ige1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG4gICAgZGlzdGFuY2VUbyhjb29yKSB7XG4gICAgICAgIGxldCB4ID0gTWF0aC5hYnModGhpcy54IC0gY29vci54KTtcbiAgICAgICAgbGV0IHkgPSBNYXRoLmFicyh0aGlzLnkgLSBjb29yLnkpO1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHgsIDIpICsgTWF0aC5wb3coeSwgMikpO1xuICAgIH1cbiAgICBzdGF0aWMgcmFuZG9tKHcsIGgpIHtcbiAgICAgICAgbGV0IGNlbnRyZSA9IG5ldyBDb29yKHcgLyAyLCBoIC8gMik7XG4gICAgICAgIGxldCBybmQgPSBudWxsO1xuICAgICAgICB3aGlsZShybmQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJuZCA9IG5ldyBDb29yKHJhbmQodyksIHJhbmQoaCkpO1xuICAgICAgICAgICAgaWYgKHJuZC5kaXN0YW5jZVRvKGNlbnRyZSkgPiAoTWF0aC5taW4odywgaCkgLyAyKSkge1xuICAgICAgICAgICAgICAgIHJuZCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJuZDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvb3I7IiwiaW1wb3J0IHsgcmFuZCwgaWRHZW4gfSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCBlbGVtZW50cyBmcm9tICcuL2VsZW1lbnRzLmpzJztcbmltcG9ydCBDb29yIGZyb20gJy4vQ29vci5qcyc7XG5cbmNvbnN0IGNvbmZldHRpID0ge1xuICAgIGFkZEJ1cnN0OiBmdW5jdGlvbihiYWxsb29uKSB7XG4gICAgICAgIGxldCBib3VuZCA9IGJhbGxvb24uZ2V0RWxlbWVudCgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgY2VudHJlID0gbmV3IENvb3IoYm91bmQubGVmdCwgYm91bmQudG9wKTtcbiAgICAgICAgYmFsbG9vbi5nZXRDb25mZXR0aUVsZW1lbnQoKS5pbm5lckhUTUwgPSBuZXcgQXJyYXkoNTApLmZpbGwoMSkubWFwKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlSFRNTChjZW50cmUpO1xuICAgICAgICB9KS5qb2luKCcnKTtcbiAgICB9LFxuICAgIC8vIERPIE5PVCBVU0UuIEl0J3MgcmVhbGx5IGxhZ2d5XG4gICAgZmluYWxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IG1heFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGxldCBtYXhIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xuICAgICAgICBuZXcgQXJyYXkoNTApLmZpbGwoMSkuZm9yRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaWQgPSBpZEdlbi5jcmVhdGUoKTtcbiAgICAgICAgICAgIGxldCBjZW50cmUgPSBuZXcgQ29vcihyYW5kKG1heFdpZHRoKSwgcmFuZChtYXhIZWlnaHQpKTtcbiAgICAgICAgICAgIGVsZW1lbnRzLmNvbmZldHRpLmlubmVySFRNTCArPSBgPGRpdiBpZD1cImNvbmZldHRpLWZpbmFsZS0ke2lkfVwiPjwvZGl2PmA7XG4gICAgICAgICAgICBsZXQgaHRtbCA9IG5ldyBBcnJheSg1MCkuZmlsbCgxKS5tYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlSFRNTChjZW50cmUpO1xuICAgICAgICAgICAgfSkuam9pbignJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY29uZmV0dGktZmluYWxlLSR7aWR9YCkuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgICAgIH0sIHJhbmQoMTAwMDApKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZW5lcmF0ZUhUTUw6IGZ1bmN0aW9uKGNlbnRyZSkge1xuICAgICAgICBsZXQgZGlyID0gcmFuZCgxLCA0KTsgLy8gZGlyZWN0aW9uXG4gICAgICAgIGxldCBjb2xvciA9IFsncmVkJywgJ2dyZWVuJywgJ2JsdWUnLCAncHVycGxlJywgJ29yYW5nZSddW3JhbmQoNSldO1xuICAgICAgICBsZXQgY29vciA9IENvb3IucmFuZG9tKDEyNiwgMTgwKTtcbiAgICAgICAgbGV0IGQgPSByYW5kKDE1KSAvIDEwMDsgLy8gYW5pbWF0aW9uIGRlbGF5XG5cbiAgICAgICAgbGV0IGNsc3MgPSBgcGFydGljbGUgcGFydGljbGUtYW5pLSR7ZGlyfSBwYXJ0aWNsZS0ke2NvbG9yfWA7XG4gICAgICAgIGxldCBzdHlsID0gYHRvcDogJHtjZW50cmUueSArIGNvb3IueX1weDsgbGVmdDogJHtjZW50cmUueCArIGNvb3IueH1weDsgYW5pbWF0aW9uLWRlbGF5OiAtJHtkfXM7YDtcbiAgICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cIiR7Y2xzc31cIiBzdHlsZT1cIiR7c3R5bH1cIj48L3NwYW4+YDtcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25mZXR0aTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZ2FtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKSxcbiAgICBjb25mZXR0aTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmZldHRpLWJveCcpLFxuICAgIGNhcHRpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXB0aW9uJyksXG4gICAgYW5zd2VyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYW5zd2VyJyksXG4gICAgd2VsY29tZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlbGNvbWUnKSxcbiAgICBzdGFydEJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LWJ0bicpLFxuICAgIHRpdGxlQ2FyZDoge1xuICAgICAgICBvcmlnOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUtY2FyZC1vcmlnJyksXG4gICAgICAgIHJlYWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZS1jYXJkLXJlYWwnKSxcbiAgICB9LFxuICAgIGNlbGVJbWdzOiBbXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxlLWdvcmlsbGEnKSxcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGUtZGlkZHknKSxcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGUtZWxtbycpLFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsZS1naXJvdWQnKSxcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGUtYmVhcicpXG4gICAgXVxufTsiLCJpbXBvcnQgZWxlbWVudHMgZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgcXVlc3Rpb25zIGZyb20gJy4vcXVlc3Rpb25zLmpzJztcbmltcG9ydCBCYWxsb29uIGZyb20gJy4vQmFsbG9vbi5qcyc7XG5pbXBvcnQgeyBqcSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5jb25zdCBnYW1lID0ge1xuICAgIGJhbGxvb25zOiBuZXcgQXJyYXkoMTApLmZpbGwoMSkubWFwKCgpID0+IG5ldyBCYWxsb29uKCkpLFxuICAgIHBsYWNlQmFsbG9vbnM6IGZ1bmN0aW9uKGZpbmFsZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChmaW5hbGUpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbG9vbnMgPSB0aGlzLmJhbGxvb25zLmNvbmNhdChuZXcgQXJyYXkoMTApLmZpbGwoMSkubWFwKCgpID0+IG5ldyBCYWxsb29uKCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYmFsbG9vbnNcbiAgICAgICAgICAgIC5maWx0ZXIoYmFsbG9vbiA9PiAhYmFsbG9vbi5wb3BwZWQpXG4gICAgICAgICAgICAuZm9yRWFjaChiYWxsb29uID0+IHRoaXMuYWRkQmFsbG9vbihiYWxsb29uLCBmaW5hbGUpKTtcbiAgICB9LFxuICAgIGFkZE5ld0JhbGxvb246IGZ1bmN0aW9uKGZpbmFsZSA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuYWRkQmFsbG9vbihuZXcgQmFsbG9vbigpLCBmaW5hbGUpO1xuICAgIH0sXG4gICAgYWRkQmFsbG9vbjogZnVuY3Rpb24oYmFsbG9vbiA9IG5ldyBCYWxsb29uKCksIGZpbmFsZSA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmJhbGxvb25zLmluZGV4T2YoYmFsbG9vbikgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxvb25zLnB1c2goYmFsbG9vbik7XG4gICAgICAgIH1cbiAgICAgICAgYmFsbG9vbi5zZXRHYW1lUmVmZXJlbmNlKGdhbWUpO1xuICAgICAgICBiYWxsb29uLnNldEZpbmFsZShmaW5hbGUpO1xuXG4gICAgICAgIGVsZW1lbnRzLmdhbWUuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBiYWxsb29uLmdlbmVyYXRlSFRNTCgpKTtcbiAgICAgICAgZWxlbWVudHMuY29uZmV0dGkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBiYWxsb29uLmdlbmVyYXRlQ29uZmV0dGlIVE1MKCkpO1xuXG4gICAgICAgIGJhbGxvb24uZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gYmFsbG9vbi5wb3AoKSk7XG4gICAgfSxcbiAgICB0aWR5VXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJhbGxvb25zXG4gICAgICAgICAgICAuZmlsdGVyKGJhbGxvb24gPT4gYmFsbG9vbi5wb3BwZWQpXG4gICAgICAgICAgICAuZm9yRWFjaChiYWxsb29uID0+IGJhbGxvb24ucmVtb3ZlKGZhbHNlKSk7XG4gICAgICAgIHRoaXMuYmFsbG9vbnMgPSB0aGlzLmJhbGxvb25zXG4gICAgICAgICAgICAuZmlsdGVyKGJhbGxvb24gPT4gIWJhbGxvb24ucG9wcGVkKTtcbiAgICB9LFxuICAgIG5leHRRdWVzdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChxdWVzdGlvbnMubmV4dFF1ZXN0aW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbG9vbnMuZmlsdGVyKGJhbGxvb24gPT4gIWJhbGxvb24ucG9wcGVkKS5yZXZlcnNlKCkuZm9yRWFjaCgoYmFsbG9vbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBiYWxsb29uLnF1ZXN0aW9uID0gcXVlc3Rpb25zLmN1cnJlbnQucXVlc3Rpb25zW2luZGV4XTtcbiAgICAgICAgICAgICAgICBiYWxsb29uLnVwZGF0ZVZpZXcoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxlbWVudHMuY2FwdGlvbi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAganEuY2hhbmdlVGV4dChlbGVtZW50cy5hbnN3ZXIsIHF1ZXN0aW9ucy5jdXJyZW50LmFuc3dlcik7XG4gICAgICAgICAgICBpZiAocXVlc3Rpb25zLm1vcmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSAnUG9wIHRoZSBRdWVzdGlvbic7XG4gICAgICAgICAgICAgICAganEucmVtb3ZlQ2xhc3MoZWxlbWVudHMudGl0bGVDYXJkLm9yaWcsICdzaG93Jyk7XG4gICAgICAgICAgICAgICAganEuYWRkQ2xhc3MoZWxlbWVudHMudGl0bGVDYXJkLnJlYWwsICdzaG93Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50cy5jYXB0aW9uLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgICAgICBlbGVtZW50cy5hbnN3ZXIuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICAgIHRoaXMucGxhY2VCYWxsb29ucyh0cnVlKTtcbiAgICAgICAgICAgIGVsZW1lbnRzLmNlbGVJbWdzLmZvckVhY2goZWwgPT4ganEuYWRkQ2xhc3MoZWwsICdzaG93JykpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxud2luZG93LmNoZWF0ID0gZnVuY3Rpb24oKSB7XG4gICAgWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NvcnJlY3QnKV0uZm9yRWFjaChlbCA9PiBlbC5jbGljaygpKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWU7IiwiaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lLmpzJztcbmltcG9ydCBlbGVtZW50cyBmcm9tICcuL2VsZW1lbnRzLmpzJztcbmltcG9ydCB7IGpxIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmdhbWUucGxhY2VCYWxsb29ucygpO1xuZWxlbWVudHMuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgZ2FtZS5uZXh0UXVlc3Rpb24oKTtcbiAgICBlbGVtZW50cy53ZWxjb21lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAganEuYWRkQ2xhc3MoZWxlbWVudHMudGl0bGVDYXJkLm9yaWcsICdzaG93Jyk7XG59KTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgY3VycmVudDogbnVsbCxcbiAgICBtb3JlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ0FuZHkgTXVycmF5JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaG8gd29uIFdpbWJsZWRvbiBpbiAyMDE2PycsXG4gICAgICAgICAgICAgICAgJ1dobyB3b24gYW4gT2x5bXBpYyBHb2xkIGluIEN5Y2xpbmc/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIGFzIHRhbGwgYXMgYSBsZXByZWNoYXVuPycsXG4gICAgICAgICAgICAgICAgJ1dobyBpcyBhIHdvcmxkLWZhbW91cyBjYWJlci10b3NzZXI/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGhhcyB0aHJlZSBuaXBwbGVzPycsXG4gICAgICAgICAgICAgICAgJ1dobyBpcyAxOSB5ZWFycyBvbGQ/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGJ1aWx0IFJvbWUgaW4gNyBkYXlzPycsXG4gICAgICAgICAgICAgICAgJ1dobyBoYXMgYSBmZWFyIG9mIE1vcm9jY28/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIEJhdG1hbj8nLFxuICAgICAgICAgICAgICAgICdXaG8gaGFzIGFuIElRIG9mIDI2Mz8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ0thdG5pc3MgRXZlcmRlZW4nLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ1dobyB3b24gdGhlIEh1bmdlciBHYW1lcz8nLFxuICAgICAgICAgICAgICAgICdXaG8gd2FzIEhhcnJ5IFBvdHRlcuKAmXMgYmVzdCBmcmllbmQ/JyxcbiAgICAgICAgICAgICAgICAnV2hvIHNhbmcg4oCYR2FuZ25hbSBTdHlsZeKAmT8nLFxuICAgICAgICAgICAgICAgICdXaG8gcGFpbnRlZCB0aGUg4oCYTW9uYSBMaXNh4oCZPycsXG4gICAgICAgICAgICAgICAgJ1dobyBoYXMgYSB2ZXJ0aWNhbCBsZWFwIG9mIDkgZmVldD8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIGEgdmlsbGFnZSBpbiBTb3V0aGVybiBJdGFseT8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIGEgYnJhbmQgb2YgU2x1ZyBSZXBlbGxlbnQ/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIHRoZSBHeW0gTGVhZGVyIGluIFBhbGxldCBUb3duPycsXG4gICAgICAgICAgICAgICAgJ1dobyBpcyBzdHVjayBvbiBNYXJzIGluIOKAmFRoZSBNYXJ0aWFu4oCZPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnQXJzZW5hbCcsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnV2hvIHBsYXkgYXQgdGhlIEVtaXJhdGVzIFN0YWRpdW0/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGFyZSB0aGUgZG9tZXN0aWMgY2hhbXBpb25zIG9mIEZyYW5jZT8nLFxuICAgICAgICAgICAgICAgICdXaGljaCB0ZWFtXFwncyBtYXNjb3QgaXMgYW4gZWFnbGU/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgd291bGQgb25lIHN0b3JlIHRoZWlyIGJvYXRpbmcgb2Fycz8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBhcmU8YnIvPnRoZSAxMyBtb3N0IGV4cGVuc2l2ZSByYWJiaXRzPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgdGhlIOKAmEpld2VsIG9mIENhbGlmb3JuaWEgQmF54oCZPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgdGhlIDEzdGggbW9udGggY2FsbGVkPycsXG4gICAgICAgICAgICAgICAgJ1dobyBmb3VuZGVkIEZhY2Vib29rPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnTmljZSwgRnJhbmNlJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGVyZSBpcyB0aGUgUHJvbWVuYWRlIGRlcyBBbmdsYWlzPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgYSB0eXBlIG9mIGJpc2N1aXQ/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyBhbiBpbmxhbmQgZnJlbmNoIHRvd24/JyxcbiAgICAgICAgICAgICAgICAnSG93IGRvIHlvdSBzcGVsbCDigJhtaWxsZW5uaXVt4oCZPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgbGV0dGVyIGNvbWVzIGFmdGVyIOKAmErigJk/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgZG9lcyB0aGUgUXVlZW4gZ2V0IGJ1cmllZD8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBhcmUgd2VldGFiaXggbWFkZT8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ0NhbnRlcmJ1cnkgQ2F0aGVkcmFsJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGVyZSBkaWQ8YnIvPndlIGJvdGggZ3JhZHVhdGUgZnJvbSB1bml2ZXJzaXR5PycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGRpZCBBbmR5IE11cnJheSB3aW4gdGhlIFVTIE9wZW4/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgaXM8YnIvPnRoZSB3b3JsZOKAmXMgbGFyZ2VzdCBzd2ltbWluZyBwb29sPycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGFyZSB0aGUgQ3Jvd24gSmV3ZWxzIGtlcHQ/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgZGlkIENoYXJsZXMgRGFyd2luIHdyaXRlIE9yaWdpbiBvZiBTcGVjaWVzPycsXG4gICAgICAgICAgICAgICAgJ1doaWNoIFVLIEJ1aWxkaW5nIGlzIHRhbGxlciB0aGFuIEV2ZXJlc3Q/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdQcmlkZSBhbmQgUHJlanVkaWNlJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGF0IG1vdmllIHdpbGwgSSBuZXZlciB3YXRjaCBhZ2Fpbj8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIGEgZ3JlYXQgWGJveCBnYW1lPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgZG9lcyB0aGUgUG9wZeKAmXMgdGF0dG9vIHNheT8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIEpLIFJvd2xpbmfigJlzIGJlc3Qgc2VsbGluZyBib29rPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgVUtJUOKAmXMgb2ZmaWNpYWwgbW90dG8/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdQZW5ndWluJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGF0IGlzIHRoZSBiZXN0LCBjdXRlc3QgYW5pbWFsPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgdGhlIGZhc3Rlc3QgYW5pbWFsIG9uIGVhcnRoPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgYnJpZ2h0IHJlZD8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGRvZXMgUGlrYWNodSBldm9sdmUgaW50bz8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ09yaWdpbnMgQmFyLCBEYXJ3aW4gQ29sbGVnZScsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnV2hlcmUgZGlkIHdlIG1lZXQ/JyxcbiAgICAgICAgICAgICAgICAnRHVkZSwgd2hlcmXigJlzIG15IGNhcj8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBoYXZlIGFsbCB0aGUgbXVmZmlucyBnb25lPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnRml2ZScsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnSG93IG1hbnkgeWVhcnMgaGF2ZSB3ZSBiZWVuIHRvZ2V0aGVyPycsXG4gICAgICAgICAgICAgICAgJ0hvdyBvbGQgaXMgRWx2aXMgUHJlc2xleT8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ1lFUyEnLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ01hbm55LDxici8+d2lsbCB5b3U8YnIvPm1hcnJ5IG1lPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIF0sXG4gICAgbmV4dFF1ZXN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5tb3JlLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiAhISh0aGlzLmN1cnJlbnQpO1xuICAgIH1cbn07XG4iLCJjb25zdCBqcSA9IHtcbiAgICBhZGRDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfSxcbiAgICByZW1vdmVDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfSxcbiAgICBoYXNDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgICB9LFxuICAgIGNoYW5nZVRleHQ6IGZ1bmN0aW9uKGVsLCBuZXdUZXh0KSB7XG4gICAgICAgIGxldCBhY3Rpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYWN0aW9uKTtcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IG5ld1RleHQ7XG4gICAgICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICB9O1xuICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYWN0aW9uKTtcbiAgICB9XG59O1xuXG5jb25zdCByYW5kID0gKGZybSA9IDAsIHRvID0gMCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5hYnModG8gLSBmcm0pKSArIE1hdGgubWluKGZybSwgdG8pO1xuXG5jb25zdCBpZEdlbiA9IHtcbiAgICBjaGFyczogJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OScsXG4gICAgb2xkOiBbXSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZ2VuID0gdGhpcy5nZW4oKTtcbiAgICAgICAgaWYgKHRoaXMub2xkLmluZGV4T2YoZ2VuKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2xkLnB1c2goZ2VuKTtcbiAgICAgICAgcmV0dXJuIGdlbjtcbiAgICB9LFxuICAgIGdlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXkoMTYpLmZpbGwoMSkubWFwKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJzW3JhbmQodGhpcy5jaGFycy5sZW5ndGgpXTtcbiAgICAgICAgfSkuam9pbignJyk7XG4gICAgfVxufTtcblxuZXhwb3J0IHtcbiAgICBqcSxcbiAgICBpZEdlbixcbiAgICByYW5kXG59OyJdfQ==
