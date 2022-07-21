import React from "react";
import {
  Container,
  Box,
  Typography,
  Avatar,
  CardMedia,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth, db } from "./shared/firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { deletePostThunk } from "./shared/postSlice";
import { MoominIcon } from "./Styles";
import moment from "moment";
import "moment/locale/ko";

const Detail = (props) => {
    
  const [usrName, setUsrName] = React.useState("")
  const params = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.post.posts.filter((x) => x[0] == params.pid)
  );

  const deletePost = () => {
    if(window.confirm("정말로 지우시겠습니까?")){
        dispatch(deletePostThunk(params.pid))
        alert("삭제되었습니다.")
        navigate("/")
    }
  }

  const one_post = post[0] ? post[0][1] : null
  console.log(post);
  const image_url = one_post?.imageUrl
    ? one_post?.imageUrl
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/1479px-Noimage.svg.png";


    const time = one_post?.createdAt;
  moment.locale("ko");
//   const formattedTime = moment(time).locale("ko-kr").format("lll");
const formattedTime = time

React.useEffect(() => {
    async function fetchData() {
    const user_docs = await getDocs(query(
      collection(db, "users"), where("user_id","==",one_post?.uid)
      ))
      const userdata = []
      user_docs.forEach(x => userdata.push(x.data()))
      setUsrName(userdata[0]?.name)
    }
    fetchData()
  }, [one_post])


  return (
    <Box sx={{ display: "flex", flexDirection: "column", my: 5 }}>
      <Container sx={{display: "flex", flexDirection: "row" }}>
        <Container
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Avatar sx={{ bgcolor: "#222", mr: 2 }} aria-label="recipe" src={MoominIcon}>
            M
          </Avatar>
          <div>
          <Typography><strong>{usrName}</strong> {one_post?.uid}</Typography>
          <Typography variant="body2" color="#777">{formattedTime}</Typography>
          </div>
        </Container>
        
      </Container>
      <Container sx={{my: 5}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: one_post?.type == 2 ? "column" : "row",
          }}
        >
          {(!one_post?.type || one_post?.type == 0) && (
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                maxHeight: "25em",
                maxWidth: "50%",
                minWidth: "50%",
                flexGrow: 1,
              }}
              // image="https://images.unsplash.com/photo-1630175860333-5131bda75071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              image={image_url}
              alt="Live from space album cover"
            />
          )}
          <Container sx={{ flexGrow: 1, width: "100%", my: 5 }}>
            <Typography variant="body1" color="text.secondary" sx={{whiteSpace: "pre"}}>
              {one_post?.text}
            </Typography>
          </Container>
          {one_post?.type == 2 && (
            <CardMedia
              component="img"
              // sx={{ width: '100%', flexGrow: 1 }}
              image={image_url}
              alt="Live from space album cover"
            />
          )}
          {one_post?.type == 1 && (
            <CardMedia
              component="img"
              sx={{ width: "100%", maxWidth: "50%", flexGrow: 1 }}
              image={image_url}
              alt="Live from space album cover"
            />
          )}
        </Box>
      </Container>

      {auth.currentUser?.email == one_post?.uid && <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonGroup variant="contained">
            <Button onClick={() => navigate("/update/"+params.pid)}>수정</Button>
            <Button onClick={deletePost}>삭제</Button>
          </ButtonGroup>
        </Container>}
    </Box>
  );
};

export default Detail;
