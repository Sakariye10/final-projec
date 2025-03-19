import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { customUserRequest } from "../helpers/jwt";
const prisma = new PrismaClient();

// Get All Floors
export const getAllFloors = async (req: customUserRequest, res: Response) => {
  try {
    const AllFloors = await prisma.floor.findMany();
    if (!AllFloors) {
      res.status(401).json({
        IsSuccess: false,
        message: "There is no floors at this moment",
      });
      return;
    }
    res.status(201).json({
      IsSuccess: true,
      message: "All floors are displayed successfully",
      result: AllFloors,
    });
  } catch (error) {
    res.status(501).json({
      IsSuccess: false,
      message: "Something Went Wrong",
    });
  }
};

// Get One floors by id
export const getOneFloor = async (req: customUserRequest, res: Response) => {
  try {
    const { F_Id } = req.params;
    if (!F_Id) {
      res.status(401).json({
        IsSuccess: false,
        message: "Provide Floor Id",
      });
    }
    const Onefloor = await prisma.floor.findFirst({
      where: {
        F_Id: +F_Id,
      },
    });
    if (!Onefloor) {
      res.status(401).json({
        IsSuccess: false,
        message: "This floor is not found",
      });
    }

    res.status(201).json({
      IsSuccess: true,
      message: "One Floor Displayed Successfully",
      result: Onefloor,
    });
  } catch (error) {
    res.status(501).json({
      IsSuccess: false,
      message: "Something Went Wrong",
    });
  }
};

// Creating New Floor
export const creatingFloor = async (req: customUserRequest, res: Response) => {
  try {
    const { F_No, No_Rooms } = req.body;
    if (!F_No || !No_Rooms) {
      res.status(401).json({
        IsSuccess: false,
        message: "Provide Valid Credentails",
      });
      return;
    }

    // Checking If Already Booked
    const CheckingFloor = await prisma.floor.findFirst({
      where: {
        F_No,
        No_Rooms,
      },
    });
    if (CheckingFloor) {
      res.status(401).json({
        IsSuccess: false,
        message: "This Floor Is Already Registered",
      });
    }

    const newFloor = await prisma.floor.create({
      data: {
        No_Rooms,
        F_No,
        Author_Id: req.User?.U_Id!,
      },
    });
    res.status(201).json({
      IsSuccess: true,
      message: "New Floor Registered Successfully",
    });
  } catch (error) {
    res.status(501).json({
      IsSuccess: false,
      message: "Something Went Wrong",
    });
  }
};

// Updating floor Using By Its Id 
export const updatingFloor = async ( req : customUserRequest , res : Response) => {
    try {
        
    } catch (error) {
        
    }
}