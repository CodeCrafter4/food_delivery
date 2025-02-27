import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  placeOrder,
  verfyOrder,
  userOrders,
  listOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post("/verify", verfyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders); //to convert auth token into middle ware
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);



export default orderRouter;

