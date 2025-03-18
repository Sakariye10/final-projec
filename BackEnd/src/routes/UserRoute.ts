import { Router } from "express";
import { creatingUser, getAllUsers, getOneUser } from "../controllers/UseerController";
const router = Router();

router.get('/all' , getAllUsers)
router.post('/new' , creatingUser)
router.get('/one/:U_Id' , getOneUser)

export default router;