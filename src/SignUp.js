import React, { useRef, useState, Suspense } from "react";
import { Box, Container, Typography, Button, TextField } from "@mui/material";
import { Logo } from "./Styles";
import { auth, db } from "./shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useDispatch } from "react-redux";
import { loadUserThunk } from "./shared/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const input_name = useRef();
  const input_email = useRef();
  const dispatch = useDispatch();
  const input_pw = useRef();
  const input_pw_confirm = useRef();
  const [loading, setLoading] = useState(false);
  const [signuppable, setSignuppable] = useState(false);
  const [errors, setErrors] = useState([false, false, false, false]);
  const emailRegExp =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  const checkVal = () => {
    let new_errors = [...errors];
    let res = true;
    if (!emailRegExp.test(input_email.current.value)) {
      res = false;
      new_errors[0] = true;
    } else {
      new_errors[0] = false;
    }
    if (input_name.current.value == "") {
      res = false;
      new_errors[1] = true;
    } else {
      new_errors[1] = false;
    }
    if (input_pw.current.value.length < 6) {
      res = false;
      new_errors[2] = true;
    } else {
      new_errors[2] = false;
    }
    if (input_pw.current.value != input_pw_confirm.current.value) {
      res = false;
      new_errors[3] = true;
    } else {
      new_errors[3] = false;
    }

    setErrors(new_errors);
    setSignuppable(res);
    return res;
  };

  const signup = async () => {
    console.log(checkVal);
    if (checkVal()) {
      const user = await createUserWithEmailAndPassword(
        auth,
        input_email.current.value,
        input_pw.current.value
      );
      const user_doc = await addDoc(collection(db, "users"), {
        user_id: user.user.email,
        name: input_name.current.value,
      });
      dispatch(loadUserThunk(auth.currentUser));
      alert("가입을 축하합니다!");
      navigate("/");
    } else {
      alert("입력값이 잘못되었습니다!");
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
            onChange={checkVal}
            error={errors[0]}
            helperText={errors[0] ? "이메일 형식이 잘못되었습니다."  : false}
          />
          <TextField
            inputRef={input_name}
            sx={{ my: 1 }}
            style={{ display: "block" }}
            label="이름"
            variant="outlined"
            placeholder="메가진"
            onChange={checkVal}
            error={errors[1]}
            helperText={errors[1] ? "이름을 입력해주세요."  : false}
          />
          <TextField
            inputRef={input_pw}
            sx={{ my: 1 }}
            style={{ display: "block" }}
            label="비밀번호"
            variant="outlined"
            placeholder="메가진"
            type="password"
            onChange={checkVal}
            error={errors[2]}
            helperText={errors[2] ? "최소 6자 이상 입력해주세요."  : false}
          />
          <TextField
            inputRef={input_pw_confirm}
            sx={{ my: 1 }}
            style={{ display: "block" }}
            label="비밀번호 확인"
            variant="outlined"
            placeholder="메가진"
            type="password"
            onChange={checkVal}
            error={errors[3]}
            helperText={errors[3] ? "비밀번호가 일치하지 않습니다."  : false}
          />
          <Button
            sx={{ my: 1 }}
            style={{ display: "block" }}
            onClick={signup}
            variant="contained"
            disabled={!signuppable}
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
