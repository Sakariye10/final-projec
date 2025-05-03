import { Router } from "express";
import { decodeToken } from "../helpers/jwt";
import { getAllCustomers } from "../controllers/CustomerController";


const router = Router();

router.get('/all' , decodeToken , getAllCustomers)

export default router