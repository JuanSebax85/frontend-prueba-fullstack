import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/global.css";

function MateriasFormulario({ materiaSeleccionada, alGuardar }) {
    const [materia, setMateria] = useState({
        nombre: ""
    });

    const [error, setError] = useState("");
    const [mostrarError, setMostrarError] = useState(false);

    useEffect(() => {
        if (materiaSeleccionada) {
            setMateria(materiaSeleccionada);
        }
    }, [materiaSeleccionada]);

    const manejarCambio = (e) => {
        setMateria({
            ...materia,
            [e.target.name]: e.target.value
        });
    };

    const enviar = (e) => {
        e.preventDefault();

        if (!materia.nombre.trim()) {
            setError("El nombre de la materia es obligatorio");
            setMostrarError(true);
            return;
        }

        if (materia.id) {
            api.put(`/materias/${materia.id}`, materia)
                .then(() => alGuardar());
        } else {
            api.post("/materias", materia)
                .then(() => alGuardar());
        }

        setMateria({ nombre: "" });
    };

    return (
        <div className="container">

            <h2 className="title">
                {materia.id ? "Editar Materia" : "Crear Materia"}
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

            <form className="form" onSubmit={enviar}>

                <input
                    className="input"
                    name="nombre"
                    placeholder="Nombre de la materia"
                    value={materia.nombre}
                    onChange={manejarCambio}
                />

                <button className="button" type="submit">
                    Guardar
                </button>

            </form>
        </div>
    );
}

export default MateriasFormulario;