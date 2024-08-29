interface LoginValidationParams {
  username: string,
  password: string,
}

interface DisciplineModuleAnnotation {
  title: string;
  text: string;
}
interface DisciplineModulesInterfaceRequest {
  id: string;
  title: string;
  checked: boolean;
  anotations: DisciplineModuleAnnotation[]
}

interface DisciplineThemeInterfaceRequest {
  id: string;
  title: string;
  modules: DisciplineModulesInterfaceRequest[]
}

interface CreateDisciplineParams {
  name: string;
  period: string;
  difficult_level: number;
  percent: number;
  themes: DisciplineThemeInterfaceRequest[]
}

export type {
  LoginValidationParams,
  CreateDisciplineParams,
  DisciplineThemeInterfaceRequest,
  DisciplineModulesInterfaceRequest
}