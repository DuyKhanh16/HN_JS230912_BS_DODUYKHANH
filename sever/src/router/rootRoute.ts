
import { Router } from "express";
import { addTodo, deleteTodoById, editStatus, getAllTodo } from "../controller/todo.controller";
import { checkMidelwhere } from "../midlewhere/checklName";

const todoRoute=Router()

todoRoute.get("/", getAllTodo)
todoRoute.post("/",checkMidelwhere, addTodo)
todoRoute.put("/:id",editStatus )
todoRoute.delete("/:id",deleteTodoById)


export default todoRoute