export interface IPokemon {
  name: string;
  icon: string;
}

export default class Pokemon {
  name: string;
  icon: string;

  constructor(data: IPokemon) {
    this.name = data.name;
    this.icon = data.icon;
  }
}
