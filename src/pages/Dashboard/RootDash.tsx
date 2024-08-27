import { Navigate, Outlet } from "react-router-dom";
import { FaBrain } from "react-icons/fa";
import SideBarMenu from "@/components/common/SideBarMenu";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/integrations/firebase/FirebaseConfig";



export default function RootDash() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if(!loading && !user) { return <Navigate to='/' replace /> }

  return (
    <main className="flex gap-9 h-screen w-screen p-10 box-border">
      <SideBarMenu/>
      <main className="w-full">
        <header className="flex justify-between items-center w-full">
          <h1 className="text-grayGCI-200 font-medium text-[1.4rem]">Grade Curricular Interativa - GCI</h1>
          <button
            className="flex items-center gap-2 border-grayGCI-500 border-[1px] bg-grayGCI-700 p-2 rounded-full text-purpleGCI-700 font-bold">
            GCI - IA <FaBrain/>
          </button>
        </header>

        <section className="mt-10">
          <Outlet/>
        </section>
      </main>
    </main>
  )
}