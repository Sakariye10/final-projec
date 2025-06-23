import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();




// Get All Debts
export const getAllDebts = async(req : Request , res : Response) => {
    try {
        const AllDebts = await prisma.debts.findMany({
           
        })
        if(!AllDebts){
            res.status(400).json({
                IsSuccess : false,
                message : 'There Is no debts at this moment'
            })
            return;
        }
        res.status(201).json({
            IsSuccess : true,
            message : 'all debts displayed successfully',
            result : AllDebts
        })
        
    } catch (error) {
        res.status(500).json({
            IsSuccess : false,
            message : 'Something Went Wrong Please Try Again Later'
        })
    }
}