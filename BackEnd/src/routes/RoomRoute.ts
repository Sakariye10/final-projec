import { Router } from "express";
import { decodeToken } from "../helpers/jwt";
import { getAllRooms } from "../controllers/RoomsController";

const router = Router();

router.get('/all' , decodeToken , getAllRooms)

export default router