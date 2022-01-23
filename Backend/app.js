/*
 * @file: app.js
 * @description: It contain server setup function.
 * @author: Rajneshwar Singh
 */
import express from "express";
import bodyParser from "body-parser";
import api from "./routes/stripe.js";
import cors from "cors";
import * as DB from "./db/index.js";
const app = express();
app.use(bodyParser.json());
// Access-Control-Allow-Origin
app.use(cors());

// check mongose connection
DB.connection();

// Routes
app.use("/api", api);

app.listen(3000, () => {
  console.log("Server listening at 3000");
});
