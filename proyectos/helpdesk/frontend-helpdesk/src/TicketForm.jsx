import { useState } from "react";

export function FormTickets({tecnicos}){

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [techId, setTechId] = useState();

    const manejarEnvio = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/api/tickets", {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({title, description, technician: {id: techId}})

        })
        
    }

    return(
        <div className="ticket-card" >

            <h2>Crear un nuevo ticket</h2>

            <form onSubmit={manejarEnvio}>
            <label htmlFor="">Titulo de la incidencia</label><br />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value) }  /><br />
            <label htmlFor="">descripcion</label><br />
            <textarea name="" id="" value={description} onChange={(e) => setDescription(e.target.value) } ></textarea><br />
            <select value={techId} onChange={(e) => setTechId(e.target.value)}>
                <option value=""  disabled selected>Selecciona un tecnico</option>
                {tecnicos.map((tec) => (
                    <option key={tec.id} value={tec.id}  >{tec.nombre}</option>
                ) )}
            </select><br />
            <button type="submit">Enviar</button>
        </form>
        </div>
        
    )

}