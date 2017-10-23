/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-router-bootstrap");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(6);

var _express2 = _interopRequireDefault(_express);

var _path = __webpack_require__(7);

var _path2 = _interopRequireDefault(_path);

var _bodyParser = __webpack_require__(8);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(9);

var _server2 = _interopRequireDefault(_server);

var _reactRouter = __webpack_require__(10);

var _App = __webpack_require__(11);

var _App2 = _interopRequireDefault(_App);

var _Trail = __webpack_require__(17);

var _Trail2 = _interopRequireDefault(_Trail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var db = "mongodb://localhost:27017/trails";

app.set('view engine', 'ejs');
app.use(_express2.default.static('static'));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.get(/\/(?!api)/, function (req, res) {
	var context = {};
	var html = _server2.default.renderToString(_react2.default.createElement(
		_reactRouter.StaticRouter,
		{ location: req.url, context: context },
		_react2.default.createElement(_App2.default, null)
	));

	res.render('index', { html: html });
});

app.get('/api', function (req, res) {
	_Trail2.default.find({}, function (err, trails) {
		if (err) throw err;
		console.log(trails);
		res.json(trails);
	});
});

app.post('/api', function (req, res) {
	console.log(req.body);
	var newTrail = new _Trail2.default({
		title: 'title',
		description: 'description',
		city: 'city',
		distance: 3,
		duration: {
			hours: 1,
			minutes: 30
		}
	});
	newTrail.save(function (err, newTrail) {
		if (err) throw err;
	});
	res.json('save');
});

app.listen(3000, function () {
	console.log('listen 3000');
});

_mongoose2.default.connect(db, { useMongoClient: true });

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

var _Header = __webpack_require__(12);

var _Header2 = _interopRequireDefault(_Header);

var _Footer = __webpack_require__(13);

var _Footer2 = _interopRequireDefault(_Footer);

var _Home = __webpack_require__(14);

var _Home2 = _interopRequireDefault(_Home);

var _Search = __webpack_require__(15);

var _Search2 = _interopRequireDefault(_Search);

var _User = __webpack_require__(16);

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import logo from './logo.svg';
//import './App.css';


var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'wrapper' },
        _react2.default.createElement(_Header2.default, null),
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Home2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/search', component: _Search2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/user', component: _User2.default }),
          '}'
        ),
        _react2.default.createElement(_Footer2.default, null)
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

var _reactRouterBootstrap = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header() {
  return _react2.default.createElement(
    _reactBootstrap.Navbar,
    { fixedTop: true },
    _react2.default.createElement(
      _reactBootstrap.Navbar.Header,
      null,
      _react2.default.createElement(
        _reactBootstrap.Navbar.Brand,
        null,
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/' },
          'Brand'
        )
      ),
      _react2.default.createElement(_reactBootstrap.Navbar.Toggle, null)
    ),
    _react2.default.createElement(
      _reactBootstrap.Navbar.Collapse,
      null,
      _react2.default.createElement(
        _reactBootstrap.Nav,
        { pullRight: true },
        _react2.default.createElement(
          _reactRouterBootstrap.LinkContainer,
          { to: '/search' },
          _react2.default.createElement(
            _reactBootstrap.NavItem,
            { eventKey: 1 },
            _react2.default.createElement(
              _reactBootstrap.FormGroup,
              null,
              _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text', placeholder: 'Search' })
            )
          )
        ),
        _react2.default.createElement(
          _reactRouterBootstrap.LinkContainer,
          { to: '/user' },
          _react2.default.createElement(
            _reactBootstrap.NavItem,
            { eventKey: 2 },
            _react2.default.createElement(
              _reactBootstrap.Button,
              null,
              _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'user' })
            )
          )
        )
      )
    )
  );
};

exports.default = Header;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer() {
  return _react2.default.createElement(
    'footer',
    { id: 'footer' },
    _react2.default.createElement(
      _reactBootstrap.Grid,
      null,
      _react2.default.createElement(
        _reactBootstrap.Row,
        null,
        _react2.default.createElement(
          _reactBootstrap.Col,
          { xs: 5 },
          _react2.default.createElement(
            'ul',
            { className: 'social-block' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                { href: '#' },
                _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'envelope' })
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                { href: '#' },
                _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'envelope' })
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                { href: '#' },
                _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'envelope' })
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Col,
          { xs: 7 },
          _react2.default.createElement(
            'p',
            { className: 'footer-quotes' },
            'Made with ',
            _react2.default.createElement(
              'span',
              null,
              '\u2764'
            ),
            ' for nature'
          )
        )
      )
    )
  );
};

