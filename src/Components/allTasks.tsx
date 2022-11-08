import { FC, useEffect, useState } from "react"
import axios from "axios"
import { address } from "./url"

const AddReminder: FC = () => {
    const [trackChange,setChange] = useState<number>(1)
    const [itemUpdate,setItemUpdate] = useState<any>({
        id:0,
        notify_date:"",
        notify_info:""
    })
    const [uupdate,setUpdate] = useState<any>({
        notify_date:"",
        notify_info:""
    })
    const [hide,setHide] = useState(true)
    const [userDetails,setDetails] = useState({
        user:"",
        id:0
    })
    const [reminderDetails, setReminderDetails] = useState({
        time: '',
        reminder: ''
    })
    const [reminders, setReminders] = useState<any>([])
    const [message, setMessage] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault()
        axios({
            method:"get",
            url:`${address}app/addData.php`,
            params:{
                addNotification:1,
                user_id:userDetails.id,
                notify_date:reminderDetails.time,
                notify_info:reminderDetails.reminder
            }
        }).then(res=>{
            if(res.data==1){
                setMessage("Added reminder!")
            }else{
                setMessage("Mhh seem like we ran into a problem")
            }
        }).catch(err=>{
            setMessage("Mhh seems we ran into an error")
        })
        setChange(trackChange+1)
        setReminderDetails({
            time:"",
            reminder:""
        })
    }

    const handleUpdate = (e: any) => {
        console.log(itemUpdate)
        e.preventDefault()
        axios({
            method:"get",
            url:`${address}app/updateItem.php`,
            params:{
                updateItem:1,
                id:itemUpdate.id,
                notify_date:itemUpdate.notify_date,
                notify_info:itemUpdate.notify_info
            }
        }).then(res=>{
            if(res.data==1){
                setMessage("Updated !")
                setChange(trackChange+1)
                setHide(true)
            }else{
                setMessage("Mhh seem like we ran into a problem")
            }
        }).catch(err=>{
            setMessage("Mhh seems we ran into an error")
        })
        setChange(trackChange+1)
        setReminderDetails({
            time:"",
            reminder:""
        })
    }


    const deleteItem=(itemId:number)=>{
        axios({
            method:"get",
            url:`${address}app/deleteItem.php`,
            params:{
                deleteItem:1,
                id:itemId
            }
        }).then(res=>{
            if(res.data==1){
                setMessage("Removed completed reminder")
                setChange(trackChange+1)
            }else{
                setMessage("Seems like someone doesnt want to go  :(")
            }
        }).catch(err=>{
            setMessage("Seems like someone doesnt want to go  :(")
        })
    }

   
    useEffect(()=>{

        const setUserDet=()=>{
            const storage = window.localStorage
            let details:any = storage.getItem("user")
            let parsed = JSON.parse(details)
            setDetails({...userDetails,user:parsed.email,id:parsed.id})
        }
        const getNotifications=()=>{
            const storage = window.localStorage
            let details:any = storage.getItem("user")
            let parsed = JSON.parse(details)
            axios({
                method:"get",
                url:`${address}app/allData.php`,
                params:{
                    allData:1,
                    user_id:parsed.id
                }
            }).then(res=>{
                if(res.data!==null){
                    setReminders(res.data)
                }
            }).catch(err=>{
                console.log(err)
            })
        }
        setUserDet()
        getNotifications()
    },[trackChange])

    
    return (
        <div className="container-flex p-2 page text-light">
            <form onSubmit={handleSubmit} >
                <div className="container row">
                    <div className="col-sm">
                        <span>
                            Remind me at ⏲?
                        </span>
                        <input className="form-control" type="date" value={reminderDetails.time} onChange={(e) => {
                            setReminderDetails({ ...reminderDetails, time: e.target.value })
                        }} />
                    </div>
                    <div className="col-sm">
                        <span>Remind me to 🤔?</span>
                        <input className="form-control" type="text" value={reminderDetails.reminder} onChange={(e) => {
                            setReminderDetails({ ...reminderDetails, reminder: e.target.value })
                        }} />
                    </div>
                    <div>
                        <br/>
                        <button className="btn btn-primary" type="submit"><b>➕</b> Add Reminder</button>
                    </div>
                </div>
            </form>
            <div className="d-flex flex-row justify-content-center text-center">
                <div className="">
                    <button className="btn btn-primary"><a href="/app" className="text-light">Todays Tasks</a></button>
                </div>
            </div>
            <div className="d-flex flex-row align-items-center " >
                <div>
                <h1>All Tasks</h1>
                <p>{message}</p>
                </div>
               
                <table className="table">
                    <thead>
                        <tr>
                            <td className="text-light">Date</td>
                            <td className="text-light">Tasks</td>
                            <td className="text-light">Mark As Done</td>
                            <td className="text-light">Update</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reminders.map((item: any, index: number) => {
                                return (

                                    <tr key={item.id}>
                                        <td className="text-light">{item.notify_date}</td>
                                        <td className="text-light">{item.notify_info}</td>
                                        <td className="text-light"><button className="btn btn-primary" onClick={()=>deleteItem(item.id)}>Done</button></td>
                                        <td className="text-light"><button className="btn btn-primary" onClick={()=>{
                                            setItemUpdate(item)
                                            setHide(false)
                                        }}>Update</button></td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div hidden={hide}>
                <h1>Update Item</h1>
                <form onSubmit={handleUpdate}>
                    <div className="row">
                        <div className="col-sm">
                        <input className="form-control" value={itemUpdate.notify_date} onChange={(e)=>setItemUpdate({...itemUpdate,notify_date:e.target.value})} type="date"/>
                        </div>
                        <div className="col-sm">
                            <input className="form-control" value={itemUpdate.notify_info} type="text" onChange={(e)=>setItemUpdate({...itemUpdate,notify_info:e.target.value})}/>
                        </div>
                        <div className="col-sm">
                            <button className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddReminder