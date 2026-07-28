const { Client, GatewayIntentBits } = require('discord.js');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onChildAdded, update } = require('firebase/database');

// Configuração do Firebase com os dados do seu projeto
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "escala-nova-d596e.firebaseapp.com",
    databaseURL: "https://escala-nova-d596e-default-rtdb.firebaseio.com",
    projectId: "escala-nova-d596e",
    storageBucket: "escala-nova-d596e.appspot.com",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ]
});

const TOKEN = "MTUyNTc4NTY2NDMyOTg3NTQ3Ng.GTDvLe.1Wtnco6Ahw7NX1k5JbtwTaSVjXXqjWmc4GM86k";
const CHANNEL_ID = "1526129707257565204";

client.once('ready', () => {
    console.log(`Bot online e conectado como ${client.user.tag}`);
    escutarNovasPilulas();
});

function escutarNovasPilulas() {
    const pilulasRef = ref(db, 'pilulas');
    onChildAdded(pilulasRef, async (snapshot) => {
        const dados = snapshot.val();
        if (dados && dados.texto && !dados.enviado) {
            const canal = await client.channels.fetch(CHANNEL_ID);
            if (canal) {
                const mensagem = await canal.send(`💡 **Pílula de Conhecimento do Dia:**\n\n${dados.texto}`);
                
                await update(snapshot.ref, { enviado: true });
                await mensagem.react('✅');
            }
        }
    });
}

client.login(TOKEN);