exports.default = Footer;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Thumb = function Thumb(_ref) {
  var trail = _ref.trail;

  console.log(trail);
  return _react2.default.createElement(
    _reactBootstrap.Row,
    { className: 'show-grid thumb' },
    _react2.default.createElement(
      _reactBootstrap.Col,
      { xs: 12, md: 4 },
      _react2.default.createElement(_reactBootstrap.Image, { src: '/uploads/one.jpg', responsive: true, rounded: true })
    ),
    _react2.default.createElement(
      _reactBootstrap.Col,
      { xs: 12, md: 8 },
      _react2.default.createElement(
        _reactBootstrap.Row,
        { className: 'thumb-title' },
        _react2.default.createElement(
          _reactBootstrap.Col,
          { xs: 10, sm: 11 },
          _react2.default.createElement(
            'h3',
            null,
            _react2.default.createElement(
              'a',
              { href: '' },
              trail.title
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Col,
          { xs: 2, sm: 1 },
          _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'heart' })
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Row,
        null,
        _react2.default.createElement(
          _reactBootstrap.Col,
          { xs: 12 },
          _react2.default.createElement(
            'div',
            { className: 'start-line' },
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'star' }),
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'star' }),
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'star' }),
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'star' }),
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'star-empty' })
          )
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Row,
        { className: 'thumb-content' },
        _react2.default.createElement(
          _reactBootstrap.Col,
          { xs: 12 },
          _react2.default.createElement(
            'p',
            null,
            trail.description
          )
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Row,
        { className: 'thumb-features' },
        _react2.default.createElement(
          _reactBootstrap.Col,
          { xs: 4, className: 'thumb-features-item' },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'map-marker' }),
            'Brussels'
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Col,
          { xs: 4, className: 'thumb-features-item' },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'resize-horizontal' }),
            '60 km'
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Col,
          { xs: 4, className: 'thumb-features-item' },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'time' }),
            '60 km'
          )
        )
      )
    )
  );
};

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this));

    _this.state = {
      trails: []
    };
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // avec cette syntax this is undefined inside last then()
      /*fetch('http://localhost:5000/').then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
        console.log(this);
      });*/

      fetch('http://localhost:3000/api').then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        _this2.setState({ trails: data });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'main',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Home'
        ),
        _react2.default.createElement(
          _reactBootstrap.Grid,
          null,
          this.state.trails.map(function (trail, index) {
            return _react2.default.createElement(Thumb, { trail: trail, key: index });
          })
        )
      );
    }
  }]);

  return Home;
}(_react.Component);

exports.default = Home;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = function Search() {
  return _react2.default.createElement(
    'main',
    null,
    _react2.default.createElement(
      _reactBootstrap.Grid,
      null,
      _react2.default.createElement(
        'h1',
        null,
        'search'
      )
    )
  );
};

exports.default = Search;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

var _reactRouterBootstrap = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserProfile = function UserProfile() {
  return _react2.default.createElement(
    'h1',
    null,
    'user profile'
  );
};

var FormBlock = function FormBlock(props) {

  var ucFirst = function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  var validation = function validation() {
    if (props.value === 'warning' || props.value === 'error') {
      return props.value;
    } else {
      return null;
    }
  };

  var msg = function msg() {

    if (props.value === 'warning') {
      console.log('warning');
      return 'Don\'t forget to fill this field.';
    } else if (props.value === 'error') {
      console.log('error');
      return 'This is not a valid ' + props.field + '.';
    }

    return null;
  };

  // if props.value duration ??


  return _react2.default.createElement(
    _reactBootstrap.FormGroup,
    { controlId: props.field, validationState: validation() },
    _react2.default.createElement(
      _reactBootstrap.Col,
      { componentClass: _reactBootstrap.ControlLabel, sm: 2 },
      ucFirst(props.field)
    ),
    _react2.default.createElement(
      _reactBootstrap.Col,
      { sm: 10 },
      props.children,
      _react2.default.createElement(_reactBootstrap.FormControl.Feedback, null),
      _react2.default.createElement(
        _reactBootstrap.HelpBlock,
        null,
        msg()
      )
    )
  );
};

