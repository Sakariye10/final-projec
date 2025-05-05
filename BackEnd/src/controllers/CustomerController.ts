import { PrismaClient } from "@prisma/client";
import { customUserRequest } from "../helpers/jwt";
import { Response } from "express";
const prisma = new PrismaClient();



// Get ALl Customers
export const getAllCustomers = async ( req : customUserRequest , res : Response) => {
    try {
        const AllCustomers = await prisma.customers.findMany()
        if(!AllCustomers){
            res.status(400).json({
                IsSuccess : false,
                message : 'There Is No Customers At This Moment'
            })
            return
        }
        res.status(200).json({
            IsSuccess : true,
            message :  ' All customers displayed successfully',
            result : AllCustomers
        })
    } catch (error) {
        res.status(500).json({
            IsSuccess : false,
            message : 'Something Went Wrong Please Try Again Later'
        })
    }
}

// Get one cutomer using by id 
export const getOneCustomer = async ( req : customUserRequest , res : Response) => {
    try {
        const { Cu_Id } = req.params
        if(!Cu_Id){
            res.status(400).json({
                IsSuccess : false,
                message : 'Provide Customer Id'
            })
        }
        const CheckCustomer = await prisma.customers.findUnique({
            where : {
                Cu_Id : + Cu_Id
            }
        })
        if(!CheckCustomer){
            res.status(400).json({
                IsSuccess : false,
                message : 'This Customer Is Not Found'
            })
        }
        res.status(200).json({
            IsSuccess : true,
            message : 'One Customer Displayed Successfully',
            result : CheckCustomer
        })
    } catch (error) {
        res.status(500).json({
            IsSuccess : false,
            message : " Something Went Wrong Please Try Again Later"
        })
    }
}

// Creating Customer 
export const creatingCustomer = async ( req : customUserRequest , res : Response) => {
    try {
        const {Cu_Name , Cu_Phone , Cu_Address } = req.body
        if(!Cu_Name || !Cu_Phone){
            res.status(400).json({
                IsSuccess : false,
                message : 'Provide Customer Credentials'
            })
            return
        }
        const CheckCustomer = await prisma.customers.findFirst({
            where : {
                Cu_Name :  Cu_Name,
                Cu_Phone : Cu_Name
            }
        })
        if(CheckCustomer){
            res.status(400).json({
                IsSuccess : false,
                message : 'This Customer Is Already Registered'
            })
            return
        }

        const NewCustomer = await prisma.customers.create({
            data : {
                Cu_Name,
                Cu_Phone,
                Cu_Address : Cu_Address,
                Author_Id : req.User?.U_Id!
            }
        })

        res.status(200).json({
            IsSuccess : true,
            message : 'New Customer Registered Successfully'
        })
    } catch (error) {
        res.status(500).json({
            IsSuccess : false,
            message : 'Somehting Went Wrong '
        })
    }
}

// Updating Customer Using by Its Id 
export const updatingCustomer = async ( req : customUserRequest , res : Response) => {
    try {
        const {Cu_Id} = req.params
        if(!Cu_Id){
            res.status(400).json({
                IsSuccess : false,
                message : 'Provide Customer Id'
            })
            return
        }
        const {Cu_Name , Cu_Phone , Cu_Address } = req.body
        if(!Cu_Name || !Cu_Phone){
            res.status(400).json({
                IsSuccess : false,
                message : 'Provide Customer Credentials'
            })
            return
        }
        
        // Checking If Customer Found Or Not 
        const CheckCustomer = prisma.customers.findFirst({
            where : {
                Cu_Id : + Cu_Id
            }
        })
        if(!CheckCustomer){
            res.status(400).json({
                IsSuccess : false,
                message : 'This Cusomer Does not exits'
            })
            return
        }

        const Upadate_Customer = await prisma.customers.update({
            where  : {
                Cu_Id : + Cu_Id
            },
            data : {
                Cu_Name,
                Cu_Phone,
                Cu_Address,
            }
        })

        res.status(200).json({
            IsSuccess : true,
            message : 'Customer Updated Successfully',
        })
      
    } catch (error) {
        res.status(400).json({
            IsSuccess : false,
            message : 'Something Went Wrong Please Try Again Later'
        })
    }
}


// Deleted Customer 
export const deletingCustomer = async ( req : customUserRequest , res : Response) => {
    try {
        const {Cu_Id} = req.params
        if(!Cu_Id){
            res.status(400).json({
                IsSuccess : false,
                message : 'Provide Customer Id To Delete'
            })
            return
        }

        // Checking Customer
        const CheckCustomer = prisma.customers.findFirst({
            where : {
                Cu_Id : + Cu_Id
            }
        })
        if(!CheckCustomer){
            res.status(400).json({
                IsSuccess : false,
                message : 'This Cusomer Does not exits'
            })
            return
        }

        const deletedCustomer = await prisma.customers.delete({
            where : {
                Cu_Id : + Cu_Id
            }
        })

        res.status(200).json({
            IsSuccess : true,
            message : 'Customer Deleted Successfully'
        })

    } catch (error) {
        res.status(400).json({
            IsSuccess : false,
            message : 'Somehting Went Wrong Please Try Again Later'
        })
    }
}