import { useEffect } from "react";
import { useState } from "react";

export function usePersonas(){

    const [personas, setPersonas] = useState([]);
    const [cargandoPersonas, setCargandoPersonas] = useState(true);
    const [errorPersonas, setErrorPersonas] = useState(null);

    useEffect(() =>{
        fetch("http://localhost:8080/api/personas")
        .then(response => response.json())
        .then((data) => {
            setPersonas(data); 
            setCargandoPersonas(false);
        })
        .catch((error) => {
            setErrorPersonas("Error al cargar las personas" + error); setCargandoPersonas(false)
        } );
    }, [])

    return(
        {
            personas, setPersonas, cargandoPersonas, errorPersonas
        }
    )

}