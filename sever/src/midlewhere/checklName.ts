import { Request, Response } from "express";
import { getDb } from "../sevice/todo.sevice";

export const checkMidelwhere = async (req:Request,res:Response,next:any)=>{
    const [data]=await getDb()
   const {name}=req.body
   if(name===""){
       res.status(400).json({
           message:"job không xác định"
       })
   }
   let check=data.find((item:any)=>{
       item.name.toLowerCase()===name.toLowerCase()
   })
   if (check){
       res.status(400).json({
           message:"Job đã tồn tại"
       })
   }else{
       next()
    
   }
}