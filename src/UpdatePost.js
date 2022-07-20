import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
  CardMedia
} from "@mui/material";
import { auth, storage } from "./shared/firebase";
import { updatePostThunk } from "./shared/postSlice";

const UpdatePost = () => {
  const dispatch = useDispatch();
  const input_text = useRef("");
  const navigate = useNavigate()
  const params = useParams()
  const fileUrl = useRef(null)
  const post = useSelector(state => state.post.posts.filter(x => x[0] == params.pid))
  const postdata = post[0][1]
  const [posttype, setPosttype] = React.useState(postdata.type);
  const [imageUrl, setImageUrl] = React.useState(postdata.imageUrl)



  console.log(postdata);

  const update = () => {
    const one_post = {
      text: input_text.current.value,
      uid: auth.currentUser.email,
      imageUrl: imageUrl,
      type: posttype
    };
    dispatch(updatePostThunk({id: params.pid, data: one_post })).then(() =>
        {alert("수정 성공")
        navigate("/")}
    );
  };


  const handleChange = (event) => {
    setPosttype(event.target.value);
  };

  const uploadFB = async (e) => {
    const uploaded_file = await uploadBytes(ref(storage, `images/${auth.currentUser.uid + e.target.files[0].name}`),
    e.target.files[0])
    const file_url = await getDownloadURL(uploaded_file.ref)
    setImageUrl(file_url)
    console.log(file_url);
    fileUrl.current = {url: file_url}
  }

  return (
      <Container sx={{my: 5}} >
      <Typography variant="h6">글 수정하기</Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">글 형식</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={posttype}
          label="글 형식"
          onChange={handleChange}
        >
          <MenuItem value={0}>사진이 왼쪽</MenuItem>
          <MenuItem value={1}>사진이 오른쪽</MenuItem>
          <MenuItem value={2}>사진이 아래로 하나</MenuItem>
        </Select>
      </FormControl>
      <Container sx={{mb: 2}} disableGutters>
        <Box
          sx={{
            display: "flex",
            flexDirection: posttype == 2 ? "column" : "row",
          }}
        >
          {posttype == 0 && imageUrl && (
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
              image={imageUrl}
              alt="Live from space album cover"
            />
          )}
          <Container sx={{ flexGrow: 1, width: "100%"}} disableGutters>
                <TextField
              inputRef={input_text}
              label="글 내용 입력"
              multiline
              rows={16}
              sx={{ width: "100%", height: "100%"}}
              defaultValue={postdata.text}
            />
          </Container>
          {posttype == 2 && imageUrl  && (
            <CardMedia
              component="img"
              // sx={{ width: '100%', flexGrow: 1 }}
              image={imageUrl}
              alt="Live from space album cover"
            />
          )}
          {posttype == 1 && imageUrl  && (
            <CardMedia
              component="img"
              sx={{width: "100%",
              maxHeight: "25em",
              maxWidth: "50%",
              minWidth: "50%",
              flexGrow: 1,}}
              image={imageUrl}
              alt="Live from space album cover"
            />
          )}
        </Box>
      </Container>
      <div style={{display: "flex", justifyContent: "space-between"}}>
      <input type="file" onChange={uploadFB}/>
      <Button variant="contained" onClick={update}>수정하기</Button>
      </div>
      </Container>
  );
};

export default UpdatePost;
