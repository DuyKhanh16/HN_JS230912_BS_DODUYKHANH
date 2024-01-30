import db from "../mysql.config/mysql"

export const getDb=async()=>{
    const data=await db.execute("SELECT * FROM users")
    return data
}
export const addNewTodo=async(name:string)=>{
   const res=await db.execute("INSERT INTO users(name) VALUES(?)",[name])
   return res
}

export const deleTd = async (id:number)=>{
    const res=await db.execute("DELETE FROM users WHERE id=?",[id])
    return res
}
export const editStatusById=async(id:number,status:boolean)=>{
    const res=await db.execute("UPDATE users SET status=? WHERE id=?",[status,id])
}