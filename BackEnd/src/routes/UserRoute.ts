import { Router } from "express";
import { creatingUser, getAllUsers, getOneUser, loginUser } from "../controllers/UseerController";
const router = Router();

router.get('/all' , getAllUsers)
router.post('/new' , creatingUser)
router.get('/one/:U_Id' , getOneUser)
router.post('/login' , loginUser)

export default router;