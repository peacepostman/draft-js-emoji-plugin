'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _draftJs = require('draft-js');

var _nimblePicker = require('emoji-mart/dist-es/components/picker/nimble-picker');

var _nimblePicker2 = _interopRequireDefault(_nimblePicker);

var _emojione = require('emoji-mart/data/emojione.json');

var _emojione2 = _interopRequireDefault(_emojione);

var _Emoji = require('./components/Emoji');

var _Emoji2 = _interopRequireDefault(_Emoji);

var _EmojiSelect = require('./components/EmojiSelect');

var _EmojiSelect2 = _interopRequireDefault(_EmojiSelect);

var _EmojiSuggestions = require('./components/EmojiSuggestions');

var _EmojiSuggestions2 = _interopRequireDefault(_EmojiSuggestions);

var _EmojiSuggestionsPortal = require('./components/EmojiSuggestionsPortal');

var _EmojiSuggestionsPortal2 = _interopRequireDefault(_EmojiSuggestionsPortal);

var _emojiStrategy = require('./emojiStrategy');

var _emojiStrategy2 = _interopRequireDefault(_emojiStrategy);

var _emojiSuggestionsStrategy = require('./emojiSuggestionsStrategy');

var _emojiSuggestionsStrategy2 = _interopRequireDefault(_emojiSuggestionsStrategy);

var _emojiStyles = {
  "emoji": "draftJsEmojiPlugin__emoji__2oqBk"
};

var _emojiStyles2 = _interopRequireDefault(_emojiStyles);

var _emojiSuggestionsStyles = {
  "emojiSuggestions": "draftJsEmojiPlugin__emojiSuggestions__2ffcV"
};

var _emojiSuggestionsStyles2 = _interopRequireDefault(_emojiSuggestionsStyles);

var _emojiSuggestionsEntryStyles = {
  "emojiSuggestionsEntry": "draftJsEmojiPlugin__emojiSuggestionsEntry__2-2p_",
  "emojiSuggestionsEntryFocused": "draftJsEmojiPlugin__emojiSuggestionsEntryFocused__XDntY draftJsEmojiPlugin__emojiSuggestionsEntry__2-2p_",
  "emojiSuggestionsEntryText": "draftJsEmojiPlugin__emojiSuggestionsEntryText__2sPjk",
  "emojiSuggestionsEntryIcon": "draftJsEmojiPlugin__emojiSuggestionsEntryIcon__1qC2V"
};

var _emojiSuggestionsEntryStyles2 = _interopRequireDefault(_emojiSuggestionsEntryStyles);

var _attachImmutableEntitiesToEmojis = require('./modifiers/attachImmutableEntitiesToEmojis');

var _attachImmutableEntitiesToEmojis2 = _interopRequireDefault(_attachImmutableEntitiesToEmojis);

var _positionSuggestions = require('./utils/positionSuggestions');

var _positionSuggestions2 = _interopRequireDefault(_positionSuggestions);

var _addEmoji = require('./modifiers/addEmoji');

