import { useForm } from 'react-hook-form';
import { getFirestore, collection, addDoc } from "firebase/firestore";

import FirebaseConfig from "@/services/FirebaseConfig";
import JoiValidation from "@/utils/JoiValidation";
import logo from '@/assets/gci-logo.svg';
import Input from '@/components/common/Input';

export default function Login() {
  const { register, handleSubmit } = useForm();

  const handleCreateDoc = async () => {
    // Initialize Firestore
    const db = getFirestore(FirebaseConfig);

    // Create a new document
    const docRef = await addDoc(collection(db, "disciplines"), {
      name: "Segurança da informação",
      id: 3,
      period: '2024.3',
      difficult_level: 3
    });

    alert(`Foi criado um documento de ID: ${docRef.id}`)
  }

  const onSubmit = async (data:any) => {
    try {
      await new JoiValidation().loginValidation(data);
    } catch (error) {
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

        <Input type='text' placeholder='Username' register={register} name='username' className='w-[80%]'/>
        <Input type='password' placeholder='Password' register={register} name='password' className='w-[80%]'/>

        <button type='submit' className='bg-blueGCI-500 p-3 rounded-full w-[80%]'>Entrar</button>
      </form>
    </section>
  </main>
}