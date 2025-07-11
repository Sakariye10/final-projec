import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { customUserRequest } from "../helpers/jwt";
const prisma = new PrismaClient();


// Get All Payment
export const getAllPayments = async ( req : Request , res : Response) => {
    try {
        const AllPayments = await prisma.payment.findMany()
        if(!AllPayments){
            res.status(400).json({
                IsSuccess : false,
                message : 'There Is No Payment At This Time'
            })
            return
        }
        res.status(200).json({
            IsSuccess : true,
            message : 'All Payment Displayed Successfully',
            result : AllPayments
        })
        
    } catch (error) {
        res.status(500).json({
            IsSuccess : false,
            message : 'Something Went Wrong Please Try Again Later'
        })
    }
}



// Creating New Paymet 
export const creatingPayment = async ( req : customUserRequest , res : Response) => {
    try {
        const { } = req.body
    } catch (error) {
        res.status(502).json({
            IsSuccess : false,
            message : ' Something Went Wrong Please Try Again Later'
        })
    }
}