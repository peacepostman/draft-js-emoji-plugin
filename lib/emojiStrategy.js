'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findWithRegex = require('find-with-regex');

var _findWithRegex2 = _interopRequireDefault(_findWithRegex);

var _emojiRegex = require('./utils/emojiRegex');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (contentBlock, callback) {
  (0, _findWithRegex2.default)(_emojiRegex.re, contentBlock, callback);
};