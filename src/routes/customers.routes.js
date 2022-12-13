import {Router} from "express";
import  {postCustomers, getCustomers, getCustomersById, putCustomersById} from '../controllers/customers.controller.js'
import { customersValidation, updateCustomersValidation } from "../middlewares/customers.validation.js";
const router = Router();

router.post("/customers", customersValidation,postCustomers)
router.get("/customers", getCustomers)
router.get("/customers/:id", getCustomersById)
router.put("/customers/:id", updateCustomersValidation, putCustomersById)

export default router;
