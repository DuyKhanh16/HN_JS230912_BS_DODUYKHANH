 import express from 'express'
import todoRoute from './router/rootRoute'
import bodyParser from "body-parser";
import cors from "cors"
 const app=express()
 app.use(cors())

 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use("/api/v1/todo",todoRoute)

 app.listen(8080,()=>console.log("Server is running on port 3000"))