import { useState } from "react";
import { useEffect } from "react";

export function useTickets(){

    const [tickets, setTickets] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/tickets')
      .then(response => response.json())
      .then((data) => { setTickets(data); setCargando(false)})
      .catch((error) => {setError("No se pudieron cargar los tiockets" + error); setCargando(false)}
       );
  }, []);
    return(
        {tickets, setTickets, cargando,error}
    )
}