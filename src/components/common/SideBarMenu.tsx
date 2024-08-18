import { useNavigate } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { FaNoteSticky } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

import CustomButton from '@/components/common/CustomButton';

import logo from '@/assets/gci-logo.svg';

export default function SideBarMenu() {
  const navigate = useNavigate();

  const signOut = () => {
    navigate('/');
  }

  return(
    <aside className="flex flex-col items-center justify-between bg-grayGCI-800 border-grayGCI-500 border-[1px] rounded-lg w-[300px] py-10">
      <div className='flex flex-col items-center w-full'>
        <img src={logo} alt="Logo gci medium" className='h-[4rem] mt-10' />
        <nav className='mt-10 w-[80%] flex flex-col gap-5'>
          <CustomButton value="Nova Matéria" icon={<BiPlus/>} />
          <CustomButton value="Anotações" icon={<FaNoteSticky/>} variant='secondary'/>
        </nav>
      </div>


      <CustomButton value="Logout" icon={<FiLogOut/>} variant='secondary' className='!w-[80%]' onClick={signOut}/>

    </aside>
  );
}