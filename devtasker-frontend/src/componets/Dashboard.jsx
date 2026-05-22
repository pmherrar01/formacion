import { useEffect } from "react";
import { useState } from "react";

export default function Dashboard({ alCerrarSesion }) {
  const [projects, setProject] = useState([]);
  const [nombreNuevoProyecto, setNombreNuevoProyecto] = useState("");
  const [descripcionNuevoProyecto, setDescriptcionNuevoProyecto] = useState("");

  function logout() {
    localStorage.removeItem("Token");
    alCerrarSesion(null);
  }

  useEffect(() => {
    const obtenerProjects = async () => {
      const respuesta = await fetch("http://localhost:8000/api/proyectos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      });

      const proyectos = await respuesta.json();

      setProject(proyectos);
    };

    obtenerProjects();
  }, []);

  const crearProyecto = async (event) => {
    event.preventDefault();

    const respuesta = await fetch("http://localhost:8000/api/proyectos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("Token"),
      },
      body: JSON.stringify({
        name: nombreNuevoProyecto,
        description: descripcionNuevoProyecto,
      }),
    });

    const validacion = await respuesta.json();

    setProject([...projects, validacion]);

    setNombreNuevoProyecto("");
    setDescriptcionNuevoProyecto("");
  };

  const borrarProyecto = async (idProject) => {
    const respuesta = await fetch(
      `http://localhost:8000/api/proyectos/${idProject}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      },
    );

    setProject(projects.filter((project) => project.id !== idProject));
  };

  return (
    <div>
      <button onClick={logout}>Cerrar sesion</button>
      <h2>Mis projectos</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            Nombre del projecto: {project.name} <br /> descripcion:{" "}
            {project.description} <br />{" "}
            <button
              onClick={() => {
                borrarProyecto(project.id);
              }}
            >
              Eliminar
            </button>{" "}
            <hr />
          </li>
        ))}
      </ul>

      <form onSubmit={crearProyecto}>
        <label htmlFor="">Nombre Proyecto</label>
        <input
          type="text"
          name="nombreProyecto"
          id="nombreProyecto"
          value={nombreNuevoProyecto}
          onChange={(event) => setNombreNuevoProyecto(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="">Descripcion: </label>
        <input
          type="text"
          name="descripcionProyecto"
          id="descipcionProyecto"
          value={descripcionNuevoProyecto}
          onChange={(event) => setDescriptcionNuevoProyecto(event.target.value)}
        />{" "}
        <br />
        <input type="submit" value="Añadir Proyecto" />
      </form>
    </div>
  );
}
