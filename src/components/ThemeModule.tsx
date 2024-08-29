import { Link } from "react-router-dom";
import { FaNoteSticky } from "react-icons/fa6";
// import { BiTrash } from "react-icons/bi";
import { GiPartyPopper } from "react-icons/gi";
import { BsCheckLg } from "react-icons/bs";
import { DisciplineModulesInterface, DisciplineThemeInterface } from "@/interfaces/DisciplinesInterface";
import clsx from "clsx";
import { useContext } from "react";
import DisciplineContext from "@/contexts/DisciplinesContext";
import Discipline from "@/domain/Discipline";

interface ThemeModuleProps {
  module:DisciplineModulesInterface;
  discipline: Discipline
  theme: DisciplineThemeInterface
}


export default function ThemeModule({ module, discipline }:ThemeModuleProps) {

  const { updateDiscipline, loading } = useContext(DisciplineContext);

  const checkModule = async () => {
    discipline.changeStatusModule(module);

    await updateDiscipline(discipline);
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
      <div className="flex items-center gap-4">
        { module.anotations?.length && <Link to="/"><FaNoteSticky/></Link>}
        {/* <button><BiTrash/></button> */}
      </div>
    </article>
  )
}