import React, { useRef, useState, Suspense } from "react";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { Logo } from "./Styles";
import { auth, db } from "./shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const SignUp = () => {
  const navigate = useNavigate();
  const input_name = useRef();
  const input_email = useRef();
  const input_pw = useRef();
  const [loading, setLoading] = useState(false);
  const emailRegExp =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

const checkVal = () => {
    let res = true
    if (!emailRegExp.test(input_email.current.value)) res = false
    if (input_name.current.value == "") res = false
    if (input_pw.current.value.length < 6) res = false
    return res
}

  const signup = async () => {
    console.log(checkVal);
    if(checkVal()){
    const user = await createUserWithEmailAndPassword(
      auth,
      input_email.current.value,
      input_pw.current.value
    );
    const user_doc = await addDoc(collection(db, "users"), {
      user_id: user.user.email,
      name: input_name.current.value,
    });
    alert("가입을 축하합니다!");
    navigate("/");

}else{
    alert("입력값이 잘못되었습니다!")
}
    
  };

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
            회원가입
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
            inputRef={input_name}
            sx={{ my: 1 }}
            style={{ display: "block" }}
            label="이름"
            variant="outlined"
            placeholder="메가진"
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
          <TextField
            sx={{ my: 1 }}
            style={{ display: "block" }}
            label="비밀번호 확인"
            variant="outlined"
            placeholder="메가진"
            type="password"
          />
          <Button
            sx={{ my: 1 }}
            style={{ display: "block" }}
            onClick={signup}
            variant="contained"
          >
            가입!!
          </Button>
        </Box>
      </Box>
      {/* {loading && <Spinner />} */}
    </>
  );
};

export default SignUp;
