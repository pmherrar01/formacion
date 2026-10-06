import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



function Login() {

    const [email, setEmail] = useState("");
    const [contrasena, setContraseña] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) =>{

        e.preventDefault();
        console.log("¡Formulario enviado! Ejecutando petición...");
        try {
            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email: email, password: contrasena})
             })
             

            const data = await response.json()

            localStorage.setItem("Token", data.token);
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }

    }

    return(
        <div>
            <h1>Iniciar sesion</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="correo" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="contraseña" value={contrasena} onChange={(e) => setContraseña( e.target.value)} />
                <button type="submit" >Entrar</button>
            </form>

            <p>No tienes cuenta? registrate aqui</p><button onClick={() => navigate("/register")}>Registrar</button>
        </div>
    );
}

export default Login;