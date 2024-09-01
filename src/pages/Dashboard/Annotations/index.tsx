import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiTrash, BiPencil } from "react-icons/bi";

import { MainTable, MainTableLine, MainTableLineTitle } from "@/components/common/MainTable";
import TitleSection from "@/components/common/TitleSection";
import CustomButton from "@/components/common/CustomButton";

import { AnnotationResponseInterface } from "@/interfaces/AnnotationInterface";

import FirebaseProvider from '@/integrations/firebase/FirebaseProvider';
import Loading from "@/components/common/Loading";

export default function Annotations() {
  const navigate = useNavigate();

  const [annotations, setAnnotations] = useState<AnnotationResponseInterface[]>([]);

  useEffect(() => {
    const getAllAnnotationsByCurrentUser = async () => {
      const firebaseProvider = new FirebaseProvider();

      const response = await firebaseProvider.getDocsByCollection('annotations');
      if (response) {
        setAnnotations(response);
      }
    }

    getAllAnnotationsByCurrentUser();
  }, [])

  const goBack = () => {
    return navigate(-1);
  }

  return(<>
    <TitleSection text="Minhas anotações">
      <CustomButton onClick={goBack} value="Voltar" className="w-[100px] flex !justify-center"/>
    </TitleSection>
    <div className="h-[600px] overflow-auto">
      {
        !annotations.length
        ? <div className="w-full flex justify-center items-center h-[500px]"><Loading/></div>
        : <MainTable>
          { annotations.map((annotation) => <MainTableLine key={annotation.id} className="p-4">
              <div className="w-[400px] truncate">
                <span className="font-bold">Título:</span>
                <MainTableLineTitle text={annotation.title || ''} className="truncate"/>
              </div>
              <div className="w-[400px] truncate">
                <span className="font-bold">Módulo:</span>
                <h2 className="truncate">{annotation.module_title}</h2>
              </div>

              <div className="w-[400px] truncate">
                <span className="font-bold">Matéria:</span>
                <h2 className="truncate">{annotation.discipline_title}</h2>
              </div>
              <div className="flex gap-6">
                <Link to={`/dashboard/annotations/${annotation.id}`}><BsEye/></Link>
                <Link to={`/dashboard/annotations/${annotation.id}/edit`}><BiPencil/></Link>
                <BiTrash/>
              </div>
          </MainTableLine>)
          }
        </MainTable>
      }
    </div>
  </>);
}