import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { customUserRequest } from "../helpers/jwt";
const prisma = new PrismaClient();


// Get All Employees 
export const getAllEmployees = async ( req : Request , res : Response) => {
    try {
        const AllEmployees = await prisma.employee.findMany({
            where : {
                Is_Deleted : false
            }
        })
        if(!AllEmployees){
            res.status(400).json({
                IsSuccesss : false,
                message : "There Is No Employees At This Moment"
            })
            return;
        }

        res.status(200).json({
            IsSuccess : true,
            message : 'All Employees Are Displayed Successfully',
            result :  AllEmployees
        })
    } catch (error) {
        res.status(500).json({
            IsSuccess : false,
            message : 'Soemthing Went Wrong Please Try Again Later'
        })
    }
}


// Get One EMployee 
export const getOneEMployee = async ( req : Request , res : Response) => {
    try {
       const { Em_Id } = req.params 
       if(!Em_Id){
        res.status(400).json({
            IsSuccess : false,
            message : 'Provide Employee Id To Search It '
        })
        return
       }
       const CheckinEmployee = await prisma.employee.findFirst({
        where : {
            Em_Id : +Em_Id
        }
       })
       if(!CheckinEmployee){
        res.status(400).json({
            IsSuccess : false,
            message : 'This EMployee Is Not Found Check Up The Id '
        })
        return
       }
       res.status(200).json({
        IsSuccess : true,
        message : 'One Employee Displayed Successfully',
        result : CheckinEmployee
       })

    } catch (error) {
       res.status(500).json({
        IsSuccess : false,
        message : 'Something Went Wrong'
       })
    }
}

// Creating Employee 
export const creatingEmployee = async ( req : customUserRequest , res : Response) => {
    try {
        const {Em_Name , Em_Phone , Em_Address , Em_Sallary , Em_Job} = req.body
        if(!Em_Name || !Em_Phone || !Em_Address || !Em_Sallary){
            res.status(400).json({
                IsSuccess : false,
                message : 'Provide Valid Employee Credentials'
            })
            return;
        }
        // Checking If Employee Already Registered Or Not
        const CheckinEmployee = await prisma.employee.findFirst({
            where : {
                Em_Name,
                Em_Phone,
                Em_Address
            }
        })
        if(CheckinEmployee){
            res.status(400).json({
                IsSuccess : false,
                message : 'This Employee Already Registered'
            })
            return
        }

        const newEmployee = await prisma.employee.create({
            data :{
                Em_Name,
                Em_Phone,
                Em_Address,
                Em_Sallary,
                Em_Job,
                Author_Id : req.User?.U_Id!
            }
        })

        res.status(200).json({
            IsSuccess : true,
            message : 'New Employee Registered Successfully',
        })
    } catch (error) {
        res.status(500).json({
            IsSuccess : false,
            message : 'Soemthing Went Wrong'
        })
    }
}

// Updating meployee Using by its id
export const updatingEmployee = async ( req : customUserRequest , res : Response) => {
    try {
        const { Em_Id } = req.params
        if(!Em_Id){
            res.status(400).json({
                IsSuccess : false,
                message : 'Provide Valid Employee Id'
            })
            return 
        }
        const {Em_Name , Em_Phone , Em_Address , Em_Sallary , Em_Job} = req.body
        if(!Em_Name || !Em_Phone || !Em_Address || !Em_Sallary){
            res.status(400).json({
                IsSuccess : false,
                message : 'Provide Valid Employee Credentials'
            })
            return;
        }
        // Checking If Employee Already Registered Or Not
        const CheckinEmployee = await prisma.employee.findFirst({
            where : {
                Em_Name,
                Em_Phone,
                Em_Address
            }
        })
        if(CheckinEmployee){
            res.status(400).json({
                IsSuccess : false,
                message : 'This Employee Already Updated'
            })
            return
        }

        const Update_Employee = await prisma.employee.update({
            where : {
                Em_Id : + Em_Id
            },
            data : {
                Em_Name,
                Em_Phone,
                Em_Sallary,
                Em_Job,
                Em_Address,
            }
        })

        res.status(200).json({
            IsSuccess : true,
            message : 'Employee Updated Successfully'
        })

        
    } catch (error) {
        res.status(400).json({
            IsSuccess : false,
            message : 'Something Went Wrong Please try Again Later'
        })
    }
}

