import { createContext, useState } from "react";
import FirebaseProvider from "@/integrations/firebase/FirebaseProvider";
import Discipline from "@/domain/Discipline";
import { CreateDisciplineParams } from "@/interfaces/joiValidationInterface";

interface DisciplineContextInterface {
  disciplines: Discipline[];
  discipline: Discipline;
  loading: boolean;
  getAllDisciplines(collectionName: string): Promise<void>;
  getDisciplineById(docId: string): Promise<void>
  updateDiscipline(params: Discipline): Promise<void>
  createDiscipline(params: CreateDisciplineParams): Promise<void>
}

const DisciplineContext = createContext<DisciplineContextInterface>({} as DisciplineContextInterface);

export const DisciplineContextProvider = ({ children }:any) => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [discipline, setDiscipline] = useState<Discipline>({} as Discipline);
  const [loading, setLoading] = useState(false);
  const firebaseProvider = new FirebaseProvider();

  const getAllDisciplines = async (collectionName:string) => {
    setLoading(true);
    const result = await firebaseProvider.getDocsByCollection(collectionName);
    if (result) {
      const disciplinesClass = result.map((item) => new Discipline(item));
      setDisciplines(disciplinesClass);
      setLoading(false)
    }

    // setDisciplines([{
    //   id: "dsdsd",
    //   name: "Sistemas de informação",
    //   period: "2024.1",
    //   difficult_level: 3,
    //   themes: [{title: 'Tema 1', modules: [{ id: 1, title: "Modulo 1", anotations: [{ title: 'Anotação 1', text: "TEstando"}], checked: false}]}]
    // }])
  }

  const getDisciplineById = async (docId:string) => {
    setLoading(true)
    const result = await firebaseProvider.getDocById('disciplines', docId);
    if (result) {
      const disciplineClass = new Discipline(result);
      setDiscipline(disciplineClass);
      setLoading(false);
    }
    // const themes = [
    //   {title: 'Tema 1', percent: 0, modules: [{ id: 1, title: "Modulo 1", anotations: [{ title: 'Anotação 1', text: "TEstando"}], checked: false}]},
    //   {title: 'Tema 2', percent: 0, modules: [{ id: 2, title: "Modulo 1", anotations: [{ title: 'Anotação 1', text: "TEstando"}], checked: true}]},
    //   {title: 'Tema 3', percent: 0, modules: [{ id: 3, title: "Modulo 1", anotations: [{ title: 'Anotação 1', text: "TEstando"}], checked: false}]}
    // ]

    // setDiscipline(new Discipline({ id: 'sdsd', name: "Teste", period: "", difficult_level: 1, themes }))
  }

  const updateDiscipline = async (discipline: Discipline) =>  {
    setLoading(true)
    await firebaseProvider.updateDoc('disciplines', discipline.id, discipline.toMap())
    setDiscipline(discipline);
    setLoading(false);
  }

  const createDiscipline = async (params: CreateDisciplineParams) => {
    setLoading(true);
    await firebaseProvider.createDoc('disciplines', params);
    setLoading(false);
  }

  return (
    <DisciplineContext.Provider
      value={{
        discipline,
        disciplines,
        loading,
        getAllDisciplines,
        getDisciplineById,
        updateDiscipline,
        createDiscipline
      }}
    >
      {children}
    </DisciplineContext.Provider>
  )
}

export default DisciplineContext;