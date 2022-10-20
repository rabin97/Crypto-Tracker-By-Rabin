import React from "react";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";
import { styled } from "@mui/material/styles";
import "../App.css";

const CustomizedContainer = styled(Container)`
height:450px,
display:flex,
flex-direction:column,
padding-top:25,
marginBottom:1.5cm,
`;

const CustomizedTypography = styled(Typography)`
  color: #fff;
  text-align: center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif,
`;
const Banner = () => {
  return (
    <div className="maindiv">
      <CustomizedContainer>
        <div>
          <CustomizedTypography variant="h2">
            𝙲𝚛𝚢𝚙𝚝𝚘 𝚃𝚛𝚊𝚌𝚔𝚎𝚛 ᴮʸ 𝚁𝚊𝚋𝚒𝚗
          </CustomizedTypography>
          <CustomizedTypography variant="h6">
            Today's Top 10 Most tending coins
          </CustomizedTypography>
        </div>
        <Carousel />
      </CustomizedContainer>
    </div>
  );
};

export default Banner;
