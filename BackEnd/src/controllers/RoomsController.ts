import { PrismaClient } from "@prisma/client";
import { customUserRequest } from "../helpers/jwt";
import { Response } from "express";
const prisma = new PrismaClient()


// Get All Rooms 
export const getAllRooms = async(req : customUserRequest , res : Response) => {
    try {
        const AllRooms = await prisma.rooms.findMany({
            where : {
                Is_Deleted : false
            }
        })
        if(!AllRooms){
            res.status(400).json({
                IsSuccess : false,
                message : 'There Is No Rooms At This Moment'
            })
        }
        res.status(200).json({
            IsSuccess : true,
            message : 'All Rooms Are Displayed Successfully',
            result : AllRooms
        })
    } catch (error) {
        res.status(400).json({
            IsSuccess : false,
            message : 'Soemthing Went Wrong'
        })
    }
}