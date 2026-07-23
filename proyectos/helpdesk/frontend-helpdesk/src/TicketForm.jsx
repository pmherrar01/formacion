import { useState } from "react";

export function FormTickets({tecnicos, onTicketCreado}){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    


    const manejarEnvio = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/api/tickets", {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({title, description})

        })
        .then(response => response.json())
        .then(data => {
            onTicketCreado(data);

            setTitle("");
            setDescription("");
        })
        .catch((error) => console.log("Error en la peticion: " + error) )
        
    }

    

    return(
        <div className="ticket-card" >

            <h2>Crear un nuevo ticket</h2>

            <form onSubmit={manejarEnvio}>
            <label htmlFor="">Titulo de la incidencia</label><br />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value) }  /><br />
            <label htmlFor="">descripcion</label><br />
            <textarea name="" id="" value={description} onChange={(e) => setDescription(e.target.value) } ></textarea><br />
            <button type="submit">Enviar</button>
        </form>
        </div>
        
    )

}