import { useContext, useEffect } from "react";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiPencil, BiTrash } from "react-icons/bi";

import { MainTable, MainTableLine, MainTableLineTitle } from "@/components/common/MainTable";
import DisciplineContext from "@/contexts/DisciplinesContext";

export default function Disciplines() {
  const { getDocsByCollectionName, disciplines } = useContext(DisciplineContext);

  useEffect(() => {
    getDocsByCollectionName('disciplines');
  }, []);

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
            <div className="bg-greeGCI-600 py-2 px-5 rounded-full">
              <span>{80}% - Falta Pouco!</span>
            </div>
          </div>
        </MainTableLine>)
      }
    </MainTable>
    </>
  )

}