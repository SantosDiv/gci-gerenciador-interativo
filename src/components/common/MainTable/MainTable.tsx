import { MainTableProps } from "@/interfaces/MainTableInterfaces";
import clsx from "clsx";

export default function MainTable({ children, className }: MainTableProps) {

  return (
    <section
      className={clsx(
        "bg-grayGCI-800 border-grayGCI-500 border-[1px] w-full rounded-3xl flex flex-col text-grayGCI-200 gap-1",
        className
      )}
    >
      {children}
    </section>
  )
}