import React from 'react';
import clsx from 'clsx';
import { getEmojiDataFromNative } from 'emoji-mart';

import NimbleEmoji from 'emoji-mart/dist-es/components/emoji/nimble-emoji';
import data from 'emoji-mart/data/emojione.json';

const EmojiComponent = ({
  theme = {},
  className,
  decoratedText,
  emojiSet,
  useNativeArt,
  ...props
}) => {
  const emojiData = getEmojiDataFromNative(decoratedText, emojiSet, data);

  let emojiDisplay = null;
  if (useNativeArt === true || !emojiData) {
    emojiDisplay = (
      <span title={emojiData ? emojiData.name : decoratedText}>
        {props.children}
      </span>
    );
  } else {
    const combinedClassName = clsx(theme.emoji, className);

    emojiDisplay = (
      <NimbleEmoji
        data={data}
        className={combinedClassName}
        set={emojiSet}
        skin={emojiData.skin || 1}
        emoji={emojiData}
        size={15}
        tooltip
      >
        {props.children}
      </NimbleEmoji>
    );
  }

  return emojiDisplay;
};

export default EmojiComponent;
