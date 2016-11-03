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
        this.durations = [(0, _utils.rand)(3500, 5000), (0, _utils.rand)(5000, 10000)];
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
            return this.question === _questions2.default.current.questions[0];
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
            el.querySelector('span').innerText = this.question;
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

var _Coor = require('./Coor.js');

var _Coor2 = _interopRequireDefault(_Coor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confetti = {
    addBurst: function addBurst(balloon) {
        var bound = balloon.getElement().getBoundingClientRect();
        var centre = new _Coor2.default(bound.left, bound.top);
        balloon.getConfettiElement().innerHTML = new Array(50).fill(1).map(function () {
            return confetti.generateHTML(centre);
        }).join('');
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

},{"./Coor.js":2,"./utils.js":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    game: document.getElementById('game'),
    confetti: document.getElementById('confetti-box')
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
        }
    }
};

exports.default = game;

},{"./Balloon.js":1,"./elements.js":4,"./questions.js":7}],6:[function(require,module,exports){
'use strict';

var _game = require('./game.js');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_game2.default.placeBalloons();
_game2.default.nextQuestion();

// setTimeout(function() {
//     jq.addClass(document.getElementById('title-card'), 'shown');
// }, 2000);

},{"./game.js":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    current: null,
    more: [{
        answer: 'A: Test',
        questions: ['A: Correct', 'A: Wrong 1', 'A: Wrong 2', 'A: Wrong 3', 'A: Wrong 4', 'A: Wrong 5', 'A: Wrong 6', 'A: Wrong 7', 'A: Wrong 8', 'A: Wrong 9']
    }, {
        answer: 'B: Test',
        questions: ['B: Correct', 'B: Wrong 1', 'B: Wrong 2', 'B: Wrong 3', 'B: Wrong 4', 'B: Wrong 5', 'B: Wrong 6', 'B: Wrong 7', 'B: Wrong 8', 'B: Wrong 9']
    }, {
        answer: 'C: Test',
        questions: ['C: Correct', 'C: WRONG 1', 'C: WRONG 2', 'C: WRONG 3', 'C: WRONG 4', 'C: WRONG 5', 'C: WRONG 6', 'C: WRONG 7', 'C: WRONG 8', 'C: WRONG 9']
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvQmFsbG9vbi5qcyIsImFwcC9qcy9Db29yLmpzIiwiYXBwL2pzL2NvbmZldHRpLmpzIiwiYXBwL2pzL2VsZW1lbnRzLmpzIiwiYXBwL2pzL2dhbWUuanMiLCJhcHAvanMvbWFpbi5qcyIsImFwcC9qcy9xdWVzdGlvbnMuanMiLCJhcHAvanMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sTztBQUNGLHVCQUFjO0FBQUE7O0FBQ1YsYUFBSyxJQUFMLEdBQVksSUFBWjtBQUNBLGFBQUssRUFBTCxHQUFVLGFBQU0sTUFBTixFQUFWO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsYUFBSyxDQUFMLEdBQVMsaUJBQUssS0FBTCxJQUFjLEdBQXZCO0FBQ0EsYUFBSyxLQUFMLEdBQWEsaUJBQUssSUFBTCxDQUFiO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLENBQUMsaUJBQUssSUFBTCxFQUFXLElBQVgsQ0FBRCxFQUFtQixpQkFBSyxJQUFMLEVBQVcsS0FBWCxDQUFuQixDQUFqQjtBQUNBLGFBQUssS0FBTCxHQUFhLENBQUMsS0FBRCxFQUFRLE9BQVIsRUFBaUIsTUFBakIsRUFBeUIsUUFBekIsRUFBbUMsUUFBbkMsRUFBNkMsaUJBQUssQ0FBTCxDQUE3QyxDQUFiO0FBQ0EsYUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGFBQUssUUFBTCxHQUFnQixJQUFoQjtBQUNBLGFBQUssTUFBTCxHQUFjLEtBQWQ7QUFDSDs7Ozt5Q0FDZ0IsSSxFQUFNO0FBQ25CLGlCQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0g7OztvQ0FDVztBQUNSLG1CQUFPLEtBQUssUUFBTCxLQUFrQixvQkFBVSxPQUFWLENBQWtCLFNBQWxCLENBQTRCLENBQTVCLENBQXpCO0FBQ0g7Ozs4QkFDSztBQUNGLGdCQUFJLEtBQUss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ZCxDQUEzQixJQUFpRCxLQUFLLEdBQUwsQ0FBUyxHQUFULEVBQWMsRUFBZCxDQUF0RTtBQUFBLENBQWI7O0FBRUEsSUFBTSxRQUFRO0FBQ1YsV0FBTyxzQ0FERztBQUVWLFNBQUssRUFGSztBQUdWLFlBQVEsa0JBQVc7QUFDZixZQUFJLE1BQU0sS0FBSyxHQUFMLEVBQVY7QUFDQSxZQUFJLEtBQUssR0FBTCxDQUFTLE9BQVQsQ0FBaUIsR0FBakIsTUFBMEIsQ0FBQyxDQUEvQixFQUFrQztBQUM5QixtQkFBTyxLQUFLLE1BQUwsRUFBUDtBQUNIO0FBQ0QsYUFBSyxHQUFMLENBQVMsSUFBVCxDQUFjLEdBQWQ7QUFDQSxlQUFPLEdBQVA7QUFDSCxLQVZTO0FBV1YsU0FBSyxlQUFXO0FBQUE7O0FBQ1osZUFBTyxJQUFJLEtBQUosQ0FBVSxFQUFWLEVBQWMsSUFBZCxDQUFtQixDQUFuQixFQUFzQixHQUF0QixDQUEwQixZQUFNO0FBQ25DLG1CQUFPLE1BQUssS0FBTCxDQUFXLEtBQUssTUFBSyxLQUFMLENBQVcsTUFBaEIsQ0FBWCxDQUFQO0FBQ0gsU0FGTSxFQUVKLElBRkksQ0FFQyxFQUZELENBQVA7QUFHSDtBQWZTLENBQWQ7O1FBbUJJLEUsR0FBQSxFO1FBQ0EsSyxHQUFBLEs7UUFDQSxJLEdBQUEsSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBqcSwgaWRHZW4sIHJhbmQgfSBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCBxdWVzdGlvbnMgZnJvbSAnLi9xdWVzdGlvbnMuanMnO1xuaW1wb3J0IGNvbmZldHRpIGZyb20gJy4vY29uZmV0dGkuanMnO1xuXG5jbGFzcyBCYWxsb29uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5pZCA9IGlkR2VuLmNyZWF0ZSgpO1xuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gJyc7XG4gICAgICAgIHRoaXMueCA9IHJhbmQoMTAwMDApIC8gMTAwO1xuICAgICAgICB0aGlzLmRlbGF5ID0gcmFuZCg4MDAwKTtcbiAgICAgICAgdGhpcy5kdXJhdGlvbnMgPSBbcmFuZCgzNTAwLCA1MDAwKSwgcmFuZCg1MDAwLCAxMDAwMCldO1xuICAgICAgICB0aGlzLmNvbG9yID0gWydyZWQnLCAnZ3JlZW4nLCAnYmx1ZScsICdwdXJwbGUnLCAnb3JhbmdlJ11bcmFuZCg1KV07XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuY29uZmV0dGkgPSBudWxsO1xuICAgICAgICB0aGlzLnBvcHBlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBzZXRHYW1lUmVmZXJlbmNlKGdhbWUpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB9XG4gICAgaXNDb3JyZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVzdGlvbiA9PT0gcXVlc3Rpb25zLmN1cnJlbnQucXVlc3Rpb25zWzBdO1xuICAgIH1cbiAgICBwb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ29ycmVjdCgpKSB7XG4gICAgICAgICAgICBjb25mZXR0aS5hZGRCdXJzdCh0aGlzKTtcbiAgICAgICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgICAgICAganEuYWRkQ2xhc3MoZWwsICdwb3BwZWQnKTtcbiAgICAgICAgICAgIHRoaXMucG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5uZXh0UXVlc3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5lbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWxsb29uLScgKyB0aGlzLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcbiAgICB9XG4gICAgZ2V0Q29uZmV0dGlFbGVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5jb25mZXR0aSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmV0dGk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25mZXR0aSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25mZXR0aS0nICsgdGhpcy5pZCk7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZldHRpO1xuICAgIH1cbiAgICBnZW5lcmF0ZUhUTUwoKSB7XG4gICAgICAgIHJldHVybiBgPGRpdiBpZD1cImJhbGxvb24tJHt0aGlzLmlkfVwiIGNsYXNzPVwiYmFsbG9vbiBiYWxsb29uLSR7dGhpcy5jb2xvcn1cIiBzdHlsZT1cImxlZnQ6ICR7dGhpcy54fSU7IGFuaW1hdGlvbi1kZWxheTogJHt0aGlzLmRlbGF5fW1zOyBhbmltYXRpb24tZHVyYXRpb246ICR7dGhpcy5kdXJhdGlvbnNbMF19bXMsICR7dGhpcy5kdXJhdGlvbnNbMV19bXM7XCI+PHNwYW4+JHt0aGlzLnF1ZXN0aW9ufTwvc3Bhbj48L2Rpdj5gO1xuICAgIH1cbiAgICBnZW5lcmF0ZUNvbmZldHRpSFRNTCgpIHtcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGlkPVwiY29uZmV0dGktJHt0aGlzLmlkfVwiPjwvZGl2PmA7XG4gICAgfVxuICAgIHVwZGF0ZVZpZXcoKSB7XG4gICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgICBqcS5yZW1vdmVDbGFzcyhlbCwgJ2NvcnJlY3QnKTtcbiAgICAgICAgaWYgKHRoaXMuaXNDb3JyZWN0KCkpIHtcbiAgICAgICAgICAgIGpxLmFkZENsYXNzKGVsLCAnY29ycmVjdCcpO1xuICAgICAgICB9XG4gICAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS5pbm5lclRleHQgPSB0aGlzLnF1ZXN0aW9uO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFsbG9vbjsiLCJpbXBvcnQgeyByYW5kIH0gZnJvbSAnLi91dGlscy5qcyc7XG5cbmNsYXNzIENvb3Ige1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG4gICAgZGlzdGFuY2VUbyhjb29yKSB7XG4gICAgICAgIGxldCB4ID0gTWF0aC5hYnModGhpcy54IC0gY29vci54KTtcbiAgICAgICAgbGV0IHkgPSBNYXRoLmFicyh0aGlzLnkgLSBjb29yLnkpO1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHgsIDIpICsgTWF0aC5wb3coeSwgMikpO1xuICAgIH1cbiAgICBzdGF0aWMgcmFuZG9tKHcsIGgpIHtcbiAgICAgICAgbGV0IGNlbnRyZSA9IG5ldyBDb29yKHcgLyAyLCBoIC8gMik7XG4gICAgICAgIGxldCBybmQgPSBudWxsO1xuICAgICAgICB3aGlsZShybmQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJuZCA9IG5ldyBDb29yKHJhbmQodyksIHJhbmQoaCkpO1xuICAgICAgICAgICAgaWYgKHJuZC5kaXN0YW5jZVRvKGNlbnRyZSkgPiAoTWF0aC5taW4odywgaCkgLyAyKSkge1xuICAgICAgICAgICAgICAgIHJuZCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJuZDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvb3I7IiwiaW1wb3J0IHsgcmFuZCB9IGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IENvb3IgZnJvbSAnLi9Db29yLmpzJztcblxuY29uc3QgY29uZmV0dGkgPSB7XG4gICAgYWRkQnVyc3Q6IChiYWxsb29uKSA9PiB7XG4gICAgICAgIGxldCBib3VuZCA9IGJhbGxvb24uZ2V0RWxlbWVudCgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgY2VudHJlID0gbmV3IENvb3IoYm91bmQubGVmdCwgYm91bmQudG9wKTtcbiAgICAgICAgYmFsbG9vbi5nZXRDb25mZXR0aUVsZW1lbnQoKS5pbm5lckhUTUwgPSBuZXcgQXJyYXkoNTApLmZpbGwoMSkubWFwKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb25mZXR0aS5nZW5lcmF0ZUhUTUwoY2VudHJlKTtcbiAgICAgICAgfSkuam9pbignJyk7XG4gICAgfSxcbiAgICBnZW5lcmF0ZUhUTUw6IChjZW50cmUpID0+IHtcbiAgICAgICAgbGV0IGRpciA9IHJhbmQoMSwgNCk7IC8vIGRpcmVjdGlvblxuICAgICAgICBsZXQgY29sb3IgPSBbJ3JlZCcsICdncmVlbicsICdibHVlJywgJ3B1cnBsZScsICdvcmFuZ2UnXVtyYW5kKDUpXTtcbiAgICAgICAgbGV0IGNvb3IgPSBDb29yLnJhbmRvbSgxMjYsIDE4MCk7XG4gICAgICAgIGxldCBkID0gcmFuZCgxNSkgLyAxMDA7IC8vIGFuaW1hdGlvbiBkZWxheVxuXG4gICAgICAgIGxldCBjbHNzID0gYHBhcnRpY2xlIHBhcnRpY2xlLWFuaS0ke2Rpcn0gcGFydGljbGUtJHtjb2xvcn1gO1xuICAgICAgICBsZXQgc3R5bCA9IGB0b3A6ICR7Y2VudHJlLnkgKyBjb29yLnl9cHg7IGxlZnQ6ICR7Y2VudHJlLnggKyBjb29yLnh9cHg7IGFuaW1hdGlvbi1kZWxheTogLSR7ZH1zO2A7XG4gICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCIke2Nsc3N9XCIgc3R5bGU9XCIke3N0eWx9XCI+PC9zcGFuPmA7XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmV0dGk7IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGdhbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyksXG4gICAgY29uZmV0dGk6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25mZXR0aS1ib3gnKVxufTsiLCJpbXBvcnQgZWxlbWVudHMgZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQgcXVlc3Rpb25zIGZyb20gJy4vcXVlc3Rpb25zLmpzJztcbmltcG9ydCBCYWxsb29uIGZyb20gJy4vQmFsbG9vbi5qcyc7XG5cbmNvbnN0IGdhbWUgPSB7XG4gICAgYmFsbG9vbnM6IG5ldyBBcnJheSgxMCkuZmlsbCgxKS5tYXAoKCkgPT4gbmV3IEJhbGxvb24oKSksXG4gICAgcGxhY2VCYWxsb29uczogZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBodG1sID0gJyc7XG4gICAgICAgIGxldCBjb25mID0gJyc7XG4gICAgICAgIHRoaXMuYmFsbG9vbnMuZm9yRWFjaCgoYmFsbG9vbikgPT4ge1xuICAgICAgICAgICAgaHRtbCArPSBiYWxsb29uLmdlbmVyYXRlSFRNTCgpO1xuICAgICAgICAgICAgY29uZiArPSBiYWxsb29uLmdlbmVyYXRlQ29uZmV0dGlIVE1MKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlbGVtZW50cy5nYW1lLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIGVsZW1lbnRzLmNvbmZldHRpLmlubmVySFRNTCA9IGNvbmY7XG5cbiAgICAgICAgdGhpcy5iYWxsb29ucy5mb3JFYWNoKGJhbGxvb24gPT4ge1xuICAgICAgICAgICAgYmFsbG9vbi5zZXRHYW1lUmVmZXJlbmNlKGdhbWUpO1xuICAgICAgICAgICAgYmFsbG9vbi5nZXRFbGVtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBiYWxsb29uLnBvcCgpKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBuZXh0UXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocXVlc3Rpb25zLm5leHRRdWVzdGlvbigpKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxvb25zLmZpbHRlcihiYWxsb29uID0+ICFiYWxsb29uLnBvcHBlZCkucmV2ZXJzZSgpLmZvckVhY2goKGJhbGxvb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgYmFsbG9vbi5xdWVzdGlvbiA9IHF1ZXN0aW9ucy5jdXJyZW50LnF1ZXN0aW9uc1tpbmRleF07XG4gICAgICAgICAgICAgICAgYmFsbG9vbi51cGRhdGVWaWV3KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWU7IiwiaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lLmpzJztcblxuZ2FtZS5wbGFjZUJhbGxvb25zKCk7XG5nYW1lLm5leHRRdWVzdGlvbigpO1xuXG4vLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuLy8gICAgIGpxLmFkZENsYXNzKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aXRsZS1jYXJkJyksICdzaG93bicpO1xuLy8gfSwgMjAwMCk7IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIGN1cnJlbnQ6IG51bGwsXG4gICAgbW9yZTogW1xuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdBOiBUZXN0JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdBOiBDb3JyZWN0JyxcbiAgICAgICAgICAgICAgICAnQTogV3JvbmcgMScsXG4gICAgICAgICAgICAgICAgJ0E6IFdyb25nIDInLFxuICAgICAgICAgICAgICAgICdBOiBXcm9uZyAzJyxcbiAgICAgICAgICAgICAgICAnQTogV3JvbmcgNCcsXG4gICAgICAgICAgICAgICAgJ0E6IFdyb25nIDUnLFxuICAgICAgICAgICAgICAgICdBOiBXcm9uZyA2JyxcbiAgICAgICAgICAgICAgICAnQTogV3JvbmcgNycsXG4gICAgICAgICAgICAgICAgJ0E6IFdyb25nIDgnLFxuICAgICAgICAgICAgICAgICdBOiBXcm9uZyA5J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdCOiBUZXN0JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdCOiBDb3JyZWN0JyxcbiAgICAgICAgICAgICAgICAnQjogV3JvbmcgMScsXG4gICAgICAgICAgICAgICAgJ0I6IFdyb25nIDInLFxuICAgICAgICAgICAgICAgICdCOiBXcm9uZyAzJyxcbiAgICAgICAgICAgICAgICAnQjogV3JvbmcgNCcsXG4gICAgICAgICAgICAgICAgJ0I6IFdyb25nIDUnLFxuICAgICAgICAgICAgICAgICdCOiBXcm9uZyA2JyxcbiAgICAgICAgICAgICAgICAnQjogV3JvbmcgNycsXG4gICAgICAgICAgICAgICAgJ0I6IFdyb25nIDgnLFxuICAgICAgICAgICAgICAgICdCOiBXcm9uZyA5J1xuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhbnN3ZXI6ICdDOiBUZXN0JyxcbiAgICAgICAgICAgIHF1ZXN0aW9uczogW1xuICAgICAgICAgICAgICAgICdDOiBDb3JyZWN0JyxcbiAgICAgICAgICAgICAgICAnQzogV1JPTkcgMScsXG4gICAgICAgICAgICAgICAgJ0M6IFdST05HIDInLFxuICAgICAgICAgICAgICAgICdDOiBXUk9ORyAzJyxcbiAgICAgICAgICAgICAgICAnQzogV1JPTkcgNCcsXG4gICAgICAgICAgICAgICAgJ0M6IFdST05HIDUnLFxuICAgICAgICAgICAgICAgICdDOiBXUk9ORyA2JyxcbiAgICAgICAgICAgICAgICAnQzogV1JPTkcgNycsXG4gICAgICAgICAgICAgICAgJ0M6IFdST05HIDgnLFxuICAgICAgICAgICAgICAgICdDOiBXUk9ORyA5J1xuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgXSxcbiAgICBuZXh0UXVlc3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLm1vcmUuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuY3VycmVudCk7XG4gICAgfVxufTsiLCJjb25zdCBqcSA9IHtcbiAgICBhZGRDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfSxcbiAgICByZW1vdmVDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfSxcbiAgICBoYXNDbGFzczogZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgICB9XG59O1xuXG5jb25zdCByYW5kID0gKGZybSA9IDAsIHRvID0gMCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5hYnModG8gLSBmcm0pKSArIE1hdGgubWluKGZybSwgdG8pO1xuXG5jb25zdCBpZEdlbiA9IHtcbiAgICBjaGFyczogJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OScsXG4gICAgb2xkOiBbXSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZ2VuID0gdGhpcy5nZW4oKTtcbiAgICAgICAgaWYgKHRoaXMub2xkLmluZGV4T2YoZ2VuKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub2xkLnB1c2goZ2VuKTtcbiAgICAgICAgcmV0dXJuIGdlbjtcbiAgICB9LFxuICAgIGdlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXkoMTYpLmZpbGwoMSkubWFwKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJzW3JhbmQodGhpcy5jaGFycy5sZW5ndGgpXTtcbiAgICAgICAgfSkuam9pbignJyk7XG4gICAgfVxufTtcblxuZXhwb3J0IHtcbiAgICBqcSxcbiAgICBpZEdlbixcbiAgICByYW5kXG59OyJdfQ==
