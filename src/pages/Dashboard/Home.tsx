import { BiPencil, BiTrash } from "react-icons/bi";
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
        <article className="flex justify-between p-2 px-4 items-center cursor-pointer hover:bg-grayGCI-700 hover:rounded-t-3xl">
          <h4>Sistema de informação e sociedade</h4>
          <div className="flex items-center gap-7">
            <div className="bg-greeGCI-600 py-2 px-5 rounded-full">
              <span>{80}% - Falta Pouco!</span>
            </div>
            <button><BiPencil/></button>
            <button><BiTrash/></button>
          </div>
        </article>
        <hr className="w-[98%] m-auto border-grayGCI-200"/>
      </section>
    </main>
  )
}