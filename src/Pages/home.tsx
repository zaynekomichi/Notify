import AddReminder from "../Components/App";
const Home=()=>{
    return(
        <div>
            <h1 className="text-center">Notify Me 📅</h1>
                <AddReminder/>    
                <div>
                    <p>Made by Malvin and Team, app is deployed on netlify free plan. Application made using react typescript. Alerts are sent after 5 seconds of time changing</p>
                </div>        
        </div>
    )
}

export default Home;