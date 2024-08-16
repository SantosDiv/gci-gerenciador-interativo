import FirebaseConfi from '../FirebaseConfig';
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function Login() {

  const handleCreateDoc = async () => {
    // Initialize Firestore
    const db = getFirestore(FirebaseConfi);

    // Create a new document
    const docRef = await addDoc(collection(db, "disciplines"), {
      name: "Segurança da informação",
      id: 3,
      period: '2024.3',
      difficult_level: 3
    });

    alert(`Foi criado um documento de ID: ${docRef.id}`)
  }


  return <>
    <button onClick={handleCreateDoc}>Criar novo documento</button>
  </>
}