// Remmove Employee Using By Its Id 
export const removingEmployee = async ( req : customUserRequest , res : Response) => {
    try {
        const { Em_Id } = req.params
        if(!Em_Id){
            res.status(400).json({
                IsSuccess : false,
                message : 'Provide Valid Employee Id'
            })
            return 
        }
        const CheckinEmployee = await prisma.employee.findFirst({
            where : {
                Em_Id : +Em_Id
            }
        })
        if(!CheckinEmployee){
            res.status(400).json({
                IsSuccess : false,
                message : 'This EMployee Is Not Found Check Up The Id '
            })
            return
        }
        
        const removing = await prisma.employee.update({
            where : {
                Em_Id : + Em_Id
            },
            data : {
                Is_Deleted : true
            }
        })
        res.status(200).json({
            IsSuccess : true,
            message : 'Employee Removed Successfully'
        })
        
    } catch (error) {
        res.status(400).json({
            IsSuccess : false,
            message : 'Something Went Wrong Please Try Again Later'
        })
    }
}

// Restore Employee Using By Its Id 
export const restoringEmployee = async ( req : customUserRequest , res : Response) => {
    try {
        const { Em_Id } = req.params
        if(!Em_Id){
            res.status(400).json({
                IsSuccess : false,
                message : 'Provide Valid Employee Id'
            })
            return 
        }
        const CheckinEmployee = await prisma.employee.findFirst({
            where : {
                Em_Id : +Em_Id,
                Is_Deleted : true
            }
           })
           if(!CheckinEmployee){
            res.status(400).json({
                IsSuccess : false,
                message : 'This Employee Is Not Found Check Up The Id '
            })
            return
           }

           const restoring = await prisma.employee.update({
            where : {
                Em_Id : + Em_Id
            },
            data : {
                Is_Deleted : false
            }
           })
           res.status(200).json({
            IsSuccess : true,
            message : 'Employee Restored Successfully'
           })
        
    } catch (error) {
        res.status(400).json({
            IsSuccess : false,
            message : 'Something Went Wrong Please Try Again Later'
        })
    }
}

// Trash Employees 
export const trashEmployee = async ( req : Request , res : Response) => {
    try {
        const AllEmployees = await prisma.employee.findMany({
            where : {
                Is_Deleted : true
            }
        })
        if(!AllEmployees){
            res.status(400).json({
                IsSuccesss : false,
                message : "There Is No Employees At This Moment"
            })
            return;
        }

        res.status(200).json({
            IsSuccess : true,
            message : 'All Trash Employees Are Displayed Successfully',
            result :  AllEmployees
        })
    } catch (error) {
        res.status(500).json({
            IsSuccess : false,
            message : 'Soemthing Went Wrong Please Try Again Later'
        })
    }
}

// Delete EMployee 
export const deletingEmployee = async ( req : Request , res : Response) => {
    try {
       const { Em_Id } = req.params 
       if(!Em_Id){
        res.status(400).json({
            IsSuccess : false,
            message : 'Provide Employee Id To Search It '
        })
        return
       }
       const CheckinEmployee = await prisma.employee.findFirst({
        where : {
            Em_Id : +Em_Id,
            Is_Deleted : true
        }
       })
       if(!CheckinEmployee){
        res.status(400).json({
            IsSuccess : false,
            message : 'This Employee Is Not Found Check Up The Id '
        })
        return
       }
       const deleteEmployee = await prisma.employee.delete({
        where : {
            Em_Id : + Em_Id
        }
       })

       res.status(200).json({
        IsSuccess : true,
        message : 'One Employee Delted Successfully',
        result : CheckinEmployee
       })

    } catch (error) {
       res.status(500).json({
        IsSuccess : false,
        message : 'Something Went Wrong'
       })
    }
}