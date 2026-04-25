import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/global.css";

function AlumnosLista({ onEditar }) {
    const [alumnos, setAlumnos] = useState([]);
    const [error, setError] = useState("");
    const [mostrarError, setMostrarError] = useState(false);

    const cargarAlumnos = () => {
        api.get("/alumnos")
            .then(res => {
                const ordenados = [...res.data].sort((a, b) =>
                    a.apellido.localeCompare(b.apellido)
                );
                setAlumnos(ordenados);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        cargarAlumnos();
    }, []);

    const eliminarAlumno = (alumno) => {
        api.delete(`/alumnos/${alumno.id}`)
            .then(() => {
                cargarAlumnos();
            })
            .catch((error) => {
                const mensaje = error.response?.data?.message;

                setError(
                    mensaje ||
                    "Error: " +
                    alumno.nombre + " " + alumno.apellido +
                    " tiene notas registradas en el sistema, eliminelas primero para proceder con la eliminación del alumno"
                );

                setMostrarError(true);
            });
    };

    return (
        <div className="container">

            <h2 className="title">Lista de Alumnos</h2>

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
                {alumnos.map(alumno => (
                    <li key={alumno.id} className="item">

                        <div className="text">
                            {alumno.apellido} {alumno.nombre}
                        </div>

                        <div className="text">
                            {alumno.email}
                        </div>

                        <div className="text">
                            {alumno.fechaNacimiento}
                        </div>

                        <div className="buttons">
                            <button
                                className="editBtn"
                                onClick={() => onEditar(alumno)}
                            >
                                Editar
                            </button>

                            <button
                                className="deleteBtn"
                                onClick={() => eliminarAlumno(alumno)}
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

export default AlumnosLista;