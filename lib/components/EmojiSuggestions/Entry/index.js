'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nimbleEmoji = require('emoji-mart/dist-es/components/emoji/nimble-emoji');

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

var _emojione = require('emoji-mart/data/emojione.json');

var _emojione2 = _interopRequireDefault(_emojione);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = function (_Component) {
  _inherits(Entry, _Component);

  function Entry(props) {
    _classCallCheck(this, Entry);

    var _this = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, props));

    _this.onMouseUp = function () {
      if (_this.mouseDown) {
        _this.mouseDown = false;
        _this.props.onEmojiSelect(_this.props.emoji);
      }
    };

    _this.onMouseDown = function (event) {
      // Note: important to avoid a content edit change
      event.preventDefault();

      _this.mouseDown = true;
    };

    _this.onMouseEnter = function () {
      _this.props.onEmojiFocus(_this.props.index);
    };

    _this.mouseDown = false;
    return _this;
  }

  _createClass(Entry, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.mouseDown = false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$theme = _props.theme,
          theme = _props$theme === undefined ? {} : _props$theme,
          useNativeArt = _props.useNativeArt,
          isFocused = _props.isFocused,
          id = _props.id,
          emojiSet = _props.emojiSet;

      var className = isFocused ? theme.emojiSuggestionsEntryFocused : theme.emojiSuggestionsEntry;

      var emojiDisplay = null;
      if (useNativeArt === true) {
        emojiDisplay = this.props.emoji.native;
      } else {
        emojiDisplay = _react2.default.createElement(_nimbleEmoji2.default, {
          data: _emojione2.default,
          set: emojiSet,
          skin: this.props.emoji.skin || 1,
          emoji: this.props.emoji,
          size: 18,
          tooltip: true
        });
      }

      return _react2.default.createElement(
        'div',
        {
          className: className,
          onMouseDown: this.onMouseDown,
          onMouseUp: this.onMouseUp,
          onMouseEnter: this.onMouseEnter,
          role: 'option',
          id: id,
          'aria-selected': isFocused ? 'true' : null
        },
        emojiDisplay,
        _react2.default.createElement(
          'span',
          { className: theme.emojiSuggestionsEntryText },
          this.props.emoji.colons
        )
      );
    }
  }]);

  return Entry;
}(_react.Component);

exports.default = Entry;