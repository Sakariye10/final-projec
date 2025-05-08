import { Router } from "express";
import { decodeToken } from "../helpers/jwt";
import { creatingNewBooking, getAllBookings, getOneBooking } from "../controllers/BookingController";
const router = Router()

router.get('/all' , decodeToken , getAllBookings)
router.get('/one' , decodeToken , getOneBooking)
router.post('/new' , decodeToken , creatingNewBooking)

export default router