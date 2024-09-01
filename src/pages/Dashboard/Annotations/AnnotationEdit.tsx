import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "@/components/common/Input";
import CustomButton from "@/components/common/CustomButton";
import FirebaseProvider from '@/integrations/firebase/FirebaseProvider';
import Loading from "@/components/common/Loading";

import { AnnotationResponseInterface } from "@/interfaces/AnnotationInterface";

export default function AnnotationEdit() {
  const { register, handleSubmit, setValue } = useForm({ defaultValues: { title: '', text: '' } });
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const [originalAnnotation, setOriginalAnnotation] = useState({} as AnnotationResponseInterface);
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

        setOriginalAnnotation(response);
        //@ts-ignore
        setValue('title', response.title)
        //@ts-ignore
        setValue('text', response.text);
      } catch (error) {
        setOriginalAnnotation({id: 'not found'});
      } finally {
        setLoading(false);
      }

    }

    getAnnotation();
  }, []);

  const onEdit = async (data: any) => {
    try {
      setUpdating(true);
      const firebaseProvider = new FirebaseProvider();

      const params = {
        ...data,
        module_id: originalAnnotation.module_id,
        module_title: originalAnnotation.module_title,
        discipline_title: originalAnnotation.discipline_title,
      }
      if (id) {
        await firebaseProvider.updateDoc('annotations', id, params);
      } else {
        throw 'Não foi possível encontrar o documento por este ID';
      }

      navigate(-1);
    } catch (error) {
      alert(error);
      console.log(error)
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return <div className="w-full flex justify-center"><Loading/></div>
  }

  if (originalAnnotation.id === 'not found') {
    return <div className="w-full flex flex-col items-center justify-center gap-4">
      <h4 className="text-grayGCI-200 font-bold">Não encontramos nenhuma anotação com este ID. Tente novamente.</h4>
      <CustomButton value="Voltar" className="!justify-center !w-[180px]" onClick={() => navigate(-1)}/>
    </div>
  }

  return(<>
    <h2 className='font-bold text-grayGCI-200'>{originalAnnotation.discipline_title} {'->'} {originalAnnotation.module_title} {'->'} Edição de anotação</h2>
    <form onSubmit={handleSubmit(onEdit)} className="flex flex-col gap-6 mt-4">
      <Input register={register} name="title" placeholder="Título da anotação" type="text" className="!rounded-3xl"/>
      <textarea
        rows={15}
        className='bg-grayGCI-700 border-grayGCI-500 border-[1px] p-4 rounded-3xl'
        {...register('text')}
        name="text"
        placeholder="Escreva sua anotação aqui..."
      />

      {updating ? <Loading className="self-end"/> : <CustomButton value="Salvar Edição" variant="thirty" className="!w-[180px] !justify-center self-end"/>}
    </form>
  </>);
}