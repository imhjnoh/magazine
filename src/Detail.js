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
import { auth } from "./shared/firebase";
import { useDispatch } from "react-redux";
import { deletePostThunk } from "./shared/postSlice";

const Detail = (props) => {
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

  const one_post = post[0][1]
  console.log(post);
  const image_url = one_post.imageUrl
    ? one_post.imageUrl
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/1479px-Noimage.svg.png";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", my: 5 }}>
      <Container sx={{display: "flex", flexDirection: "row" }}>
        <Container
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Avatar sx={{ bgcolor: "#222", mr: 2 }} aria-label="recipe">
            M
          </Avatar>
          <Typography>{one_post.uid}</Typography>
        </Container>
        
      </Container>
      <Container sx={{mb: 2}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: one_post.type == 2 ? "column" : "row",
          }}
        >
          {(!one_post.type || one_post.type == 0) && (
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
            <Typography variant="body1" color="text.secondary">
              {one_post.text}
            </Typography>
          </Container>
          {one_post.type == 2 && (
            <CardMedia
              component="img"
              // sx={{ width: '100%', flexGrow: 1 }}
              image={image_url}
              alt="Live from space album cover"
            />
          )}
          {one_post.type == 1 && (
            <CardMedia
              component="img"
              sx={{ width: "100%", maxWidth: "50%", flexGrow: 1 }}
              image={image_url}
              alt="Live from space album cover"
            />
          )}
        </Box>
      </Container>

      {auth.currentUser.email == one_post.uid && <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonGroup variant="contained">
            <Button>수정</Button>
            <Button onClick={deletePost}>삭제</Button>
          </ButtonGroup>
        </Container>}
    </Box>
  );
};

export default Detail;
