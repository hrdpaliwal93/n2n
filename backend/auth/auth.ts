import type { NextFunction , Request, Response} from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken'

export default function Auth(req:Request,res:Response,next:NextFunction){
   try{
     const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        res.json({message:"token required!", success:false})
        return ;
    }
    const decodeddata = jwt.verify(token, "thismyjsownwentokensecret") as JwtPayload
    if(!decodeddata){
        res.json({message:"invalid or expired token", success:false}) 
        return 
    }
    req.id = decodeddata.id
    next();


   }catch(e:any){
    console.error(e.message)
   }
}