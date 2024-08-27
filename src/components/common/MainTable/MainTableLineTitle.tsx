import clsx from "clsx";

interface MainTableTitleLineProps {
  text: string;
  className?: string;
}

export default function MainTableLineTitle({ text, className }:MainTableTitleLineProps) {
  return(
    <h4 className={clsx('', className)}>{text}</h4>
  )
}