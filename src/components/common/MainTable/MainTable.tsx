import { MainTableProps } from "@/interfaces/MainTableInterfaces";

export default function MainTable({ children }: MainTableProps) {

  return (
    <section className="bg-grayGCI-800 border-grayGCI-500 border-[1px] w-full rounded-3xl flex flex-col text-grayGCI-200 gap-1">
      {children}
    </section>
  )
}