var _addEmoji2 = _interopRequireDefault(_addEmoji);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO activate/deactivate different the conversion or search part

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var defaultTheme = {
    emoji: _emojiStyles2.default.emoji,

    emojiSuggestions: _emojiSuggestionsStyles2.default.emojiSuggestions,

    emojiSuggestionsEntry: _emojiSuggestionsEntryStyles2.default.emojiSuggestionsEntry,
    emojiSuggestionsEntryFocused: _emojiSuggestionsEntryStyles2.default.emojiSuggestionsEntryFocused,
    emojiSuggestionsEntryText: _emojiSuggestionsEntryStyles2.default.emojiSuggestionsEntryText,
    emojiSuggestionsEntryIcon: _emojiSuggestionsEntryStyles2.default.emojiSuggestionsEntryIcon
  };

  var callbacks = {
    keyBindingFn: undefined,
    handleKeyCommand: undefined,
    handleReturn: undefined,
    onChange: undefined
  };

  var ariaProps = {
    ariaHasPopup: 'false',
    ariaExpanded: false,
    ariaOwneeID: undefined,
    ariaActiveDescendantID: undefined
  };

  var searches = (0, _immutable.Map)();
  var escapedSearch = void 0;
  var clientRectFunctions = (0, _immutable.Map)();
  var isOpened = void 0;

  var store = {
    getEditorState: undefined,
    setEditorState: undefined,
    getPortalClientRect: function getPortalClientRect(offsetKey) {
      return clientRectFunctions.get(offsetKey)();
    },
    getAllSearches: function getAllSearches() {
      return searches;
    },
    isEscaped: function isEscaped(offsetKey) {
      return escapedSearch === offsetKey;
    },
    escapeSearch: function escapeSearch(offsetKey) {
      escapedSearch = offsetKey;
    },

    resetEscapedSearch: function resetEscapedSearch() {
      escapedSearch = undefined;
    },

    register: function register(offsetKey) {
      searches = searches.set(offsetKey, offsetKey);
    },

    updatePortalClientRect: function updatePortalClientRect(offsetKey, func) {
      clientRectFunctions = clientRectFunctions.set(offsetKey, func);
    },

    unregister: function unregister(offsetKey) {
      searches = searches.delete(offsetKey);
      clientRectFunctions = clientRectFunctions.delete(offsetKey);
    },

    getIsOpened: function getIsOpened() {
      return isOpened;
    },
    setIsOpened: function setIsOpened(nextIsOpened) {
      isOpened = nextIsOpened;
    }
  };

  // Styles are overwritten instead of merged as merging causes a lot of confusion.
  //
  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.
  var _config$theme = config.theme,
      theme = _config$theme === undefined ? defaultTheme : _config$theme,
      _config$positionSugge = config.positionSuggestions,
      positionSuggestions = _config$positionSugge === undefined ? _positionSuggestions2.default : _config$positionSugge,
      useNativeArt = config.useNativeArt,
      selectGroups = config.selectGroups,
      selectButtonContent = config.selectButtonContent,
      _config$emojiSet = config.emojiSet,
      emojiSet = _config$emojiSet === undefined ? 'emojione' : _config$emojiSet,
      i18n = config.i18n;


  var pickerProps = {
    onClick: function onClick(emoji) {
      var newEditorState = (0, _addEmoji2.default)(store.getEditorState(), emoji.native);
      store.setEditorState(newEditorState);
    },

    set: emojiSet,
    showPreview: false,
    perLine: 11,
    i18n: i18n
  };
  var suggestionsProps = {
    ariaProps: ariaProps,
    callbacks: callbacks,
    theme: theme,
    store: store,
    positionSuggestions: positionSuggestions,
    useNativeArt: useNativeArt,
    emojiSet: emojiSet
  };

  var selectProps = {
    theme: theme,
    store: store,
    selectGroups: selectGroups,
    selectButtonContent: selectButtonContent,
    useNativeArt: useNativeArt
  };

  var emojiProps = {
    theme: theme,
    useNativeArt: useNativeArt,
    selectGroups: selectGroups,
    selectButtonContent: selectButtonContent,
    emojiSet: emojiSet
  };
  var DecoratedEmojiSuggestions = function DecoratedEmojiSuggestions(props) {
    return _react2.default.createElement(_EmojiSuggestions2.default, _extends({}, props, suggestionsProps));
  };
  var DecoratedEmojiSelect = function DecoratedEmojiSelect(props) {
    return _react2.default.createElement(
      _EmojiSelect2.default,
      _extends({}, props, selectProps),
      _react2.default.createElement(_nimblePicker2.default, _extends({ data: _emojione2.default }, pickerProps))
    );
  };
  var DecoratedEmoji = function DecoratedEmoji(props) {
    return _react2.default.createElement(_Emoji2.default, _extends({}, props, emojiProps));
  };
  var DecoratedEmojiSuggestionsPortal = function DecoratedEmojiSuggestionsPortal(props) {
    return _react2.default.createElement(_EmojiSuggestionsPortal2.default, _extends({}, props, { store: store }));
  };
  return {
    EmojiSuggestions: DecoratedEmojiSuggestions,
    EmojiSelect: DecoratedEmojiSelect,
    decorators: [{
      strategy: _emojiStrategy2.default,
      component: DecoratedEmoji
    }, {
      strategy: _emojiSuggestionsStrategy2.default,
      component: DecoratedEmojiSuggestionsPortal
    }],
    getAccessibilityProps: function getAccessibilityProps() {
      return {
        role: 'combobox',
        ariaAutoComplete: 'list',
        ariaHasPopup: ariaProps.ariaHasPopup,
        ariaExpanded: ariaProps.ariaExpanded,
        ariaActiveDescendantID: ariaProps.ariaActiveDescendantID,
        ariaOwneeID: ariaProps.ariaOwneeID
      };
    },

    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;

      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },

    keyBindingFn: function keyBindingFn(keyboardEvent) {
      return callbacks.keyBindingFn && callbacks.keyBindingFn(keyboardEvent);
    },
    handleReturn: function handleReturn(keyboardEvent) {
      return callbacks.handleReturn && callbacks.handleReturn(keyboardEvent);
    },
    onChange: function onChange(editorState) {
      var currentSelectionState = editorState.getSelection();
      var newEditorState = (0, _attachImmutableEntitiesToEmojis2.default)(editorState);

      if (!newEditorState.getCurrentContent().equals(editorState.getCurrentContent())) {
        // Forcing the current selection ensures that it will be at it's right place.
        // This solves the issue where inserting an Emoji on OSX with Apple's Emoji
        // selector led to the right selection the data, but wrong position in
        // the contenteditable.
        newEditorState = _draftJs.EditorState.forceSelection(newEditorState, currentSelectionState);
      }

      if (callbacks.onChange) return callbacks.onChange(newEditorState);
      return newEditorState;
    }
  };
};