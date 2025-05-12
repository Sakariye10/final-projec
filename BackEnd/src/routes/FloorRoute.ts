import { Router } from "express";
import { decodeToken } from "../helpers/jwt";
import { creatingFloor, deletingAllFloors, deletingFloor, getAllFloors, getOneFloor } from "../controllers/FloorController";
const router = Router();

router.get('/all' , decodeToken , getAllFloors)
router.get('/one/F_No' , decodeToken , getOneFloor)
router.post('/new' , decodeToken , creatingFloor)
router.delete('/alldelete' , decodeToken , deletingAllFloors)
router.delete('/delete/:F_Id' , decodeToken , deletingFloor)


export default router;