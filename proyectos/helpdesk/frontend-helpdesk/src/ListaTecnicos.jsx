import { useEffect, useState } from "react";


export function ListaTecnicos() {

    const [personas, setPersonas] = useState([]);

useEffect(() => {
  fetch("http://localhost:8080/api/personas")
    .then((response) => response.json())
    .then((data) => setPersonas(data))
    .catch((error) => console.error("Error en la petición:", error));
}, []);

let listaTecnicos = [];

personas.forEach(persona => {
    if(persona.tipo){

    }
});


  return (
    <div>
      <h2>Lista tecnicos</h2>
      <ul>
        {personas.map((persona) => (
          <li key={persona.id}> Nombre del tecnico: {persona.nombre} </li>
        ))}
      </ul>
    </div>
  );
}
