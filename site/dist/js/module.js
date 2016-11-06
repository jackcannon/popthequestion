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
        _classCallCheck(this, Balloon);

        this.game = null;
        this.id = _utils.idGen.create();
        this.question = '';
        this.x = (0, _utils.rand)(10000) / 100;
        this.delay = (0, _utils.rand)(8000);
        this.durations = [(0, _utils.rand)(3500, 5000), (0, _utils.rand)(4000, 12000)];
        this.color = ['red', 'green', 'blue', 'purple', 'orange'][(0, _utils.rand)(5)];
        this.element = null;
        this.confetti = null;
        this.popped = false;
    }

    _createClass(Balloon, [{
        key: 'setGameReference',
        value: function setGameReference(game) {
            this.game = game;
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
                this.game.nextQuestion();
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
            return '<div id="balloon-' + this.id + '" class="balloon balloon-' + this.color + '" style="left: ' + this.x + '%; animation-delay: ' + this.delay + 'ms; animation-duration: ' + this.durations[0] + 'ms, ' + this.durations[1] + 'ms;"><span>' + this.question + '</span></div>';
        }
    }, {
        key: 'generateConfettiHTML',
        value: function generateConfettiHTML() {
            return '<div id="confetti-' + this.id + '"></div>';
        }
    }, {
        key: 'updateView',
        value: function updateView() {
            var el = this.getElement();
            _utils.jq.removeClass(el, 'correct');
            if (this.isCorrect()) {
                _utils.jq.addClass(el, 'correct');
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
    startBtn: document.getElementById('start-btn')
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

var game = {
    balloons: new Array(10).fill(1).map(function () {
        return new _Balloon2.default();
    }),
    placeBalloons: function placeBalloons() {
        var html = '';
        var conf = '';
        this.balloons.forEach(function (balloon) {
            html += balloon.generateHTML();
            conf += balloon.generateConfettiHTML();
        });
        _elements2.default.game.innerHTML = html;
        _elements2.default.confetti.innerHTML = conf;

        this.balloons.forEach(function (balloon) {
            balloon.setGameReference(game);
            balloon.getElement().addEventListener('click', function () {
                return balloon.pop();
            });
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
        } else {}
    }
};

exports.default = game;

},{"./Balloon.js":1,"./elements.js":4,"./questions.js":7,"./utils.js":8}],6:[function(require,module,exports){
'use strict';

var _game = require('./game.js');

var _game2 = _interopRequireDefault(_game);

var _elements = require('./elements.js');

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_game2.default.placeBalloons();
_elements2.default.startBtn.addEventListener('click', function () {
    _game2.default.nextQuestion();
    _elements2.default.welcome.style.display = 'none';
});

// setTimeout(function() {
// jq.addClass(document.getElementById('title-card'), 'shown');
// }, 2000);

},{"./elements.js":4,"./game.js":5}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvQmFsbG9vbi5qcyIsImFwcC9qcy9Db29yLmpzIiwiYXBwL2pzL2NvbmZldHRpLmpzIiwiYXBwL2pzL2VsZW1lbnRzLmpzIiwiYXBwL2pzL2dhbWUuanMiLCJhcHAvanMvbWFpbi5qcyIsImFwcC9qcy9xdWVzdGlvbnMuanMiLCJhcHAvanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sTztBQUNGLHVCQUFjO0FBQUE7O0FBQ1YsYUFBSyxJQUFMLEdBQVksSUFBWjtBQUNBLGFBQUssRUFBTCxHQUFVLGFBQU0sTUFBTixFQUFWO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsYUFBSyxDQUFMLEdBQVMsaUJBQUssS0FBTCxJQUFjLEdBQXZCO0FBQ0EsYUFBSyxLQUFMLEdBQWEsaUJBQUssSUFBTCxDQUFiO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLENBQUMsaUJBQUssSUFBTCxFQUFXLElBQVgsQ0FBRCxFQUFtQixpQkFBSyxJQUFMLEVBQVcsS0FBWCxDQUFuQixDQUFqQjtBQUNBLGFBQUssS0FBTCxHQUFhLENBQUMsS0FBRCxFQUFRLE9BQVIsRUFBaUIsTUFBakIsRUFBeUIsUUFBekIsRUFBbUMsUUFBbkMsRUFBNkMsaUJBQUssQ0FBTCxDQUE3QyxDQUFiO0FBQ0EsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGFBQUssUUFBTCxHQUFnQixJQUFoQjtBQUNBLGFBQUssTUFBTCxHQUFjLEtBQWQ7QUFDSDs7Ozt5Q0FDZ0IsSSxFQUFNO0FBQ25CLGlCQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0g7OztvQ0FDVztBQUNSLG1CQUFPLG9CQUFVLE9BQVYsSUFBcUIsS0FBSyxRQUFMLEtBQWtCLG9CQUFVLE9BQVYsQ0FBa0IsU0FBbEIsQ0FBNEIsQ0FBNUIsQ0FBOUM7QUFDSDs7OzhCQUNLO0FBQ0YsZ0JBQUksS0FBSyxTQUFMLEVBQUosRUFBc0I7QUFDbEIsbUNBQVMsUUFBVCxDQUFrQixJQUFsQjtBQUNBLG9CQUFJLEtBQUssS0FBSyxVQUFMLEVBQVQ7QUFDQSwwQkFBRyxRQUFILENBQVksRUFBWixFQUFnQixRQUFoQjtBQUNBLHFCQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0EscUJBQUssSUFBTCxDQUFVLFlBQVY7QUFDSDtBQUNKOzs7cUNBQ1k7QUFDVCxnQkFBSSxLQUFLLE9BQUwsS0FBaUIsSUFBckIsRUFBMkI7QUFDdkIsdUJBQU8sS0FBSyxPQUFaO0FBQ0g7QUFDRCxpQkFBSyxPQUFMLEdBQWUsU0FBUyxjQUFULENBQXdCLGFBQWEsS0FBSyxFQUExQyxDQUFmO0FBQ0EsbUJBQU8sS0FBSyxPQUFaO0FBQ0g7Ozs2Q0FDb0I7QUFDakIsZ0JBQUksS0FBSyxRQUFMLEtBQWtCLElBQXRCLEVBQTRCO0FBQ3hCLHVCQUFPLEtBQUssUUFBWjtBQUNIO0FBQ0QsaUJBQUssUUFBTCxHQUFnQixTQUFTLGNBQVQsQ0FBd0IsY0FBYyxLQUFLLEVBQTNDLENBQWhCO0FBQ0EsbUJBQU8sS0FBSyxRQUFaO0FBQ0g7Ozt1Q0FDYztBQUNYLHlDQUEyQixLQUFLLEVBQWhDLGlDQUE4RCxLQUFLLEtBQW5FLHVCQUEwRixLQUFLLENBQS9GLDRCQUF1SCxLQUFLLEtBQTVILGdDQUE0SixLQUFLLFNBQUwsQ0FBZSxDQUFmLENBQTVKLFlBQW9MLEtBQUssU0FBTCxDQUFlLENBQWYsQ0FBcEwsbUJBQW1OLEtBQUssUUFBeE47QUFDSDs7OytDQUNzQjtBQUNuQiwwQ0FBNEIsS0FBSyxFQUFqQztBQUNIOzs7cUNBQ1k7QUFDVCxnQkFBSSxLQUFLLEtBQUssVUFBTCxFQUFUO0FBQ0Esc0JBQUcsV0FBSCxDQUFlLEVBQWYsRUFBbUIsU0FBbkI7QUFDQSxnQkFBSSxLQUFLLFNBQUwsRUFBSixFQUFzQjtBQUNsQiwwQkFBRyxRQUFILENBQVksRUFBWixFQUFnQixTQUFoQjtBQUNIO0FBQ0QsZ0JBQUksT0FBTyxHQUFHLGFBQUgsQ0FBaUIsTUFBakIsQ0FBWDtBQUNBLGdCQUFJLEtBQUssU0FBTCxLQUFtQixLQUFLLFFBQTVCLEVBQXNDO0FBQ2xDLDBCQUFHLFVBQUgsQ0FBYyxJQUFkLEVBQW9CLEtBQUssUUFBekI7QUFDSDtBQUNKOzs7Ozs7a0JBR1UsTzs7Ozs7Ozs7Ozs7QUNqRWY7Ozs7SUFFTSxJO0FBQ0Ysa0JBQVksQ0FBWixFQUFlLENBQWYsRUFBa0I7QUFBQTs7QUFDZCxhQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsYUFBSyxDQUFMLEdBQVMsQ0FBVDtBQUNIOzs7O21DQUNVLEksRUFBTTtBQUNiLGdCQUFJLElBQUksS0FBSyxHQUFMLENBQVMsS0FBSyxDQUFMLEdBQVMsS0FBSyxDQUF2QixDQUFSO0FBQ0EsZ0JBQUksSUFBSSxLQUFLLEdBQUwsQ0FBUyxLQUFLLENBQUwsR0FBUyxLQUFLLENBQXZCLENBQVI7QUFDQSxtQkFBTyxLQUFLLElBQUwsQ0FBVSxLQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVksQ0FBWixJQUFpQixLQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVksQ0FBWixDQUEzQixDQUFQO0FBQ0g7OzsrQkFDYSxDLEVBQUcsQyxFQUFHO0FBQ2hCLGdCQUFJLFNBQVMsSUFBSSxJQUFKLENBQVMsSUFBSSxDQUFiLEVBQWdCLElBQUksQ0FBcEIsQ0FBYjtBQUNBLGdCQUFJLE1BQU0sSUFBVjtBQUNBLG1CQUFNLFFBQVEsSUFBZCxFQUFvQjtBQUNoQixzQkFBTSxJQUFJLElBQUosQ0FBUyxpQkFBSyxDQUFMLENBQVQsRUFBa0IsaUJBQUssQ0FBTCxDQUFsQixDQUFOO0FBQ0Esb0JBQUksSUFBSSxVQUFKLENBQWUsTUFBZixJQUEwQixLQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVksQ0FBWixJQUFpQixDQUEvQyxFQUFtRDtBQUMvQywwQkFBTSxJQUFOO0FBQ0g7QUFDSjtBQUNELG1CQUFPLEdBQVA7QUFDSDs7Ozs7O2tCQUdVLEk7Ozs7Ozs7OztBQ3pCZjs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLFdBQVc7QUFDYixjQUFVLGtCQUFTLE9BQVQsRUFBa0I7QUFBQTs7QUFDeEIsWUFBSSxRQUFRLFFBQVEsVUFBUixHQUFxQixxQkFBckIsRUFBWjtBQUNBLFlBQUksU0FBUyxtQkFBUyxNQUFNLElBQWYsRUFBcUIsTUFBTSxHQUEzQixDQUFiO0FBQ0EsZ0JBQVEsa0JBQVIsR0FBNkIsU0FBN0IsR0FBeUMsSUFBSSxLQUFKLENBQVUsRUFBVixFQUFjLElBQWQsQ0FBbUIsQ0FBbkIsRUFBc0IsR0FBdEIsQ0FBMEIsWUFBTTtBQUNyRSxtQkFBTyxNQUFLLFlBQUwsQ0FBa0IsTUFBbEIsQ0FBUDtBQUNILFNBRndDLEVBRXRDLElBRnNDLENBRWpDLEVBRmlDLENBQXpDO0FBR0gsS0FQWTtBQVFiO0FBQ0EsWUFBUSxrQkFBVztBQUFBOztBQUNmLFlBQUksV0FBVyxPQUFPLFVBQXRCO0FBQ0EsWUFBSSxZQUFZLE9BQU8sV0FBUCxHQUFxQixDQUFyQztBQUNBLFlBQUksS0FBSixDQUFVLEVBQVYsRUFBYyxJQUFkLENBQW1CLENBQW5CLEVBQXNCLE9BQXRCLENBQThCLFlBQU07QUFDaEMsZ0JBQUksS0FBSyxhQUFNLE1BQU4sRUFBVDtBQUNBLGdCQUFJLFNBQVMsbUJBQVMsaUJBQUssUUFBTCxDQUFULEVBQXlCLGlCQUFLLFNBQUwsQ0FBekIsQ0FBYjtBQUNBLCtCQUFTLFFBQVQsQ0FBa0IsU0FBbEIsa0NBQTJELEVBQTNEO0FBQ0EsZ0JBQUksT0FBTyxJQUFJLEtBQUosQ0FBVSxFQUFWLEVBQWMsSUFBZCxDQUFtQixDQUFuQixFQUFzQixHQUF0QixDQUEwQixZQUFNO0FBQ3ZDLHVCQUFPLE9BQUssWUFBTCxDQUFrQixNQUFsQixDQUFQO0FBQ0gsYUFGVSxFQUVSLElBRlEsQ0FFSCxFQUZHLENBQVg7QUFHQSx1QkFBVyxZQUFNO0FBQ2IseUJBQVMsY0FBVCxzQkFBMkMsRUFBM0MsRUFBaUQsU0FBakQsR0FBNkQsSUFBN0Q7QUFDSCxhQUZELEVBRUcsaUJBQUssS0FBTCxDQUZIO0FBR0gsU0FWRDtBQVdILEtBdkJZO0FBd0JiLGtCQUFjLHNCQUFTLE1BQVQsRUFBaUI7QUFDM0IsWUFBSSxNQUFNLGlCQUFLLENBQUwsRUFBUSxDQUFSLENBQVYsQ0FEMkIsQ0FDTDtBQUN0QixZQUFJLFFBQVEsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixNQUFqQixFQUF5QixRQUF6QixFQUFtQyxRQUFuQyxFQUE2QyxpQkFBSyxDQUFMLENBQTdDLENBQVo7QUFDQSxZQUFJLE9BQU8sZUFBSyxNQUFMLENBQVksR0FBWixFQUFpQixHQUFqQixDQUFYO0FBQ0EsWUFBSSxJQUFJLGlCQUFLLEVBQUwsSUFBVyxHQUFuQixDQUoyQixDQUlIOztBQUV4QixZQUFJLGtDQUFnQyxHQUFoQyxrQkFBZ0QsS0FBcEQ7QUFDQSxZQUFJLGtCQUFlLE9BQU8sQ0FBUCxHQUFXLEtBQUssQ0FBL0Isb0JBQTZDLE9BQU8sQ0FBUCxHQUFXLEtBQUssQ0FBN0QsK0JBQXVGLENBQXZGLE9BQUo7QUFDQSxpQ0FBdUIsSUFBdkIsaUJBQXVDLElBQXZDO0FBQ0g7QUFqQ1ksQ0FBakI7O2tCQW9DZSxROzs7Ozs7OztrQkN4Q0E7QUFDWCxVQUFNLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQURLO0FBRVgsY0FBVSxTQUFTLGNBQVQsQ0FBd0IsY0FBeEIsQ0FGQztBQUdYLGFBQVMsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBSEU7QUFJWCxZQUFRLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUpHO0FBS1gsYUFBUyxTQUFTLGNBQVQsQ0FBd0IsU0FBeEIsQ0FMRTtBQU1YLGNBQVUsU0FBUyxjQUFULENBQXdCLFdBQXhCO0FBTkMsQzs7Ozs7Ozs7O0FDQWY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNLE9BQU87QUFDVCxjQUFVLElBQUksS0FBSixDQUFVLEVBQVYsRUFBYyxJQUFkLENBQW1CLENBQW5CLEVBQXNCLEdBQXRCLENBQTBCO0FBQUEsZUFBTSx1QkFBTjtBQUFBLEtBQTFCLENBREQ7QUFFVCxtQkFBZSx5QkFBVztBQUN0QixZQUFJLE9BQU8sRUFBWDtBQUNBLFlBQUksT0FBTyxFQUFYO0FBQ0EsYUFBSyxRQUFMLENBQWMsT0FBZCxDQUFzQixVQUFDLE9BQUQsRUFBYTtBQUMvQixvQkFBUSxRQUFRLFlBQVIsRUFBUjtBQUNBLG9CQUFRLFFBQVEsb0JBQVIsRUFBUjtBQUNILFNBSEQ7QUFJQSwyQkFBUyxJQUFULENBQWMsU0FBZCxHQUEwQixJQUExQjtBQUNBLDJCQUFTLFFBQVQsQ0FBa0IsU0FBbEIsR0FBOEIsSUFBOUI7O0FBRUEsYUFBSyxRQUFMLENBQWMsT0FBZCxDQUFzQixtQkFBVztBQUM3QixvQkFBUSxnQkFBUixDQUF5QixJQUF6QjtBQUNBLG9CQUFRLFVBQVIsR0FBcUIsZ0JBQXJCLENBQXNDLE9BQXRDLEVBQStDO0FBQUEsdUJBQU0sUUFBUSxHQUFSLEVBQU47QUFBQSxhQUEvQztBQUNILFNBSEQ7QUFJSCxLQWhCUTtBQWlCVCxrQkFBYyx3QkFBVztBQUNyQixZQUFJLG9CQUFVLFlBQVYsRUFBSixFQUE4QjtBQUMxQixpQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQjtBQUFBLHVCQUFXLENBQUMsUUFBUSxNQUFwQjtBQUFBLGFBQXJCLEVBQWlELE9BQWpELEdBQTJELE9BQTNELENBQW1FLFVBQUMsT0FBRCxFQUFVLEtBQVYsRUFBb0I7QUFDbkYsd0JBQVEsUUFBUixHQUFtQixvQkFBVSxPQUFWLENBQWtCLFNBQWxCLENBQTRCLEtBQTVCLENBQW5CO0FBQ0Esd0JBQVEsVUFBUjtBQUNILGFBSEQ7QUFJQSwrQkFBUyxPQUFULENBQWlCLEtBQWpCLENBQXVCLE9BQXZCLEdBQWlDLEdBQWpDO0FBQ0Esc0JBQUcsVUFBSCxDQUFjLG1CQUFTLE1BQXZCLEVBQStCLG9CQUFVLE9BQVYsQ0FBa0IsTUFBakQ7QUFDSCxTQVBELE1BT08sQ0FDTjtBQUNKO0FBM0JRLENBQWI7O2tCQThCZSxJOzs7OztBQ25DZjs7OztBQUNBOzs7Ozs7QUFFQSxlQUFLLGFBQUw7QUFDQSxtQkFBUyxRQUFULENBQWtCLGdCQUFsQixDQUFtQyxPQUFuQyxFQUE0QyxZQUFNO0FBQzlDLG1CQUFLLFlBQUw7QUFDQSx1QkFBUyxPQUFULENBQWlCLEtBQWpCLENBQXVCLE9BQXZCLEdBQWlDLE1BQWpDO0FBQ0gsQ0FIRDs7QUFLQTtBQUNBO0FBQ0E7Ozs7Ozs7O2tCQ1hlO0FBQ1gsYUFBUyxJQURFO0FBRVgsVUFBTSxDQUNGO0FBQ0ksZ0JBQVEsYUFEWjtBQUVJLG1CQUFXLENBQ1AsNEJBRE8sRUFFUCxxQ0FGTyxFQUdQLGlDQUhPLEVBSVAscUNBSk8sRUFLUCx3QkFMTyxFQU1QLHNCQU5PLEVBT1AsMkJBUE8sRUFRUCw0QkFSTyxFQVNQLGdCQVRPLEVBVVAsdUJBVk87QUFGZixLQURFLEVBZ0JGO0FBQ0ksZ0JBQVEsa0JBRFo7QUFFSSxtQkFBVyxDQUNQLGtEQURPLEVBRVAscUNBRk8sRUFHUCwyQkFITyxFQUlQLDhCQUpPLEVBS1Asb0NBTE8sRUFNUCxzQ0FOTyxFQU9QLG9DQVBPLEVBUVAsdUNBUk8sRUFTUCx3Q0FUTztBQUZmLEtBaEJFLEVBOEJGO0FBQ0ksZ0JBQVEsU0FEWjtBQUVJLG1CQUFXLENBQ1Asb0RBRE8sRUFFUCwyQ0FGTyxFQUdQLG9EQUhPLEVBSVAsMkNBSk8sRUFLUCxrREFMTyxFQU1QLHdDQU5PLEVBT1AsZ0NBUE8sRUFRUCx1QkFSTztBQUZmLEtBOUJFLEVBMkNGO0FBQ0ksZ0JBQVEsY0FEWjtBQUVJLG1CQUFXLENBQ1AscUNBRE8sRUFFUCw0QkFGTyxFQUdQLGdDQUhPLEVBSVAsZ0NBSk8sRUFLUCw4QkFMTyxFQU1QLGtDQU5PLEVBT1AsMEJBUE87QUFGZixLQTNDRSxFQXVERjtBQUNJLGdCQUFRLHNCQURaO0FBRUksbUJBQVcsQ0FDUCw2Q0FETyxFQUVQLHdDQUZPLEVBR1AsNkNBSE8sRUFJUCxrQ0FKTyxFQUtQLG1EQUxPLEVBTVAsMkNBTk87QUFGZixLQXZERSxFQWtFRjtBQUNJLGdCQUFRLHFCQURaO0FBRUksbUJBQVcsQ0FDUCxzQ0FETyxFQUVQLDRCQUZPLEVBR1Asa0NBSE8sRUFJUCx5Q0FKTyxFQUtQLGdDQUxPO0FBRmYsS0FsRUUsRUE0RUY7QUFDSSxnQkFBUSxTQURaO0FBRUksbUJBQVcsQ0FDUCxrQ0FETyxFQUVQLHNDQUZPLEVBR1AscUJBSE8sRUFJUCxnQ0FKTztBQUZmLEtBNUVFLEVBcUZGO0FBQ0ksZ0JBQVEsNkJBRFo7QUFFSSxtQkFBVyxDQUNQLG9CQURPLEVBRVAsdUJBRk8sRUFHUCxrQ0FITztBQUZmLEtBckZFLEVBNkZGO0FBQ0ksZ0JBQVEsTUFEWjtBQUVJLG1CQUFXLENBQ1AsdUNBRE8sRUFFUCwyQkFGTztBQUZmLEtBN0ZFLEVBb0dGO0FBQ0ksZ0JBQVEsTUFEWjtBQUVJLG1CQUFXLENBQ1AsMkJBRE87QUFGZixLQXBHRSxDQUZLO0FBNkdYLGtCQUFjLHdCQUFXO0FBQ3JCLGFBQUssT0FBTCxHQUFlLEtBQUssSUFBTCxDQUFVLEtBQVYsRUFBZjtBQUNBLGVBQU8sQ0FBQyxDQUFFLEtBQUssT0FBZjtBQUNIO0FBaEhVLEM7Ozs7Ozs7O0FDQWYsSUFBTSxLQUFLO0FBQ1AsY0FBVSxrQkFBUyxFQUFULEVBQWEsU0FBYixFQUF3QjtBQUM5QixXQUFHLFNBQUgsQ0FBYSxHQUFiLENBQWlCLFNBQWpCO0FBQ0gsS0FITTtBQUlQLGlCQUFhLHFCQUFTLEVBQVQsRUFBYSxTQUFiLEVBQXdCO0FBQ2pDLFdBQUcsU0FBSCxDQUFhLE1BQWIsQ0FBb0IsU0FBcEI7QUFDSCxLQU5NO0FBT1AsY0FBVSxrQkFBUyxFQUFULEVBQWEsU0FBYixFQUF3QjtBQUM5QixXQUFHLFNBQUgsQ0FBYSxRQUFiLENBQXNCLFNBQXRCO0FBQ0gsS0FUTTtBQVVQLGdCQUFZLG9CQUFTLEVBQVQsRUFBYSxPQUFiLEVBQXNCO0FBQzlCLFlBQUksU0FBUyxTQUFULE1BQVMsR0FBTTtBQUNmLGVBQUcsbUJBQUgsQ0FBdUIsZUFBdkIsRUFBd0MsTUFBeEM7QUFDQSxlQUFHLFNBQUgsR0FBZSxPQUFmO0FBQ0EsZUFBRyxLQUFILENBQVMsT0FBVCxHQUFtQixHQUFuQjtBQUNILFNBSkQ7QUFLQSxXQUFHLEtBQUgsQ0FBUyxPQUFULEdBQW1CLEdBQW5CO0FBQ0EsV0FBRyxnQkFBSCxDQUFvQixlQUFwQixFQUFxQyxNQUFyQztBQUNIO0FBbEJNLENBQVg7O0FBcUJBLElBQU0sT0FBTyxTQUFQLElBQU87QUFBQSxRQUFDLEdBQUQsdUVBQU8sQ0FBUDtBQUFBLFFBQVUsRUFBVix1RUFBZSxDQUFmO0FBQUEsV0FBcUIsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEtBQWdCLEtBQUssR0FBTCxDQUFTLEtBQUssR0FBZCxDQUEzQixJQUFpRCxLQUFLLEdBQUwsQ0FBUyxHQUFULEVBQWMsRUFBZCxDQUF0RTtBQUFBLENBQWI7O0FBRUEsSUFBTSxRQUFRO0FBQ1YsV0FBTyxzQ0FERztBQUVWLFNBQUssRUFGSztBQUdWLFlBQVEsa0JBQVc7QUFDZixZQUFJLE1BQU0sS0FBSyxHQUFMLEVBQVY7QUFDQSxZQUFJLEtBQUssR0FBTCxDQUFTLE9BQVQsQ0FBaUIsR0FBakIsTUFBMEIsQ0FBQyxDQUEvQixFQUFrQztBQUM5QixtQkFBTyxLQUFLLE1BQUwsRUFBUDtBQUNIO0FBQ0QsYUFBSyxHQUFMLENBQVMsSUFBVCxDQUFjLEdBQWQ7QUFDQSxlQUFPLEdBQVA7QUFDSCxLQVZTO0FBV1YsU0FBSyxlQUFXO0FBQUE7O0FBQ1osZUFBTyxJQUFJLEtBQUosQ0FBVSxFQUFWLEVBQWMsSUFBZCxDQUFtQixDQUFuQixFQUFzQixHQUF0QixDQUEwQixZQUFNO0FBQ25DLG1CQUFPLE1BQUssS0FBTCxDQUFXLEtBQUssTUFBSyxLQUFMLENBQVcsTUFBaEIsQ0FBWCxDQUFQO0FBQ0gsU0FGTSxFQUVKLElBRkksQ0FFQyxFQUZELENBQVA7QUFHSDtBQWZTLENBQWQ7O1FBbUJJLEUsR0FBQSxFO1FBQ0EsSyxHQUFBLEs7UUFDQSxJLEdBQUEsSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBqcSwgaWRHZW4sIHJhbmQgfSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCBxdWVzdGlvbnMgZnJvbSAnLi9xdWVzdGlvbnMuanMnO1xuaW1wb3J0IGNvbmZldHRpIGZyb20gJy4vY29uZmV0dGkuanMnO1xuXG5jbGFzcyBCYWxsb29uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5pZCA9IGlkR2VuLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gJyc7XG4gICAgICAgIHRoaXMueCA9IHJhbmQoMTAwMDApIC8gMTAwO1xuICAgICAgICB0aGlzLmRlbGF5ID0gcmFuZCg4MDAwKTtcbiAgICAgICAgdGhpcy5kdXJhdGlvbnMgPSBbcmFuZCgzNTAwLCA1MDAwKSwgcmFuZCg0MDAwLCAxMjAwMCldO1xuICAgICAgICB0aGlzLmNvbG9yID0gWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICdwdXJwbGUnLCAnb3JhbmdlJ11bcmFuZCg1KV07XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29uZmV0dGkgPSBudWxsO1xuICAgICAgICB0aGlzLnBvcHBlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBzZXRHYW1lUmVmZXJlbmNlKGdhbWUpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB9XG4gICAgaXNDb3JyZWN0KCkge1xuICAgICAgICByZXR1cm4gcXVlc3Rpb25zLmN1cnJlbnQgJiYgdGhpcy5xdWVzdGlvbiA9PT0gcXVlc3Rpb25zLmN1cnJlbnQucXVlc3Rpb25zWzBdO1xuICAgIH1cbiAgICBwb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ29ycmVjdCgpKSB7XG4gICAgICAgICAgICBjb25mZXR0aS5hZGRCdXJzdCh0aGlzKTtcbiAgICAgICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgICAgICAganEuYWRkQ2xhc3MoZWwsICdwb3BwZWQnKTtcbiAgICAgICAgICAgIHRoaXMucG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5uZXh0UXVlc3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWxsb29uLScgKyB0aGlzLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0Q29uZmV0dGlFbGVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5jb25mZXR0aSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmV0dGk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25mZXR0aSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25mZXR0aS0nICsgdGhpcy5pZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZldHRpO1xuICAgIH1cbiAgICBnZW5lcmF0ZUhUTUwoKSB7XG4gICAgICAgIHJldHVybiBgPGRpdiBpZD1cImJhbGxvb24tJHt0aGlzLmlkfVwiIGNsYXNzPVwiYmFsbG9vbiBiYWxsb29uLSR7dGhpcy5jb2xvcn1cIiBzdHlsZT1cImxlZnQ6ICR7dGhpcy54fSU7IGFuaW1hdGlvbi1kZWxheTogJHt0aGlzLmRlbGF5fW1zOyBhbmltYXRpb24tZHVyYXRpb246ICR7dGhpcy5kdXJhdGlvbnNbMF19bXMsICR7dGhpcy5kdXJhdGlvbnNbMV19bXM7XCI+PHNwYW4+JHt0aGlzLnF1ZXN0aW9ufTwvc3Bhbj48L2Rpdj5gO1xuICAgIH1cbiAgICBnZW5lcmF0ZUNvbmZldHRpSFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGlkPVwiY29uZmV0dGktJHt0aGlzLmlkfVwiPjwvZGl2PmA7XG4gICAgfVxuICAgIHVwZGF0ZVZpZXcoKSB7XG4gICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgICBqcS5yZW1vdmVDbGFzcyhlbCwgJ2NvcnJlY3QnKTtcbiAgICAgICAgaWYgKHRoaXMuaXNDb3JyZWN0KCkpIHtcbiAgICAgICAgICAgIGpxLmFkZENsYXNzKGVsLCAnY29ycmVjdCcpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzcGFuID0gZWwucXVlcnlTZWxlY3Rvcignc3BhbicpO1xuICAgICAgICBpZiAoc3Bhbi5pbm5lckhUTUwgIT09IHRoaXMucXVlc3Rpb24pIHtcbiAgICAgICAgICAgIGpxLmNoYW5nZVRleHQoc3BhbiwgdGhpcy5xdWVzdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhbGxvb247IiwiaW1wb3J0IHsgcmFuZCB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5jbGFzcyBDb29yIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuICAgIGRpc3RhbmNlVG8oY29vcikge1xuICAgICAgICBsZXQgeCA9IE1hdGguYWJzKHRoaXMueCAtIGNvb3IueCk7XG4gICAgICAgIGxldCB5ID0gTWF0aC5hYnModGhpcy55IC0gY29vci55KTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4LCAyKSArIE1hdGgucG93KHksIDIpKTtcbiAgICB9XG4gICAgc3RhdGljIHJhbmRvbSh3LCBoKSB7XG4gICAgICAgIGxldCBjZW50cmUgPSBuZXcgQ29vcih3IC8gMiwgaCAvIDIpO1xuICAgICAgICBsZXQgcm5kID0gbnVsbDtcbiAgICAgICAgd2hpbGUocm5kID09PSBudWxsKSB7XG4gICAgICAgICAgICBybmQgPSBuZXcgQ29vcihyYW5kKHcpLCByYW5kKGgpKTtcbiAgICAgICAgICAgIGlmIChybmQuZGlzdGFuY2VUbyhjZW50cmUpID4gKE1hdGgubWluKHcsIGgpIC8gMikpIHtcbiAgICAgICAgICAgICAgICBybmQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBybmQ7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb29yOyIsImltcG9ydCB7IHJhbmQsIGlkR2VuIH0gZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgZWxlbWVudHMgZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgQ29vciBmcm9tICcuL0Nvb3IuanMnO1xuXG5jb25zdCBjb25mZXR0aSA9IHtcbiAgICBhZGRCdXJzdDogZnVuY3Rpb24oYmFsbG9vbikge1xuICAgICAgICBsZXQgYm91bmQgPSBiYWxsb29uLmdldEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IGNlbnRyZSA9IG5ldyBDb29yKGJvdW5kLmxlZnQsIGJvdW5kLnRvcCk7XG4gICAgICAgIGJhbGxvb24uZ2V0Q29uZmV0dGlFbGVtZW50KCkuaW5uZXJIVE1MID0gbmV3IEFycmF5KDUwKS5maWxsKDEpLm1hcCgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUhUTUwoY2VudHJlKTtcbiAgICAgICAgfSkuam9pbignJyk7XG4gICAgfSxcbiAgICAvLyBETyBOT1QgVVNFLiBJdCdzIHJlYWxseSBsYWdneVxuICAgIGZpbmFsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBtYXhXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBsZXQgbWF4SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcbiAgICAgICAgbmV3IEFycmF5KDUwKS5maWxsKDEpLmZvckVhY2goKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlkID0gaWRHZW4uY3JlYXRlKCk7XG4gICAgICAgICAgICBsZXQgY2VudHJlID0gbmV3IENvb3IocmFuZChtYXhXaWR0aCksIHJhbmQobWF4SGVpZ2h0KSk7XG4gICAgICAgICAgICBlbGVtZW50cy5jb25mZXR0aS5pbm5lckhUTUwgKz0gYDxkaXYgaWQ9XCJjb25mZXR0aS1maW5hbGUtJHtpZH1cIj48L2Rpdj5gO1xuICAgICAgICAgICAgbGV0IGh0bWwgPSBuZXcgQXJyYXkoNTApLmZpbGwoMSkubWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUhUTUwoY2VudHJlKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJycpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNvbmZldHRpLWZpbmFsZS0ke2lkfWApLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICB9LCByYW5kKDEwMDAwKSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2VuZXJhdGVIVE1MOiBmdW5jdGlvbihjZW50cmUpIHtcbiAgICAgICAgbGV0IGRpciA9IHJhbmQoMSwgNCk7IC8vIGRpcmVjdGlvblxuICAgICAgICBsZXQgY29sb3IgPSBbJ3JlZCcsICdncmVlbicsICdibHVlJywgJ3B1cnBsZScsICdvcmFuZ2UnXVtyYW5kKDUpXTtcbiAgICAgICAgbGV0IGNvb3IgPSBDb29yLnJhbmRvbSgxMjYsIDE4MCk7XG4gICAgICAgIGxldCBkID0gcmFuZCgxNSkgLyAxMDA7IC8vIGFuaW1hdGlvbiBkZWxheVxuXG4gICAgICAgIGxldCBjbHNzID0gYHBhcnRpY2xlIHBhcnRpY2xlLWFuaS0ke2Rpcn0gcGFydGljbGUtJHtjb2xvcn1gO1xuICAgICAgICBsZXQgc3R5bCA9IGB0b3A6ICR7Y2VudHJlLnkgKyBjb29yLnl9cHg7IGxlZnQ6ICR7Y2VudHJlLnggKyBjb29yLnh9cHg7IGFuaW1hdGlvbi1kZWxheTogLSR7ZH1zO2A7XG4gICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCIke2Nsc3N9XCIgc3R5bGU9XCIke3N0eWx9XCI+PC9zcGFuPmA7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmV0dGk7IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGdhbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyksXG4gICAgY29uZmV0dGk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25mZXR0aS1ib3gnKSxcbiAgICBjYXB0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FwdGlvbicpLFxuICAgIGFuc3dlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Fuc3dlcicpLFxuICAgIHdlbGNvbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lJyksXG4gICAgc3RhcnRCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1idG4nKVxufTsiLCJpbXBvcnQgZWxlbWVudHMgZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgcXVlc3Rpb25zIGZyb20gJy4vcXVlc3Rpb25zLmpzJztcbmltcG9ydCBCYWxsb29uIGZyb20gJy4vQmFsbG9vbi5qcyc7XG5pbXBvcnQgeyBqcSB9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5jb25zdCBnYW1lID0ge1xuICAgIGJhbGxvb25zOiBuZXcgQXJyYXkoMTApLmZpbGwoMSkubWFwKCgpID0+IG5ldyBCYWxsb29uKCkpLFxuICAgIHBsYWNlQmFsbG9vbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgaHRtbCA9ICcnO1xuICAgICAgICBsZXQgY29uZiA9ICcnO1xuICAgICAgICB0aGlzLmJhbGxvb25zLmZvckVhY2goKGJhbGxvb24pID0+IHtcbiAgICAgICAgICAgIGh0bWwgKz0gYmFsbG9vbi5nZW5lcmF0ZUhUTUwoKTtcbiAgICAgICAgICAgIGNvbmYgKz0gYmFsbG9vbi5nZW5lcmF0ZUNvbmZldHRpSFRNTCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxlbWVudHMuZ2FtZS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICBlbGVtZW50cy5jb25mZXR0aS5pbm5lckhUTUwgPSBjb25mO1xuXG4gICAgICAgIHRoaXMuYmFsbG9vbnMuZm9yRWFjaChiYWxsb29uID0+IHtcbiAgICAgICAgICAgIGJhbGxvb24uc2V0R2FtZVJlZmVyZW5jZShnYW1lKTtcbiAgICAgICAgICAgIGJhbGxvb24uZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gYmFsbG9vbi5wb3AoKSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgbmV4dFF1ZXN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9ucy5uZXh0UXVlc3Rpb24oKSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsb29ucy5maWx0ZXIoYmFsbG9vbiA9PiAhYmFsbG9vbi5wb3BwZWQpLnJldmVyc2UoKS5mb3JFYWNoKChiYWxsb29uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGJhbGxvb24ucXVlc3Rpb24gPSBxdWVzdGlvbnMuY3VycmVudC5xdWVzdGlvbnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGJhbGxvb24udXBkYXRlVmlldygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbGVtZW50cy5jYXB0aW9uLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICBqcS5jaGFuZ2VUZXh0KGVsZW1lbnRzLmFuc3dlciwgcXVlc3Rpb25zLmN1cnJlbnQuYW5zd2VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWU7IiwiaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lLmpzJztcbmltcG9ydCBlbGVtZW50cyBmcm9tICcuL2VsZW1lbnRzLmpzJztcblxuZ2FtZS5wbGFjZUJhbGxvb25zKCk7XG5lbGVtZW50cy5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBnYW1lLm5leHRRdWVzdGlvbigpO1xuICAgIGVsZW1lbnRzLndlbGNvbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pO1xuXG4vLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuLy8ganEuYWRkQ2xhc3MoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlLWNhcmQnKSwgJ3Nob3duJyk7XG4vLyB9LCAyMDAwKTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgY3VycmVudDogbnVsbCxcbiAgICBtb3JlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ0FuZHkgTXVycmF5JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaG8gd29uIFdpbWJsZWRvbiBpbiAyMDE2PycsXG4gICAgICAgICAgICAgICAgJ1dobyB3b24gYW4gT2x5bXBpYyBHb2xkIGluIEN5Y2xpbmc/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIGFzIHRhbGwgYXMgYSBsZXByZWNoYXVuPycsXG4gICAgICAgICAgICAgICAgJ1dobyBpcyBhIHdvcmxkLWZhbW91cyBjYWJlci10b3NzZXI/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGhhcyB0aHJlZSBuaXBwbGVzPycsXG4gICAgICAgICAgICAgICAgJ1dobyBpcyAxOSB5ZWFycyBvbGQ/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGJ1aWx0IFJvbWUgaW4gNyBkYXlzPycsXG4gICAgICAgICAgICAgICAgJ1dobyBoYXMgYSBmZWFyIG9mIE1vcm9jY28/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIEJhdG1hbj8nLFxuICAgICAgICAgICAgICAgICdXaG8gaGFzIGFuIElRIG9mIDI2Mz8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ0thdG5pc3MgRXZlcmRlZW4nLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ1doaWNoIGZpY3RpdGlvdXMgY2hhcmFjdGVyIHdvbiB0aGUgSHVuZ2VyIEdhbWVzPycsXG4gICAgICAgICAgICAgICAgJ1dobyB3YXMgSGFycnkgUG90dGVy4oCZcyBiZXN0IGZyaWVuZD8nLFxuICAgICAgICAgICAgICAgICdXaG8gc2FuZyDigJhHYW5nbmFtIFN0eWxl4oCZPycsXG4gICAgICAgICAgICAgICAgJ1dobyBwYWludGVkIHRoZSDigJhNb25hIExpc2HigJk/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGhhcyBhIHZlcnRpY2FsIGxlYXAgb2YgOSBmZWV0PycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgYSB2aWxsYWdlIGluIFNvdXRoZXJuIEl0YWx5PycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgYSBicmFuZCBvZiBTbHVnIFJlcGVsbGVudD8nLFxuICAgICAgICAgICAgICAgICdXaG8gaXMgdGhlIEd5bSBMZWFkZXIgaW4gUGFsbGV0IFRvd24/JyxcbiAgICAgICAgICAgICAgICAnV2hvIGlzIHN0dWNrIG9uIE1hcnMgaW4g4oCYVGhlIE1hcnRpYW7igJk/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdBcnNlbmFsJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaG8gcGxheSB0aGVpciBob21lIGdhbWVzIGF0IHRoZSBFbWlyYXRlcyBTdGFkaXVtPycsXG4gICAgICAgICAgICAgICAgJ1dobyBhcmUgdGhlIGRvbWVzdGljIGNoYW1waW9ucyBvZiBGcmFuY2U/JyxcbiAgICAgICAgICAgICAgICAnV2hvIHdvbiBTcG9ydCBQZXJzb25hbGl0eSDigJhUZWFtIG9mIHRoZSBZZWFy4oCZIDIwMTA/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgd291bGQgb25lIHN0b3JlIHRoZWlyIGJvYXRpbmcgb2Fycz8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBjYW4geW91IGJ1eSB0aGUgMTMgbW9zdCBleHBlbnNpdmUgcmFiYml0cz8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIHRoZSDigJhKZXdlbCBvZiBDYWxpZm9ybmlhIEJheeKAmT8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIHRoZSAxM3RoIG1vbnRoIGNhbGxlZD8nLFxuICAgICAgICAgICAgICAgICdXaG8gZm91bmRlZCBGYWNlYm9vaz8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ05pY2UsIEZyYW5jZScsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnV2hlcmUgaXMgdGhlIFByb21lbmFkZSBkZXMgQW5nbGFpcz8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGlzIGEgdHlwZSBvZiBiaXNjdWl0PycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgYW4gaW5sYW5kIGZyZW5jaCB0b3duPycsXG4gICAgICAgICAgICAgICAgJ0hvdyBkbyB5b3Ugc3BlbGwg4oCYbWlsbGVubml1beKAmT8nLFxuICAgICAgICAgICAgICAgICdXaGF0IGxldHRlciBjb21lcyBhZnRlciDigJhK4oCZPycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGRvZXMgdGhlIFF1ZWVuIGdldCBidXJpZWQ/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgYXJlIHdlZXRhYml4IG1hZGU/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdDYW50ZXJidXJ5IENhdGhlZHJhbCcsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnV2hlcmUgZGlkIHdlIGJvdGggZ3JhZHVhdGUgZnJvbSB1bml2ZXJzaXR5PycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGRpZCBBbmR5IE11cnJheSB3aW4gdGhlIFVTIE9wZW4/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgaXMgdGhlIHdvcmxk4oCZcyBsYXJnZXN0IHN3aW1taW5nIHBvb2w/JyxcbiAgICAgICAgICAgICAgICAnV2hlcmUgYXJlIHRoZSBDcm93biBKZXdlbHMga2VwdD8nLFxuICAgICAgICAgICAgICAgICdXaGVyZSBkaWQgQ2hhcmxlcyBEYXJ3aW4gd3JpdGUgT3JpZ2luIG9mIFNwZWNpZXM/JyxcbiAgICAgICAgICAgICAgICAnV2hpY2ggVUsgQnVpbGRpbmcgaXMgdGFsbGVyIHRoYW4gRXZlcmVzdD8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ1ByaWRlIGFuZCBQcmVqdWRpY2UnLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ1doYXQgbW92aWUgd2lsbCBJIG5ldmVyIHdhdGNoIGFnYWluPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgYSBncmVhdCBYYm94IGdhbWU/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBkb2VzIHRoZSBQb3Bl4oCZcyB0YXR0b28gc2F5PycsXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgSksgUm93bGluZ+KAmXMgYmVzdCBzZWxsaW5nIGJvb2s/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyBVS0lQ4oCZcyBvZmZpY2lhbCBtb3R0bz8nXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFuc3dlcjogJ1Blbmd1aW4nLFxuICAgICAgICAgICAgcXVlc3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgJ1doYXQgaXMgdGhlIGJlc3QsIGN1dGVzdCBhbmltYWw/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyB0aGUgZmFzdGVzdCBhbmltYWwgb24gZWFydGg/JyxcbiAgICAgICAgICAgICAgICAnV2hhdCBpcyBicmlnaHQgcmVkPycsXG4gICAgICAgICAgICAgICAgJ1doYXQgZG9lcyBQaWthY2h1IGV2b2x2ZSBpbnRvPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnT3JpZ2lucyBCYXIsIERhcndpbiBDb2xsZWdlJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdXaGVyZSBkaWQgd2UgbWVldD8nLFxuICAgICAgICAgICAgICAgICdEdWRlLCB3aGVyZeKAmXMgbXkgY2FyPycsXG4gICAgICAgICAgICAgICAgJ1doZXJlIGhhdmUgYWxsIHRoZSBtdWZmaW5zIGdvbmU/J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdGaXZlJyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdIb3cgbWFueSB5ZWFycyBoYXZlIHdlIGJlZW4gdG9nZXRoZXI/JyxcbiAgICAgICAgICAgICAgICAnSG93IG9sZCBpcyBFbHZpcyBQcmVzbGV5PydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYW5zd2VyOiAnWUVTIScsXG4gICAgICAgICAgICBxdWVzdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAnTWFubnksIHdpbGwgeW91IG1hcnJ5IG1lPydcbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIF0sXG4gICAgbmV4dFF1ZXN0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5tb3JlLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiAhISh0aGlzLmN1cnJlbnQpO1xuICAgIH1cbn07XG4iLCJjb25zdCBqcSA9IHtcbiAgICBhZGRDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfSxcbiAgICByZW1vdmVDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfSxcbiAgICBoYXNDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgICB9LFxuICAgIGNoYW5nZVRleHQ6IGZ1bmN0aW9uKGVsLCBuZXdUZXh0KSB7XG4gICAgICAgIGxldCBhY3Rpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYWN0aW9uKTtcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IG5ld1RleHQ7XG4gICAgICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICB9O1xuICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gJzAnO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgYWN0aW9uKTtcbiAgICB9XG59O1xuXG5jb25zdCByYW5kID0gKGZybSA9IDAsIHRvID0gMCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5hYnModG8gLSBmcm0pKSArIE1hdGgubWluKGZybSwgdG8pO1xuXG5jb25zdCBpZEdlbiA9IHtcbiAgICBjaGFyczogJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OScsXG4gICAgb2xkOiBbXSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZ2VuID0gdGhpcy5nZW4oKTtcbiAgICAgICAgaWYgKHRoaXMub2xkLmluZGV4T2YoZ2VuKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2xkLnB1c2goZ2VuKTtcbiAgICAgICAgcmV0dXJuIGdlbjtcbiAgICB9LFxuICAgIGdlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXkoMTYpLmZpbGwoMSkubWFwKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJzW3JhbmQodGhpcy5jaGFycy5sZW5ndGgpXTtcbiAgICAgICAgfSkuam9pbignJyk7XG4gICAgfVxufTtcblxuZXhwb3J0IHtcbiAgICBqcSxcbiAgICBpZEdlbixcbiAgICByYW5kXG59OyJdfQ==
