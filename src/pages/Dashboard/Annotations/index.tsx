import { Link, useNavigate } from "react-router-dom";
import { MainTable, MainTableLine, MainTableLineTitle } from "@/components/common/MainTable";
import TitleSection from "@/components/common/TitleSection";
import { BsEye } from "react-icons/bs";
import { BiTrash, BiPencil } from "react-icons/bi";
import CustomButton from "@/components/common/CustomButton";

const ANNOTATIONS_DATA = [
  {
    id: "asdasdasd",
    title: "Anotação 1",
    text: "Testando",
    module_id: 'aewewegg',
    module_title: "Modulo 1",
    discipline_title: "Sociedade",
    user_id: 'arwkwaekj'
  },
  {
    id: "asdergfg",
    title: "Anotação 2",
    text: "Testando 2",
    module_id: 'aewewegg',
    module_title: "Modulo 1",
    discipline_title: "Sociedade",
    user_id: 'arwkwaekj'
  },
  {
    id: "fggf565",
    title: "Anotação 3",
    text: "Testando",
    module_id: 'aewewegg',
    module_title: "Modulo 1",
    discipline_title: "Sociedade",
    user_id: 'arwkwaekj'
  },
  {
    id: "fdgd787",
    title: "Anotação 4",
    text: "Testando",
    module_id: 'ffhhghf',
    module_title: "Modulo 2",
    discipline_title: "Arquitetura",
    user_id: 'arwkwaekj'
  },
]


export default function Annotations() {
  const navigate = useNavigate();

  return(<>
    <TitleSection text="Minhas anotações">
      <CustomButton onClick={() => navigate('/dashboard/annotations/new')} value="Nova anotação" className="w-[180px] flex !justify-center"/>
    </TitleSection>
    <div className="h-[600px] overflow-auto">
      <MainTable>
        {
          ANNOTATIONS_DATA.map((annotation) => <MainTableLine key={annotation.id} className="p-4">
            <MainTableLineTitle text={annotation.title}/>
            <h2>{annotation.module_title}</h2>
            <h2>{annotation.discipline_title}</h2>
            <div className="flex gap-6">
              <Link to={`/dashboard/annotations/${annotation.id}`}><BsEye/></Link>
              <Link to={`/dashboard/annotations/${annotation.id}/edit`}><BiPencil/></Link>
              <BiTrash/>
            </div>
        </MainTableLine>)
        }
      </MainTable>
    </div>
  </>);
}