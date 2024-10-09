import React, { useState } from "react";

import { EmojiItem } from "../types/EmojiItem";
import EmojiList from "./EmojiList";

//React DatePicker from here: https://github.com/Hacker0x01/react-datepicker?tab=readme-ov-file
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { registerLocale } from "react-datepicker";
import { de } from "date-fns/locale/de";
registerLocale("de", de);

const emojis = [
  {
    id: 128516,
    description: "rad",
  },
  {
    id: 128522,
    description: "good",
  },
  {
    id: 128528,
    description: "meh",
  },
  {
    id: 128530,
    description: "bad",
  },
  {
    id: 128541,
    description: "auful",
  },
];

const EmojiSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [emojiItems, setEmojiItems] = useState<EmojiItem[]>([]);

  const resetDate = (): void => {
    setStartDate(new Date());
  };

  const addItem = (event: React.MouseEvent<HTMLElement>): void => {
    const newItem: EmojiItem = {
      id: Date.now(),
      date: startDate,
      emoji: Number(((event.target as Element).parentElement as Element).id),
    };
    setEmojiItems((items) => [...items, newItem]);
  };

  const emojiPreviews = emojis.map((emoji) => (
    <li key={"emoji" + emoji.id} id={emoji.id.toString()} onClick={addItem}>
      <span className="emoji-icon">{String.fromCodePoint(emoji.id)}</span>
      <span className="emoji-description">{emoji.description}</span>
    </li>
  ));
  return (
    <>
      <DatePicker
        locale="de"
        showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date || new Date())}
        todayButton="Today"
        showTimeSelect
        dateFormat="Pp"
        timeIntervals={15}
      />
      <button className="reset-button" onClick={resetDate}>
        Now
      </button>
      <ul className="emoji-list">{emojiPreviews}</ul>
      <div>
        <EmojiList initialItems={emojiItems} />
      </div>
    </>
  );
};

export default EmojiSelector;
