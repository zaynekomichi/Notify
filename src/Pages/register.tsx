import { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

const Register=()=> {
    const navigate = useNavigate()
    const [message,setMessage] = useState("")
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const handleSubmit=(e:any)=>{
        e.preventDefault()
        axios({
            method:"get",
            url:"http://127.0.0.1/NotifyBackend/auth/register.php",
            
            params:{
                "register":1,
                "email":formData.email,
                "password":formData.password
            }
        }).then(res=>{
            if(res.data==1){
                setMessage("Added User Successfully, Redirecting you in five second")
                setTimeout(()=>navigate("/"),5000)
            }else{
                setMessage("Something went wrong, try restarting me!")
            }
        }).catch(err=>{
            setMessage("Something went wrong, try restarting me!")
        })
    }
       
  
    return(
        <div className="container-flex d-flex  flex-row justify-content-center align-items-center page">
            <div className="">
                <h3>Register | Notify</h3>
                <p>{message}</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input className="form-control" 
                            value={formData.email}
                            onChange={(e)=>{
                                setFormData({...formData,email:e.target.value})
                            }}
                        type="text" placeholder="Email" required/>
                    </div>
                    <br />
                    <div>
                        <input className="form-control"
                            value={formData.password}
                            onChange={(e)=>{
                                setFormData({...formData,password:e.target.value})
                            }}
                        type="password" placeholder="Password" required/>
                    </div>
                    <br />
                    <div>
                        <button className="btn btn-primary" type="submit">Register</button>
                    </div>
                </form>
                <br />
                <div>
                    <a className="text-light" href="/">Login?</a>
                </div>
            </div>
        </div>
    )
}

export default Register

