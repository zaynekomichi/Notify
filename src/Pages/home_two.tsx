import AddReminder from "../Components/allTasks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const HomeTwo=()=>{
    const navigate= useNavigate()
    const [userDetails,setDetails] = useState({
        user:"",
        id:""
    })
    useEffect(()=>{
        const storage = window.localStorage
        let details:any = storage.getItem("user")
        let parsed = JSON.parse(details)
        setDetails({...userDetails,user:parsed.email,id:parsed.id})
    },[])

    let tdate:any = new Date().toLocaleDateString()

    const deleteUser=()=>{
        let storage = window.localStorage;
        storage.removeItem("user")
        navigate("/")
    }
    return(
        <div className="page">
            <div className="d-flex flex-row justify-content-between align-items-center text-center">
                <div className="col-sm">
                    <p>Welcome {userDetails.user}</p>
                </div>
                <div className="col-sm">
                    <p>{tdate}</p>
                </div>
                <div className="col-sm">
                    <button className="btn btn-primary" onClick={()=>deleteUser()}>Logout</button>
                </div>
            </div>
           
                <AddReminder/>         
        </div>
    )
}

export default HomeTwo;