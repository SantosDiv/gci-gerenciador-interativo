import GeminiContext from "@/contexts/GeminiContext";
import { useContext, useEffect, useRef, useState } from "react"
import { IoSend } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

import ReactMarkdown from 'react-markdown'

interface ChatProps {
  hideChat(): void
}

export default function Chat({ hideChat }:ChatProps) {
  const [messageText, setMessageText] = useState('');

  const { sendMessage, historyMessages, loading } = useContext(GeminiContext);

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      //@ts-ignore
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [historyMessages]);

  const handleMessage = async () => {
    setMessageText('');
    await sendMessage(messageText);
  }

  return(
    <section className="absolute bg-white rounded-lg right-10 p-3 z-40 bottom-11">
      <div className="flex justify-between items-start">
        <div className="flex flex-col mb-5">
          <h1 className="text-grayGCI-700 font-bold">Olá! <span className="text-purpleGCI-600">Bom te ver!</span></h1>
          <p className="font-light text-grayGCI-700">Estou aqui para te ajudar!</p>
        </div>
        <IoClose onClick={hideChat} className="text-purpleGCI-600 text-[30px] cursor-pointer"/>
      </div>

      <div ref={chatRef} className="border-[1px] border-grayGCI-200 rounded-lg p-1 h-[500px] w-[400px] flex flex-col gap-4 overflow-auto">
        {historyMessages.map(({ role, message })=> {
          if (role === 'user') {
            return <div key={message} className="self-end bg-grayGCI-700 text-white rounded-lg w-[300px] p-2 ">
              <h4 className="font-bold">Você:</h4>
              <ReactMarkdown className="text-wrap">{message}</ReactMarkdown>
            </div>
          }
          return <div key={message} className="self-start p-2 bg-gradient-to-r from-purpleGCI-600 to-purpleGCI-700 text-white rounded-lg w-[300px]">
            <h4 className="font-bold">Gemini IA:</h4>
            <ReactMarkdown className="text-wrap">{message}</ReactMarkdown>
          </div>
        })}
        {loading && <p className="text-black">Digitando...</p> }
      </div>

      <div className="border-[1px] border-grayGCI-200 rounded-lg mt-4 p-2 flex items-center justify-between">
        <input
          type="text"
          name="message"
          value={messageText}
          onChange={({ target }) => setMessageText(target.value)}
          className="bg-transparent p-1 text-grayGCI-700 placeholder:text-grayGCI-200 w-[90%]"
          placeholder="Como posso te ajudar hoje?"
        />
        <button onClick={handleMessage} disabled={loading}><IoSend className="text-purpleGCI-600 text-[25px]"/></button>
      </div>


    </section>
  )
}