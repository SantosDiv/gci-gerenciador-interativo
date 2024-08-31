import { Link } from "react-router-dom";

export default function Annotations() {
  return(<>
    <Link to='/dashboard/annotations/new'>Nova anotação</Link>
    <Link to='/dashboard/annotations/1'>Mostrar</Link>
    <Link to='/dashboard/annotations/1/edit'>Editar</Link>
  </>);
}