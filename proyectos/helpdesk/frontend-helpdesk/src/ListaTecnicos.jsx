export function ListaTecnicos({tecnicos}) {

  return (
    <div>
      <h2>Lista tecnicos</h2>
      <ul>
        {tecnicos.map((tec) => (
          <li key={tec.id}> Nombre del tecnico: {tec.nombre} </li>
        ))}
      </ul>
    </div>
  );
}
