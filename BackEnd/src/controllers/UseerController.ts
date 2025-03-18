import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// Get All Users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const AllUsers = await prisma.users.findMany();
    if (!AllUsers) {
      res.status(401).json({
        IsSuccess: false,
        message: "There Is No Users",
      });
    }
    res.status(201).json({
      IsSuccess: true,
      message: " All Users Displayed Successfully",
      result: AllUsers,
    });
  } catch (error) {
    res.status(501).json({
      IsSuccess: false,
      message: " Something Went Wrong",
    });
  }
};

// Get One User By Using Its Id
export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { U_Id } = req.params;
    if (!U_Id) {
      res.status(401).json({
        IsSuccess: false,
        message: "Provide User Id",
      });
    }

    const One = await prisma.users.findUnique({
      where: {
        U_Id: +U_Id,
      },
    });

    if (!One) {
      res.status(401).json({
        IsSuccess: false,
        message: "This Users Is Not Found",
      });
    }

    res.status(201).json({
      IsSuccess: true,
      message: " One User Displayed Successfully",
      result: One,
    });
  } catch (error) {
    res.status(501).json({
      IsSuccess: false,
      message: "Something Went Wrong",
    });
  }
};

// Creating User 
export const creatingUser = async ( req : Request , res : Response) => {
    try {
        const {Name , Phone , Email , Password} = req.body
        if(!Name || !Phone || !Email || !Password){
            res.status(401).json({
                IsSuccess : false,
                message : 'Provide Valid Credentials'
            })
            return
        }
        // If Already Registered 
        const checkingPhone = await prisma.users.findFirst({
            where : {
                Phone
            }
        })
        if(checkingPhone){
            res.status(401).json({
                IsSuccess : false,
                message : 'This user is already registered'
            })
            return
        }

        const newUser = await prisma.users.create({
            data : {
                Name,
                Phone,
                Email,
                Password,
                Role : Email === "yaanbo306@gmail.com" ? "Super_Admin" : "User"
            }
        })
        res.status(201).json({
            IsSuccess : true,
            message : 'User Registered Successfully'
        })
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : 'Something Went Wrong '
        })
    }
}