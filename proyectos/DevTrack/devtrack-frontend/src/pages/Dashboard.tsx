import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const [nombreUser, setNombreUser] = useState("");
    const [misTickets, setMisTickets] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("Token")
        if(!token){
            navigate("/")
        }

        const llamada = async () => {
            const response = await fetch("http://localhost:4000/api/auth/perfil",{
                method: "GET",
                headers: {"Authorization": "Bearer " + token}
            })

            const llamadaTickets = await fetch("http://localhost:4000/api/tickets/mis-tickets", {
                method: "GET",
                headers: {"Authorization": "Bearer " + token}
            })
            
            const tickets = await llamadaTickets.json();
            const datos =  await response.json();
            
            setMisTickets(tickets.tickets)
            setNombreUser(datos.user.name)
        }

        llamada();
    }, []) 

    const handleLogout = () => {
        localStorage.removeItem("Token");
        navigate("/")
    }

    return(
        <div className="dashboard-container">
            {/* Barra de Navegación superior */}
            <nav className="navbar">
                <h1>Panel de Mando / <span className="navbar-name">{nombreUser}</span></h1>
                <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
            </nav>

            {/* Contenido principal */}
            <main>
                <h2 className="section-title">Tickets Asignados</h2>
                
                {/* Cuadrícula de Tickets */}
                <div className="ticket-grid">
                    {misTickets.map((ticket: any) => (
                        <div className="ticket-card" key={ticket.id}>
                            <h3 className="ticket-title">{ticket.title}</h3>
                            <div className="ticket-footer">
                                <span className="text-muted">Prioridad</span>
                                <span className="badge">{ticket.priority}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Dashboard;