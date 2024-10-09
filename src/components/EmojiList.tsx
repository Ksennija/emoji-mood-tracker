import React, { useState, ChangeEvent } from "react";
import { EmojiItem } from "../types/EmojiItem";

type emojiListProps = {
  initialItems: EmojiItem[];
};

const EmojiList: React.FC<emojiListProps> = ({ initialItems }) => {
  let currentDate = new Date();
  return (
    <>
      <ul className="mood-list">
        {initialItems.map((item) => (
          <li key={item.id}>
            <span>
              {item.date.toDateString() === currentDate.toDateString()
                ? "Today, "
                : ""}
            </span>
            <span>{item.date.toDateString()}</span>
            <span>
              {item.date.toLocaleTimeString("de", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span>{String.fromCodePoint(item.emoji)}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EmojiList;
