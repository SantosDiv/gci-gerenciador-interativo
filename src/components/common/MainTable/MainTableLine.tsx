import clsx from "clsx";
import { ReactNode } from "react";

interface MainTableLineProps {
  children: ReactNode;
  className?: string;
}

export default function MainTableLine({ children, className }:MainTableLineProps) {

  return(
    <article
      className={clsx("flex justify-between p-2 px-4 items-center border-grayGCI-500 border-b-[1px] last:border-none hover:bg-grayGCI-700 hover:first:rounded-t-3xl hover:last:rounded-b-3xl",
        className
      )}>
      {children}
    </article>
  );
}