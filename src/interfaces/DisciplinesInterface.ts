interface DisciplineModuleAnnotation {
  title: string;
  text: string;
}
interface DisciplineModulesInterface {
  id: string;
  title: string;
  checked: boolean;
  anotations: DisciplineModuleAnnotation[]
}

interface DisciplineThemeInterface {
  id?:string;
  title: string;
  modules: DisciplineModulesInterface[]
  percent: number;
}
interface DisciplineInterface {
  id: string;
  name: string;
  period: string;
  difficult_level: number;
  themes: DisciplineThemeInterface[]
}

export type {
  DisciplineInterface,
  DisciplineThemeInterface,
  DisciplineModulesInterface
}