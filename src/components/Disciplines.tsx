import { useContext, useEffect } from "react";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiTrash } from "react-icons/bi";

import { MainTable, MainTableLine, MainTableLineTitle } from "@/components/common/MainTable";
import DisciplineContext from "@/contexts/DisciplinesContext";
import { getMotivationalPhrase } from "@/utils/calcPercent";
import clsx from "clsx";
import Discipline from "@/domain/Discipline";

export default function Disciplines() {
  const { getAllDisciplines, deleteDiscipline, disciplines, loading } = useContext(DisciplineContext);

  useEffect(() => {
    getAllDisciplines('disciplines');
  }, []);

  const renderPercentWithMotivacionalPhrase = (discipline: any) => {
    const { motivationalPhrase, bgColor } = getMotivationalPhrase(Number(discipline.percent));

    return <div
              style={{
                background: bgColor
              }}
              className={clsx("py-2 px-5 rounded-full")}>
            <span>{`${discipline.percent}% - ${motivationalPhrase}`}</span>
          </div>
  }

  const handleDelete = async (discipline: Discipline) => {
    try {
      await deleteDiscipline(discipline);
      getAllDisciplines('disciplines');
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <>
    <MainTable>
      {
        loading ?
        <p>Carregando..</p>
        : disciplines.map((discipline) => <MainTableLine key={discipline.id}>
          <MainTableLineTitle text={discipline.name} />
          <div className="flex items-center gap-7">
            <Link to={`disciplines/${discipline.id}`}><BsEye/></Link>
            {/* <button><BiPencil/></button> */}
            <button onClick={() => handleDelete(discipline)}><BiTrash/></button>
            { renderPercentWithMotivacionalPhrase(discipline) }
          </div>
        </MainTableLine>)
      }
    </MainTable>
    </>
  )

}