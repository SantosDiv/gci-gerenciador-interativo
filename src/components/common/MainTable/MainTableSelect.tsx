import { ReactNode, useState } from "react"

interface MainTableSelectProps {
  options: Array<ReactNode>
  children: any
}

export default function MainTableSelect({ options, children}:MainTableSelectProps) {
  const [showOptions, setShowOptions] = useState(false)

  const handleOptions = () => {
    setShowOptions(!showOptions)
  }

  return(
    <article
      className="flex flex-col border-grayGCI-500  border-b-[1px] last:border-none hover:bg-grayGCI-700 hover:first:rounded-t-3xl hover:last:rounded-b-3xl"
      onClick={handleOptions}
    >
      <div className="flex justify-between p-2 px-4 items-center">
        {children}
      </div>
      { showOptions && <article className="flex flex-col p-2 px-4 ">
        {options.map((item) => item)}
      </article>}
    </article>
  )
}