import {
  createUser,
  getAllCards,
  createSource,
  createCharge,
  removeCard,
} from "../utilities/stripe.js";
import Customer from "../collections/customers/index.js";
import { successAction, failAction } from "../utilities/response.js";

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description - controller to call create customer service and perform error handling
 */
export const createCustomer = async (req, res, next) => {
  try {
    let customer = await Customer.findOneCustomer({});
    let data;
    if (customer) {
      data = await createSource(customer.customerId, req.body.token);
    } else {
      data = await createUser(req.body.name, req.body.token);
      let payload = {
        customerId: data.id,
      };
      let custData = await Customer.saveCustomer(payload);
    }
    res.json(successAction(data, "Create stripe customer successfully."));
  } catch (error) {
    res.status(400).json(failAction(error.message));
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description - controller to call get customer service and perform error handling
 */
export const getCustomers = async (req, res, next) => {
  try {
    let customerData = await Customer.findOneCustomer({});
    let cardList = [];
    if (customerData) {
      cardList = await getAllCards(customerData.customerId);
    }
    res.json(
      successAction(cardList.data, "Stripe customers fetch successfully.")
    );
  } catch (error) {
    console.log("error", error);
    res.status(400).json(failAction(error.message));
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description - controller to call create charges service and perform error handling
 */
export const createCharges = async (req, res, next) => {
  try {
    let customerData = await Customer.findOneCustomer({});
    let chargeObj = {
      amount: req.body.charges * 100,
      description: "Stripe App",
      currency: "USD",
      customer: customerData.customerId,
      source: req.body.cardId,
    };
    let chargeData = await createCharge(chargeObj);
    res.json(successAction(chargeData, "Stripe charges debited successfully."));
  } catch (error) {
    console.log("error", error);
    res.status(400).json(failAction(error.message));
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description - controller to call remove card service and perform error handling
 */
export const removeCustomerCard = async (req, res, next) => {
  try {
    let customerData = await Customer.findOneCustomer({});
    let data = await removeCard(customerData.customerId, req.body.cardId);
    res.json(successAction(data, "Card remove successfully."));
  } catch (error) {
    console.log("error", error);
    res.status(400).json(failAction(error.message));
  }
};
