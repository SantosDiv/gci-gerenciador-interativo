import Joi from "joi";
import { LoginValidationParams, CreateDisciplineParams } from "@/interfaces/joiValidationInterface";
import rescueError from "@/utils/rescueError";

class JoiValidation {

  async loginValidation(params: LoginValidationParams) {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    this.validateAsync(schema, params)
  }

  async createDisciplineValidation(params: CreateDisciplineParams) {
    const annotations = Joi.object().keys({
      title: Joi.string(),
      text: Joi.string(),
    })

    const modules = Joi.object().keys({
      id: Joi.string().required(),
      title: Joi.string().required(),
      checked: Joi.boolean(),
      annotations: Joi.array().items(annotations)
    });

    const themes = Joi.object().keys({
      id: Joi.string().required(),
      title: Joi.string().required(),
      percent: Joi.number().default(0),
      modules: Joi.array().items(modules),
    });

    const schema = Joi.object({
      name: Joi.string().required(),
      period: Joi.string().required(),
      difficult_level: Joi.string().required(),
      percent: Joi.number(),
      themes: Joi.array().items(themes)
    });

    await this.validateAsync(schema, params)
  }

  async validateAsync(schema: Joi.AnySchema, params: any) {
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