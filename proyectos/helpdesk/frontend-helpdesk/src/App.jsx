import { useState, useEffect } from 'react';
import './App.css';
import { ListaTecnicos } from './ListaTecnicos';
import { FormTickets } from './TicketForm';
import { useTickets } from './UseTickets';
import { usePersonas } from './UsePersonas';

const ESTADOS_TICKETS = ["ABIERTO", "EN_PROGRESO", "RESUELTO", "CERRADO"];


function App() {
  const {tickets, setTickets, cargando, error} = useTickets();
  const {personas,  setPersonas, cargandoPersonas, errorPersonas} = usePersonas();
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setrFiltroEstado] = useState("TODOS");
  const [filtroTecnico, setFiltroTecnico] = useState("TODOS");

    const listaTecnicos = personas.filter(per => per.tipoPersona === "TECNICO");

    const agregarTicket = (nuevoTicketGuardado) =>{
      setTickets([nuevoTicketGuardado, ...tickets]);
    };

    if (cargando) {
    return <div className="dashboard-container"><h2>⏳ Cargando incidencias del servidor...</h2></div>;
  }

  if (error) {
    return <div className="dashboard-container"><h2>❌ {error}</h2></div>;
  }

  if(cargandoPersonas){
     return <div className="dashboard-container"><h2>⏳ Cargando personas del servidor...</h2></div>;
  }

  if(errorPersonas){
     return <div className="dashboard-container"><h2>❌ {error}</h2></div>;
  }


  return (
    <div className="dashboard-container">
      <h1 className="header-title">Tickets de HelpDesk</h1>

      <div className="filter-bar">
        <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder='Buscar por titulo' />
        <select value={filtroEstado} onChange={(e) => setrFiltroEstado(e.target.value)} >
          <option value="TODOD">Todos los estados</option>
          {
            ESTADOS_TICKETS.map((est) => (
              <option key={est} value={est} >{est}</option>
            ))
          }
        </select>

        <select value={filtroTecnico} onChange={(e) => (setFiltroTecnico(e.target.value))} >
          <option value="TODOS"> Todos los tecnicos</option>
          {
            listaTecnicos.map((tec) => (
              <option key={tec.id} value={tec.nombre}> {tec.nombre} </option>
            ) )
          }
        </select>
      </div>
      
      <ul className="ticket-grid">

               {   tickets.map(ticket => (
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
        ))
      }
      
      </ul>

<ListaTecnicos tecnicos={listaTecnicos} />
<FormTickets tecnicos={listaTecnicos} onTicketCreado={agregarTicket} />

    </div>
  );
}

export default App;