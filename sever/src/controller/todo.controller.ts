import { Request, Response } from "express";
import { addNewTodo, deleTd, editStatusById, getDb } from "../sevice/todo.sevice";
import { log } from "console";


export const getAllTodo=async(req:Request,res:Response)=>{
    const [data]=await getDb()
    res.status(200).json({
        message:"success",
        data:data
    })
}
export const addTodo=async(req:Request,res:Response)=>{
    const {name}=req.body
    
    try {
        await addNewTodo(name)
        res.status(201).json({
            message:"thêm thành công"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"lỗi sever"
        })
    }
}
export const editStatus=async(req:Request,res:Response)=>{
    const id=req.params.id
    const {status}= req.body
    try {
        await editStatusById(Number(id),status)
        res.status(201).json({
            message:"sua thanh cong"
        })
    } catch (error) {
        console.log(error);
        
    }
}
export const deleteTodoById =async(req:Request,res:Response)=>{
    const {id}=req.params
    try {
        await deleTd(Number(id))
        res.status(201).json({
            message:" Xóa Thành Công"
        })
    } catch (error) {
        console.log(error)
    }
    
}