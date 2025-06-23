import { Router } from "express";
import { decodeToken } from "../helpers/jwt";
import { creatingNewRoom, getAllRooms, getOneRoom ,  } from "../controllers/RoomsController";

const router = Router();

router.get('/all' , decodeToken , getAllRooms)
router.get('/one/:R_Id'  , getOneRoom)
router.post('/new' , decodeToken , creatingNewRoom)

export default router