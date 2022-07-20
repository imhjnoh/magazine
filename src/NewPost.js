import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  Button
} from "@mui/material";
import { auth, storage } from "./shared/firebase";
import { addPostThunk } from "./shared/postSlice";

const NewPost = () => {
  const dispatch = useDispatch();
  const input_text = useRef("");
  const navigate = useNavigate()
  const fileUrl = useRef(null)
  const [posttype, setPosttype] = React.useState(0);

  console.log(auth.currentUser);

  const post = () => {
    const post = {
      text: input_text.current.value,
      uid: auth.currentUser.email,
      likes: 0,
      createdAt: Timestamp.now(),
      imageUrl: fileUrl.current.url,
      type: posttype
    };
    dispatch(addPostThunk({ ...post })).then(() =>
        {alert("포스팅 성공")
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
    console.log(file_url);
    fileUrl.current = {url: file_url}
  }

  return (
    <Box>
      <Typography variant="h6">새로운 글 작성하기</Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
      <TextField
        inputRef={input_text}
        label="글 내용 입력"
        multiline
        sx={{ width: "100%" }}
      />
      <input type="file" onChange={uploadFB}/>
      <Button variant="contained" onClick={post}>포스팅!!</Button>
    </Box>
  );
};

export default NewPost;
