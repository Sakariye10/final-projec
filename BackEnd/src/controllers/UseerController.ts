import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { comparePassword, hashedPasswordSync } from "../helpers/utils/Bcrypt";
import bcrypt from 'bcryptjs'
import { generateToken } from "../helpers/jwt";
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

        const Hash = hashedPasswordSync(Password)

        const newUser = await prisma.users.create({
            data : {
                Name,
                Phone,
                Email,
                Password : Hash,
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


// Login User
export const loginUser = async ( req : Request , res : Response) => {
  try {
    const { Email , Password} = req.body
    if(!Email || !Password){
      res.status(400).json({
        IsSuccess : false,
        message : 'Provide Valid Login Credentails'
      })
      return;
    }

    // Checking Email
     const CheckingEmail = await prisma.users.findFirst({
      where : {
        Email : Email
      },
      select : {
        Password : true,
        Email : true,
        Name : true,
        Phone : true,
        U_Id : true,
        Role : true
      }
     })
     if(!CheckingEmail){
      res.status(400).json({
        IsSuccess : false,
        message : 'Invalid Credentails Via Email'
      })
      return
     }
    //  Checking Password
    const CheckingPassword = bcrypt.compareSync(Password , CheckingEmail.Password)

    if(!CheckingPassword) {
      res.status(400).json({
        IsSuccess : false,
        message : 'Invalid Credentails Via Password'
      })
      return;
    }
    const result = {
      Id : CheckingEmail.U_Id,
      Name : CheckingEmail.Name,
      Email : CheckingEmail.Email,
      Phone : CheckingEmail.Phone,
      token : generateToken({
        Name : CheckingEmail.Name,
        Email : CheckingEmail.Email,
        Phone : CheckingEmail.Phone,
        U_Id : CheckingEmail.U_Id,
        Role :  CheckingEmail.Role
      })
    }

    res.status(200).json({
      IsSuccess : true,
      message : 'User Logged Successfully',
      result
    })


  } catch (error) {
    res.status(400).json({
      IsSuccess : false,
      message : 'Something Went Wrong Please Try Again Later'
    })
  }
}