import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from 'firebase/auth'; 


const firebaseApp = initializeApp({
    apiKey: "AIzaSyB5mR5gRbbdwmae5SV6mNUATaqi-_0uvK0",
    authDomain: "reactgf-960c4.firebaseapp.com",
    projectId: "reactgf-960c4",
    storageBucket: "reactgf-960c4.appspot.com",
    messagingSenderId: "898567524684",
    appId: "1:898567524684:web:c7f38b4e0005acf3087fe9",
    measurementId: "G-DT2746P505"
  });

  

  const db = getFirestore(firebaseApp);
  const dbFunc = collection(db, "funcionarios");
  const auth = getAuth(firebaseApp);

  export { auth, db, dbFunc };

  /* useEffect(() => {
    const getFuncionarios = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        setFuncionarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Erro ao recuperar funcionários:", error);
      }
    };

    getFuncionarios();
  }, []); */
  