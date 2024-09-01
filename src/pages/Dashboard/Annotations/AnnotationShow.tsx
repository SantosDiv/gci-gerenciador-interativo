import CustomButton from "@/components/common/CustomButton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FirebaseProvider from '@/integrations/firebase/FirebaseProvider';
import { AnnotationResponseInterface } from "@/interfaces/AnnotationInterface";
import Loading from "@/components/common/Loading";

export default function AnnotationShow() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [annotation, setAnnotation] = useState({} as AnnotationResponseInterface);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAnnotation = async () => {
      try {
        setLoading(true);
        const firebaseProvider = new FirebaseProvider();
        if(!id) {
          return;
        }
        const response = await firebaseProvider.getDocById('annotations', id);
        if (!response) {
          throw 'Não foi encontrado uma anotação com este ID';
        }

        setAnnotation(response);
      } catch (error) {
        setAnnotation({id: 'not found'});
      } finally {
        setLoading(false);
      }

    }

    getAnnotation();
  }, [])

  const gotToEdit = () => {
    navigate(`/dashboard/annotations/${annotation.id}/edit`);
  }

  if (loading) {
    return <div className="w-full flex justify-center"><Loading/></div>
  }

  if (annotation.id === 'not found') {
    return <div className="w-full flex flex-col items-center justify-center gap-4">
      <h4 className="text-grayGCI-200 font-bold">Não encontramos nenhuma anotação com este ID. Tente novamente.</h4>
      <CustomButton value="Voltar" className="!justify-center !w-[180px]" onClick={() => navigate(-1)}/>
    </div>
  }

  return (<>
  <header className="flex items-end justify-between">
    <div>
      <h4 className="text-grayGCI-200">Título da Anotação: <span className="font-bold">{annotation.title}</span></h4>
      <h4 className="text-grayGCI-200">Matéria: <span className="font-bold">{annotation.discipline_title}</span></h4>
      <h4 className="text-grayGCI-200">Módulo: <span className="font-bold">{annotation.module_title}</span></h4>
    </div>
    <CustomButton value="Editar" className="!w-[180px] !justify-center" onClick={gotToEdit}/>
  </header>

  <p className="mt-4 text-grayGCI-100 bg-grayGCI-800 p-5">{annotation.text}</p>

  </>);
}