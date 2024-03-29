import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../config/Firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../stores/userSlice";
import moment from "moment";
import { Text } from "@Modules";

import Comments from "@Components/Comments";

import { Title } from "@Atoms/title";
import { HomeTimeFont, SubFont, Font } from "@Atoms/font";
import { Img, ImageTag } from "@Atoms/image";
import {
  SetUpButton,
  HomeSearchButton,
  UpdateButton,
} from "@Atoms/button";
import { Input } from "@Atoms/input";
import { TableSetUpHome } from "@Molecules/TableSetUp";
import { TableText } from "@Molecules/TableProfile";
import {
  TableHome,
  TableForm,
  TableList,
  TableItem,
  TableTexts,
} from "@Molecules/TableHome";
import { MainPage, MainTablePages } from "@Organisms/MainPages";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Room: React.FC = () => {
  const [postText, setPostText] = useState<Text[]>([]);
  const [value, setValue] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);
  const [toggleMessage, setToggleMessage] = useState<string>("");

  const FS = firebase.firestore().collection("text");

  const user = useSelector(selectUser);
  useEffect(() => {
    setToggleMessage("...loading");
    let isMounted = true;
    FS.orderBy("createAt", "desc").onSnapshot((snapshot) => {
      const posts: any = snapshot.docs.map((doc) => {
        return doc.data();
      });
      if (isMounted) {
        setPostText(posts);
        setToggleMessage("");
      }
    });
    return (): void => {
      isMounted = false;
    };
  }, []);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === "") return;
    setPostText(
      postText.filter((list) => list.title === value || list.user === value)
    );
    setIsDone(!isDone);
    setValue("");
  };

  const handleRender = (e: React.FormEvent) => {
    e.preventDefault();
    FS.orderBy("createAt", "desc").onSnapshot((snapshot) => {
      const posts: any = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setPostText(posts);
      setIsDone(!isDone);
    });
  };

  return (
    <>
      <MainPage>
        <MainTablePages>
          <Title>Home</Title>
          <TableText>
            {isDone ? (
              <UpdateButton onClick={handleRender}>再表示</UpdateButton>
            ) : (
              <TableForm onSubmit={handleFilter}>
                <SubFont>検索</SubFont>
                <Input
                  type="text"
                  placeholder="タイトル or ユーザー名"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <HomeSearchButton>
                  <FontAwesomeIcon icon={faSearch} />
                </HomeSearchButton>
              </TableForm>
            )}
          </TableText>
          <TableList>
            <Font>{toggleMessage}</Font>
            {postText.map((list, id) => (
              <TableHome key={id}>
                <ImageTag>
                  <Img src={list.image} />
                </ImageTag>
                <TableTexts>
                  <TableItem>
                    <Font>ユーザー：{list.user}</Font>
                    <Font>タイトル：{list.title}</Font>
                    <Font>読んだページ数：{list.page}</Font>
                    <Font>感想：{list.text}</Font>
                  </TableItem>
                  <HomeTimeFont>
                    {moment(list.createAt).format("A HH:mm YYYY/MM/DD")}
                  </HomeTimeFont>
                  <Comments list={list} />
                </TableTexts>
              </TableHome>
            ))}
          </TableList>
          {user.uid && (
            <TableSetUpHome>
              <Link to="/setup" >
                <SetUpButton>投稿</SetUpButton>
              </Link>
            </TableSetUpHome>
          )}
        </MainTablePages>
      </MainPage>
    </>
  );
};

export default Room;
