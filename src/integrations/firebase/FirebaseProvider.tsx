import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, getFirestore } from "firebase/firestore";
import FirebaseApp from './FirebaseConfig';
import rescueError from '@/utils/rescueError';

class FirbaseProvider {
  private _db;

  constructor(){
    this._db = getFirestore(FirebaseApp)
  }

  async getDocsByCollection(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(this._db, collectionName));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name, ...doc.data() }));
      return docs;
    } catch (error) {
      rescueError(error);
    }
  }

  async getDocById(collectionName: string, docId: string) {
    try {
      const docRef = doc(this._db, collectionName, docId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() };
      } else {
        throw new Error("Documento não encontrado");
      }
    } catch (error) {
      rescueError(error);
    }
  }

  async createDoc(collectionName:string, params:any) {
    try {
      const docRef = await addDoc(collection(this._db, collectionName), {
       name: params.name,
       period: params.period,
       difficult_level: params.difficultLevel
     });

     return docRef.id;
    } catch (error) {
      rescueError(error);
    }
  }

  async updateDoc(collectionName: string, docId: string, params: any) {
    try {
      const docRef = doc(this._db, collectionName, docId);
      await updateDoc(docRef, {
        name: params.name,
        period: params.period,
        difficult_level: params.difficultLevel
      });

      return `Documento ${docId} atualizado com sucesso`;
    } catch (error) {
      rescueError(error);
    }
  }

  async deleteDoc(collectionName: string, docId: string) {
    try {
      const docRef = doc(this._db, collectionName, docId);
      await deleteDoc(docRef);
      return `Documento ${docId} deletado com sucesso`;
    } catch (error) {
      rescueError(error);
    }
  }
}

export default FirbaseProvider;