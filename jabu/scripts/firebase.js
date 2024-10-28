// Firebase App (o núcleo do SDK Firebase) é sempre necessário
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

// Adiciona os produtos e métodos do Firebase que você quer usar
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

import {
  getFirestore,
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collectionGroup,
  orderBy, 
  limit,
  query,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";


// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCASGkjFTLBv64hoxcIZoMrhTEa62jvxMU",
  authDomain: "catalog-ed359.firebaseapp.com",
  projectId: "catalog-ed359",
  storageBucket: "catalog-ed359.appspot.com",
  messagingSenderId: "701733858632",
  appId: "1:701733858632:web:2bc7f61cf9119382ee577d"
};

// Inicializa o Firebase com a configuração fornecida
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Inicializa a autenticação
const db = getFirestore(app);  // Inicializa o Firestore (banco de dados)
const provider = new GoogleAuthProvider();  // Provedor de autenticação Google
let userUid = false;  // Variável para armazenar o UID do usuário logado

// Função para realizar o login usando o Google
function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(`Usuário ${result.user.displayName} logado com sucesso`);
      window.location.reload();
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
    });
}

// Escuta mudanças no estado de autenticação (login/logout)
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Se o usuário estiver logado, armazena o UID
    userUid = user.uid;

  } else {
    // Se não houver usuário logado, exibe mensagem no console
    console.log("Nenhum usuário está logado.");
  }
});

async function Send(idjogo, value) {
  const idJogo = idjogo;
      const docRef = doc(db, `users/${userUid}/Game_Stats`, idJogo);
      try {
        // Define os dados do 'jogo' no Firestore
        await setDoc(docRef, {
          timestamp: Date.now(),
          usuario: auth.currentUser.displayName,
          bestScore: parseInt(value),
          avatarUrl: auth.currentUser.photoURL,
          userUid: userUid,
        });
      } catch (error) {
        console.error(error); // Trata erros no envio dos dados
      }

  }

async function LerDados(idjogo) {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        const idJogo = idjogo;
        const docRef = doc(db, `users/${userUid}/Game_Stats`, idJogo);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const dat = docSnap.data();
             
            resolve(dat); // Resolve a Promise com os dados obtidos
          } else {
            console.log("Nenhuma mensagem encontrada");
            resolve({
              bestScore: 0,
            });
          }
        } catch (error) {
          console.error(error);
          reject(error); // Rejeita a Promise em caso de erro
        }
      });
    });
  }

  async function verifyUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (auth.currentUser) {
          resolve(auth.currentUser.displayName)
        } else {
        resolve(false)}
      });
    });
  }
  

// Exporta as funções e métodos para serem utilizados em outros módulos
export {
  auth,
  db,
  login,
  signOut,
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  onAuthStateChanged,
  userUid,
  getDocs,
  collectionGroup,
  orderBy,
  limit,
  query,
  deleteDoc,
  Send,
  updateDoc,
  LerDados,
  verifyUser
};
