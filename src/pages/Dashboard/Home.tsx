import Discipline from "@/components/Discipline";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-9">
      <section className="bg-grayGCI-800 border-grayGCI-500 border-[1px] w-full rounded-full flex justify-between items-center py-2 px-5 text-grayGCI-200 box-border">
        <h1>Curso: Análise e Desenvolvimento de Sistemas</h1>
        <div className="flex gap-2 items-center">
          <span>Período:</span>
          <button className="bg-grayGCI-800 border-grayGCI-500 border-[1px] font-bold rounded-full py-2 px-5 box-content">2024.2</button>
        </div>
      </section>
      <section className="bg-grayGCI-800 border-grayGCI-500 border-[1px] w-full rounded-3xl flex flex-col text-grayGCI-200 gap-1">
        <Discipline title="Sistema de informação e sociedade" id={1}/>
        <Discipline title="Redes de computadores" id={2}/>
        <Discipline title="Segurança da informação" id={3}/>
      </section>
    </main>
  )
}