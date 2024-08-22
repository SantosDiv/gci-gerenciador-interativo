import { useParams } from "react-router-dom";

export default function DisciplineShow() {
  const { id } = useParams();

  return <>Disciplina de id: {id}</>
}