import { useEffect } from "react";
import { useState } from "react";

export default function Dashboard({ alCerrarSesion }) {
  const [projects, setProject] = useState([]);
  const [nombreNuevoProyecto, setNombreNuevoProyecto] = useState("");
  const [descripcionNuevoProyecto, setDescriptcionNuevoProyecto] = useState("");
  const [proyectoActual, setProyectoActual] = useState([]);
  const [tasks, setTasks] = useState([]);

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

    if (respuesta.ok) {
      setProject(projects.filter((project) => project.id !== idProject));
    } else {
      console.error("Error al intentar borrar el proyecto en la base de datos");
    }
  };

  const editarProyecto = async (idProject) => {
    const nuevoNombre = prompt("introduce un nuevo nombre para este proyecto:");
    const nuevaDescripcion = prompt(
      "introduce una nueva descripcion para este proyecto",
    );

    const respuesta = await fetch(
      `http://localhost:8000/api/proyectos/${idProject}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
        body: JSON.stringify({
          name: nuevoNombre,
          description: nuevaDescripcion,
        }),
      },
    );

    if (respuesta.ok) {
      setProject(
        projects.map((proyecto) =>
          proyecto.id === idProject
            ? { ...proyecto, name: nuevoNombre, description: nuevaDescripcion }
            : proyecto,
        ),
      );
    }
  };

  const seleccionarProyecto = async (idProject) => {
    const respuesta = await fetch(
      `http://localhost:8000/api/proyectos/${idProject}/tareas`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      },
    );

    const tareas = respuesta.json()

    if (respuesta.ok) {
      setTasks( tareas );
    }
  };

  return (
    <div>
      <button onClick={logout}>Cerrar sesion</button>
      <h2>Mis projectos</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id} onClick={() => seleccionarProyecto(project.id)}>
            Nombre del projecto: {project.name} <br /> descripcion:{" "}
            {project.description} <br />{" "}
            <button
              onClick={() => {
                borrarProyecto(project.id);
              }}
            >
              Eliminar
            </button>{" "}
            <button
              onClick={() => {
                editarProyecto(project.id);
              }}
            >
              Editar proyecto
            </button>
            
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
