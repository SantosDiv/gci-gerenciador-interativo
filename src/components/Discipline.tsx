import { Link } from "react-router-dom";
import { BiPencil, BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";

interface DisciplineProps {
  id: number;
  title: string;
}

export default function Discipline({ id, title }:DisciplineProps) {
  return (<article className="flex justify-between p-2 px-4 items-center border-grayGCI-500 border-b-[1px] last:border-none hover:bg-grayGCI-700 hover:first:rounded-t-3xl hover:last:rounded-b-3xl">
    <h4>{title}</h4>
    <div className="flex items-center gap-7">
      <Link to={`disciplines/${id}`}><BsEye/></Link>
      <button><BiPencil/></button>
      <button><BiTrash/></button>
      <div className="bg-greeGCI-600 py-2 px-5 rounded-full">
        <span>{80}% - Falta Pouco!</span>
      </div>
    </div>
  </article>)
}