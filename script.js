import { db } from './firebaseConfig.js';
import { doc, setDoc, collection, onSnapshot, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const txtPilula = document.getElementById("texto-pilula-qualidade");
const btnPublicar = document.getElementById("btn-publicar-pilula");
const tabelaStatus = document.getElementById("tabela-status-leitura");

// 1. Carrega a pílula atual ao abrir a página
const pilulaRef = doc(db, "config", "pilula_atual");
onSnapshot(pilulaRef, (docSnap) => {
    if (docSnap.exists()) {
        txtPilula.value = docSnap.data().conteudo || "";
    }
});

// 2. Ação ao clicar em Publicar
btnPublicar.addEventListener("click", async () => {
    const conteudo = txtPilula.value.trim();
    if (!conteudo) {
        alert("A pílula não pode estar vazia.");
        return;
    }

    try {
        const dataHoje = new Date().toLocaleDateString('pt-BR');
        
        // Salva a pílula e reseta o status de confirmações do dia no Firebase
        await setDoc(pilulaRef, {
            conteudo: conteudo,
            data: dataHoje,
            timestamp: Date.now()
        });

        alert("✅ Pílula publicada com sucesso no banco de dados!");
        
        // Aqui entra a chamada para o Bot do Discord disparar as DMs (Frente 2)
        // dispararBotDiscord(conteudo);

    } catch (error) {
        console.error("Erro ao publicar pílula:", error);
        alert("Erro ao salvar a pílula.");
    }
});

// 3. Monitora em tempo real quem confirmou a leitura
onSnapshot(collection(db, "confirmacoes_pilula"), (snapshot) => {
    tabelaStatus.innerHTML = "";
    if (snapshot.empty) {
        tabelaStatus.innerHTML = `<tr><td colspan="3" style="padding: 10px; color: #a0aec0; text-align: center;">Nenhuma confirmação registrada hoje.</td></tr>`;
        return;
    }

    snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        const statusCor = d.lido ? "#28a745" : "#dc3545";
        const statusTexto = d.lido ? "✅ Lido" : "⏳ Pendente";
        
        tabelaStatus.innerHTML += `
            <tr style="border-bottom: 1px solid #28a745;">
                <td style="padding: 10px;">${d.nome_atendente}</td>
                <td style="padding: 10px;"><span style="color: ${statusCor}; font-weight: bold;">${statusTexto}</span></td>
                <td style="padding: 10px; color: #a0aec0;">${d.horario || '-'}</td>
            </tr>
        `;
    });
});