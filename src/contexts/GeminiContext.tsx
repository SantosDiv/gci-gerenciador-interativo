import runChat from "@/integrations/gemine/GemineConfig";
import { createContext, useState } from "react";

interface GeminiContextInterface {
  historyMessages: HistoryMessagesInterface[];
  loading: boolean;
  sendMessage(prompt:string): Promise<void>
}

interface HistoryMessagesInterface {
  role: string;
  message: string;
}

const GeminiContext = createContext({} as GeminiContextInterface);

export const GeminiContextProvider = ({ children }:any) => {
  const [historyMessages, setHistoryMessages] = useState<HistoryMessagesInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (prompt:string) => {
    try {
      setLoading(true)

      setHistoryMessages([...historyMessages, { role: 'user', message: prompt }]);
      const { history } = await runChat(prompt, historyMessages)

      setHistoryMessages(history);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }

  return <GeminiContext.Provider value={{historyMessages, loading, sendMessage}}>
    {children}
  </GeminiContext.Provider>
}

export default GeminiContext;