var UserNew = function (_Component) {
  _inherits(UserNew, _Component);

  function UserNew() {
    _classCallCheck(this, UserNew);

    var _this = _possibleConstructorReturn(this, (UserNew.__proto__ || Object.getPrototypeOf(UserNew)).call(this));

    _this.state = {
      data: {
        title: '',
        description: '',
        city: '',
        distance: 0,
        duration: {}
      }
    };
    return _this;
  }

  _createClass(UserNew, [{
    key: 'inputValidation',
    value: function inputValidation(type, inputName, value) {
      var data = Object.assign({}, this.state.data);

      var inputSplit = inputName.split('_');
      var name = inputSplit[0];
      var subname = inputSplit[1];
      var error = true;

      console.log(value);
      switch (type) {
        case 'text':
        case 'textarea':
        case 'select-one':

          var regex = /(<([^>]+)>)/ig;
          // regex origin: https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/

          if (value) {

            if (value.match(regex)) {

              data[name] = 'error';
              this.setState({ data: data }, function () {
                //console.log(this.state);

              });
            } else {
              data[name] = value;
              this.setState({ data: data }, function () {
                //console.log(this.state);
                error = false;
              });
            }
          } else {

            data[name] = 'warning';

            this.setState({ data: data }, function () {
              console.log(this.state);
            });
          }
          break;

        case 'number':

          value = +value;

          if (value && value >= 0) {

            if (name) {
              data[name][subname] = value;
            } else {
              data[name] = value;
            }

            this.setState({ data: data }, function () {
              console.log(this.state);
              error = false;
            });
          } else {

            if (subname) {
              data[name][subname] = 0;
            } else {
              data[name] = 'warning';
            }

            this.setState({ data: data }, function () {
              console.log(this.state);
            });
          }
          break;
      }

      return new Promise(function (resolve, reject) {
        if (!error) {
          resolve('all good');
        }
        reject('this field is missing');
      });
    }
  }, {
    key: '_handleSubmit',
    value: function _handleSubmit(e) {
      e.preventDefault();

      var that = this;
      var error = false;
      console.dir(this.state);

      this.inputValidation('text', 'title', this.state.data.title).then(function (value) {
        console.log(value);
        return that.inputValidation('textarea', 'description', that.state.data.descrition);
      }).then(function (value) {
        console.log('value');
        console.log(value);
        return that.inputValidation('select-one', 'city', that.state.data.city);
      }).then(function (value) {
        console.log(value);
        return that.inputValidation('number', 'distance', that.state.data.distance);
      }).then(function (value) {
        console.log(value);
        return that.inputValidation('number', 'duration_hours', that.state.data.duration.hours);
      }).then(function (value) {
        console.log(value);
        return that.inputValidation('number', 'duration_minutes', that.state.data.duration.minutes);
      }).catch(function (error) {
        console.log(error);
        error = true;
        return 'errorsd';
      }).then(function (value) {
        console.log(value);
      });

      console.dir(this.state);
      if (error) {
        console.log('true_hey');
      } else {
        console.log('true_hey');
      }

      /* fetch('http://localhost:3000/api', {
           method: 'post',
           headers: new Headers({
             "Content-Type": "application/json"
           }),
           body: JSON.stringify({ name: 'coucou'})
         })
         .then(function(response) {
           console.log(response);
           if(response.ok) {
             return response.blob();
           }
           throw new Error('Network response was not ok.');
         })
         .then(function(data) {
           console.log(data);
         })
         .catch(function(error) {
           console.log('There has been a problem with your fetch operation: ' + error.message);
         });*/
    }
  }, {
    key: '_handleInputChange',
    value: function _handleInputChange(e) {
      console.log('handle change');

      var fieldType = e.target.type;
      var fieldName = e.target.name;
      var fieldValue = e.target.value;

      this.inputValidation(fieldType, fieldName, fieldValue);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'inner-main' },
        _react2.default.createElement(
          'h1',
          null,
          'Create your own trail'
        ),
        _react2.default.createElement(
          _reactBootstrap.Form,
          { horizontal: true, onSubmit: this._handleSubmit.bind(this) },
          _react2.default.createElement(
            FormBlock,
            { field: 'title',
              value: this.state.data.title },
            _react2.default.createElement(_reactBootstrap.FormControl, { type: 'text',
              name: 'title',
              inputRef: function inputRef(ref) {
                return _this2._title = ref;
              },
              onBlur: this._handleInputChange.bind(this) })
          ),
          _react2.default.createElement(
            FormBlock,
            { field: 'description',
              value: this.state.data.description },
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: 'textarea',
              name: 'description',
              inputRef: function inputRef(ref) {
                return _this2._description = ref;
              },
              onBlur: this._handleInputChange.bind(this) })
          ),
          _react2.default.createElement(
            FormBlock,
            { field: 'city',
              value: this.state.data.city },
            _react2.default.createElement(
              _reactBootstrap.FormControl,
              { componentClass: 'select',
                name: 'city',
                inputRef: function inputRef(ref) {
                  return _this2._city = ref;
                },
                onBlur: this._handleInputChange.bind(this) },
              _react2.default.createElement(
                'option',
                { value: 'other' },
                '...'
              ),
              _react2.default.createElement(
                'option',
                { value: 'brussels' },
                'Brussels'
              )
            )
          ),
          _react2.default.createElement(
            FormBlock,
            { field: 'distance',
              value: this.state.data.distance },
            _react2.default.createElement(
              _reactBootstrap.InputGroup,
              null,
              _react2.default.createElement('input', { type: 'number', step: '0.1', min: '0.1',
                id: 'distance', name: 'distance', className: 'form-control',
                ref: function ref(_ref) {
                  return _this2._distance = _ref;
                },
                onBlur: this._handleInputChange.bind(this) }),
              _react2.default.createElement(
                _reactBootstrap.InputGroup.Addon,
                null,
                'km'
              )
            )
          ),
          _react2.default.createElement(
            FormBlock,
            { field: 'duration',
              value: this.state.data.duration.hours + this.state.data.duration.minutes === 0 ? 'warning' : null },
            _react2.default.createElement(
              _reactBootstrap.Row,
              null,
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xs: 5 },
                _react2.default.createElement(
                  _reactBootstrap.InputGroup,
                  null,
                  _react2.default.createElement('input', { type: 'number', step: '1', min: '0',
                    id: 'duration-hours', name: 'duration_hours', className: 'form-control',
                    ref: function ref(_ref2) {
                      return _this2._duration_hours = _ref2;
                    },
                    onBlur: this._handleInputChange.bind(this) }),
                  _react2.default.createElement(
                    _reactBootstrap.InputGroup.Addon,
                    null,
                    'h'
                  )
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xs: 5 },
                _react2.default.createElement(
                  _reactBootstrap.InputGroup,
                  null,
                  _react2.default.createElement('input', { type: 'number', step: '1', min: '0', max: '59',
                    id: 'duration-minutes', name: 'duration_minutes', className: 'form-control',
                    ref: function ref(_ref3) {
                      return _this2._duration_minutes = _ref3;
                    },
                    onBlur: this._handleInputChange.bind(this) }),
                  _react2.default.createElement(
                    _reactBootstrap.InputGroup.Addon,
                    null,
                    'm'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.FormGroup,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { smOffset: 2, sm: 10 },
              _react2.default.createElement(
                _reactBootstrap.Button,
                { type: 'submit', bsStyle: 'primary' },
                'Save'
              )
            )
          )
        )
      );
    }
  }]);

  return UserNew;
}(_react.Component);

