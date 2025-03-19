import { Router } from "express";
import { decodeToken } from "../helpers/jwt";
import { creatingRoomType, deletingAllRoomTypes, deletingRoomType, getAllRoomTypes, getOneRoomType, removingRoomType, restoringRoomType, updatingRoomType } from "../controllers/RoomTypecontroller";
const router = Router();

router.get('/all' , decodeToken , getAllRoomTypes)
router.get('/one/:Rt_Id' , decodeToken , getOneRoomType)
router.post('/new' , decodeToken , creatingRoomType)
router.put('/update/:Rt_Id' , decodeToken , updatingRoomType)
router.put('/remove/:Rt_Id' , decodeToken , removingRoomType)
router.put('/restore/:Rm_Id' , decodeToken , restoringRoomType)
router.delete('/delete' , decodeToken , deletingRoomType)
router.delete('/alldelete' , decodeToken , deletingAllRoomTypes)

export default router;