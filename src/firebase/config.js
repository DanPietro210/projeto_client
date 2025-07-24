// Importe as funções que você precisa do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Sua configuração do Firebase vem das variáveis de ambiente
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporte o serviço do Firestore para ser usado em outras partes do seu app
export const db = getFirestore(app);