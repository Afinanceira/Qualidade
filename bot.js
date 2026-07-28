const { Client, GatewayIntentBits } = require('discord.js');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, onSnapshot } = require('firebase/firestore');

// Configuração do Firebase integrada ao seu projeto
const firebaseConfig = {
    apiKey: "AIzaSyDZl8qK9...",
    authDomain: "afinanceira-qualidade.firebaseapp.com",
    projectId: "afinanceira-qualidade",
    storageBucket: "afinanceira-qualidade.appspot.com",
    messagingSenderId: "105839201928",
    appId: "1:105839201928:web:abcdef123456"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Configuração do Cliente do Discord com os intents necessários
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ]
});

client.once('ready', () => {
    console.log(`✅ Bot conectado com sucesso como ${client.user.tag}`);
    
    // Inicia o monitoramento em tempo real da pílula direto do Firebase
    monitorarPilula();
});

// Função que vigia a alteração da pílula em tempo real e envia para o Discord
function monitorarPilula() {
    const pilulaRef = doc(db, "config", "pilula_atual");
    
    onSnapshot(pilulaRef, async (docSnap) => {
        if (docSnap.exists()) {
            const dados = docSnap.data();
            console.log("📌 Nova pílula detectada no banco:", dados.conteudo);
            
            try {
                const canalId = "1526128249111842996"; 
                const canal = await client.channels.fetch(canalId);
                
                if (canal) {
                    await canal.send(`💡 **Nova Pílula de Conhecimento:**\n\n${dados.conteudo}`);
                    console.log("✅ Pílula enviada com sucesso para o canal do Discord!");
                }
            } catch (error) {
                console.error("❌ Erro ao enviar pílula para o Discord:", error);
            }
        }
    });
}

// Token de autenticação do seu bot do Discord
client.login('MTM0OTAyNDc5MjIwNDU1NzM5NA.G..._ExemploTokenSeguro');