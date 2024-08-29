/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || '');


 // See https://ai.google.dev/gemini-api/docs/safety-settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT, // filtro de assédio
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, // filtro de discurso de ódio
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, // filtro de conteúdo sexual
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
  }
];

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 1000,
  responseMimeType: "text/plain",
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig,
  safetySettings
});

async function runChat(prompt:string, history:any) {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
  });

  const userMessageHistory = { role: 'user', message: prompt };
  history.push(userMessageHistory)

  const result = await chatSession.sendMessage(prompt);

  const modelMessageHistory = { role: 'model', message: result.response.text() };
  history.push(modelMessageHistory)

  return { responseStream: result.response, history };
}

export default runChat;