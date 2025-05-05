import { PrismaClient } from "@prisma/client";
import { customUserRequest } from "../helpers/jwt";
import { Response } from "express";
const prisma = new PrismaClient();


// Get All Rooms Types Only logged user
export const getAllRoomTypes = async ( req : customUserRequest , res : Response) => {
    try {
        const AllRoomTypes = await prisma.room_Type.findMany({
            where : {
                Is_Deleted : false
            }
        })
        if(!AllRoomTypes){
            res.status(401).json({
                IsSuccess : false,
                message : 'There Is No Rooms Types'
            })
            return;
        }
        res.status(201).json({
            IsSuccess : true,
            message : " All Rooms Types Are Displayed Successfully",
            result : AllRoomTypes
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : ' Something Went Wrong'
        })
    }
}

// Get One Room Type 
export const getOneRoomType = async ( req : customUserRequest , res : Response) => {
    try {
        const {Rt_Id} = req.params
        if(!Rt_Id){
            res.status(401).json({
                IsSuccess : false,
                message : 'Provide Room Type Id'
            })
            return;
        }

        // Checking Room tYpe If Found Or Not 
        const CheckingRoomType = await prisma.room_Type.findUnique({
            where : {
                Rt_Id : + Rt_Id
            }
        })
        if(!CheckingRoomType){
            res.status(401).json({
                IsSuccess : false,
                message : 'This Room Type Is Found Or Existed'
            })
            return;
        }
        res.status(201).json({
            IsSuccess : true,
            message : 'One Room Type Displayed Successfully',
            result : CheckingRoomType
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : "Something Went Wrong"
        })
    }
}

// Creating New Room Type 
export const creatingRoomType = async ( req : customUserRequest , res : Response) => {
    try {
        const { Rt_Name , Rt_Price , No_Beds} = req.body
        if(!Rt_Name || !Rt_Price || !No_Beds){
            res.status(401).json({
                IsSuccess : false,
                message : 'Provide Valid Credentials'
            })
            return
        }

        // Checking If Already Regeisteres 
        const CheckingRmType = await prisma.room_Type.findFirst({
            where : {
                Rt_Name,
                Rt_Price,
                No_Beds
            }
        })
        if(CheckingRmType){
            res.status(401).json({
                IsSuccess : false,
                message : 'This Room Type Already Registered'
            })
            return
        }

        const newRmType = await prisma.room_Type.create({
            data : {
                Rt_Name,
                Rt_Price,
                No_Beds,
            }
        })
        res.status(201).json({
            IsSuccess : true,
            message : 'New Room Type Registered Successfully'
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : 'Something Went Wrong'
        })
    }
}

// Updating Room Type Using By Its Id 
export const updatingRoomType = async ( req : customUserRequest , res : Response) => {
    try {
        const {Rt_Id} = req.params
        if(!Rt_Id){
            res.status(401).json({
                IsSuccess : false,
                message : 'Provide Room Type Id To Update'
            })
            return;
        }
        const {Rt_Name , Rt_Price , No_Beds} = req.body
        if(!Rt_Name || !Rt_Price || !No_Beds){
            res.status(401).json({
                IsSuccess : false,
                message : 'Provide Valid Room Type Credentials'
            })
            return
        }

        // Checking If Room Type Found
        const CheckingRoomType = await prisma.room_Type.findFirst({
            where : {
                Rt_Id : + Rt_Id
            }
        })
        if(CheckingRoomType){
            const Checking2 = await prisma.room_Type.findFirst({
                where : {
                    Rt_Id : CheckingRoomType.Rt_Id,
                    Is_Deleted : true
                }
            })
            if(Checking2){
                res.status(401).json({
                    IsSuccess : false,
                    message : 'This Room Type Is Existed But it is deleted so you can not update it'
                })
                return
            }
        }
        if(!CheckingRoomType){
            res.status(401).json({
                IsSuccess : false,
                message : 'This Room Type Is Not found'
            })
            return
        }

        const updateRoomtype = await prisma.room_Type.update({
            where : {
                Rt_Id : + Rt_Id
        },
            data : {
                Rt_Name,
                Rt_Price,
                No_Beds
            }
        })
        res.status(201).json({
            IsSuccess : true,
            message : 'Room Type Updated Successfully'
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : 'Something Went Wrong'
        })
    }
}

