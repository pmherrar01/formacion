import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard(){

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("Token")
        if(!token){
            navigate("/")
        }
    }, []) 

    const handleLogout = () => {
        localStorage.removeItem("Token");
        navigate("/")
    }

    return(
    <div>
        <h1>Bienvenido al panel de control</h1>
        <button onClick={handleLogout}>Cerrar Sesion</button>
    </div>
)
}



export default Dashboard;