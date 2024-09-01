import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, getFirestore, query, where, WhereFilterOp } from "firebase/firestore";
import FirebaseApp from './FirebaseConfig';
import rescueError from '@/utils/rescueError';

interface UserInterface {
  uid: string;
  email: string;
}
class FirbaseProvider {

  async getDocByQuery(collectionName: string, queryParams: Array<{ key:string, operation:WhereFilterOp, value: any }>) {
    try {
      const db = getFirestore();

      const conditions = queryParams.map(({key, operation, value}) => where(key, operation, value))

      const q = query(
        collection(db, collectionName),
        ...conditions
      );

      const querySnapshot = await getDocs(q);

      const docs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });

      if (docs.length) {
        return docs;
      }

      return null;
    } catch (error) {
      rescueError(error);
    }
  }

  async getDocsByCollection(collectionName: string, currentUser?: UserInterface | null) {
    try {

      const db = getFirestore();
      const userId = currentUser?.uid || localStorage.getItem('uid') || '';

      const q = query(
        collection(db, collectionName),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(q);

      const docs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
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
        const data = docSnapshot.data();

        return { id: docSnapshot.id, ...data };
      } else {
        throw new Error("Documento não encontrado");
      }
    } catch (error) {
      rescueError(error);
    }
  }

  async createDoc(collectionName:string, params:any, currentUser?: UserInterface | null) {
    const userId = currentUser?.uid || localStorage.getItem('uid')|| '';

    try {
      const db = getFirestore(FirebaseApp)
      const docRef = await addDoc(collection(db, collectionName), {
        ...params,
        userId: userId,
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