import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface UserData{
    U_Id : number,
    Name : string 
    Phone : string 
    Email : string 
    Role : string
 }

 export const generateToken = (User : UserData) => {
    const Payload = User;
    return jwt.sign(Payload , 'SAKARIYA_ISSE' , {
        expiresIn : '7d'
    })
 }

 export interface customUserRequest extends Request {
    User? : UserData
 }


 export const decodeToken = (
    req : customUserRequest,
    res : Response,
    next : NextFunction
 ) => {
    try {
        const Token = 
        req.headers.authorization?.startsWith('Bearer') &&
        req.headers.authorization.split(' ')[1]
        if(!Token){
            res.status(402).json({
                IsSuccess : false,
                message : ' UnAuthorized'
            })
            return;
        }
        const decode : UserData | any = jwt.verify(Token , 'SAKARIYA_ISSE')
        req.User = decode;
        next();
    } catch (error) {
        res.status(501).json({
            IsSuccess : false,
            message : 'Authorized null'
        })
    }
 }