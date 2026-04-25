import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/global.css";

function MateriasLista({ onEditar }) {
    const [materias, setMaterias] = useState([]);
    const [error, setError] = useState("");
    const [mostrarError, setMostrarError] = useState(false);

    const cargarMaterias = () => {
        api.get("/materias")
            .then(res => {
                const ordenadas = [...res.data].sort((a, b) =>
                    a.nombre.localeCompare(b.nombre)
                );
                setMaterias(ordenadas);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        cargarMaterias();
    }, []);

    const eliminarMateria = (materia) => {
        api.delete(`/materias/${materia.id}`)
            .then(() => {
                cargarMaterias();
            })
            .catch((error) => {
                const mensaje = error.response?.data?.message;

                setError(
                    mensaje ||
                    "Error: La materia " +
                    materia.nombre +
                    " tiene notas registradas en el sistema, eliminelas primero para proceder con la eliminación de la materia"
                );

                setMostrarError(true);
            });
    };

    return (
        <div className="container">

            <h2 className="title">Lista de Materias</h2>

            {mostrarError && (
                <div className="modalOverlay">
                    <div className="modal">
                        <p>{error}</p>

                        <button
                            className="modalBtn"
                            onClick={() => setMostrarError(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            <ul className="list">
                {materias.map(materia => (
                    <li key={materia.id} className="materiaItem">

                        <div className="materiaText">
                            {materia.nombre}
                        </div>

                        <div className="materiaButtons">
                            <button
                                className="editBtn"
                                onClick={() => onEditar(materia)}
                            >
                                Editar
                            </button>

                            <button
                                className="deleteBtn"
                                onClick={() => eliminarMateria(materia)}
                            >
                                Eliminar
                            </button>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MateriasLista;