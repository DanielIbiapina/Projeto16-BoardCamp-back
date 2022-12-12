import {Router} from "express";
import  { getCategories, postCategories} from '../controllers/categories.controller.js'
import { categoriesValidation } from "../middlewares/categories.validation.js";
const router = Router();

router.post("/categories", categoriesValidation, postCategories)
router.get("/categories",  getCategories)


export default router;
