import { createContext, useState } from "react";
import FirebaseProvider from "@/integrations/firebase/FirebaseProvider";
import { DisciplineInterface } from "@/interfaces/DisciplinesInterface";

interface DisciplineContextInterface {
  disciplines: DisciplineInterface[]
  getDocsByCollectionName(collectionName: string): void;
}

const DisciplineContext = createContext<DisciplineContextInterface>({} as DisciplineContextInterface);

export const DisciplineContextProvider = ({ children }:any) => {
  const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([]);
  const firebaseProvider = new FirebaseProvider();

  const getDocsByCollectionName = async (collectionName:string) => {
    const result = await firebaseProvider.getDocsByCollection(collectionName);
    if (result) {
      setDisciplines(result);
    }
  }

  return (
    <DisciplineContext.Provider
      value={{
        disciplines,
        getDocsByCollectionName
      }}
    >
      {children}
    </DisciplineContext.Provider>
  )
}

export default DisciplineContext;