// Removing Room Type Using By Its Id 
export const removingRoomType = async (req : customUserRequest , res : Response) => {
    try {
        const { Rt_Id } = req.params
        if(!Rt_Id){
            res.status(401).json({
                IsSuccess : false,
                message : 'Provide Room Type To Remove '
            })
        }

        const CheckingRm = await prisma.room_Type.findUnique({
            where : {
                Rt_Id : + Rt_Id
            }
        })
        if(CheckingRm){
            CheckingRm.Is_Deleted = true
            res.status(401).json({
                IsSuccess : false,
                message : 'This Room Type Is Existed But Already Deleted'
            })
        }
        if(!CheckingRm){
            res.status(401).json({
                IsSuccess : false,
                message : 'This Room Type Is Found'
            })
        }

        const removeRm = await prisma.room_Type.update({
            where : {
                Rt_Id : + Rt_Id
            },
            data : {
                Is_Deleted : true
            }
        })

        res.status(201).json({
            IsSuccess : true,
            message : 'Room type removed successfully'
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : 'Something Went Wrong '
        })
    }
}

// Restoring Room Type Using By Its Id 
export const restoringRoomType = async ( req : customUserRequest , res : Response) => {
    try {
        const { Rt_Id } = req.params
        if(!Rt_Id){
            res.status(401).json({
                IsSuccess : false,
                message : 'Provide Room Type Credentials To Restore'
            })
        }

        // Checking Room Type If Already Deleted 
        const CheckingRmType = await prisma.room_Type.findFirst({
            where : {
                Rt_Id : + Rt_Id,
                Is_Deleted : false
            }
        })
        if(!CheckingRmType){
            res.status(401).json({
                IsSuccess : false,
                message : 'This Room Type Is Not Deleted Make Sure'
            })
            return
        }
        const restoreRm = await prisma.room_Type.update({
            where : {
                Rt_Id : + Rt_Id
            },
            data : {
                Is_Deleted : false
            }
        })
        res.status(201).json({
            IsSuccess : true,
            message : 'Room Type Restored Successfully'
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : 'Something Went Wrong '
        })
    }
}

// Deleting Room Type Only Admin Acn do This Option
export const deletingRoomType = async ( req : customUserRequest , res : Response) => {
    try {
        if(req.User?.Role === "User"){
            res.status(401).json({
                IsSuccess : false,
                message : 'You Can not do it'
            })
            return;
        }
        const {Rt_Id} = req.params
        const CheckingRm = prisma.room_Type.findFirst({
            where : {
                Rt_Id : + Rt_Id,
                Is_Deleted : true
            }
        })
        if(!CheckingRm){
            res.status(401).json({
                IsSuccess : false,
                message : 'Can not deleted remove it first'
            })
        }

        const rm = await prisma.room_Type.delete({
            where : {
                Rt_Id : + Rt_Id
            }
        })

        res.status(201).json({
            IsSuccess : true,
            message : 'Room Type Deleted Successfully'
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : 'Something Went Wrong'
        })
    }
}

// Deleting All Room Types In One Time Only Admins Can do This
export const deletingAllRoomTypes = async ( req : customUserRequest , res : Response) => {
    try {
        const Allfiles = await prisma.room_Type.deleteMany({
            where : {
                Is_Deleted : true
            }
        })
        if(!Allfiles){
            res.status(401).json({
                IsSuccess : false,
                message : 'There Items Now First Removed It'
            })
        }

        res.status(201).json({
            IsSuccess : true,
            message : 'All Room Types Deleted Successfully'
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : 'Something Went Wrong'
        })
    }
}