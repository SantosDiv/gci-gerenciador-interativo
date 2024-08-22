import { useEffect, useState } from "react";
import FirebaseProvider from "@/integrations/firebase/FirebaseProvider";
import Discipline from "@/components/Discipline";

interface DisciplineInterface {
  id: string;
  name: string;
}

export default function Disciplines() {
  const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([]);

  useEffect(() => {
    const getDataDocs = async () => {
      const firebaseProvider = new FirebaseProvider();
      const result = await firebaseProvider.getDocsByCollection('disciplines');
      if (result) {
        setDisciplines(result);
      }
    }

    getDataDocs();
  }, [])

  return(
    <>
      {
        disciplines.map((discipline) => <Discipline key={discipline.id} title={discipline.name} id={discipline.id}/>)
      }
    </>
  )

}