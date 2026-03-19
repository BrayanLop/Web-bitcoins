import { useState } from "react";

function Semaforo(){

    const [colorLuz, setColorLuz] = useState("rojo");

    const manejarCiclo = () => {
        setColorLuz(colorLuz === "rojo" ? "verde" : "rojo");
    }

    return(
        <>
        <div className="contenedor-semaforo">
        <div className="caja-luz">
            <div
            className="circulo-brillante"
            style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: colorLuz === "rojo" ? "red" : "green",
                boxShadow: "0 0 10px " + (colorLuz === "rojo" ? "red" : "green"),
                margin: "auto"
            }}
            ></div>
        </div>
        </div>
        <button onClick={manejarCiclo}>{colorLuz === "rojo" ? "Cambiar a verde" : "Cambiar a rojo"}</button>

        </>
    )
}

export { Semaforo }