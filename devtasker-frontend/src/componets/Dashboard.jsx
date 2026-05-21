export default function Dashboard({alCerrarSesion}) {
  
  function logout(){
    localStorage.removeItem("Token");
    alCerrarSesion(null);
  }

    const [projects, setProject] = [];
  
  return (
    <div>
      <h2>Mis projectos</h2>

    <button onClick={logout}>Cerrar sesion</button>

    </div>
  );
}
