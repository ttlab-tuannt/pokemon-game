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
  selectedPokemon = ref<Pokemon | null>(null);
  comparePokemon = ref<Pokemon | null>(null);
  playItems = ref<Pokemon[]>([]);
  removeList = ref<Pokemon[]>([]);
  interval: NodeJS.Timeout | null = null;
  isPlayGame = ref(false);
  choiceSound: HTMLAudioElement | null = null;
  correctSound: HTMLAudioElement | null = null;
  failSound: HTMLAudioElement | null = null;

  constructor(options: { pokemonList: Pokemon[] }) {
    this.pokemonList = options.pokemonList;
    this.setup();
  }

  setup() {
    this.init();
    this.initSound();
  }

  get isEmptyPokemonSelect(): boolean {
    return this.selectedPokemon.value === null;
  }

  get isSamePokemon(): boolean {
    const select = (this.selectedPokemon?.value?.name || '').replace('copy', '');
    const compare = (this.comparePokemon?.value?.name || '').replace('copy', '');
    return select === compare;
  }

  updateScore(score: number): void {
    this.score.value += score;
  }

  removeCouplePokemon(): void {
    if (!this.selectedPokemon.value || !this.comparePokemon.value) {
      return;
    }
    this.removeList.value.push({ ...this.selectedPokemon.value });
    this.removeList.value.push({ ...this.comparePokemon.value });
  }

  clearSelectPokemon(): void {
    this.selectedPokemon.value = null;
    this.comparePokemon.value = null;
  }

  isPokemonRemoved(pokemon: Pokemon): boolean {
    const index = this.removeList?.value?.findIndex((item) => item.name === pokemon.name);
    return index > -1;
  }

  onSelectPokemon(pokemon: Pokemon): void {
    if (this.isPokemonRemoved(pokemon)) {
      return;
    }
    if (this.choiceSound) {
      this.choiceSound.play();
    }
    if (this.isEmptyPokemonSelect) {
      this.selectedPokemon.value = pokemon;
      return;
    }
    this.comparePokemon.value = pokemon;

    if (this.isSamePokemon) {
      if (this.correctSound) {
        this.correctSound.play();
      }
      this.updateScore(1);
      this.removeCouplePokemon();
      this.clearSelectPokemon();
      return;
    }
    if (this.failSound) {
      this.failSound.play();
    }
    this.clearSelectPokemon();
  }

  shufflePokemon(items: Pokemon[]) {
    const tmp = [...items];
    for (let index = 0; index < items.length; index++) {
      const cpItem = { ...items[index], name: items[index].name + 'copy' };
      tmp.push(cpItem);
    }

    return _.shuffle(tmp);
  }

  get sizeOfLevel() {
    return GameSize[this.level];
  }

  init() {
    const size = GameSize[this.level];
    const total = size.col * size.row;
    const count = total / 2;
    const start = 0;
    const end = start + count;

    const icons: Pokemon[] = [];

    for (let index = 0; index < end; index++) {
      icons.push(this.pokemonList[index]);
    }
    this.playItems.value = this.shufflePokemon(icons);
  }

  playGame() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.time.value--;
      }, 1000);
      this.isPlayGame.value = true;
    }
  }

  stopGame() {
    this.isPlayGame.value = false;
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  initSound() {
    this.choiceSound = new Audio(require('@/assets/sounds/choice.mp3'));
    this.failSound = new Audio(require('@/assets/sounds/fail.mp3'));
    this.correctSound = new Audio(require('@/assets/sounds/correct.mp3'));
  }
}
