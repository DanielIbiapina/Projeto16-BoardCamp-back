import {Router} from "express";
import  {postRentals, getRentals, finishRental, deleteRental} from '../controllers/rentals.controller.js'
import { finishRentalValidation, rentalsValidation } from "../middlewares/rentals.validation.js";
const router = Router();

router.post("/rentals", rentalsValidation, postRentals)
router.get("/rentals", getRentals)
router.post("/rentals/:id/return", finishRentalValidation, finishRental)
router.delete("/rentals/:id", deleteRental)


export default router;
