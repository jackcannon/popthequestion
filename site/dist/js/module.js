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
        questions: ['Which fictitious character won the Hunger Games?', 'Who was Harry Potter’s best friend?', 'Who sang ‘Gangnam Style’?', 'Who painted the ‘Mona Lisa’?', 'Who has a vertical leap of 9 feet?', 'What is a village in Southern Italy?', 'What is a brand of Slug Repellent?', 'Who is the Gym Leader in Pallet Town?', 'Who is stuck on Mars in ‘The Martian’?']
    }, {
        answer: 'Arsenal',
        questions: ['Who play their home games at the Emirates Stadium?', 'Who are the domestic champions of France?', 'Who won Sport Personality ‘Team of the Year’ 2010?', 'Where would one store their boating oars?', 'Where can you buy the 13 most expensive rabbits?', 'What is the ‘Jewel of California Bay’?', 'What is the 13th month called?', 'Who founded Facebook?']
    }, {
        answer: 'Nice, France',
        questions: ['Where is the Promenade des Anglais?', 'What is a type of biscuit?', 'What is an inland french town?', 'How do you spell ‘millennium’?', 'What letter comes after ‘J’?', 'Where does the Queen get buried?', 'Where are weetabix made?']
    }, {
        answer: 'Canterbury Cathedral',
        questions: ['Where did we both graduate from university?', 'Where did Andy Murray win the US Open?', 'Where is the world’s largest swimming pool?', 'Where are the Crown Jewels kept?', 'Where did Charles Darwin write Origin of Species?', 'Which UK Building is taller than Everest?']
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
        questions: ['Manny, will you marry me?']
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvQmFsbG9vbi5qcyIsImFwcC9qcy9Db29yLmpzIiwiYXBwL2pzL2NvbmZldHRpLmpzIiwiYXBwL2pzL2VsZW1lbnRzLmpzIiwiYXBwL2pzL2dhbWUuanMiLCJhcHAvanMvbWFpbi5qcyIsImFwcC9qcy9xdWVzdGlvbnMuanMiLCJhcHAvanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sTztBQUNGLHVCQUE0QjtBQUFBLFlBQWhCLE1BQWdCLHVFQUFQLEtBQU87O0FBQUE7O0FBQ3hCLGFBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxhQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0EsYUFBSyxFQUFMLEdBQVUsYUFBTSxNQUFOLEVBQVY7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxhQUFLLENBQUwsR0FBUyxpQkFBSyxLQUFMLElBQWMsR0FBdkI7QUFDQSxhQUFLLEtBQUwsR0FBYSxpQkFBSyxJQUFMLENBQWI7QUFDQSxhQUFLLFNBQUwsR0FBaUIsQ0FBQyxpQkFBSyxJQUFMLEVBQVcsSUFBWCxDQUFELEVBQW1CLGlCQUFLLElBQUwsRUFBVyxLQUFYLENBQW5CLENBQWpCO0FBQ0EsYUFBSyxLQUFMLEdBQWEsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixNQUFqQixFQUF5QixRQUF6QixFQUFtQyxRQUFuQyxFQUE2QyxpQkFBSyxDQUFMLENBQTdDLENBQWI7QUFDQSxhQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBSyxNQUFMLEdBQWMsS0FBZDtBQUNBLGFBQUssa0JBQUwsR0FBMEIsSUFBMUI7QUFDSDs7Ozt5Q0FDZ0IsSSxFQUFNO0FBQ25CLGlCQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0g7OztrQ0FDUyxNLEVBQVE7QUFBQTs7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bEJNLENBQVg7O0FBcUJBLElBQU0sT0FBTyxTQUFQLElBQU87QUFBQSxRQUFDLEdBQUQsdUVBQU8sQ0FBUDtBQUFBLFFBQVUsRUFBVix1RUFBZSxDQUFmO0FBQUEsV0FBcUIsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLEtBQUssR0FBTCxDQUFTLEtBQUssR0FBZCxDQUEzQixJQUFpRCxLQUFLLEdBQUwsQ0FBUyxHQUFULEVBQWMsRUFBZCxDQUF0RTtBQUFBLENBQWI7O0FBRUEsSUFBTSxRQUFRO0FBQ1YsV0FBTyxzQ0FERztBQUVWLFNBQUssRUFGSztBQUdWLFlBQVEsa0JBQVc7QUFDZixZQUFJLE1BQU0sS0FBSyxHQUFMLEVBQVY7QUFDQSxZQUFJLEtBQUssR0FBTCxDQUFTLE9BQVQsQ0FBaUIsR0FBakIsTUFBMEIsQ0FBQyxDQUEvQixFQUFrQztBQUM5QixtQkFBTyxLQUFLLE1BQUwsRUFBUDtBQUNIO0FBQ0QsYUFBSyxHQUFMLENBQVMsSUFBVCxDQUFjLEdBQWQ7QUFDQSxlQUFPLEdBQVA7QUFDSCxLQVZTO0FBV1YsU0FBSyxlQUFXO0FBQUE7O0FBQ1osZUFBTyxJQUFJLEtBQUosQ0FBVSxFQUFWLEVBQWMsSUFBZCxDQUFtQixDQUFuQixFQUFzQixHQUF0QixDQUEwQixZQUFNO0FBQ25DLG1CQUFPLE1BQUssS0FBTCxDQUFXLEtBQUssTUFBSyxLQUFMLENBQVcsTUFBaEIsQ0FBWCxDQUFQO0FBQ0gsU0FGTSxFQUVKLElBRkksQ0FFQyxFQUZELENBQVA7QUFHSDtBQWZTLENBQWQ7O1FBbUJJLEUsR0FBQSxFO1FBQ0EsSyxHQUFBLEs7UUFDQSxJLEdBQUEsSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBqcSwgaWRHZW4sIHJhbmQgfSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCBxdWVzdGlvbnMgZnJvbSAnLi9xdWVzdGlvbnMuanMnO1xuaW1wb3J0IGNvbmZldHRpIGZyb20gJy4vY29uZmV0dGkuanMnO1xuXG5jbGFzcyBCYWxsb29uIHtcbiAgICBjb25zdHJ1Y3RvcihmaW5hbGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmdhbWUgPSBudWxsO1xuICAgICAgICB0aGlzLmZpbmFsZSA9IGZpbmFsZTtcbiAgICAgICAgdGhpcy5pZCA9IGlkR2VuLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gJyc7XG4gICAgICAgIHRoaXMueCA9IHJhbmQoMTAwMDApIC8gMTAwO1xuICAgICAgICB0aGlzLmRlbGF5ID0gcmFuZCg4MDAwKTtcbiAgICAgICAgdGhpcy5kdXJhdGlvbnMgPSBbcmFuZCgzNTAwLCA1MDAwKSwgcmFuZCg0MDAwLCAxMjAwMCldO1xuICAgICAgICB0aGlzLmNvbG9yID0gWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICdwdXJwbGUnLCAnb3JhbmdlJ11bcmFuZCg1KV07XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29uZmV0dGkgPSBudWxsO1xuICAgICAgICB0aGlzLnBvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZpbmFsZVBvcFRpbWVvdXRJZCA9IG51bGw7XG4gICAgfVxuICAgIHNldEdhbWVSZWZlcmVuY2UoZ2FtZSkge1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIH1cbiAgICBzZXRGaW5hbGUoZmluYWxlKSB7XG4gICAgICAgIHRoaXMuZmluYWxlID0gZmluYWxlO1xuICAgICAgICBpZiAoZmluYWxlICYmICF0aGlzLmZpbmFsZVBvcFRpbWVvdXRJZCkge1xuICAgICAgICAgICAgdGhpcy5maW5hbGVQb3BUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgcmFuZCgzMDAwLCAxMjAwMCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlzQ29ycmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHF1ZXN0aW9ucy5jdXJyZW50ICYmIHRoaXMucXVlc3Rpb24gPT09IHF1ZXN0aW9ucy5jdXJyZW50LnF1ZXN0aW9uc1swXTtcbiAgICB9XG4gICAgcG9wKCkge1xuICAgICAgICBpZiAodGhpcy5pc0NvcnJlY3QoKSkge1xuICAgICAgICAgICAgY29uZmV0dGkuYWRkQnVyc3QodGhpcyk7XG4gICAgICAgICAgICBsZXQgZWwgPSB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICAgICAgICAgIGpxLmFkZENsYXNzKGVsLCAncG9wcGVkJyk7XG4gICAgICAgICAgICB0aGlzLnBvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5nYW1lLm5leHRRdWVzdGlvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZmluYWxlKSB7XG4gICAgICAgICAgICBjb25mZXR0aS5hZGRCdXJzdCh0aGlzKTtcbiAgICAgICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgICAgICAganEuYWRkQ2xhc3MoZWwsICdwb3BwZWQnKTtcbiAgICAgICAgICAgIHRoaXMucG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYWRkTmV3QmFsbG9vbih0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWxsb29uLScgKyB0aGlzLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0Q29uZmV0dGlFbGVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5jb25mZXR0aSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmV0dGk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25mZXR0aSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25mZXR0aS0nICsgdGhpcy5pZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZldHRpO1xuICAgIH1cbiAgICBnZW5lcmF0ZUhUTUwoKSB7XG4gICAgICAgIHJldHVybiBgPGRpdiBpZD1cImJhbGxvb24tJHt0aGlzLmlkfVwiIGNsYXNzPVwiYmFsbG9vbiBiYWxsb29uLSR7dGhpcy5jb2xvcn0gJHsodGhpcy5maW5hbGUpID8gJ2ZpbmFsZScgOiAnJ31cIiBzdHlsZT1cImxlZnQ6ICR7dGhpcy54fSU7IGFuaW1hdGlvbi1kZWxheTogJHt0aGlzLmRlbGF5fW1zOyBhbmltYXRpb24tZHVyYXRpb246ICR7dGhpcy5kdXJhdGlvbnNbMF19bXMsICR7dGhpcy5kdXJhdGlvbnNbMV19bXM7XCI+PHNwYW4+JHsodGhpcy5maW5hbGUpID8gJycgOiB0aGlzLnF1ZXN0aW9ufTwvc3Bhbj48L2Rpdj5gO1xuICAgIH1cbiAgICBnZW5lcmF0ZUNvbmZldHRpSFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGlkPVwiY29uZmV0dGktJHt0aGlzLmlkfVwiPjwvZGl2PmA7XG4gICAgfVxuICAgIHJlbW92ZShyZW1vdmVGcm9tR2FtZSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KCkucmVtb3ZlKCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5nZXRDb25mZXR0aUVsZW1lbnQoKS5yZW1vdmUoKSwgNTAwMCk7XG4gICAgICAgIGlmIChyZW1vdmVGcm9tR2FtZSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nYW1lLmJhbGxvb25zLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLmJhbGxvb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlVmlldygpIHtcbiAgICAgICAgbGV0IGVsID0gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICAgIGpxLnJlbW92ZUNsYXNzKGVsLCAnY29ycmVjdCcpO1xuICAgICAgICBqcS5yZW1vdmVDbGFzcyhlbCwgJ2ZpbmFsZScpO1xuICAgICAgICBpZiAodGhpcy5pc0NvcnJlY3QoKSkge1xuICAgICAgICAgICAganEuYWRkQ2xhc3MoZWwsICdjb3JyZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZmluYWxlKSB7XG4gICAgICAgICAgICBqcS5hZGRDbGFzcyhlbCwgJ2ZpbmFsZScpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzcGFuID0gZWwucXVlcnlTZWxlY3Rvcignc3BhbicpO1xuICAgICAgICBpZiAoc3Bhbi5pbm5lckhUTUwgIT09IHRoaXMucXVlc3Rpb24pIHtcbiAgICAgICAgICAgIGpxLmNoYW5nZVRleHQoc3BhbiwgdGhpcy5xdWVzdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhbGxvb247IiwiaW1wb3J0IHsgcmFuZCB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5jbGFzcyBDb29yIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuICAgIGRpc3RhbmNlVG8oY29vcikge1xuICAgICAgICBsZXQgeCA9IE1hdGguYWJzKHRoaXMueCAtIGNvb3IueCk7XG4gICAgICAgIGxldCB5ID0gTWF0aC5hYnModGhpcy55IC0gY29vci55KTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpKTtcbiAgICB9XG4gICAgc3RhdGljIHJhbmRvbSh3LCBoKSB7XG4gICAgICAgIGxldCBjZW50cmUgPSBuZXcgQ29vcih3IC8gMiwgaCAvIDIpO1xuICAgICAgICBsZXQgcm5kID0gbnVsbDtcbiAgICAgICAgd2hpbGUocm5kID09PSBudWxsKSB7XG4gICAgICAgICAgICBybmQgPSBuZXcgQ29vcihyYW5kKHcpLCByYW5kKGgpKTtcbiAgICAgICAgICAgIGlmIChybmQuZGlzdGFuY2VUbyhjZW50cmUpID4gKE1hdGgubWluKHcsIGgpIC8gMikpIHtcbiAgICAgICAgICAgICAgICBybmQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBybmQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb29yOyIsImltcG9ydCB7IHJhbmQsIGlkR2VuIH0gZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgZWxlbWVudHMgZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgQ29vciBmcm9tICcuL0Nvb3IuanMnO1xuXG5jb25zdCBjb25mZXR0aSA9IHtcbiAgICBhZGRCdXJzdDogZnVuY3Rpb24oYmFsbG9vbikge1xuICAgICAgICBsZXQgYm91bmQgPSBiYWxsb29uLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IGNlbnRyZSA9IG5ldyBDb29yKGJvdW5kLmxlZnQsIGJvdW5kLnRvcCk7XG4gICAgICAgIGJhbGxvb24uZ2V0Q29uZmV0dGlFbGVtZW50KCkuaW5uZXJIVE1MID0gbmV3IEFycmF5KDUwKS5maWxsKDEpLm1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUhUTUwoY2VudHJlKTtcbiAgICAgICAgfSkuam9pbignJyk7XG4gICAgfSxcbiAgICAvLyBETyBOT1QgVVNFLiBJdCdzIHJlYWxseSBsYWdneVxuICAgIGZpbmFsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBtYXhXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBsZXQgbWF4SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcbiAgICAgICAgbmV3IEFycmF5KDUwKS5maWxsKDEpLmZvckVhY2goKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlkID0gaWRHZW4uY3JlYXRlKCk7XG4gICAgICAgICAgICBsZXQgY2VudHJlID0gbmV3IENvb3IocmFuZChtYXhXaWR0aCksIHJhbmQobWF4SGVpZ2h0KSk7XG4gICAgICAgICAgICBlbGVtZW50cy5jb25mZXR0aS5pbm5lckhUTUwgKz0gYDxkaXYgaWQ9XCJjb25mZXR0aS1maW5hbGUtJHtpZH1cIj48L2Rpdj5gO1xuICAgICAgICAgICAgbGV0IGh0bWwgPSBuZXcgQXJyYXkoNTApLmZpbGwoMSkubWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUhUTUwoY2VudHJlKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJycpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNvbmZldHRpLWZpbmFsZS0ke2lkfWApLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICB9LCByYW5kKDEwMDAwKSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2VuZXJhdGVIVE1MOiBmdW5jdGlvbihjZW50cmUpIHtcbiAgICAgICAgbGV0IGRpciA9IHJhbmQoMSwgNCk7IC8vIGRpcmVjdGlvblxuICAgICAgICBsZXQgY29sb3IgPSBbJ3JlZCcsICdncmVlbicsICdibHVlJywgJ3B1cnBsZScsICdvcmFuZ2UnXVtyYW5kKDUpXTtcbiAgICAgICAgbGV0IGNvb3IgPSBDb29yLnJhbmRvbSgxMjYsIDE4MCk7XG4gICAgICAgIGxldCBkID0gcmFuZCgxNSkgLyAxMDA7IC8vIGFuaW1hdGlvbiBkZWxheVxuXG4gICAgICAgIGxldCBjbHNzID0gYHBhcnRpY2xlIHBhcnRpY2xlLWFuaS0ke2Rpcn0gcGFydGljbGUtJHtjb2xvcn1gO1xuICAgICAgICBsZXQgc3R5bCA9IGB0b3A6ICR7Y2VudHJlLnkgKyBjb29yLnl9cHg7IGxlZnQ6ICR7Y2VudHJlLnggKyBjb29yLnh9cHg7IGFuaW1hdGlvbi1kZWxheTogLSR7ZH1zO2A7XG4gICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCIke2Nsc3N9XCIgc3R5bGU9XCIke3N0eWx9XCI+PC9zcGFuPmA7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmV0dGk7IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGdhbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyksXG4gICAgY29uZmV0dGk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25mZXR0aS1ib3gnKSxcbiAgICBjYXB0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FwdGlvbicpLFxuICAgIGFuc3dlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fuc3dlcicpLFxuICAgIHdlbGNvbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lJyksXG4gICAgc3RhcnRCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1idG4nKSxcbiAgICB0aXRsZUNhcmQ6IHtcbiAgICAgICAgb3JpZzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlLWNhcmQtb3JpZycpLFxuICAgICAgICByZWFsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUtY2FyZC1yZWFsJyksXG4gICAgfSxcbiAgICBjZWxlSW1nczogW1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsZS1nb3JpbGxhJyksXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxlLWRpZGR5JyksXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxlLWVsbW8nKSxcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGUtZ2lyb3VkJyksXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjZWxlLWJlYXInKVxuICAgIF1cbn07IiwiaW1wb3J0IGVsZW1lbnRzIGZyb20gJy4vZWxlbWVudHMuanMnO1xuaW1wb3J0IHF1ZXN0aW9ucyBmcm9tICcuL3F1ZXN0aW9ucy5qcyc7XG5pbXBvcnQgQmFsbG9vbiBmcm9tICcuL0JhbGxvb24uanMnO1xuaW1wb3J0IHsganEgfSBmcm9tICcuL3V0aWxzLmpzJztcblxuY29uc3QgZ2FtZSA9IHtcbiAgICBiYWxsb29uczogbmV3IEFycmF5KDEwKS5maWxsKDEpLm1hcCgoKSA9PiBuZXcgQmFsbG9vbigpKSxcbiAgICBwbGFjZUJhbGxvb25zOiBmdW5jdGlvbihmaW5hbGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAoZmluYWxlKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxvb25zID0gdGhpcy5iYWxsb29ucy5jb25jYXQobmV3IEFycmF5KDEwKS5maWxsKDEpLm1hcCgoKSA9PiBuZXcgQmFsbG9vbigpKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJhbGxvb25zXG4gICAgICAgICAgICAuZmlsdGVyKGJhbGxvb24gPT4gIWJhbGxvb24ucG9wcGVkKVxuICAgICAgICAgICAgLmZvckVhY2goYmFsbG9vbiA9PiB0aGlzLmFkZEJhbGxvb24oYmFsbG9vbiwgZmluYWxlKSk7XG4gICAgfSxcbiAgICBhZGROZXdCYWxsb29uOiBmdW5jdGlvbihmaW5hbGUgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmFkZEJhbGxvb24obmV3IEJhbGxvb24oKSwgZmluYWxlKTtcbiAgICB9LFxuICAgIGFkZEJhbGxvb246IGZ1bmN0aW9uKGJhbGxvb24gPSBuZXcgQmFsbG9vbigpLCBmaW5hbGUgPSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5iYWxsb29ucy5pbmRleE9mKGJhbGxvb24pID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsb29ucy5wdXNoKGJhbGxvb24pO1xuICAgICAgICB9XG4gICAgICAgIGJhbGxvb24uc2V0R2FtZVJlZmVyZW5jZShnYW1lKTtcbiAgICAgICAgYmFsbG9vbi5zZXRGaW5hbGUoZmluYWxlKTtcblxuICAgICAgICBlbGVtZW50cy5nYW1lLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYmFsbG9vbi5nZW5lcmF0ZUhUTUwoKSk7XG4gICAgICAgIGVsZW1lbnRzLmNvbmZldHRpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYmFsbG9vbi5nZW5lcmF0ZUNvbmZldHRpSFRNTCgpKTtcblxuICAgICAgICBiYWxsb29uLmdldEVsZW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGJhbGxvb24ucG9wKCkpO1xuICAgIH0sXG4gICAgdGlkeVVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5iYWxsb29uc1xuICAgICAgICAgICAgLmZpbHRlcihiYWxsb29uID0+IGJhbGxvb24ucG9wcGVkKVxuICAgICAgICAgICAgLmZvckVhY2goYmFsbG9vbiA9PiBiYWxsb29uLnJlbW92ZShmYWxzZSkpO1xuICAgICAgICB0aGlzLmJhbGxvb25zID0gdGhpcy5iYWxsb29uc1xuICAgICAgICAgICAgLmZpbHRlcihiYWxsb29uID0+ICFiYWxsb29uLnBvcHBlZCk7XG4gICAgfSxcbiAgICBuZXh0UXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocXVlc3Rpb25zLm5leHRRdWVzdGlvbigpKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxvb25zLmZpbHRlcihiYWxsb29uID0+ICFiYWxsb29uLnBvcHBlZCkucmV2ZXJzZSgpLmZvckVhY2goKGJhbGxvb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgYmFsbG9vbi5xdWVzdGlvbiA9IHF1ZXN0aW9ucy5jdXJyZW50LnF1ZXN0aW9uc1tpbmRleF07XG4gICAgICAgICAgICAgICAgYmFsbG9vbi51cGRhdGVWaWV3KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnRzLmNhcHRpb24uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIGpxLmNoYW5nZVRleHQoZWxlbWVudHMuYW5zd2VyLCBxdWVzdGlvbnMuY3VycmVudC5hbnN3ZXIpO1xuICAgICAgICAgICAgaWYgKHF1ZXN0aW9ucy5tb3JlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGpxLnJlbW92ZUNsYXNzKGVsZW1lbnRzLnRpdGxlQ2FyZC5vcmlnLCAnc2hvdycpO1xuICAgICAgICAgICAgICAgIGpxLmFkZENsYXNzKGVsZW1lbnRzLnRpdGxlQ2FyZC5yZWFsLCAnc2hvdycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudHMuY2FwdGlvbi5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgICAgICAgZWxlbWVudHMuYW5zd2VyLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgICAgICB0aGlzLnBsYWNlQmFsbG9vbnModHJ1ZSk7XG4gICAgICAgICAgICBlbGVtZW50cy5jZWxlSW1ncy5mb3JFYWNoKGVsID0+IGpxLmFkZENsYXNzKGVsLCAnc2hvdycpKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbndpbmRvdy5jaGVhdCA9IGZ1bmN0aW9uKCkge1xuICAgIFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjb3JyZWN0JyldLmZvckVhY2goZWwgPT4gZWwuY2xpY2soKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lOyIsImltcG9ydCBnYW1lIGZyb20gJy4vZ2FtZS5qcyc7XG5pbXBvcnQgZWxlbWVudHMgZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgeyBqcSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5nYW1lLnBsYWNlQmFsbG9vbnMoKTtcbmVsZW1lbnRzLnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGdhbWUubmV4dFF1ZXN0aW9uKCk7XG4gICAgZWxlbWVudHMud2VsY29tZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGpxLmFkZENsYXNzKGVsZW1lbnRzLnRpdGxlQ2FyZC5vcmlnLCAnc2hvdycpO1xufSk7IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGN1cnJlbnQ6IG51bGwsXG4gICAgbW9yZTogW1xuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdBbmR5IE11cnJheScsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnV2hvIHdvbiBXaW1ibGVkb24gaW4gMjAxNj8nLFxuICAgICAgICAgICAgICAgICdXaG8gd29uIGFuIE9seW1waWMgR29sZCBpbiBDeWNsaW5nPycsXG4gICAgICAgICAgICAgICAgJ1dobyBpcyBhcyB0YWxsIGFzIGEgbGVwcmVjaGF1bj8nLFxuICAgICAgICAgICAgICAgICdXaG8gaXMgYSB3b3JsZC1mYW1vdXMgY2FiZXItdG9zc2VyPycsXG4gICAgICAgICAgICAgICAgJ1dobyBoYXMgdGhyZWUgbmlwcGxlcz8nLFxuICAgICAgICAgICAgICAgICdXaG8gaXMgMTkgeWVhcnMgb2xkPycsXG4gICAgICAgICAgICAgICAgJ1dobyBidWlsdCBSb21lIGluIDcgZGF5cz8nLFxuICAgICAgICAgICAgICAgICdXaG8gaGFzIGEgZmVhciBvZiBNb3JvY2NvPycsXG4gICAgICAgICAgICAgICAgJ1dobyBpcyBCYXRtYW4/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGhhcyBhbiBJUSBvZiAyNjM/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdLYXRuaXNzIEV2ZXJkZWVuJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGljaCBmaWN0aXRpb3VzIGNoYXJhY3RlciB3b24gdGhlIEh1bmdlciBHYW1lcz8nLFxuICAgICAgICAgICAgICAgICdXaG8gd2FzIEhhcnJ5IFBvdHRlcuKAmXMgYmVzdCBmcmllbmQ/JyxcbiAgICAgICAgICAgICAgICAnV2hvIHNhbmcg4oCYR2FuZ25hbSBTdHlsZeKAmT8nLFxuICAgICAgICAgICAgICAgICdXaG8gcGFpbnRlZCB0aGUg4oCYTW9uYSBMaXNh4oCZPycsXG4gICAgICAgICAgICAgICAgJ1dobyBoYXMgYSB2ZXJ0aWNhbCBsZWFwIG9mIDkgZmVldD8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIGEgdmlsbGFnZSBpbiBTb3V0aGVybiBJdGFseT8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIGEgYnJhbmQgb2YgU2x1ZyBSZXBlbGxlbnQ/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIHRoZSBHeW0gTGVhZGVyIGluIFBhbGxldCBUb3duPycsXG4gICAgICAgICAgICAgICAgJ1dobyBpcyBzdHVjayBvbiBNYXJzIGluIOKAmFRoZSBNYXJ0aWFu4oCZPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnQXJzZW5hbCcsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnV2hvIHBsYXkgdGhlaXIgaG9tZSBnYW1lcyBhdCB0aGUgRW1pcmF0ZXMgU3RhZGl1bT8nLFxuICAgICAgICAgICAgICAgICdXaG8gYXJlIHRoZSBkb21lc3RpYyBjaGFtcGlvbnMgb2YgRnJhbmNlPycsXG4gICAgICAgICAgICAgICAgJ1dobyB3b24gU3BvcnQgUGVyc29uYWxpdHkg4oCYVGVhbSBvZiB0aGUgWWVhcuKAmSAyMDEwPycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIHdvdWxkIG9uZSBzdG9yZSB0aGVpciBib2F0aW5nIG9hcnM/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgY2FuIHlvdSBidXkgdGhlIDEzIG1vc3QgZXhwZW5zaXZlIHJhYmJpdHM/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyB0aGUg4oCYSmV3ZWwgb2YgQ2FsaWZvcm5pYSBCYXnigJk/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyB0aGUgMTN0aCBtb250aCBjYWxsZWQ/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGZvdW5kZWQgRmFjZWJvb2s/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdOaWNlLCBGcmFuY2UnLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ1doZXJlIGlzIHRoZSBQcm9tZW5hZGUgZGVzIEFuZ2xhaXM/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyBhIHR5cGUgb2YgYmlzY3VpdD8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIGFuIGlubGFuZCBmcmVuY2ggdG93bj8nLFxuICAgICAgICAgICAgICAgICdIb3cgZG8geW91IHNwZWxsIOKAmG1pbGxlbm5pdW3igJk/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBsZXR0ZXIgY29tZXMgYWZ0ZXIg4oCYSuKAmT8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBkb2VzIHRoZSBRdWVlbiBnZXQgYnVyaWVkPycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGFyZSB3ZWV0YWJpeCBtYWRlPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnQ2FudGVyYnVyeSBDYXRoZWRyYWwnLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ1doZXJlIGRpZCB3ZSBib3RoIGdyYWR1YXRlIGZyb20gdW5pdmVyc2l0eT8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBkaWQgQW5keSBNdXJyYXkgd2luIHRoZSBVUyBPcGVuPycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGlzIHRoZSB3b3JsZOKAmXMgbGFyZ2VzdCBzd2ltbWluZyBwb29sPycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGFyZSB0aGUgQ3Jvd24gSmV3ZWxzIGtlcHQ/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgZGlkIENoYXJsZXMgRGFyd2luIHdyaXRlIE9yaWdpbiBvZiBTcGVjaWVzPycsXG4gICAgICAgICAgICAgICAgJ1doaWNoIFVLIEJ1aWxkaW5nIGlzIHRhbGxlciB0aGFuIEV2ZXJlc3Q/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdQcmlkZSBhbmQgUHJlanVkaWNlJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGF0IG1vdmllIHdpbGwgSSBuZXZlciB3YXRjaCBhZ2Fpbj8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIGEgZ3JlYXQgWGJveCBnYW1lPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgZG9lcyB0aGUgUG9wZeKAmXMgdGF0dG9vIHNheT8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIEpLIFJvd2xpbmfigJlzIGJlc3Qgc2VsbGluZyBib29rPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgVUtJUOKAmXMgb2ZmaWNpYWwgbW90dG8/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdQZW5ndWluJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGF0IGlzIHRoZSBiZXN0LCBjdXRlc3QgYW5pbWFsPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgdGhlIGZhc3Rlc3QgYW5pbWFsIG9uIGVhcnRoPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgYnJpZ2h0IHJlZD8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGRvZXMgUGlrYWNodSBldm9sdmUgaW50bz8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ09yaWdpbnMgQmFyLCBEYXJ3aW4gQ29sbGVnZScsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnV2hlcmUgZGlkIHdlIG1lZXQ/JyxcbiAgICAgICAgICAgICAgICAnRHVkZSwgd2hlcmXigJlzIG15IGNhcj8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBoYXZlIGFsbCB0aGUgbXVmZmlucyBnb25lPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnRml2ZScsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnSG93IG1hbnkgeWVhcnMgaGF2ZSB3ZSBiZWVuIHRvZ2V0aGVyPycsXG4gICAgICAgICAgICAgICAgJ0hvdyBvbGQgaXMgRWx2aXMgUHJlc2xleT8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ1lFUyEnLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ01hbm55LCB3aWxsIHlvdSBtYXJyeSBtZT8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdLFxuICAgIG5leHRRdWVzdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMubW9yZS5zaGlmdCgpO1xuICAgICAgICByZXR1cm4gISEodGhpcy5jdXJyZW50KTtcbiAgICB9XG59O1xuIiwiY29uc3QganEgPSB7XG4gICAgYWRkQ2xhc3M6IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH0sXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH0sXG4gICAgaGFzQ2xhc3M6IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gICAgfSxcbiAgICBjaGFuZ2VUZXh0OiBmdW5jdGlvbihlbCwgbmV3VGV4dCkge1xuICAgICAgICBsZXQgYWN0aW9uID0gKCkgPT4ge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGFjdGlvbik7XG4gICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBuZXdUZXh0O1xuICAgICAgICAgICAgZWwuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgfTtcbiAgICAgICAgZWwuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGFjdGlvbik7XG4gICAgfVxufTtcblxuY29uc3QgcmFuZCA9IChmcm0gPSAwLCB0byA9IDApID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguYWJzKHRvIC0gZnJtKSkgKyBNYXRoLm1pbihmcm0sIHRvKTtcblxuY29uc3QgaWRHZW4gPSB7XG4gICAgY2hhcnM6ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknLFxuICAgIG9sZDogW10sXG4gICAgY3JlYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGdlbiA9IHRoaXMuZ2VuKCk7XG4gICAgICAgIGlmICh0aGlzLm9sZC5pbmRleE9mKGdlbikgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9sZC5wdXNoKGdlbik7XG4gICAgICAgIHJldHVybiBnZW47XG4gICAgfSxcbiAgICBnZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5KDE2KS5maWxsKDEpLm1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGFyc1tyYW5kKHRoaXMuY2hhcnMubGVuZ3RoKV07XG4gICAgICAgIH0pLmpvaW4oJycpO1xuICAgIH1cbn07XG5cbmV4cG9ydCB7XG4gICAganEsXG4gICAgaWRHZW4sXG4gICAgcmFuZFxufTsiXX0=
