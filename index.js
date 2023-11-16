import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { promises as fsPromises } from "fs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

dotenv.config();

app.set("view engine", "ejs");

const TEQUILA_API_KEY = process.env.TEQUILA_API_KEY;
const TEQUILA_API_ENDPOINT = "https://tequila-api.kiwi.com";

const headers = {
  apikey: TEQUILA_API_KEY,
};

const params = {
  curr: "EUR",
  sort: "price",
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  const { origin, destination, adults } = req.body;
  const nightsFrom = req.body["nights-in-dst-from"];
  const nightsTo = req.body["nights-in-dst-to"];

  let dateFrom = req.body["date-from"];
  let dateTo = req.body["date-to"];
  dateFrom = new Date(dateFrom);
  dateTo = new Date(dateTo);
  if (dateTo < dateFrom) {
    [dateFrom, dateTo] = [dateTo, dateFrom];
  }
  dateFrom = dateFrom.toLocaleDateString("en-GB");
  dateTo = dateTo.toLocaleDateString("en-GB");

  params.fly_from = origin;
  params.date_from = dateFrom;
  params.date_to = dateTo;
  if (destination) {
    params.fly_to = destination;
  }
  if (nightsFrom) {
    params.nights_in_dst_from = nightsFrom;
  }
  if (nightsTo) {
    params.nights_in_dst_to = nightsTo;
  }
  if (adults) {
    params.adults = adults;
  }

  console.log("params:", params);

  try {
    const result = await axios.get(`${TEQUILA_API_ENDPOINT}/v2/search`, {
      headers: headers,
      params: params,
    });
    // Write the result to a file
    await fsPromises.writeFile(
      "api_result.json",
      JSON.stringify(result.data, null, 2)
    );
    console.log("Result written to api_result.json");
    params.date_from = req.body["date-from"];
    params.date_to = req.body["date-to"];
    res.render("index.ejs", {
      flights: result.data.data[0],
      params,
    });
  } catch (error) {
    console.log(error.response.data);
    const errorMessage = error.response.data;
    res.status(500).render("index.ejs", { errorMessage });
  }
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port}. URL: http://localhost:${port}/`
  );
});
