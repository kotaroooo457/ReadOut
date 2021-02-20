import React, { useState } from "react";

import firebase from "../config/Firebase";

interface homeProps {
  list: {
    id: number;
    title: string;
    page: string;
    text: string;
    editing: boolean;
  };
  editChange: (id: number, editing: boolean) => void;
}

const Editing: React.FC<homeProps> = (props) => {
  const [title, setTitle] = useState<string>(props.list.title);
  const [text, setText] = useState<string>(props.list.text);
  const [page, setPage] = useState<string>(props.list.page);
  const FS = firebase.firestore().collection("text");

  // キャンセル = editing を true から false へ（Listへ切り替え）
  const editTextCancel = () => {
    props.editChange(props.list.id, !props.list.editing);
  };

  const editTextChange = () => {
    FS.doc(`${props.list.id}`).update({
      title: title,
      page: page,
      text: text,
    });
  };

  console.log("edit", props.list.id);
  return (
    <>
      <div>
        <p>読んだ本は？</p>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>何ページ読んだか？</p>
        <p>
          P:
          <input
            id="page"
            type="text"
            value={page}
            onChange={(e) => setPage(e.target.value)}
          />
        </p>
        <p>
          感想＆要約
          <input
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </p>
      </div>
      <button onClick={editTextCancel}>キャンセル</button>
      <button onClick={editTextChange}>更新</button>
    </>
  );
};

export default Editing;