/*
 * @file: stripe.js
 * @description: It contain stripe router/api.
 * @author: Rajneshwar Singh
 */

import express from "express";
const app = express();

// Controllers
import * as stripeController from "../controllers/stripe.js";

/*
 * api call to function
 */
app.post("/stripe/createCustomer", stripeController.createCustomer);
app.get("/stripe/getCustomers", stripeController.getCustomers);
app.post("/stripe/createCharge", stripeController.createCharges);
app.delete("/stripe/removeCard", stripeController.removeCustomerCard);
export default app;
