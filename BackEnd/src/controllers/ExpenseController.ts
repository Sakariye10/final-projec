// 4 May 
import { PrismaClient } from "@prisma/client";
import { Response } from "express";
const prisma = new PrismaClient();



// Get All Expenses
export const getAllExpenses = async ( req : Request , res : Response ) => {
    try {
        const AllExpenses = await prisma.expense.findMany({
            where :{
                Is_Deleted : false
            }
        })
        if(!AllExpenses || AllExpenses.length === 0){
            res.status(400).json({
                IsSuccess : false,
                message : 'There Is No Expenses At This Moment'
            })
            return
        }
        res.status(200).json({
            IsSuccess : true,
            message : 'All Expenses Are Displayed Successfully',
            result : AllExpenses
        })
    } catch (error) {
        res.status(400).json({
            IsSuccess : false,
            message : 'Something went Wrong Please Try Again Later'
        })
    }
}