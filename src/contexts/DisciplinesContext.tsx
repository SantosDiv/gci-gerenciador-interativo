import { createContext, useState } from "react";
import FirebaseProvider from "@/integrations/firebase/FirebaseProvider";
import { DisciplineInterface } from "@/interfaces/DisciplinesInterface";

interface DisciplineContextInterface {
  disciplines: DisciplineInterface[];
  discipline: DisciplineInterface;
  getDocsByCollectionName(collectionName: string): Promise<void>;
  getDocById(docId: string): Promise<void>
}

const DisciplineContext = createContext<DisciplineContextInterface>({} as DisciplineContextInterface);

export const DisciplineContextProvider = ({ children }:any) => {
  const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([]);
  const [discipline, setDiscipline] = useState<DisciplineInterface>({} as DisciplineInterface);
  const [wasUpdated, setWasUpdated] = useState(true);
  const firebaseProvider = new FirebaseProvider();

  const getDocsByCollectionName = async (collectionName:string) => {
    if(!wasUpdated) {
      return;
    }

    // const result = await firebaseProvider.getDocsByCollection(collectionName);
    // if (result) {
    //   setDisciplines(result);
    //   setWasUpdated(false);
    // }

    setDisciplines([{
      id: "dsdsd",
      name: "Sistemas de informação",
      period: "2024.1",
      difficult_level: 3,
      themes: [{title: 'Tema 1', modules: [{ id: 1, title: "Modulo 1", anotations: [{ title: 'Anotação 1', text: "TEstando"}], checked: false}]}]
    }])
  }

  const getDocById = async (docId:string) => {
    // const result = await firebaseProvider.getDocById('disciplines', docId);
    // if (result) {
    //   setDiscipline(result);
    //   setWasUpdated(false);
    // }

    setDiscipline({
      id: "dsdsd",
      name: "Sistemas de informação",
      period: "2024.1",
      difficult_level: 3,
      themes: [
        {title: 'Tema 1', modules: [{ id: 1, title: "Modulo 1", anotations: [{ title: 'Anotação 1', text: "TEstando"}], checked: false}]},
        {title: 'Tema 2', modules: [{ id: 2, title: "Modulo 1", anotations: [{ title: 'Anotação 1', text: "TEstando"}], checked: true}]},
        {title: 'Tema 3', modules: [{ id: 3, title: "Modulo 1", anotations: [{ title: 'Anotação 1', text: "TEstando"}], checked: false}]}
      ]
    })
  }

  return (
    <DisciplineContext.Provider
      value={{
        discipline,
        disciplines,
        getDocsByCollectionName,
        getDocById
      }}
    >
      {children}
    </DisciplineContext.Provider>
  )
}

export default DisciplineContext;