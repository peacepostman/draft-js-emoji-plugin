'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _clsx = require('clsx');

var _clsx2 = _interopRequireDefault(_clsx);

var _emojiMart = require('emoji-mart');

var _nimbleEmoji = require('emoji-mart/dist-es/components/emoji/nimble-emoji');

var _nimbleEmoji2 = _interopRequireDefault(_nimbleEmoji);

var _emojione = require('emoji-mart/data/emojione.json');

var _emojione2 = _interopRequireDefault(_emojione);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EmojiComponent = function EmojiComponent(_ref) {
  var _ref$theme = _ref.theme,
      theme = _ref$theme === undefined ? {} : _ref$theme,
      className = _ref.className,
      decoratedText = _ref.decoratedText,
      emojiSet = _ref.emojiSet,
      useNativeArt = _ref.useNativeArt,
      props = _objectWithoutProperties(_ref, ['theme', 'className', 'decoratedText', 'emojiSet', 'useNativeArt']);

  var emojiData = (0, _emojiMart.getEmojiDataFromNative)(decoratedText, emojiSet, _emojione2.default);

  var emojiDisplay = null;
  if (useNativeArt === true || !emojiData) {
    emojiDisplay = _react2.default.createElement(
      'span',
      { title: emojiData ? emojiData.name : decoratedText },
      props.children
    );
  } else {
    var combinedClassName = (0, _clsx2.default)(theme.emoji, className);

    emojiDisplay = _react2.default.createElement(
      _nimbleEmoji2.default,
      {
        data: _emojione2.default,
        className: combinedClassName,
        set: emojiSet,
        skin: emojiData.skin || 1,
        emoji: emojiData,
        size: 15,
        tooltip: true
      },
      props.children
    );
  }

  return emojiDisplay;
};

exports.default = EmojiComponent;