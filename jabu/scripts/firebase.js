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
  updateDoc,
  where
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
          bestScore: isNaN(value) ? parseInt(value) : value,
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
  

  async function getLeaderboard(idJogo) {
    return new Promise((resolve, reject) => {
      // Usa collectionGroup para buscar em toda a subcoleção Game_Stats
      const q = query(
        collectionGroup(db, "Game_Stats"),
        where("bestScore", ">", 0)
      );
  
      getDocs(q)
        .then((querySnapshot) => {
          const leaderboard = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
  
            // Confirma que o documento corresponde ao jogo específico
            if (doc.id === idJogo) {
              leaderboard.push({
                displayName: data.usuario,
                icon: data.avatarUrl,
                bestScore: data.bestScore,
              });
            }
          });
  
          // Ordena a leaderboard por pontuação em ordem decrescente
          resolve(leaderboard.sort((a, b) => b.bestScore - a.bestScore));
        })
        .catch((error) => {
          console.error("Erro ao obter leaderboard:", error);
          reject(error);
        });
    });
  }

  async function renameGameId(oldId, newId) {
  const q = query(collectionGroup(db, "Game_Stats"), where("bestScore", ">", 0));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docc) => {
        if (docc.id === oldId) {
      const docRef = docc.ref;
        const newDocRef = doc(db, `users/${docRef.parent.parent.id}/Game_Stats`, newId);
      const data = docc.data();
      await setDoc(newDocRef, data);
          await deleteDoc(docRef);
    }
  });
  }



  
  renameGameId("jogo2", "JogodaMemoria")


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
  verifyUser,
  getLeaderboard
};
