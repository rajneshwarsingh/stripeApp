/*
 * @file: stripe.js
 * @description: It contain stripe function layer.
 * @author: Rajneshwar Singh
 */

import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config/index.js";
const stripe = new Stripe(STRIPE_PRIVATE_KEY);

export const createUser = async (name, card) => {
  return await stripe.customers.create({
    name: name,
    description: `Stipe details for ${name} customer`,
    source: card,
  });
};

export const createSource = async (stripeId, source) => {
  return await stripe.customers.createSource(stripeId, {
    source,
  });
};

export const getAllCards = async (customerId) => {
  return await stripe.customers.listSources(customerId);
};

export const createCharge = async (data) => {
  return await stripe.charges.create(data);
};

export const removeCard = async (customerId, cardId) => {
  return await stripe.customers.deleteSource(customerId, cardId);
};
