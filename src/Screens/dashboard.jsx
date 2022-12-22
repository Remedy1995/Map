
import axiosClient from "../Services/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../User/userContext";
import { useNavigate } from "react-router-dom";
import Map from "./map";

const Dashboard = () => {
const user = localStorage.getItem("email");
const [mapData,setmapData] = useState("");
const [logged,setlogged]= useContext(UserContext);
const navigate = useNavigate();

const logout = () => {
localStorage.clear();
setlogged(null);
navigate("/");
}


const getData = async () => {
await axiosClient.get("/data").then(data =>{setmapData(data)}).catch(error=>{console.log(error)});
}


useEffect(()=>{getData();
if (logged === null){
navigate("/");
}
},[logged,navigate])


	
    return ( <div>
    <div className="main-content">
		<div className="sticky-header header-section ">
			<div className="header-left">
				<button id="showLeftPush"><i className="fa fa-bars"></i></button>
				<div className="logo">
					<a href="index.html">
						<h1>MAP</h1>
						<span>Dashboard</span>
					</a>
				</div>
				<div className="clearfix"> </div>
			</div>
			<div className="header-right">
				<div className="profile_details">		
					<ul>
						<li className="dropdown profile_details_drop">
							<a href="#profile" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
								<div className="profile_img">	
									<span className="prfil-img"><img  className="user" src="template/images/a.png" alt=""/> </span> 
									<div className="user-name">
										<p> {user}</p>
										<button onClick={logout} className="logout">Logout</button>
									</div>	
								</div>	
							</a>
							
						</li>
					</ul>
				</div>
							
			</div>
	
		</div>
	<Map data ={mapData}/>
	
	
		
		<div className="footer">
		   <p>&copy 2022 My Map. All Rights Reserved | Design by My Map.</p>
		</div>
       
	</div>
    </div>)
}

export default Dashboard;