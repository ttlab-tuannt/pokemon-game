import _ from 'lodash';
import Pokemon from './pokemon';
import { ref } from 'vue';

export enum GameLevel {
  easy = 'easy',
  medium = 'medium',
  high = 'high',
}

export const GameSize = {
  [GameLevel.easy]: {
    col: 6,
    row: 5,
  },
  [GameLevel.medium]: {
    col: 10,
    row: 5,
  },
  [GameLevel.high]: {
    col: 15,
    row: 5,
  },
};

// time is seconds
export const LimitTime = {
  [GameLevel.easy]: 5 * 60,
  [GameLevel.medium]: 5 * 60,
  [GameLevel.high]: 5 * 60,
};

export default class GameBoard {
  score = ref(0);
  level: GameLevel = GameLevel.easy;
  time = ref(LimitTime[GameLevel.easy]);
  pokemonList: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;
  comparePokemon: Pokemon | null = null;

  constructor(pokemonList: Pokemon[]) {
    this.pokemonList = pokemonList;
  }

  get isEmptyPokemonSelect(): boolean {
    return this.selectedPokemon !== null;
  }

  get isSamePokemon(): boolean {
    return this.selectedPokemon?.name === this.comparePokemon?.name;
  }

  updateScore(score: number): void {
    this.score.value += score;
  }

  removeCouplePokemon(): void {
    const sIndex = this.pokemonList.findIndex(
      (item) => item.name === this.selectedPokemon?.name,
    );
    if (sIndex > -1) {
      this.pokemonList.splice(sIndex, 1);
    }

    const cIndex = this.pokemonList.findIndex(
      (item) => item.name === this.comparePokemon?.name,
    );
    if (cIndex > -1) {
      this.pokemonList.splice(cIndex, 1);
    }
  }

  clearSelectPokemon(): void {
    this.selectedPokemon = null;
    this.comparePokemon = null;
  }

  onSelectPokemon(pokemon: Pokemon): boolean | null {
    if (!this.isEmptyPokemonSelect) {
      this.selectedPokemon = pokemon;
      return false;
    }
    this.comparePokemon = pokemon;
    if (this.isSamePokemon) {
      this.updateScore(1);
      this.removeCouplePokemon();
      this.clearSelectPokemon();
      console.log(this.pokemonList);
      return true;
    }

    this.clearSelectPokemon();
    return null;
  }

  shufflePokemon(items: Pokemon[]) {
    const tmp = [...items];
    for (let index = 0; index < items.length; index++) {
      tmp.push(items[index]);
    }

    return _.shuffle(tmp);
  }

  makeTable(): Pokemon[][] {
    const size = GameSize[this.level];
    const total = size.col * size.row;
    const count = total / 2;
    const start = 0;
    const end = start + count;

    const icons: Pokemon[] = [];

    for (let index = 0; index < end; index++) {
      icons.push(this.pokemonList[index]);
    }
    const tmp = this.shufflePokemon(icons);
    return _.chunk(tmp, size.row);
  }
}
