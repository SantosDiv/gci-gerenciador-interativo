import TitleSection from "@/components/common/TitleSection";
import Disciplines from "@/components/Disciplines";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <TitleSection text="Curso: Análise e Desenvolvimento de Sistemas"/>
      <Disciplines />
    </main>
  )
}