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
            },
            include : {
                R_Type : true
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

// Get One Romm 
export const getOneRoom = async ( req : customUserRequest , res : Response) => {
    try {
        const { R_Id } = req.params
        if(!R_Id){
            res.status(400).json({
                IsSuccess : false,
                message : "Provide Valid Room Id "
            })
            return
        }

        const CheckRoom = await prisma.rooms.findFirst({
            where : {
                R_Id : + R_Id
            }
        })
        if(!CheckRoom){
            res.status(400).json({
                IsSuccess : false,
                message : 'This Room Is Not Found'
            })
            return 
        }
        res.status(200).json({
            IsSuccess : true,
            message : 'One room displayed Successfully',
            result : CheckRoom
        })
    } catch (error) {
        res.status(500).json({
            IsSuccess : false,
            message : 'Soemthign Went Wrong Please Try Again Later'
        })
    }
}

export const creatingNewRoom = async ( req : customUserRequest , res : Response) => {
    try {
        const {R_No , Rt_Id , F_Id} = req.body
        if(!R_No ||  !Rt_Id || !F_Id){
            res.status(400).json({
                IsSuccess : false,
                message : 'Provide Valid Room Credentails'
            })
            return
        }
        const CheckingRoom = prisma.rooms.findFirst({
            where : {
                R_No,
                Rt_Id,
                F_Id
            }
        })

        if(!CheckingRoom){
            res.status(400).json({
                IsSuccess : false,
                message : 'This Room Already Registered Successfuuly'
            })
            return
        }
        const newRoom = await prisma.rooms.create({
            data : {
                R_No,
                F_Id,
                Rt_Id
            }
        })

        res.status(200).json({
            IsSuccess : true,
            message : 'New Room Registered Successfully'
        })
    } catch (error) {
        res.status(500).json({
            IsSuccess : false,
            message : 'Soemthing Went Wrong Please Try Again Later'
        })
    }
}