import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment, { format } from "moment";
import "moment/locale/ko";
import { useNavigate } from "react-router-dom";
import { MoominIcon } from "./Styles";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "./shared/firebase";

const PostCard = (props) => {
  const navigate = useNavigate()
  const image_url = 
    props.post.imageUrl
      ? props.post.imageUrl
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/1479px-Noimage.svg.png"
  const [usrName, setUsrName] = React.useState("")

  useEffect(() => {
    async function fetchData() {
    const user_docs = await getDocs(query(
      collection(db, "users"), where("user_id","==",props.post.uid)
      ))
      const userdata = []
      user_docs.forEach(x => userdata.push(x.data()))
      setUsrName(userdata[0]?.name)
    }
    fetchData()
  }, [])

  return (
    <Card sx={{ marginBottom: "3em" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={MoominIcon}>
            R
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={`${usrName} ` + props.post.uid}
        subheader={props.post.createdAt}
        sx={{ borderBottom: "1px solid #eee" }}
      />
      <Box sx={{ display: "flex", flexDirection: props.post.type == 2 ? "column" : "row", mb: 3 }} onClick={() => navigate("/detail/" + props.pid)}>
      {(!props.post.type || props.post.type == 0) && <CardMedia
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
        />}
        <CardContent sx={{ flexGrow: 1, width: "100%" }}>
          <Typography variant="body2" color="text.secondary" sx={{whiteSpace: "pre"}}>
            {props.post.text}
          </Typography>
          
        </CardContent>
        {props.post.type == 2 && <CardMedia
        component="img"
        sx={{ width: '100%', maxHeight: '25em', maxWidth: "100%", minWidth: "100%", flexGrow: 1 }}
        image={image_url}
        alt="Live from space album cover"
      />}
        {props.post.type == 1 && <CardMedia
        component="img"
        sx={{ width: '100%', maxHeight: '25em', maxWidth: "50%", minWidth: "50%", flexGrow: 1 }}
        image={image_url}
        alt="Live from space album cover"
      />}
      
      </Box>
      {/* <CardActions disableSpacing sx={{ borderTop: "1px solid #eee" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />{props.post.likes}
        </IconButton>
      </CardActions> */}
    </Card>
  );
};

export default PostCard;
