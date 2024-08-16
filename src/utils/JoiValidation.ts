import Joi from "joi";
import { LoginValidationParams } from "@/interfaces/joiValidationInterface";
import rescueError from "@/utils/rescueError";

class JoiValidation {

  async loginValidation(params: LoginValidationParams) {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    try {
      const result = await schema.validateAsync(params);
      if (result.error) {
        throw result.error;
      }
    } catch (error:any) {
      rescueError({ message: error });
    }
  }

}

export default JoiValidation;