'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmojiSelect = function (_Component) {
  _inherits(EmojiSelect, _Component);

  function EmojiSelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EmojiSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EmojiSelect.__proto__ || Object.getPrototypeOf(EmojiSelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isOpen: false
    }, _this.onClick = function (e) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }, _this.onButtonMouseUp = function () {
      return _this.state.isOpen ? _this.closePopover() : _this.openPopover();
    }, _this.openPopover = function () {
      if (!_this.state.isOpen) {
        _this.setState({
          isOpen: true
        });
      }
    }, _this.closePopover = function () {
      if (_this.state.isOpen) {
        _this.setState({
          isOpen: false
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // Start the selector closed


  _createClass(EmojiSelect, [{
    key: 'componentDidMount',


    // When the selector is open and users click anywhere on the page,
    // the selector should close
    value: function componentDidMount() {
      document.addEventListener('click', this.closePopover);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.closePopover);
    }

    // Open the popover


    // Close the popover

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          selectButtonContent = _props.selectButtonContent,
          children = _props.children;

      var buttonClassName = this.state.isOpen ? 'emojiSelectButtonPressed' : 'emojiSelectButton';

      return _react2.default.createElement(
        'div',
        { className: 'emojiSelect', onClick: this.onClick },
        _react2.default.createElement(
          'button',
          {
            className: buttonClassName,
            onMouseUp: this.onButtonMouseUp,
            type: 'button'
          },
          selectButtonContent
        ),
        _react2.default.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              right: '0',
              zIndex: 1
            }
          },
          this.state.isOpen ? children : null
        )
      );
    }
  }]);

  return EmojiSelect;
}(_react.Component);

EmojiSelect.defaultProps = {
  selectButtonContent: '☺',
  toneSelectOpenDelay: 500
};
exports.default = EmojiSelect;