import { Router } from "express";
import { decodeToken } from "../helpers/jwt";
import { creatingNewRoom, getAllRooms ,  } from "../controllers/RoomsController";

const router = Router();

router.get('/all' , decodeToken , getAllRooms)
router.post('/new' , decodeToken , creatingNewRoom)

export default router