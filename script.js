import { db, ref, push, set } from "./firebaseConfig.js";

const btnPublicar = document.getElementById("btn-publicar-pilula");
const inputTexto = document.getElementById("texto-pilula-qualidade");

if (btnPublicar) {
    btnPublicar.addEventListener("click", async () => {
        const texto = inputTexto.value.trim();

        if (!texto) {
            alert("Por favor, digite o texto da pílula antes de publicar.");
            return;
        }

        try {
            // Referência para o Realtime Database
            const pilulasRef = ref(db, "pilulas");
            const novaPilulaRef = push(pilulasRef);

            await set(novaPilulaRef, {
                texto: texto,
                enviado: false,
                data: new Date().toISOString()
            });

            alert("Pílula publicada com sucesso! O bot a enviará para o Discord em instantes.");
            inputTexto.value = "";
        } catch (error) {
            console.error("Erro ao publicar:", error);
            alert("Erro ao publicar a pílula. Verifique o console.");
        }
    });
}
