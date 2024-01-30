import React, { useEffect } from 'react'
import "./App.css"
import axios from 'axios'
interface Job{
    name:string
}
interface Jobs{
    id:number,
    name:string,
    status:boolean
}
export default function App() {
    const [job,setjob]=React.useState<Job>({name:""})
    const [listJobs,setlistJobs]=React.useState<Jobs[]>([])
    const [flag,setflag]=React.useState<boolean>(false)

    async function getData() {
        try {
            const db=await axios.get("http://localhost:8080/api/v1/todo/")
        setlistJobs(db.data.data)
        } catch (error) {
            console.log(error);
        }
        
    }
    useEffect(()=>{
       getData()
    },[flag])
    
    const addNew= async()=>{
        if (job.name==="") {
            alert("Please enter name")
            return
        }
        try {
            const db=await axios.post("http://localhost:8080/api/v1/todo/",
                job
            )
            alert(db.data.message)
            
        } catch (error) {
            alert("Thất bại")
        }
        setflag(!flag)
        setjob({name:""})
    }
    
    const deleteJob=(id:number)=>{
        const check= confirm("Are you sure you want to delete?")
        if (!check) {
            return
        }
        try {
            axios.delete(`http://localhost:8080/api/v1/todo/${id}`)
            alert("delete success")
            setflag(!flag)
            
        } catch (error) {
            console.log(error);
            
        }
      
    }
    const checkStatus=(e:React.ChangeEvent<HTMLInputElement>)=>{
       const item=listJobs.find((job)=>job.id===Number(e.target.value))
        const jobEdit={...item,status:Number(`${e.target.checked===true?1:0}`)}
        try {
            axios.put(`http://localhost:8080/api/v1/todo/${e.target.value}`,jobEdit)
        setflag(!flag)
        } catch (error) {
            console.log(error);
            
        }
        
    }
    
  return (
    <div id="container">
    <div className="header">
        <h1>Todo List</h1>
        <p> All of todos in 2024</p>
    </div>
    <div className="main">
        <div className="main__bg">
        {listJobs.map((job,i)=>{
            return(
                <div className="main__todo" key={i}>
                <div className="main__todo--text">
                    <p style={{textDecoration:`${job.status?"line-through":"none"}`}}>{job.name}</p>
                </div>
                <div className="main__todo--icon">
                    <input type="checkbox" onChange={checkStatus} checked={job.status} value={job.id} style={{width:"15px", height:"15px"}} />
                    <div>
                    <span
                    onClick={()=>deleteJob(job.id)}
                        className="material-symbols-outlined"
                        style={{
                          fontSize: "20px",
                          opacity: "1",
                          marginLeft: "25px",
                          cursor: "pointer",
                          color:"#fff"
                        }}
                      >
                        delete
                      </span>
                    </div>
                </div>
    
            </div>
            )
        })}
        </div>
        

    </div>
    <div className="footer">
        <p>Add to the todo list</p>
        <div className="footer__input">
            <div className="footer__input--input">
                <input onChange={(e)=>setjob({name:e.target.value})} className="input" type="text" value={job.name}/>
            </div>
            <div className="footer__input--button">
                <button className="btn" onClick={addNew}>Add</button>
            </div>
        </div>

    </div>

</div>
  )
}
