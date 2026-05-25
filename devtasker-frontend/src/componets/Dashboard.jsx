import { useEffect } from "react";
import { useState } from "react";

export default function Dashboard({ alCerrarSesion }) {
  const [projects, setProject] = useState([]);
  const [nombreNuevoProyecto, setNombreNuevoProyecto] = useState("");
  const [descripcionNuevoProyecto, setDescriptcionNuevoProyecto] = useState("");
  const [tasks, setTasks] = useState([]);
  const [nombreNuevaTarea, setNombreNuevaTarea] = useState("");
  const [descripcionNuevaTarea, setDescripcionNuevaTarea] = useState("");
  const [proyectoActual, setProyectoActual] = useState(null);

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

    const validacionTareas = await respuesta.json();

    setProject([...projects, validacionTareas]);

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

    const tareas = await respuesta.json();

    if (respuesta.ok) {
      setTasks(tareas);
    }
  };

  const crearTarea = async (event, $idProyecto) => {
    event.preventDefault();

    const respuesta = await fetch(`http://localhost:8000/api/tareas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({
        title: nombreNuevaTarea,
        description: descripcionNuevaTarea,
        project_id: $idProyecto,
      }),
    });

    const validacion = await respuesta.json();

    if (respuesta.ok) {
      setTasks([...tasks, validacion]);

      setNombreNuevaTarea("");
      setDescripcionNuevaTarea("");
    }
  };

  return (
    <div>
      <button onClick={logout}>Cerrar sesion</button>
      <h2>Mis projectos</h2>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            onClick={() => {
              seleccionarProyecto(project.id);
              setProyectoActual(project);
            }}
          >
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

      <h2>Tareas del proyecto</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title} </li>
        ))}
      </ul>

      <form onSubmit={(event) => crearTarea(event, proyectoActual.id)}>
        <label htmlFor="">Nombre Tarea: </label>
        <input
          type="text"
          name="nombreTarea"
          id="nombreTarea"
          value={nombreNuevaTarea}
          onChange={(event) => setNombreNuevaTarea(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="">Description: </label>
        <input
          type="text"
          name="descripcionTarea"
          id="descripcionTarea"
          value={descripcionNuevaTarea}
          onChange={(event) => setDescripcionNuevaTarea(event.target.value)}
        />{" "}
        <br />
        <input type="submit" value="Añadir Tarea" />
      </form>
    </div>
  );
}
