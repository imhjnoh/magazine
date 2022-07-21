import { Avatar, Box, Button, ButtonGroup, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Detail from "./Detail";
import Home from "./Home";
import NewPost from "./NewPost";
import { auth } from "./shared/firebase";
import { loadPostThunk } from "./shared/postSlice";
import { loadUserThunk } from "./shared/userSlice";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Header, Logo, MoominIcon, theme } from "./Styles";
import UpdatePost from "./UpdatePost";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const userSelect = useSelector(state => state.user.user)
  const user = React.useMemo(() => userSelect ? userSelect[0] : null, [userSelect])
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
    navigate("/newpost")
  }
  console.log(user);
  useEffect(() => {
    console.log(location.pathname);
    console.log(onAuthStateChanged(auth, loginCheck));
    dispatch(loadUserThunk(auth.currentUser));
  }, []);
  useEffect(() => {
    dispatch(loadPostThunk());
    console.log(user);
  }, [])
  useEffect(() => {
    dispatch(loadUserThunk(auth.currentUser));
  },[])
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
              {isLogin && <Avatar src={ user?.profileSrc ?  user?.profileSrc: MoominIcon}></Avatar>}
              {isLogin && <Typography sx={{mx: 2}}>{user?.name}님, 환영합니다!</Typography>}


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
          <Route path="/update/:pid" element={<UpdatePost />}/>
        </Routes>
        {/* </Suspense> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
