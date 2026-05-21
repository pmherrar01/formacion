import { useState } from "react";

export default function Login({alLoguearse}) {

    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");

    const manejarEnvio = async (event) => {
        event.preventDefault();

        const respuesta = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const datos = await respuesta.json();

        console.log("Respuesta del servidor: ", datos);

        localStorage.setItem("Token" , datos.token);

        alLoguearse(datos.token);

    }

  return (
    <div>
      <hr />
      <h2>Login</h2>

      <br />
      <form onSubmit={manejarEnvio}>
        <div>
          <label htmlFor="">Correo</label>
          <input type="email" name="email" id="emial" onChange={(event) => setEmail(event.target.value)} />
          <br />
          <label htmlFor="">Password</label>
          <input type="password" name="password" id="password" onChange={(event) => setPasword(event.target.value)} />
          <button type="submit">Entrar</button>
        </div>
      </form>

    </div>
  );
}