var Toolbar = function Toolbar(_ref4) {
  var url = _ref4.url,
      parent = _ref4.parent;

  return _react2.default.createElement(
    _reactBootstrap.Row,
    { className: 'user-actions top' },
    _react2.default.createElement(
      _reactBootstrap.Col,
      { xs: 12 },
      _react2.default.createElement(
        _reactBootstrap.ButtonToolbar,
        null,
        _react2.default.createElement(
          _reactRouterBootstrap.LinkContainer,
          { to: parent ? url + '/profile' : url },
          _react2.default.createElement(
            _reactBootstrap.Button,
            { bsStyle: 'primary', bsSize: 'small',
              className: !parent ? 'btn-left' : '' },
            parent ? 'edit Profile' : 'go Back'
          )
        )
      )
    )
  );
};

var User = function User(props) {
  console.log(props.match);
  return _react2.default.createElement(
    'main',
    null,
    _react2.default.createElement(
      _reactBootstrap.Grid,
      null,
      _react2.default.createElement(Toolbar, { url: props.match.url, parent: props.match.isExact }),
      _react2.default.createElement(_reactRouterDom.Route, { path: props.match.url + '/profile', component: UserProfile }),
      _react2.default.createElement(_reactRouterDom.Route, { path: props.match.url + '/new', component: UserNew }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: props.match.url, render: function render() {
          return _react2.default.createElement(
            'div',
            { className: 'inner-main' },
            _react2.default.createElement(
              'h1',
              null,
              'user dash'
            ),
            _react2.default.createElement(
              _reactBootstrap.Row,
              { className: 'user-actions bottom' },
              _react2.default.createElement(
                _reactBootstrap.Grid,
                null,
                _react2.default.createElement(
                  _reactBootstrap.Col,
                  { xs: 12 },
                  _react2.default.createElement(
                    _reactBootstrap.ButtonToolbar,
                    null,
                    _react2.default.createElement(
                      _reactRouterBootstrap.LinkContainer,
                      { to: props.match.url + '/new' },
                      _react2.default.createElement(
                        _reactBootstrap.Button,
                        { bsStyle: 'primary', bsSize: 'large' },
                        _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'pencil' })
                      )
                    )
                  )
                )
              )
            )
          );
        } })
    )
  );
};

exports.default = User;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(3);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trailSchema = _mongoose2.default.Schema({
	title: String,
	description: String,
	city: String,
	distance: Number,
	duration: {
		hours: Number,
		minutes: Number
	}
});

var Trail = _mongoose2.default.model('Trail', trailSchema);

module.exports = Trail;

/***/ })
/******/ ]);