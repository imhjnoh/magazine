import React, { useRef, useState, Suspense } from "react";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { Logo } from "./Styles";
import { auth, db } from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import {useDispatch} from "react-redux"
import { loginThunk } from "./shared/slice";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const input_email = useRef();
  const input_pw = useRef();
  const dispatch = useDispatch()

  const signin = async () => {
    // dispatch(loginThunk(input_email.current.value, input_pw.current.value))
    setLoading(true)
    const user = await signInWithEmailAndPassword(auth, input_email.current.value, input_pw.current.value)
    // console.log(user);
    // const user_docs = await getDocs(query(
    //     collection(db, "users"), where("user_id","==",user.user.email)
    // ))
    // console.log(user_docs);
    alert("로그인 성공!")
    setLoading(false)
    navigate("/")
  }

  return (
    <>
      <Box
        style={{
        //   backgroundColor: "aliceblue",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Logo />
          <Typography variant="h5" sx={{ my: 1 }}>
            로그인
          </Typography>
          <TextField
            inputRef={input_email}
            sx={{ my: 1 }}
            style={{ display: "block" }}
            label="아이디(이메일)"
            variant="outlined"
            placeholder="example@email.com"
          />
          <TextField
            inputRef={input_pw}
            sx={{ my: 1 }}
            style={{ display: "block" }}
            label="비밀번호"
            variant="outlined"
            placeholder="메가진"
            type="password"
          />
          <Button
            sx={{ my: 1 }}
            style={{ display: "block" }}
            onClick={signin}
            variant="contained"
          >
            로그인!!
          </Button>
        </Box>
      </Box>
      {loading && <Spinner />}
    </>
  );
};

export default SignIn;
