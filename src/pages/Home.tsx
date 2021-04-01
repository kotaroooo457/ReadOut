import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "../config/Firebase";
import { AuthContext } from "../Auth/AuthService";
import moment from "moment";
import { PostText } from "../module.TS/Post.module";

import { Title } from "../ui/atoms/title";
import { HomeTimeFont, SubFont, Font } from "../ui/atoms/font";
import { Img, ImageTag } from "../ui/atoms/image";
import {
  SetUpButton,
  HomeSearchButton,
  UpdateButton,
} from "../ui/atoms/button";
import { Input } from "../ui/atoms/input";
import { TableSetUpHome } from "../ui/molecules/TableSetUp";
import { TableText } from "../ui/molecules/TableProfile";
import {
  TableHome,
  TableForm,
  TableList,
  TableItem,
  TableTexts,
} from "../ui/molecules/TableHome";
import { MainPage, MainTablePages } from "../ui/organisms/MainPages";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Room: React.FC = () => {
  const [postText, setPostText] = useState<PostText[]>([]);
  const [value, setValue] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);

  const FS = firebase.firestore().collection("text");

  const user = useContext(AuthContext);
  useEffect(() => {
    let isMounted = true;
    FS.orderBy("createAt", "desc").onSnapshot((snapshot) => {
      const posts: any = snapshot.docs.map((doc) => {
        return doc.data();
      });
      if (isMounted) {
        setPostText(posts);
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
            {postText.map((list, id) => (
              <TableHome key={id}>
                <ImageTag>
                  <Img src={list.image} />
                </ImageTag>
                <TableTexts>
                  <TableItem>
                    <Font>ユーザー：{list.user}</Font>
                    <Font>タイトル：{list.title}</Font>
                    <Font>ページ：{list.page}</Font>
                    <Font>感想：{list.text}</Font>
                  </TableItem>
                  <HomeTimeFont>
                    {moment(list.createAt).format("A HH:mm YYYY/MM/DD")}
                  </HomeTimeFont>
                </TableTexts>
              </TableHome>
            ))}
          </TableList>
          {user && (
            <TableSetUpHome>
              <Link
                to="/setup"
                style={{ textDecoration: "none", color: "#000" }}
              >
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
