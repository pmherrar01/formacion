import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
    const [lUsers, setLUsers] = useState([])
    const [lProjects, setLProjects] = useState([])
    const [nombreUser, setNombreUser] = useState("");

    const navigate = useNavigate();
    useEffect(()=> {
        const token = localStorage.getItem("Token");
        if(!token){
            navigate("/")
        }

        const llamadaApi = async () => {

            const response = await fetch("http://localhost:4000/api/auth/perfil",{
                method: "GET",
                headers: {"Authorization": "Bearer " + token}
            })

            const respuestaUsers = await fetch("http://localhost:4000/api/users/listar-usuarios", {
                method: "GET",
                headers: {"Authorization": "Bearer " + token}
            })

            const respuestaProjects = await fetch("http://localhost:4000/api/projects/", {
                method: "GET",
                headers: {"Authorization": "Bearer " + token}
            })


            const users = await respuestaUsers.json();
            const projects = await respuestaProjects.json();
            const datos =  await response.json();

            setNombreUser(datos.user.name)
            setLUsers(users.listUsers);
            setLProjects(projects.projects)


        console.log("users: ", users)
        console.log("projects: ", projects)

        }

        try {
            llamadaApi()
        } catch (error) {
            console.log("Ha avido problemas con la llamada a la api")
        }



    }, [])

    const handleLogout = () => {
        localStorage.removeItem("Token");
        navigate("/")
    }

    return(
        <div>
                        <nav className="navbar">
                <h1>Panel de Mando / <span className="navbar-name">{nombreUser}</span></h1>
                <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
            </nav>
        </div>
    )
}

export default AdminPanel;