import { useState } from "react"
import { useNavigate } from "react-router"
import { address } from "../Components/url"
import axios from "axios"
const Login=()=>{
    const navigate = useNavigate()
    const storage = window.localStorage;
    const [message,setMessage] = useState("")
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const handleSubmit=(e:any)=>{
        e.preventDefault()
        axios({
            method:"get",
            url:`${address}auth/login.php`,
            params:{
                login:1,
                email:formData.email,
                password:formData.password
            }
        }).then(res=>{
            if(res.data!==null){
                storage.setItem("user", JSON.stringify(res.data))
                navigate("/app")
            }else{
                setMessage("Check your credentials")
            }
        }).catch(err=>{
            setMessage("Check your credentials")
        })
    }
    return(
        <div className="container-flex d-flex  flex-row justify-content-center align-items-center page">
            <div className="">
                <h3>Login to Notify</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input className="form-control" 
                            value={formData.email}
                            onChange={(e)=>{
                                setFormData({...formData,email:e.target.value})
                            }}
                        type="text" placeholder="Password" required/>
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
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>
                </form>
                <br />
                <div>
                    <a className="text-light" href="/register">Register?</a>
                </div>
            </div>
        </div>
    )
}

export default Login