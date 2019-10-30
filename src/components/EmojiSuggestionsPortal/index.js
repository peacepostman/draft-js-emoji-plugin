import React, { Component } from 'react';

export default class EmojiSuggestionsPortal extends Component {
  constructor(props) {
    super(props);
    this.searchPortalRef = element => {
      this.searchPortal = element;
    };
  }

  componentDidMount() {
    this.props.store.register(this.props.offsetKey);
    this.props.store.setIsOpened(true);
    this.updatePortalClientRect(this.props);

    // trigger a re-render so the EmojiSuggestions becomes active
    this.props.setEditorState(this.props.getEditorState());
  }

  componentDidUpdate(nextProps) {
    this.updatePortalClientRect(nextProps);
  }

  componentWillUnmount() {
    this.props.store.unregister(this.props.offsetKey);
    this.props.store.setIsOpened(false);
  }

  updatePortalClientRect(props) {
    this.props.store.updatePortalClientRect(props.offsetKey, () =>
      this.searchPortal.getBoundingClientRect()
    );
  }

  render() {
    return (
      <span className={this.key} ref={this.searchPortalRef}>
        {this.props.children}
      </span>
    );
  }
}
