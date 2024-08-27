import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, getFirestore } from "firebase/firestore";
import FirebaseApp from './FirebaseConfig';
import rescueError from '@/utils/rescueError';

class FirbaseProvider {

  async getDocsByCollection(collectionName: string) {
    try {
      const db = getFirestore(FirebaseApp)
      const querySnapshot = await getDocs(collection(db, collectionName));

      const docs = querySnapshot.docs.map(doc => {
        const { name, difficult_level, period, themes, percent } = doc.data();
        return { id: doc.id, name, difficult_level, period, themes, percent };
      });
      return docs;
    } catch (error) {
      rescueError(error);
    }
  }

  async getDocById(collectionName: string, docId: string) {
    try {
      const db = getFirestore(FirebaseApp)
      const docRef = doc(db, collectionName, docId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const { name, difficult_level, period, themes, percent } = docSnapshot.data();

        return { id: docSnapshot.id, name, difficult_level, period, themes, percent };
      } else {
        throw new Error("Documento não encontrado");
      }
    } catch (error) {
      rescueError(error);
    }
  }

  async createDoc(collectionName:string, params:any) {
    try {
      const db = getFirestore(FirebaseApp)
      const docRef = await addDoc(collection(db, collectionName), {
       name: params.name,
       period: params.period,
       difficult_level: params.difficult_level,
       themes: params.themes
     });

     return docRef.id;
    } catch (error) {
      rescueError(error);
    }
  }

  async updateDoc(collectionName: string, docId: string, params: any) {
    try {
      const db = getFirestore(FirebaseApp)
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, params);

      return `Documento ${docId} atualizado com sucesso`;
    } catch (error) {
      rescueError(error);
    }
  }

  async deleteDoc(collectionName: string, docId: string) {
    try {
      const db = getFirestore(FirebaseApp)
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      return `Documento ${docId} deletado com sucesso`;
    } catch (error) {
      rescueError(error);
    }
  }
}

export default FirbaseProvider;