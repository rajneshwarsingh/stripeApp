/*
 * @file: db-schema.js
 * @description: It contain db schema for customer collection.
 * @author: Rajneshwar Singh
 */

import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default customerSchema;
