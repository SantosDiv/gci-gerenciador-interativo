import { AxiosResponse, isAxiosError } from "axios";

export default function rescueError(error:any) {
  if(isAxiosError(error)) {
    if(error.response) {
      const { data } = error.response as AxiosResponse;
      throw data.message;
    }

    throw error.message;
  }

  if (error.message) {
    throw error.message;
  }

  throw "Ops.. Ocorreu um erro inesperado";
}