import { Link, useNavigate, createSearchParams } from "react-router-dom";
// import { BiTrash } from "react-icons/bi";
import { RiStickyNoteAddFill, RiStickyNoteFill } from "react-icons/ri";
import { GiPartyPopper } from "react-icons/gi";
import { BsCheckLg } from "react-icons/bs";
import { DisciplineModulesInterface, DisciplineThemeInterface } from "@/interfaces/DisciplinesInterface";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import DisciplineContext from "@/contexts/DisciplinesContext";
import Discipline from "@/domain/Discipline";
import { AnnotationResponseInterface } from "@/interfaces/AnnotationInterface";
import FirebaseProvider from '@/integrations/firebase/FirebaseProvider';
import { WhereFilterOp } from "firebase/firestore";
import Loading from "./common/Loading";

interface ThemeModuleProps {
  module:DisciplineModulesInterface;
  discipline: Discipline
  theme: DisciplineThemeInterface
}


export default function ThemeModule({ module, discipline }:ThemeModuleProps) {

  const { updateDiscipline, loading } = useContext(DisciplineContext);
  const [annotation, setAnnotation] = useState({} as AnnotationResponseInterface);

  const navigate = useNavigate();

  useEffect(() => {
    const getAnnotation = async () => {
      const firebaseProvider = new FirebaseProvider();
      const queries = [
        { key: 'userId', operation: '==' as WhereFilterOp, value: localStorage.getItem('uid')},
        { key: 'module_id', operation: '==' as WhereFilterOp, value: module.id},
      ]

      const response = await firebaseProvider.getDocByQuery('annotations', queries)

      if (response) {
        setAnnotation(response[0]);
      }
    }

    getAnnotation();
  }, []);

  const checkModule = async () => {
    discipline.changeStatusModule(module);

    await updateDiscipline(discipline);
  }

  const goToNewAnnotiation = () => {
    navigate({
      pathname:`/dashboard/annotations/new`,
      search: createSearchParams({
        module_id: module.id,
        module_name: module.title,
        discipline_title: discipline.name,
      }).toString(),
    })
  }


  if (loading) {
    return (
      <article className={clsx("flex justify-between items-center p-3 border-grayGCI-500 border-b-[1px] hover:bg-grayGCI-500")}>
        <span>Atualizando...</span>
      </article>
    )
  }

  return (
    <article className={clsx("flex justify-between items-center p-3 border-grayGCI-500 border-b-[1px] hover:bg-grayGCI-500", {
      "bg-greeGCI-600 text-white": module.checked
    })}>
      {/* check e title */}
      <div className="flex gap-5 items-center">
        <button
          onClick={checkModule}
          className={clsx("w-[20px] h-[20px] rounded-md bg-white flex items-center justify-center")}
        >
          {module.checked && <BsCheckLg className={clsx({
            "text-greeGCI-600": module.checked
          })}/>}
        </button>
        <h2>{module.title}</h2>
        { module.checked && <span className="flex gap-2 items-center">Concluído! <GiPartyPopper/></span>}
      </div>

      {/* annotations, delete */}
      {!annotation.id
      ? <Loading/>
      : <div className="flex items-center gap-4">
          { annotation.id
            ? <Link to={`/dashboard/annotations/${annotation.id}`}><RiStickyNoteFill className="cursor-pointer text-[20px]"/></Link>
            : <RiStickyNoteAddFill className="cursor-pointer text-[20px]" onClick={goToNewAnnotiation}/>
          }
        </div>}
    </article>
  )
}