import { useEffect, useState } from "react";

interface QtyStepperProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

/**
 * Selector de cantidad "− [n] +". El número también se puede escribir a mano.
 * Mientras se escribe se permite dejarlo vacío; al salir del campo (o con Enter) se corrige
 * a un entero entre min y max.
 */
const QtyStepper = ({ value, onChange, min = 1, max = 999 }: QtyStepperProps) => {
    const [texto, setTexto] = useState(String(value));

    // Si el valor cambia desde afuera (botones, otro componente), actualizamos el campo.
    useEffect(() => {
        setTexto(String(value));
    }, [value]);

    const limitar = (n: number) => Math.min(max, Math.max(min, Math.round(n)));

    const confirmar = () => {
        const n = parseInt(texto, 10);
        const final = Number.isNaN(n) ? value : limitar(n);
        setTexto(String(final));
        if (final !== value) onChange(final);
    };

    return (
        <div className="qty-stepper">
            <button type="button" aria-label="Restar" onClick={() => onChange(limitar(value - 1))}>−</button>
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={String(max).length}
                aria-label="Cantidad"
                value={texto}
                onChange={(e) => {
                    const limpio = e.target.value.replace(/\D/g, "").slice(0, String(max).length);
                    setTexto(limpio);
                    const n = parseInt(limpio, 10);
                    if (!Number.isNaN(n) && n >= min) onChange(limitar(n));
                }}
                onBlur={confirmar}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        (e.target as HTMLInputElement).blur();
                    }
                }}
                onFocus={(e) => e.target.select()}
            />
            <button type="button" aria-label="Sumar" onClick={() => onChange(limitar(value + 1))}>+</button>
        </div>
    );
};

export default QtyStepper;
