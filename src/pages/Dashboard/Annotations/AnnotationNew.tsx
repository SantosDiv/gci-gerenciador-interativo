import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "@/components/common/Input";
import CustomButton from "@/components/common/CustomButton";
import FirebaseProvider from '@/integrations/firebase/FirebaseProvider';
import { useState } from "react";
import Loading from "@/components/common/Loading";

export default function AnnotationNew() {
  const { register, handleSubmit } = useForm();
  const [loadingAnnotation, setLoadingAnnotation] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const moduleName = searchParams.get('module_name')
  const disciplineName = searchParams.get('discipline_title')

  const onSubmit = async (data: any) => {
    try {
      setLoadingAnnotation(true);
      const moduleId = searchParams.get('module_id');
      const firebaseProvider = new FirebaseProvider();

      const params = {
        ...data,
        module_id: moduleId,
        module_title: moduleName,
        discipline_title: disciplineName,
      }

      await firebaseProvider.createDoc('annotations', params);

      navigate(-1);
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingAnnotation(false);
    }
  }

  return(<>
    <h2 className='font-bold text-grayGCI-200'>{disciplineName} {'->'} {moduleName} {'->'} Nova anotação</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-4">
      <Input register={register} name="title" placeholder="Título da anotação" type="text" className="!rounded-3xl"/>
      <textarea rows={15} className='bg-grayGCI-700 border-grayGCI-500 border-[1px] p-4 rounded-3xl' {...register('text')} name="text" placeholder="Escreva sua anotação aqui..." />

      {loadingAnnotation ? <Loading/> : <CustomButton value="Salvar" variant="thirty" className="w-[180px] !justify-center self-end"/>}
    </form>
  </>);
}