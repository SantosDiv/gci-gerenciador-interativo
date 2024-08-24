interface MainTableTitleLineProps {
  text: string;
}

export default function MainTableLineTitle({ text }:MainTableTitleLineProps) {
  return(
    <h4>{text}</h4>
  )
}