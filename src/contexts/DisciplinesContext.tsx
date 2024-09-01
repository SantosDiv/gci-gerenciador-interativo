import { createContext, useState } from "react";
import FirebaseProvider from "@/integrations/firebase/FirebaseProvider";
import Discipline from "@/domain/Discipline";
import { CreateDisciplineParams } from "@/interfaces/joiValidationInterface";

interface DisciplineContextInterface {
  disciplines: Discipline[];
  discipline: Discipline;
  loading: boolean;
  currentUser: UserInterface | null;
  getAllDisciplines(collectionName: string): Promise<void>;
  getDisciplineById(docId: string): Promise<void>
  updateDiscipline(params: Discipline): Promise<void>
  createDiscipline(params: CreateDisciplineParams): Promise<void>
  deleteDiscipline(discipline: Discipline): Promise<void>
  setCurrentUser(user: UserInterface): void
}

export interface UserInterface {
  uid: string;
  email: string;
}

const DisciplineContext = createContext<DisciplineContextInterface>({} as DisciplineContextInterface);

export const DisciplineContextProvider = ({ children }:any) => {
  const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [discipline, setDiscipline] = useState<Discipline>({} as Discipline);
  const [loading, setLoading] = useState(false);
  const firebaseProvider = new FirebaseProvider();

  const getAllDisciplines = async (collectionName:string) => {
    setLoading(true);
    const result = await firebaseProvider.getDocsByCollection(collectionName, currentUser);
    if (result) {
      //@ts-ignore
      const disciplinesClass = result.map((item) => new Discipline(item));
      setDisciplines(disciplinesClass);
      setLoading(false)
    }
  }

  const getDisciplineById = async (docId:string) => {
    setLoading(true)
    const result = await firebaseProvider.getDocById('disciplines', docId);
    if (result) {
      //@ts-ignore
      const disciplineClass = new Discipline(result);
      setDiscipline(disciplineClass);
      setLoading(false);
    }
  }

  const updateDiscipline = async (discipline: Discipline) =>  {
    setLoading(true)
    await firebaseProvider.updateDoc('disciplines', discipline.id, discipline.toMap())
    setDiscipline(discipline);
    setLoading(false);
  }

  const createDiscipline = async (params: CreateDisciplineParams) => {
    setLoading(true);
    await firebaseProvider.createDoc('disciplines', params, currentUser);
    setLoading(false);
  }

  const deleteDiscipline = async(discipline: Discipline) => {
    setLoading(true);
    await firebaseProvider.deleteDoc('disciplines', discipline.id);
    setLoading(false);
  }

  return (
    <DisciplineContext.Provider
      value={{
        discipline,
        disciplines,
        loading,
        currentUser,
        getAllDisciplines,
        getDisciplineById,
        updateDiscipline,
        createDiscipline,
        deleteDiscipline,
        setCurrentUser
      }}
    >
      {children}
    </DisciplineContext.Provider>
  )
}

export default DisciplineContext;