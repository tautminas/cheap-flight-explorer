import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { promises as fsPromises } from "fs";

const app = express();
const port = 3000;

dotenv.config();

const TEQUILA_API_KEY = process.env.TEQUILA_API_KEY;
const TEQUILA_API_ENDPOINT = "https://tequila-api.kiwi.com";

const headers = {
  apikey: TEQUILA_API_KEY,
};

const params = {
  fly_from: `city:VNO`,
  fly_to: `city:RIX`,
  date_from: new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }),
  // date_to: new Date(
  //   new Date().setMonth(new Date().getMonth() + 1)
  // ).toLocaleDateString("en-GB", {
  //   day: "numeric",
  //   month: "numeric",
  //   year: "numeric",
  // }),
  date_to: new Date(
    new Date().setDate(new Date().getDate() + 2)
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }),
  nights_in_dst_from: "7",
  nights_in_dst_to: "28",
  flight_type: "round",
  curr: "EUR",
  sort: "price",
};

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/flights", async (req, res) => {
  try {
    const result = await axios.get(`${TEQUILA_API_ENDPOINT}/v2/search`, {
      headers: headers,
      params: params,
    });
    // Write the result to a file
    // await fsPromises.writeFile(
    //   "api_result.json",
    //   JSON.stringify(result.data, null, 2)
    // );
    // console.log("Result written to api_result.json");
    // console.log(result.data.data[0].id);
    res.render("index.ejs", {
      flights: result.data.data[0],
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
