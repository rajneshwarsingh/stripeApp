/*
 * @file: index.js
 * @description: It contain function layer for customer collection.
 * @author: Rajneshwar Singh
 */

import mongoose from "mongoose";
import dbSchema from "./db-schema.js";

class CustomerClass {
  static saveCustomer(payload) {
    return this(payload).save();
  }
  static findOneCustomer(conditions) {
    return this.findOne(conditions);
  }
  static findByCondition(condition) {
    return this.find({
      status: {
        $ne: 0,
      },
      ...condition,
    });
  }
}

dbSchema.loadClass(CustomerClass);

export default mongoose.model("Customers", dbSchema);
