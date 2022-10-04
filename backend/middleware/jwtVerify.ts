import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
const verifyToken = (req:Request, res:Response, next:NextFunction)=>{
    const sec:string = process.env.JWT_SEC as string;
    const authHeader = req.headers.token;
    if(authHeader){
        const token = (authHeader as string).split(' ')[1];
        jwt.verify(token, sec, (err, user )=>{
            if(err){
                res.status(403).json('Der Token is nicht valide');
            }
            req.user = user;
            next();
        })
    } else{
        return res.status(401).json('Sie sind nicht authorisiert');
    }
};
const verifyTokenAndAuthorization = (req:Request, res:Response, next:NextFunction)=>{
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("Sie sind nicht für diese Operation authorisiert");
        }
    })
}
const verifyTokenAndAdmin = (req:Request, res:Response, next:NextFunction)=>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("Sie sind nicht für diese Operation authorisiert");
        }
    })
}
module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}