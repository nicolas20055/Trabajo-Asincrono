const apiKey = "AIzaSyCzqzFfoxqq7TrB4pa12aUiLB1tQU35pUI"; // Reemplázala con tu clave real
const model = "gemini-1.5-pro"; // Modelo correcto

const cuentos = {
    "cuento1": "Había una vez un reino encantado donde los animales hablaban y la magia era parte de la vida cotidiana...",
    "cuento2": "Un astronauta quedó varado en un planeta desconocido, donde descubrió formas de vida nunca antes vistas...",
    "cuento3": "En una ciudad futurista, un joven programador creó una inteligencia artificial que cambió el mundo..."
};

document.querySelector("#preguntaForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    desactivarBoton();

    const pregunta = document.querySelector("#pregunta").value.toLowerCase();
    const resultado = document.querySelector("#resultado");

    let textoParaEnviar = "";

    if (pregunta.includes("resumen cuento 1")) {
        textoParaEnviar = `Hazme un resumen de este cuento: ${cuentos.cuento1}`;
    } else if (pregunta.includes("resumen cuento 2")) {
        textoParaEnviar = `Hazme un resumen de este cuento: ${cuentos.cuento2}`;
    } else if (pregunta.includes("resumen cuento 3")) {
        textoParaEnviar = `Hazme un resumen de este cuento: ${cuentos.cuento3}`;
    } else {
        textoParaEnviar = pregunta; // Si no es un resumen, envía la pregunta normal
    }

    try {
        const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;
        
        const requestBody = {
            contents: [{ role: "user", parts: [{ text: textoParaEnviar }] }]
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Error:", data);
            resultado.textContent = `Error: ${data.error.message}`;
        } else {
            resultado.textContent = data.candidates[0].content.parts[0].text;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        resultado.textContent = "Error al conectar con la API.";
    }

    activarBoton();
});

function desactivarBoton() {
    const botonenviar = document.querySelector("#botonenviar");
    botonenviar.disabled = true;
    botonenviar.textContent = "Procesando...";
}

function activarBoton() {
    const botonenviar = document.querySelector("#botonenviar");
    botonenviar.disabled = false;
    botonenviar.textContent = "Enviar";
}
