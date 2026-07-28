// Importações corretas do Firebase via CDN para o navegador
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "SUA_API_KEY_REAL",
    authDomain: "escala-nova-d596e.firebaseapp.com",
    databaseURL: "https://escala-nova-d596e-default-rtdb.firebaseio.com",
    projectId: "escala-nova-d596e",
    storageBucket: "escala-nova-d596e.appspot.com",
    messagingSenderId: "SEU_MESSAGING_SENDER_ID",
    appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, set, onValue, update };
