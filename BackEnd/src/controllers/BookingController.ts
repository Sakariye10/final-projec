import { PrismaClient } from "@prisma/client";
import { customUserRequest } from "../helpers/jwt";
import { Response } from "express";
const prisma = new PrismaClient()


// get All Booking 
export const getAllBookings = async ( req : customUserRequest , res : Response) => {
    try {
        const AllBookings = await prisma.booking.findMany({
            where : {
                Is_Deleted : false
            },
            include : {
                Room :  {
                    select : {
                        R_No : true,
                        R_Type : {
                            select : {
                                Rt_Name : true
                            }
                        }
                    }
                }
            }
        })
        if(!AllBookings){
            res.status(400).json({
                IsSuccess : false,
                message : 'There Is No Bookings At This Moment'
            })
            return
        }
        res.status(200).json({
            IsSuccess : true,
            message : 'All Bookings Are Displayed Successfully',
            result : AllBookings
        })
    } catch (error) {
        res.status(400).json({
            IsSuccess : false,
            message : 'Something Went Wrong'
        })
    }
}

// get one Booking By Its Id 
export const getOneBooking = async ( req : customUserRequest , res : Response) => {
    try {
        const {Bk_Id} = req.params
        if(!Bk_Id){
            res.status(400).json({
                IsSuccess : false,
                message : 'Provide Valid Booking Id'
            })
            return
        }

        // Checking If Booking Found Or Not 
        const CheckingBook = await prisma.booking.findFirst({
            where : {
                Bk_Id : + Bk_Id
            }
        })
        if(!CheckingBook){
            res.status(400).json({
                IsSuccess : false,
                message : 'This Booking Is Not Found'
            })
            return
        }
        if(CheckingBook.Is_Deleted === true){
            res.status(400).json({
                IsSucscess : false,
                message : 'This Booking Is Already Existed But Removed'
            })
            return
        }

        res.status(200).json({
            IsSuccess : true,
            message : 'One Booking Displayed Successfully',
            result : CheckingBook
        })
    } catch (error) {
        res.status(500).json({
            IsSuccess : false,
            message : 'Something Went Wrong'
        })
    }
}


// Creating New Booking 
export const creatingNewBooking = async (req: customUserRequest, res: Response) => {
    // try {
        const { Cu_Name, Cu_Phone, R_Id, B_Days, Paid } = req.body;
        if (!Cu_Name || !Cu_Phone || !R_Id || !B_Days || !Paid) {
           res.status(400).json({
                IsSuccess: false,
                message: 'Provide Booking Valid Information'
            });
            return 
        }

        const CheckingRoom = await prisma.rooms.findFirst({
            where: { R_Id: +R_Id },
            include: { R_Type: { select: { Rt_Price: true } } }
        });

        if (!CheckingRoom) {
            res.status(400).json({
                IsSuccess: false,
                message: 'This Room Is Not Found Check For Id '
            });
            return
        }

        if (CheckingRoom.Is_Deleted === true) {
             res.status(400).json({
                IsSuccess: false,
                message: 'This Room Is Already Removed'
            });
            return
        }

        if (CheckingRoom.Is_Booked) {
             res.status(400).json({
                IsSuccess: false,
                message: 'This Room Is Already Booked'
            });
            return
        }

        const B_Price = parseInt(CheckingRoom.R_Type.Rt_Price);
        const B_Total = B_Price * B_Days;
        const B_Balance = B_Total - Paid;

        const newBook = await prisma.booking.create({
            data: {
                Cu_Name,
                Cu_Phone,
                R_Id: +R_Id,
                Price: B_Price,
                B_Days,
                Total: B_Total,
                Paid,
                Balance: B_Balance,
                Us_Id: req.User?.U_Id!
            }
        });

       if(newBook) {
        await prisma.rooms.update({
            where: { R_Id: +R_Id },
            data: { Is_Booked: true }
        });
       }

        const Ch_Customer = await prisma.customers.findFirst({
            where: { Cu_Name, Cu_Phone }
        });

        if (!Ch_Customer) {
            await prisma.customers.create({
                data: {
                    Cu_Name,
                    Cu_Phone,
                    Author_Id: req.User?.U_Id!
                }
            });
        }

        if (newBook.Balance > 0) {
            await prisma.debts.create({
                data: {
                    Cu_Name,
                    Cu_Phone,
                    Balance: newBook.Balance,
                    Author_Id: req.User?.U_Id!
                }
            });
        }

        res.status(200).json({
            IsSuccess: true,
            message: 'Customer Booked Successfully',
            result: newBook
        });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             IsSuccess: false,
//             message: 'Something Went Wrong Please Try Again Later'
//         });
//     }
}
