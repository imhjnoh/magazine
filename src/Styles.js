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

export const MoominIcon = "data:image/png;base64,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"