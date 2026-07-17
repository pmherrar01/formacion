import { useState, useEffect } from 'react';
import './App.css';
import { ListaTecnicos } from './ListaTecnicos';

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/tickets')
      .then(response => response.json())
      .then(data => setTickets(data))
      .catch(error => console.error("Error en la petición:", error));
  }, []);

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

<ListaTecnicos />

    </div>
  );
}

export default App;