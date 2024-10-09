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
    selected: false,
  },
  {
    id: 128522,
    description: "good",
    selected: false,
  },
  {
    id: 128528,
    description: "meh",
    selected: false,
  },
  {
    id: 128530,
    description: "bad",
    selected: false,
  },
  {
    id: 128541,
    description: "auful",
    selected: false,
  },
];

const EmojiSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [emojiItems, setEmojiItems] = useState<EmojiItem[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);

  const resetDate = (): void => {
    setStartDate(new Date());
  };

  const selectEmoji = (event: React.MouseEvent<HTMLElement>): void => {
    let selectedId = Number(
      ((event.target as Element).parentElement as Element).id
    );
    emojis.forEach((item) => {
      let isSelected = !item.selected;
      if (item.id === selectedId) {
        item.selected = isSelected;
        setDisabled(!isSelected);
      } else {
        item.selected = false;
      }
    });
    setEmojiItems((items) => [...items]);
  };

  const addItem = (): void => {
    let selectedItem = emojis.find((item) => item.selected !== false);
    if (!selectedItem) {
      setDisabled(true);
      return;
    }
    const newItem: EmojiItem = {
      id: Date.now(),
      date: startDate,
      emoji: selectedItem.id,
    };
    setEmojiItems((items) => [...items, newItem]);
  };

  const emojiPreviews = emojis.map((emoji) => (
    <li
      key={"emoji" + emoji.id}
      id={emoji.id.toString()}
      className={"emoji-container " + (emoji.selected ? "selected" : "")}
      onClick={selectEmoji}
    >
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
        timeFormat="HH:mm"
        timeIntervals={15}
      />
      <button className="reset-button" onClick={resetDate}>
        Now
      </button>
      <ul className="emoji-list">{emojiPreviews}</ul>
      <button className="add-button" disabled={disabled} onClick={addItem}>
        Submit
      </button>
      <div>
        <EmojiList initialItems={emojiItems} />
      </div>
    </>
  );
};

export default EmojiSelector;
