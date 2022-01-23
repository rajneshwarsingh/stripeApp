/*
 * @file: index.js
 * @description: It contain db setup function.
 * @author: Rajneshwar Singh
 */

import mongoose from "mongoose";
import { db } from "../config/index.js";

const databaseUrl = `mongodb://${db.host}:${db.port}/${db.name}`;

// Mongose setup with server
console.log("databaseUrl", databaseUrl);

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const connection = () => {
  mongoose.connection.on("connected", function () {
    console.log("Mongoose connected!");
  });
};
