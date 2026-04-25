import { useEffect, useState } from "react";
import api from "../../services/api";

function NotasLista({ onEditar }) {
    const [notas, setNotas] = useState([]);

    const cargar = () => {
        api.get("/notas")
            .then(res => {
                const ordenadas = res.data.sort((a, b) =>
                    a.alumnoApellido.localeCompare(b.alumnoApellido)
                );
                setNotas(ordenadas);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        cargar();
    }, []);

    const eliminarNota = (id) => {
        api.delete(`/notas/${id}`)
            .then(() => cargar())
            .catch(err => console.log(err));
    };

    return (
        <div className="container">

            <h2 className="title">Notas Registradas</h2>

            <ul className="list">

                {notas.map((n) => (
                    <li key={n.id} className="item">

                        <div className="text">
                            {n.alumnoApellido} {n.alumnoNombre}
                        </div>

                        <div className="text">
                            {n.materiaNombre}
                        </div>

                        <div className="text">
                            Nota: {n.valor}
                        </div>

                        <div className="buttons">

                            <button
                                className="editBtn"
                                onClick={() => onEditar?.(n)}
                            >
                                Editar
                            </button>

                            <button
                                className="deleteBtn"
                                onClick={() => eliminarNota(n.id)}
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

export default NotasLista;