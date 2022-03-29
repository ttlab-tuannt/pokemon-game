<template>
  <div class="home">
    <h1>Pokemon Game</h1>
    <h2>Game level: {{ level }}</h2>
    <h2>Count down: {{ time }}</h2>
    <div class="game-content">
      <div class="pokemon-row" v-for="(items, row) in images" :key="row">
        <div class="pokemon-col" v-for="(item, col) in items" :key="col">
          <img :src="item.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import icons from '../icons';
import GameBoard from '../models/game-board';
import Pokemon from '../models/pokemon';
import _ from 'lodash';

const pokemonList: Pokemon[] = [];
_.forEach(icons, (item, key) => {
  pokemonList.push(new Pokemon({ name: key, icon: item }));
});

const gameBoard = new GameBoard(pokemonList);

console.log('gameBoard', gameBoard);

@Options({})
export default class HomePage extends Vue {
  count = 0;

  get images() {
    return this.game.makeTable();
  }

  get game() {
    return gameBoard;
  }

  get level() {
    return _.capitalize(this.game.level);
  }

  get time() {
    return this.game.time;
  }
}
</script>
