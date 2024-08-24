import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiPencil, BiTrash } from "react-icons/bi";
import { MainTableSelect, MainTableLineTitle, MainTable } from "@/components/common/MainTable";
import DisciplineContext from "@/contexts/DisciplinesContext";
import { DisciplineThemeInterface } from "@/interfaces/DisciplinesInterface";
import ThemeModule from "@/components/ThemeModule";
import { calcPercent } from "@/utils/calcPercent";
import clsx from "clsx";
import TitleSection from "@/components/common/TitleSection";

export default function DisciplineShow() {
  const { id } = useParams();
  const { getDocById, discipline } = useContext(DisciplineContext);

  useEffect(() => {
    if(id) {
      getDocById(id);
    }
  }, []);

  const getOptions = (theme: DisciplineThemeInterface) => {
    const { modules } = theme;
    return modules.map((module) => <ThemeModule key={module.id} module={module}/>)
  }

  const renderPercentWithMotivacionalPrhase = (theme: DisciplineThemeInterface) => {
    const { modules } = theme;
    const modulesChecked = modules.filter((module) => module.checked);
    const { percent, motivationalPhrase, bgColor } = calcPercent(modulesChecked.length, modules.length, true);

    return (<div
              style={{
                background: bgColor
              }}
              className={clsx("py-2 px-5 rounded-full")}>
            <span>{`${percent}% - ${motivationalPhrase}`}</span>
          </div>)
  }

  return <>
    <TitleSection text={`Matéria detalhada: ${discipline.name}`}/>
    <MainTable>
      {
        discipline.themes?.map((theme) => <MainTableSelect key={theme.title} options={getOptions(theme)}>
          <MainTableLineTitle text={theme.title} />
          <div className="flex items-center gap-7">
            <IoIosArrowDown/>
            <button><BiPencil/></button>
            <button><BiTrash/></button>
            {renderPercentWithMotivacionalPrhase(theme)}
          </div>
      </MainTableSelect>)

      }
    </MainTable>
  </>
}