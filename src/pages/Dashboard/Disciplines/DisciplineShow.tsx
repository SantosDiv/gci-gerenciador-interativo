import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
// import { BiPencil, BiTrash } from "react-icons/bi";
import { MainTableSelect, MainTableLineTitle, MainTable } from "@/components/common/MainTable";
import DisciplineContext from "@/contexts/DisciplinesContext";
import { DisciplineThemeInterface } from "@/interfaces/DisciplinesInterface";
import ThemeModule from "@/components/ThemeModule";
import { getMotivationalPhrase } from "@/utils/calcPercent";
import clsx from "clsx";
import TitleSection from "@/components/common/TitleSection";
import Loading from "@/components/common/Loading";

export default function DisciplineShow() {
  const { id } = useParams();
  const { getDisciplineById, discipline, loading } = useContext(DisciplineContext);

  useEffect(() => {
    if(id) {
      getDisciplineById(id);
    }
  }, []);

  const getOptions = (theme: DisciplineThemeInterface) => {
    const { modules } = theme;
    return modules.map((module) => <ThemeModule key={module.id} module={module} theme={theme} discipline={discipline} />)
  }

  const renderPercentWithMotivacionalPhrase = (percent: number) => {
    const { motivationalPhrase, bgColor } = getMotivationalPhrase(Number(percent));
    return <div
              style={{
                background: bgColor
              }}
              className={clsx("py-2 px-5 rounded-full")}>
            <span>{`${percent}% - ${motivationalPhrase}`}</span>
          </div>
  }


  if (!discipline.themes.length) {
    return <div className="w-full flex justify-center"><Loading/></div>
  }

  return <>
    <TitleSection text={`Matéria detalhada: ${discipline.name}`}/>
    <MainTable>
      {
        discipline.themes?.map((theme) => <MainTableSelect key={theme.title} options={getOptions(theme)}>
          <MainTableLineTitle text={theme.title} />
          <div className="flex items-center gap-7">
            <IoIosArrowDown/>
            {/* <button><BiPencil/></button> */}
            {/* <button><BiTrash/></button> */}
            { loading
             ? <Loading/>
             : renderPercentWithMotivacionalPhrase(theme.percent)}
          </div>
      </MainTableSelect>)

      }
    </MainTable>
  </>
}