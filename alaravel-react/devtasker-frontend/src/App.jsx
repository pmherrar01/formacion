import { useState } from "react";
import "./App.css";
import Login from "./componets/Login.jsx";
import Dashboard from "./componets/Dashboard.jsx";




function App() {

  const [token, setToken] = useState(localStorage.getItem("Token"));

  return (
    <div>


      <h1>!Bienvenido al front de devtesker!</h1>
      <br />

    {!token ? <Login alLoguearse={setToken} /> : <Dashboard alCerrarSesion={setToken} />}

      
    </div>
  );
}

export default App;
