import { Router } from "express";
import { getAllDebts } from "../controllers/DebtsController";
const router = Router();

router.get('/all' , getAllDebts )

export default router