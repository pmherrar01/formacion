import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard(){

    const [nombreUser, setNombreUser] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("Token")
        if(!token){
            navigate("/")
        }

        const llamada = async () => {

        const response = await fetch("http://localhost:4000/api/auth/perfil",{
            method: "GET",
            headers: {"Authorization": "Bearer " + token},
        })

       const datos =  await response.json();
       
       setNombreUser( datos.user.name)

        }

        llamada();




    }, []) 

    const handleLogout = () => {
        localStorage.removeItem("Token");
        navigate("/")
    }

    return(
    <div>
        <h1>Bienvenido al panel de control, {nombreUser}</h1>
        <button onClick={handleLogout}>Cerrar Sesion</button>
    </div>
)
}



export default Dashboard;