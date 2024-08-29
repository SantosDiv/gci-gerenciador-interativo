import { Link, useNavigate } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { signOut } from 'firebase/auth';
import { FiLogOut } from "react-icons/fi";
import { auth } from '@/integrations/firebase/FirebaseConfig';

import CustomButton from '@/components/common/CustomButton';

import logo from '@/assets/gci-logo.svg';

export default function SideBarMenu() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('uid');
      await signOut(auth);
      navigate('/');
    } catch (error) {
      alert(error);
    }
  }

  return(
    <aside className="flex flex-col items-center justify-between bg-grayGCI-800 border-grayGCI-500 border-[1px] rounded-lg w-[300px] py-10">
      <div className='flex flex-col items-center w-full'>
        <Link to='/dashboard'><img src={logo} alt="Logo gci medium" className='h-[4rem] mt-10' /></Link>
        <nav className='mt-10 w-[80%] flex flex-col gap-5'>
          <CustomButton onClick={() => navigate('/dashboard/disciplines/new')} value="Nova Matéria" icon={<BiPlus/>} />
          {/* <CustomButton value="Anotações" icon={<FaNoteSticky/>} variant='secondary'/> */}
        </nav>
      </div>


      <CustomButton value="Logout" icon={<FiLogOut/>} variant='secondary' className='!w-[80%]' onClick={handleLogout}/>

    </aside>
  );
}