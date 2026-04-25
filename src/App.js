import { useState } from "react";
import AlumnosLista from "./components/Alumnos/AlumnosLista";
import AlumnosFormulario from "./components/Alumnos/AlumnosFormulario";
import MateriasLista from "./components/Materias/MateriasLista";
import MateriasFormulario from "./components/Materias/MateriasFormulario";
import NotasFormulario from "./components/Notas/NotasFormulario";
import NotasLista from "./components/Notas/NotasLista";

function App() {
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);

  const [refrescarAlumnos, setRefrescarAlumnos] = useState(false);
  const [refrescarMaterias, setRefrescarMaterias] = useState(false);
  const [refrescarNotas, setRefrescarNotas] = useState(false);

  const [vista, setVista] = useState("alumnos");

  const actualizarAlumnos = () => {
    setAlumnoSeleccionado(null);
    setRefrescarAlumnos(!refrescarAlumnos);
  };

  const actualizarMaterias = () => {
    setMateriaSeleccionada(null);
    setRefrescarMaterias(!refrescarMaterias);
  };

  const actualizarNotas = () => {
    setNotaSeleccionada(null);
    setRefrescarNotas(!refrescarNotas);
  };

  return (
    <div>

      <h1>Sistema de Gestión</h1>

      {/* MENÚ */}
      <div className="menu">
        <button onClick={() => setVista("alumnos")}>Alumnos</button>
        <button onClick={() => setVista("materias")}>Materias</button>
        <button onClick={() => setVista("notas")}>Notas</button>
      </div>

      {/* ALUMNOS */}
      {vista === "alumnos" && (
        <>
          <AlumnosFormulario
            alumnoSeleccionado={alumnoSeleccionado}
            alGuardar={actualizarAlumnos}
          />

          <AlumnosLista
            key={refrescarAlumnos}
            onEditar={setAlumnoSeleccionado}
          />
        </>
      )}

      {/* MATERIAS */}
      {vista === "materias" && (
        <>
          <MateriasFormulario
            materiaSeleccionada={materiaSeleccionada}
            alGuardar={actualizarMaterias}
          />

          <MateriasLista
            key={refrescarMaterias}
            onEditar={setMateriaSeleccionada}
          />
        </>
      )}

      {/* NOTAS */}
      {vista === "notas" && (
        <>
          <NotasFormulario
            notaSeleccionada={notaSeleccionada}
            alGuardar={actualizarNotas}
          />

          <NotasLista
            key={refrescarNotas}
            onEditar={setNotaSeleccionada}
          />
        </>
      )}

    </div>
  );
}

export default App;