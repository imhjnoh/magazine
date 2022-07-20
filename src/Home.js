import {
  Toolbar,
  Box,
  Button,
  ButtonGroup,
  Container,
} from "@mui/material";
import { Header, Logo } from "./Styles";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useState } from "react";
import Spinner from "./Spinner";

const Home = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const posts = useSelector(state => state.post.posts)

    useEffect(() => {
        if(posts.length != 0){
            setLoading(false)
        }else{
            setLoading(true)
        }
        console.log(posts)
    }, [posts])

    return (
    <>
      

      <Box sx={{ bgcolor: "transparent" }}>
        {loading && <Spinner />}
        <Container maxWidth="md" sx={{ padding: "2em" }}>
            {posts && posts.map(post => <PostCard post={post}/>)}
        </Container>
      </Box>
    </>
  );
};

export default Home;
