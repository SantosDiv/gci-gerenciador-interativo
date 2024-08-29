import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/integrations/firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

import Input from '@/components/common/Input';
import logo from '@/assets/gci-logo.svg';
import JoiValidation from "@/utils/JoiValidation";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data:any) => {
    try {
      await new JoiValidation().loginValidation(data);
      const result = await signInWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem('uid', result.user.uid);

      navigate('/dashboard');
    } catch (error) {
      alert(error);
      console.log(error)
    }
  }


  return <main className="grid grid-cols-1 md:grid-cols-2 w-screen h-screen">
    <section className="bg-grayGCI-600 flex items-center justify-center">
      <article className="flex flex-col items-center">
        <img src={logo} alt="GCI logomarca" className="h-[3em] lg:h-[5em]"/>
        <h1 className="text-grayGCI-100 text-[5em] lg:text-[18em] font-bold leading-none">GCI</h1>
        <h4 className="uppercase text-grayGCI-100 font-thin text-[1em] lg:text-[2em]">Grade interativa</h4>
      </article>
    </section>

    <section className="bg-grayGCI-100 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center bg-grayGCI-600 w-[90%] lg:w-[60%] py-[7em] rounded-3xl gap-5">
        <h1 className='font-bold text-[1.5em]'>Fazer login</h1>

        <Input type='text' placeholder='Email' register={register} name='email' className='w-[80%]'/>
        <Input type='password' placeholder='Password' register={register} name='password' className='w-[80%]'/>

        <button type='submit' className='bg-blueGCI-500 p-3 rounded-full w-[80%]'>Entrar</button>
      </form>
    </section>
  </main>
}