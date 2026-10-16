import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [contrasena, setContraseña] = useState("");
    const [showPassword, setShowPassword] = useState(false); // NUEVO ESTADO
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
        <div className="page-container">
            <div className="glass-card">
                <h1 className="title-glow">DevTrack</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-wrapper">
                            <input 
                                type="email" 
                                className="input-field"
                                placeholder="Correo electrónico" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        {/* Contenedor de Contraseña con Ojo */}
                        <div className="input-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="input-field"
                                placeholder="Contraseña" 
                                value={contrasena} 
                                onChange={(e) => setContraseña(e.target.value)} 
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    /* Icono Ojo Abierto */
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                ) : (
                                    /* Icono Ojo Cerrado */
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn-neon">Entrar al sistema</button>
                </form>

                <div className="auth-footer">
                    <p>¿No tienes cuenta? <button className="btn-link" onClick={() => navigate("/register")}>Regístrate aquí</button></p>
                </div>
            </div>
        </div>
    );
}

export default Login;