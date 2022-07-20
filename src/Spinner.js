import React from "react"
// import styled from "styled-components"
import styled from "@emotion/styled"
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';

const Spinner = (props) => {
    return (
      <Outter>
        <SpinIcon />
      </Outter>
    );
  };

//   const Outter = styled(div)(({theme}) => ({
//     width: "100vw",
//     height: "100vh",
//     zIndex: 700,
//     display: "flex ",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "aliceblue"
//   }))
  
  const Outter = styled.div`
    /* background-color: ${(props) => props.theme.main}; */
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: blue; */
    /* background-color: aliceblue; */
    background: rgba(255,255,255,0.5);
    svg{
      animation: spin 1.5s infinite ease;
    }
    @keyframes spin {
      0%  {-webkit-transform: rotate(0deg);}
      100% {-webkit-transform: rotate(360deg);}   
      }
  `;
  
  const SpinIcon = styled(SyncRoundedIcon)`
      color: black;
      font-size: 20em !important;
      z-index: 800;
  `
export default Spinner