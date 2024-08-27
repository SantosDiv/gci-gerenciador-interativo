import { useContext, useEffect } from "react";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiPencil, BiTrash } from "react-icons/bi";

import { MainTable, MainTableLine, MainTableLineTitle } from "@/components/common/MainTable";
import DisciplineContext from "@/contexts/DisciplinesContext";
import { getMotivationalPhrase } from "@/utils/calcPercent";
import clsx from "clsx";

export default function Disciplines() {
  const { getAllDisciplines, disciplines } = useContext(DisciplineContext);

  useEffect(() => {
    getAllDisciplines('disciplines');
  }, []);

  const renderPercentWithMotivacionalPhrase = (discipline: any) => {
    console.log(discipline);
    const { motivationalPhrase, bgColor } = getMotivationalPhrase(Number(discipline.percent));
    return <div
              style={{
                background: bgColor
              }}
              className={clsx("py-2 px-5 rounded-full")}>
            <span>{`${discipline.percent}% - ${motivationalPhrase}`}</span>
          </div>
  }

  return(
    <>
    <MainTable>
      {
        disciplines.map((discipline) => <MainTableLine>
          <MainTableLineTitle text={discipline.name} />
          <div className="flex items-center gap-7">
            <Link to={`disciplines/${discipline.id}`}><BsEye/></Link>
            <button><BiPencil/></button>
            <button><BiTrash/></button>
            { renderPercentWithMotivacionalPhrase(discipline) }
            {/* <div className="bg-greeGCI-600 py-2 px-5 rounded-full">
              <span>{}% - Falta Pouco!</span>
            </div> */}
          </div>
        </MainTableLine>)
      }
    </MainTable>
    </>
  )

}