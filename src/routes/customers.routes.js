import {Router} from "express";
import  {postCustomers, getCustomers, getCustomersById} from '../controllers/customers.controller.js'
import { customersValidation } from "../middlewares/customers.validation.js";
const router = Router();

router.post("/customers", customersValidation,postCustomers)
router.get("/customers", getCustomers)
router.get("/customers/:id", getCustomersById)

export default router;
