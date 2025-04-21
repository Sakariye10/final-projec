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
// export const updatingFloor = async ( req : customUserRequest , res : Response) => {
//     try {
//         const {F_Id} = req.params
//         if(!F_Id){
//           res.status(400).json({
//             IsSuccess : false,
//             message : 'Provide Floor Id'
//           })
//         }
//         // Checking Floor If Found Or not 
//         const CheckingFloor = prisma.floor.findFirst({
//           where : {
//             F_Id : + F_Id
//           }
//         })
//         if(!CheckingFloor){
//           res.status(400).json({
//             IsSuccess : false,
//             message : 'This floor is not found'
//           })
//         }

//     } catch (error) {
//         res.status(500).json({
//           IsSuccess : false,
//           message : 'Something Went Wrong Please Try Again Later'
//         })
//     }
// }

// Removing Floor Using By Its Id 
export const removingFloor = async ( req : customUserRequest , res : Response) => {
  try {
    const {F_Id} = req.params
    if(!F_Id){
      res.status(400).json({
        IsSuccess : false,
        message : 'Plaese Provide Floor Credentials'
      })
      return;
    }

    // Checking If Floor found or not 
    const CheckingFloor = await prisma.floor.findFirst({
      where : {
        F_Id : + F_Id
      }
    })
    if(!CheckingFloor){
      res.status(400).json({
        IsSuccess : false,
        message : 'This Floor Is Not Found'
      })
      return;
    }
    if(CheckingFloor.Is_Deleted === true){
      res.status(400).json({
        IsSuccess : false,
        message : 'This Floor Is Already Deleted'
      })
      return
    }

    const removeFloor = await prisma.floor.update({
      where : {
        F_Id : + F_Id
      },
      data : {
        Is_Deleted : true
      }
    })

    res.status(200).json({
      IsSuccess : true,
      message : 'Floor Removed Successfully'
    })
  } catch (error) {
    res.status(500).json({
      IsSuccess : false,
      message : 'Something Went Wrong'
    })
  }
}

// Removing Floor Using By Its Id 
export const restoringFloor = async ( req : customUserRequest , res : Response) => {
  try {
    const {F_Id} = req.params
    if(!F_Id){
      res.status(400).json({
        IsSuccess : false,
        message : 'Plaese Provide Floor Credentials'
      })
      return;
    }

    // Checking If Floor found or not 
    const CheckingFloor = await prisma.floor.findFirst({
      where : {
        F_Id : + F_Id
      }
    })
    if(!CheckingFloor){
      res.status(400).json({
        IsSuccess : false,
        message : 'This Floor Is Not Found'
      })
      return;
    }
    if(CheckingFloor.Is_Deleted === false){
      res.status(400).json({
        IsSuccess : false,
        message : 'This Floor Is Already Restored'
      })
      return
    }

    const removeFloor = await prisma.floor.update({
      where : {
        F_Id : + F_Id
      },
      data : {
        Is_Deleted : false
      }
    })

    res.status(200).json({
      IsSuccess : true,
      message : 'Floor Restored Successfully'
    })
  } catch (error) {
    res.status(500).json({
      IsSuccess : false,
      message : 'Something Went Wrong'
    })
  }
}

// Trash Floors
export const trashFloor = async ( req : customUserRequest , res : Response) => {
  try {
    const AllTrashs = await prisma.floor.findMany({
      where : {
        Is_Deleted : true
      }
    })
    if(!AllTrashs){
      res.status(400).json({
        IsSuccess : false,
        message : 'There Is No Trash At This Moment'
      })
      return
    }
    res.status(200).json({
      IsSuccess : true,
      message : 'All Trash Floors Displayed Successfully',
      result : AllTrashs
    })
  } catch (error) {
    res.status(500).json({
      IsSuccess : false,
      message : 'Something Went Wrong'
    })
  }
}