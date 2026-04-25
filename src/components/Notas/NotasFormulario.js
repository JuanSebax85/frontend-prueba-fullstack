import { useEffect, useState } from "react";
import api from "../../services/api";

function NotasFormulario({ notaSeleccionada, alGuardar }) {
    const [alumnos, setAlumnos] = useState([]);
    const [materias, setMaterias] = useState([]);

    const [nota, setNota] = useState({
        id: null,
        alumnoId: "",
        materiaId: "",
        valor: ""
    });

    useEffect(() => {
        api.get("/alumnos").then(res => {
            const ordenados = [...res.data].sort((a, b) =>
                a.apellido.localeCompare(b.apellido)
            );
            setAlumnos(ordenados);
        });

        api.get("/materias").then(res => setMaterias(res.data));
    }, []);

    useEffect(() => {
        if (notaSeleccionada) {
            setNota({
                id: notaSeleccionada.id,
                alumnoId: notaSeleccionada.alumnoId,
                materiaId: notaSeleccionada.materiaId,
                valor: notaSeleccionada.valor
            });
        }
    }, [notaSeleccionada]);

    const manejarCambio = (e) => {
        setNota({
            ...nota,
            [e.target.name]: e.target.value
        });
    };

    const enviar = (e) => {
        e.preventDefault();

        const payload = {
            id: nota.id,
            valor: nota.valor,
            alumno: { id: nota.alumnoId },
            materia: { id: nota.materiaId }
        };

        if (nota.id) {
            api.put(`/notas/${nota.id}`, payload)
                .then(() => {
                    alGuardar();
                    setNota({ alumnoId: "", materiaId: "", valor: "" });
                });
        } else {
            api.post("/notas", payload)
                .then(() => {
                    alGuardar();
                    setNota({ alumnoId: "", materiaId: "", valor: "" });
                });
        }
    };
    return (
        <div className="container">
            <h2 className="title">Registrar Nota</h2>

            <form className="form" onSubmit={enviar}>

                <select
                    className="input"
                    name="alumnoId"
                    value={nota.alumnoId}
                    onChange={manejarCambio}
                >
                    <option value="">Seleccionar alumno</option>
                    {alumnos.map(a => (
                        <option key={a.id} value={a.id}>
                            {a.apellido} {a.nombre}
                        </option>
                    ))}
                </select>

                <select
                    className="input"
                    name="materiaId"
                    value={nota.materiaId}
                    onChange={manejarCambio}
                >
                    <option value="">Seleccionar materia</option>
                    {materias.map(m => (
                        <option key={m.id} value={m.id}>
                            {m.nombre}
                        </option>
                    ))}
                </select>

                <input
                    className="input"
                    type="number"
                    step="0.1"
                    name="valor"
                    placeholder="Nota"
                    value={nota.valor}
                    onChange={manejarCambio}
                />

                <button className="button" type="submit">
                    Guardar Nota
                </button>

            </form>
        </div>
    );
}

export default NotasFormulario;