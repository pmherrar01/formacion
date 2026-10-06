import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:4000/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name: nombre, email: email, password: password, role: "NORMAL"})
            })

            if(response.ok){
                navigate("/")
            }
        } catch (error) {
            
        }
    }

    return(
        <div>
            <h1>Registrate</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="correo" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="text" placeholder="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>

                <button type="submit">Registrar</button>
            </form>

            <p>Ya tienes cuenta? inicia sesion aqui</p>
            <button onClick={() => {navigate("/")}}>Iniciar sesion</button>
        </div>
    )

}

export default Register;