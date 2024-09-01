interface TitleSectionProps {
  children?: any,
  text: string;
}

export default function TitleSection({text, children }:TitleSectionProps) {
  return (
    <section className="bg-grayGCI-800 border-grayGCI-500 border-[1px] w-full rounded-full flex justify-between items-center py-2 px-5 text-grayGCI-200 box-border mb-5">
      <h1 className="font-bold">{text}</h1>
      { children ? children : <div className="flex gap-2 items-center">
        <span>Período:</span>
        <button className="bg-grayGCI-800 border-grayGCI-500 border-[1px] font-bold rounded-full py-2 px-5 box-content">2024.2</button>
      </div>}
    </section>
  )
}