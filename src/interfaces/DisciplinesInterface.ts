interface DisciplineModuleAnnotation {
  title: string;
  text: string;
}
interface DisciplineModulesInterface {
  id: number;
  title: string;
  checked: boolean;
  anotations: DisciplineModuleAnnotation[]
}

interface DisciplineThemeInterface {
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