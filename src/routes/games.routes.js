import {Router} from "express";
import  {postGames, getGames} from '../controllers/games.controller.js'
import { gamesValidation } from "../middlewares/games.validation.js";
const router = Router();

router.post("/games", gamesValidation, postGames)
router.get("/games", getGames)


export default router;
