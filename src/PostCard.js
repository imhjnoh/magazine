import React from "react";
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

const PostCard = (props) => {
  const time = props.post.createdAt.toDate();
  moment.locale("ko");
  const formattedTime = moment(time).locale("ko-kr").format("lll");
  const image_url = 
    props.post.imageUrl
      ? props.post.imageUrl
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/1479px-Noimage.svg.png"
  
  console.log(formattedTime);
  return (
    <Card sx={{ marginBottom: "3em" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.post.uid}
        subheader={formattedTime}
        sx={{ borderBottom: "1px solid #eee" }}
      />
      <Box sx={{ display: "flex", flexDirection: props.post.type == 2 ? "column" : "row" }}>
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
          <Typography variant="body2" color="text.secondary">
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
      <CardActions disableSpacing sx={{ borderTop: "1px solid #eee" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />{props.post.likes}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
