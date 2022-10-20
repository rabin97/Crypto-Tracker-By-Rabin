import {
  Typography,
  styled,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { createTheme } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import { ResponsiveContainer, Line, LineChart, XAxis, YAxis } from "recharts";
import { ThemeProvider } from "styled-components";
import { HistoricalChart } from "../Config/Api";
import { CryptoState } from "../Pages/CryptoApi";
import { Chart } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment/moment";
import { useParams } from "react-router-dom";
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const Customdiv = styled("div")(({ theme }) => ({
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "0cm",
  padding: 40,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
}));

const Coininfo = ({ coin }) => {
  const {id}=useParams();
  const [historicaldata, sethistoricaldata] = useState();
  const { currency } = CryptoState();
  const [days, setdays] = useState(1);
  const [flag, setflag] = useState(false);

  const fetchhistory = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    sethistoricaldata(data.prices);
  };

  useEffect(() => {
    fetchhistory();
  }, [days]);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  if (!historicaldata) {
    return <Customdiv> 
      <CircularProgress/>
    </Customdiv>;
  }
  const coinData = historicaldata?.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
    
  };

  const data = {
    labels: coinData.map((value) => moment(value.x).format("MMMDDYY")),
    datasets: [
      {
        fill: true,
        labels: id,
        data: coinData.map((val) => val.y),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  
  console.log(id);

  return (
    <Customdiv>
      <Line  options={options} data={data} />
    </Customdiv>
  );
};

export default Coininfo;
