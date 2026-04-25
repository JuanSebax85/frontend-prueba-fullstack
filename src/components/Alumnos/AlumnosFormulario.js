import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/global.css";

function AlumnosFormulario({ alumnoSeleccionado, alGuardar }) {
    const [alumno, setAlumno] = useState({
        nombre: "",
        apellido: "",
        email: "",
        fechaNacimiento: ""
    });

    const [error, setError] = useState("");
    const [mostrarError, setMostrarError] = useState(false);

    useEffect(() => {
        if (alumnoSeleccionado) {
            setAlumno(alumnoSeleccionado);
        }
    }, [alumnoSeleccionado]);

    const manejarCambio = (e) => {
        setAlumno({
            ...alumno,
            [e.target.name]: e.target.value
        });
    };

    const enviarFormulario = (e) => {
        e.preventDefault();

        if (
            !alumno.nombre.trim() ||
            !alumno.apellido.trim() ||
            !alumno.email.trim() ||
            !alumno.fechaNacimiento
        ) {
            setError("Todos los campos son obligatorios");
            setMostrarError(true);
            return;
        }

        if (alumno.id) {
            api.put(`/alumnos/${alumno.id}`, alumno)
                .then(() => alGuardar());
        } else {
            api.post("/alumnos", alumno)
                .then(() => alGuardar());
        }

        setAlumno({
            nombre: "",
            apellido: "",
            email: "",
            fechaNacimiento: ""
        });
    };

    return (
        <div className="container">

            <h2 className="title">
                {alumno.id ? "Editar Alumno" : "Crear Alumno"}
            </h2>

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

            <form className="form" onSubmit={enviarFormulario}>

                <div className="row">
                    <input
                        className="input"
                        name="nombre"
                        placeholder="Nombre"
                        value={alumno.nombre}
                        onChange={manejarCambio}
                    />

                    <input
                        className="input"
                        name="apellido"
                        placeholder="Apellido"
                        value={alumno.apellido}
                        onChange={manejarCambio}
                    />
                </div>

                <input
                    className="input"
                    name="email"
                    placeholder="Email"
                    value={alumno.email}
                    onChange={manejarCambio}
                />

                <input
                    className="input"
                    type="date"
                    name="fechaNacimiento"
                    value={alumno.fechaNacimiento}
                    onChange={manejarCambio}
                />

                <button className="button" type="submit">
                    Guardar
                </button>

            </form>
        </div>
    );
}

export default AlumnosFormulario;