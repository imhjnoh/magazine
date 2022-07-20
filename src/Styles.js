import { createTheme, styled } from "@mui/material/styles";
import {
  indigo,
  blueGrey,
  amber,
  deepOrange,
  red,
  blue,
} from "@mui/material/colors";
import { Typography, AppBar, Box } from "@mui/material";
import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";

export const theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: amber[500],
      contrastText: blueGrey[900],
    },
    secondary: {
      main: blue[400],
    },
  },
  typography: {
    h5: {
      // fontFamily: '"Black Han Sans", sans-serif'
    },
  },
});

export const Logo = (props) => {
  return (
    <div
    onClick={props.onClick}
      style={{ display: "flex", flexDirection: "row", alignItems: "center", cursor:
    "pointer" }}
    >
      <ReceiptSharpIcon />
      <Typography
        variant="h5"
        component="div"
        style={{ fontWeight: "900", fontStyle: "italic" }}
      >
        MEGA_ZINE
      </Typography>
    </div>
  );
};

// export const Logo = styled(Typography)(({theme}) => ({
//     fontWeight: "900",
//     fontStyle: "italic"
// }))
export const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: `0 1px 10px #eee`,
  // boxShadow: `0 0px 100vh ${theme.palette.secondary.main}`,
  // borderBottom: `1px solid ${theme.palette.secondary.main}`
}));
