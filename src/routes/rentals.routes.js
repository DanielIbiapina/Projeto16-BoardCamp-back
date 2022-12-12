import {Router} from "express";
import  {postRentals, getRentals} from '../controllers/rentals.controller.js'
const router = Router();

router.post("/rentals", postRentals)
router.get("/rentals", getRentals)


export default router;
