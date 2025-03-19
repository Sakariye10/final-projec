import { Router } from "express";
import { decodeToken } from "../helpers/jwt";
import { creatingFloor, getAllFloors, getOneFloor } from "../controllers/FloorController";
const router = Router();

router.get('/all' , decodeToken , getAllFloors)
router.get('/one/F_No' , decodeToken , getOneFloor)
router.post('/new' , decodeToken , creatingFloor)


export default router;