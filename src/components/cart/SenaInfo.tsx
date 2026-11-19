import { toast } from "react-toastify";
import { METODOS_SENA, SENA_IMPORTANTE, SENA_MONTO } from "../../utils/sena";

const copiar = async (texto: string, label: string) => {
    try {
        await navigator.clipboard.writeText(texto);
        toast.success(`${label} copiado`);
    } catch {
        toast.error("No se pudo copiar. Seleccioná el número y copialo a mano.");
    }
};

/** Recuadro "¿Cómo señar? $2000" con los datos para pagar la seña. */
const SenaInfo = () => (
    <div className="sena-info">
        <div className="sena-info-head">
            <h4>¿Cómo señar?</h4>
            <span className="sena-info-amount">${SENA_MONTO}</span>
        </div>

        <div className="sena-info-methods">
            {METODOS_SENA.map((metodo, i) => (
                <div className="sena-info-method" key={metodo.titulo}>
                    <span className="sena-info-number">{i + 1}.</span>
                    <div>
                        <h5>{metodo.titulo}</h5>
                        {metodo.nota && <p className="sena-info-note">{metodo.nota}</p>}
                        <ul>
                            {metodo.datos.map(dato => (
                                <li key={dato.label}>
                                    <span>{dato.label}:</span> <strong>{dato.valor}</strong>
                                    {dato.copiable && (
                                        <button
                                            type="button"
                                            className="sena-info-copy"
                                            onClick={() => copiar(dato.valor, dato.label)}
                                            aria-label={`Copiar ${dato.label}`}
                                            title={`Copiar ${dato.label}`}
                                        >
                                            <i className="far fa-copy" />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>

        <div className="sena-info-important">
            <h6>Importante</h6>
            <p>{SENA_IMPORTANTE.join(" ")}</p>
        </div>
    </div>
);

export default SenaInfo;
