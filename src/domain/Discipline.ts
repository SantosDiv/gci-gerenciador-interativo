import { DisciplineInterface, DisciplineModulesInterface, DisciplineThemeInterface } from "@/interfaces/DisciplinesInterface";
import { calcPercent } from "@/utils/calcPercent";

class Discipline {
  private _id:string;
  private _name:string;
  private _period:string;
  private _difficult_level:number;
  private _themes:DisciplineThemeInterface[];
  private _themePercentChanged:DisciplineThemeInterface | null;

  constructor({ name, period, difficult_level, id, themes }: DisciplineInterface) {
    this._id = id;
    this._name = name;
    this._period = period;
    this._difficult_level = difficult_level;
    this._themes = themes;
    this._themePercentChanged = null
  }

  get id() { return this._id }
  get name() { return this._name }
  get period() { return this._period }
  get themes() { return this._themes }
  get difficult_level() { return this._difficult_level }
  get themePercentChanged() { return this._themePercentChanged; }

  set themes(newThemes) {
    this._themes = newThemes
  }

  changeStatusModule(module: DisciplineModulesInterface) {
    const themes = this._themes.map((theme) => {
      if (theme.modules.includes(module)) {
        theme.modules.forEach((mod) => {
          if(mod.id === module.id) {
            module.checked = !module.checked;
          }
        })

        this.recalcPercente(theme);
      }

      return theme;
    })

    this._themes = themes;
    return this;
  }

  modulesCheckedByTheme(theme: DisciplineThemeInterface) {
    return theme.modules.filter((module) => module.checked);
  }

  recalcPercente(theme: DisciplineThemeInterface) {
    const modulesChecked = this.modulesCheckedByTheme(theme);
    const percent = calcPercent(modulesChecked.length, theme.modules.length);
    theme.percent = percent;
    this._themePercentChanged = theme;
    return theme
  }

  toMap() {
    return {
      id: this._id,
      name: this._name,
      period: this._period,
      difficult_level: this._difficult_level,
      themes: this._themes,
    }
  }
}

export default Discipline;