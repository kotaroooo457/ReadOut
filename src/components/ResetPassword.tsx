import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

import { Button } from "../ui/atoms/button";
import { LoginFont } from "../ui/atoms/font";
import { LoginInput } from "../ui/atoms/input";
import { TableReset, SubTableReset } from "../ui/molecules/TableReset";
import { MainLogin } from "../ui/organisms/MainPages";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("メールが送信されました");
      });
    setEmail("");
  };
  return (
    <>
      <MainLogin>
        <TableReset>
          <SubTableReset>
            <LoginFont>メールアドレスを入力してください</LoginFont>
            <form onSubmit={handleResetPassword}>
              <LoginInput
                type="text"
                name="E-mail"
                placeholder="メールアドレスを入力"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <Button>送信</Button>
            </form>
            <br />
            <span>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: " #fbfad3" }}
              >
                Login
              </Link>
              ページへ
            </span>
          </SubTableReset>
        </TableReset>
      </MainLogin>
    </>
  );
};

export default ResetPassword;
