import { FC, useEffect, useState } from "react"
import moment from "moment"

const AddReminder: FC = () => {
    const storage = window.localStorage
    const [reminderDetails, setReminderDetails] = useState({
        time: '',
        reminder: ''
    })
    const [reminders, setReminders] = useState<any>([])
    const [message, setMessage] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault()
        let formData = {
            time: reminderDetails.time,
            reminder: reminderDetails.reminder,
            notified:0
        }
        setReminders([...reminders, formData])
    }

    //let change = useContext(UpdateList)
    useEffect(()=>{
       const alertMe=()=>{
            let tdate = new Date()
            let ctime = tdate.getHours()+':'+String(tdate.getMinutes()).padStart(2, "0");
            console.log(ctime)
            reminders.map((item:any)=>{
                if(item.time == ctime && item.notified == 0){
                    console.log(ctime)
                    console.log(item.time)
                    alert(`its ${item.time} time to ${item.reminder}`)
                    item.notified = 1
                }
            })
       }
      // alertMe()
    setInterval(alertMe,5000)
    },[reminders])
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className="flexRowEven">
                    <div>
                        <span>
                            Remind me at ⏲?
                        </span>
                        <input type="time" onChange={(e) => {
                            setReminderDetails({ ...reminderDetails, time: e.target.value })
                        }} />
                    </div>
                    <div>
                        <span>Remind me to 🤔?</span>
                        <input type="text" onChange={(e) => {
                            setReminderDetails({ ...reminderDetails, reminder: e.target.value })
                        }} />
                    </div>
                    <div>
                        <button type="submit"><b>➕</b> Add Reminder</button>
                    </div>
                </div>
            </form>
            <div>
                <p>{message}</p>
                <table>
                    <thead>
                        <tr>
                            <td>Time</td>
                            <td>Reminder</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reminders.map((item: any, index: number) => {
                                return (

                                    <tr>
                                        <td>{item.time}</td>
                                        <td>{item.reminder}</td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AddReminder