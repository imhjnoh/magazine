import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Toolbar, Box, ButtonGroup, Button } from "@mui/material";
import { theme, Header, Logo } from "./Styles";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { auth } from "./shared/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import {useDispatch} from "react-redux"
import {addPostThunk, loadPostThunk} from "./shared/postSlice"
import NewPost from "./NewPost";
import { Suspense } from "react";
import Spinner from "./Spinner";
import Detail from "./Detail";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };
  const logout = () => {
    console.log("멩");
    signOut(auth).then(() => {
      setIsLogin(false);
    });
  };
  const addpost = () => {
    // const post = {"text": "우앵", "uid": auth.currentUser.email, "likes": 0}
    // dispatch(addPostThunk({...post}))
    navigate("/newpost")
  }
  console.log(auth.currentUser);
  useEffect(() => {
    console.log(location.pathname);
    onAuthStateChanged(auth, loginCheck);
  }, []);
  useEffect(() => {
    dispatch(loadPostThunk())
  }, [])
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <Spinner /> */}
        {/* <Suspense fallback={<Spinner />}> */}
        {!(
          location.pathname.startsWith("/sign_in") ||
          location.pathname.startsWith("/sign_up")
        ) && (
          <Header position="static">
            <Toolbar>
              <Logo onClick={() => navigate("/")}/>

              <Box sx={{ flexGrow: 1 }} />
              {true && (
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  {!isLogin && (
                    <Button onClick={() => navigate("/sign_up")}>
                      회원가입
                    </Button>
                  )}
                  {!isLogin && (
                    <Button onClick={() => navigate("/sign_in")}>로그인</Button>
                  )}
                  {isLogin && <Button onClick={logout}>로그아웃</Button>}
                  {isLogin && <Button onClick={addpost}>글쓰기</Button>}
                </ButtonGroup>
              )}
            </Toolbar>
          </Header>
        )}

        <Routes>
          <Route path="/" element={<Home logout={logout} />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/newpost" element={<NewPost />}/>
          <Route path="/detail/:pid" element={<Detail />}/>
        </Routes>
        {/* </Suspense> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
