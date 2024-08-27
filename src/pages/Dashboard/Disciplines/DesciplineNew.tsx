import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BiTrash } from 'react-icons/bi';

import { MainTable, MainTableLine, MainTableLineTitle } from '@/components/common/MainTable';
import Input from "@/components/common/Input";
import CustomButton from '@/components/common/CustomButton';

import JoiValidation from "@/utils/JoiValidation";
import DisciplineContext from '@/contexts/DisciplinesContext';
import { DisciplineInterface } from '@/interfaces/DisciplinesInterface';
import generateRandomString from '@/utils/generateRandomString';
import { CreateDisciplineParams } from '@/interfaces/joiValidationInterface';

export default function DisciplineNew() {
  const { createDiscipline } = useContext(DisciplineContext);
  const { register, handleSubmit, resetField } = useForm();
  const [themes, setThemes] = useState<any>([]);
  const [moduleTitle, setModuleTitle] = useState('');
  const [indexAddModuleSection, setIndexAddModuleSection] = useState<number | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data:any) => {
    try {
      const params = {
        name: data.name,
        period: data.period,
        difficult_level: data.difficult_level,
        themes
      } as CreateDisciplineParams;

      await new JoiValidation().createDisciplineValidation(params);
      await createDiscipline(params);
      navigate('/dashboard');
    } catch (error) {
      alert(error);
    }
  }

  const handleAddTheme = (data: any) => {
    const themeTitle = data.theme as string;
    if (!themeTitle) {
      alert("É obrigatório o título do tema");
      return;
    }
    const themeStruct = {
      id: generateRandomString(10),
      title: themeTitle,
      percent: 0,
      modules: []
    }

    const equalsThemes = themes.filter((theme:any) => theme.title === themeTitle)

    if (equalsThemes.length) {
      alert('Não pode conter tema com mesmo nome');
      return;
    }

    setThemes([...themes, themeStruct])
    resetField('theme');
  }

  const handleAddModule = (themeTitle:any) => {

    const themesEdited = themes.reduce((acc:any, theme:any) => {
      if(theme.title === themeTitle) {
        theme.modules.push({
          id: generateRandomString(10),
          title: moduleTitle,
          annotations: [],
          checked: false
        });
      }
      acc.push(theme);
      return acc;
    }, []);

    setThemes(themesEdited);
    setModuleTitle('');
  }

  const handleDeleteModule = (moduleIndex:number, themeTitle:any) => {
    const themesEdited = themes.reduce((acc:any, theme:any) => {
      if(theme.title === themeTitle) {
        theme.modules.splice(moduleIndex, 1)
      }
      acc.push(theme);
      return acc;
    }, []);

    setThemes(themesEdited);
  }

  const handleDeleteTheme = (themeIndex: number) => {
    let themeToEdit = themes;
    themeToEdit.splice(themeIndex, 1)

    setThemes([]);
  }

  return <>
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5' id='form-create'>
      <h2 className='font-bold text-grayGCI-200'>Adicionar Matéria</h2>
      <section className='flex gap-2'>
        <Input type='text' placeholder='Digite o nome da matéria' register={register} name='name' className='basis-[60%]'/>
        <Input type='text' placeholder='Qual o Período?' register={register} name='period' className='basis-[10%]'/>
        <Input type='text' placeholder='Qual o grau de dificuldade?' register={register} name='difficult_level' className='basis-[30%]'/>
      </section>
    </form>

    <form onSubmit={handleSubmit(handleAddTheme)} className='flex flex-col gap-5 mt-5 mb-5'>
      <h2 className='font-bold text-grayGCI-200'>Adicionar temas</h2>
      <section className='relative'>
        <Input type='text' placeholder='Titulo do tema' register={register} name='theme' className='w-full' />
        <CustomButton type='submit' value='Adicionar Tema' variant='thirty' className='absolute top-2 right-2 !w-[180px] rounded-full gap-0 !justify-center'/>
      </section>

      <MainTable className=''>
        { themes.map((theme:any, index:number) => <div key={theme} className='last:border-none hover:bg-grayGCI-700 hover:first:rounded-t-3xl hover:last:rounded-b-3xl'>
          <MainTableLine>
            <MainTableLineTitle key={theme.title} text={theme.title}/>
            <div className='flex gap-4'>
              <button type='button' onClick={() => handleDeleteTheme(index)}><BiTrash/></button>
              <CustomButton type='button' value='Add Módulo' className='!justify-center' onClick={() => setIndexAddModuleSection(index)} />
            </div>
          </MainTableLine>
          { indexAddModuleSection === index && <div className='bg-grayGCI-700 pt-4 pb-4'>
            <input type="text" value={moduleTitle} onChange={(e) => setModuleTitle(e.target.value)} className='bg-grayGCI-800 rounded-full p-2 ml-4' placeholder='Título do módulo'/>
            <button type='button' className='border-grayGCI-500 border-[1px] rounded-full p-2 ml-2' onClick={() => handleAddModule(theme.title)}>Inserir</button>
            { theme.modules.map((module:any, index:number) => <MainTableLine key={module} className='p-4'>
              <MainTableLineTitle key={module.title} text={module.title} className='ml-4'/>
              <button type='button' onClick={() => handleDeleteModule(index, theme.title)}><BiTrash/></button>
            </MainTableLine>) }
          </div>}
        </div>) }
      </MainTable>
    </form>

    <CustomButton form='form-create' value='Finalizar criação' type='submit' variant='thirty' className='!justify-center !w-[15%]'/>
  </>
}