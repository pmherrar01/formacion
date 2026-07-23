import { useState, useEffect } from 'react';
import './App.css';
import { ListaTecnicos } from './ListaTecnicos';
import { FormTickets } from './TicketForm';

function App() {
  const [tickets, setTickets] = useState([]);
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/tickets')
      .then(response => response.json())
      .then(data => setTickets(data))
      .catch(error => console.error("Error en la petición:", error));

      fetch("http://localhost:8080/api/personas")
    .then((response) => response.json())
    .then((datos) => {

      setPersonas(datos)
    })
    .catch((error) => console.error("Error en la petición:", error));


  }, []);

    const listaTecnicos = personas.filter(per => per.tipoPersona === "TECNICO");

    const agregarTicket = (nuevoTicketGuardado) =>{
      setTickets([nuevoTicketGuardado, ...tickets]);
    };


  return (
    <div className="dashboard-container">
      <h1 className="header-title">Tickets de HelpDesk</h1>
      
      <ul className="ticket-grid">
        {tickets.map(ticket => (
          <li key={ticket.id} className={`ticket-card estado-${ticket.estado.toLowerCase()}`}>
            
            <h2 className="ticket-title">{ticket.title}</h2>
            
            {/* Aquí están tus campos anidados con seguridad ante nulos */}
            <p className="ticket-description">{ticket.description}</p>
            <p className="ticket-tech">
              Técnico asignado: {ticket.technician?.nombre || 'Sin asignar'}
            </p>
            
            <span className="ticket-badge">
              {ticket.estado}
            </span>

          </li>
        ))}
      </ul>

<ListaTecnicos tecnicos={listaTecnicos} />
<FormTickets tecnicos={listaTecnicos} onTicketCreado={agregarTicket} />

    </div>
  );
}

export default App;