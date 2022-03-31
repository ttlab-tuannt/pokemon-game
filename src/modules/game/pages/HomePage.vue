<template>
  <div class="home">
    <h1>Pokemon Game</h1>
    <h2>Game level: {{ level }}</h2>
    <h2>Count down: {{ time }}</h2>
    <h2>Score: {{ score }}</h2>
    <el-button @click="playGame" v-if="!isPlayGame">Play game</el-button>
    <el-button @click="stopGame" v-else>Stop game</el-button>
    <div class="game-container">
      <div class="game-content">
        <div :class="{ 'd-none': !isWin }" class="animation" ref="animation"></div>
        <div :class="{ 'disable-game': !isPlayGame }"></div>
        <div class="pokemon-row" v-for="(items, col) in images" :key="col">
          <div class="pokemon-col" v-for="(item, row) in items" :key="row">
            <div
              class="pokemon-item"
              :class="{ active: hasActive(item) }"
              @click="selectPokemon(item)"
            >
              <img :src="item.icon" :class="{ 'd-none': isRemove(item) }" />
            </div>
          </div>
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
import lottie from 'lottie-web';
import jsonData from './fireworks.json';

const pokemonList: Pokemon[] = [];
_.forEach(icons, (item, key) => {
  pokemonList.push(new Pokemon({ name: key, icon: item }));
});

const gameBoard = new GameBoard({ pokemonList });

@Options({})
export default class HomePage extends Vue {
  started = false;
  anim: any = null;

  get images() {
    return _.chunk(gameBoard.playItems.value, gameBoard.sizeOfLevel.row);
  }

  get score() {
    return gameBoard.score.value;
  }

  get isWin() {
    return gameBoard.removeList.value.length === gameBoard.playItems.value.length;
  }

  get level() {
    return _.capitalize(gameBoard.level);
  }

  get time() {
    return gameBoard.time.value;
  }

  get selectedPokemon() {
    return gameBoard.selectedPokemon?.value;
  }

  get isPlayGame() {
    return gameBoard.isPlayGame.value;
  }

  selectPokemon(pokemon: Pokemon) {
    gameBoard.onSelectPokemon(pokemon);
  }

  hasActive(pokemon: Pokemon): boolean {
    return (
      pokemon.name === gameBoard.selectedPokemon?.value?.name ||
      pokemon.name === gameBoard.comparePokemon?.value?.name
    );
  }

  isRemove(pokemon: Pokemon): boolean {
    return gameBoard.isPokemonRemoved(pokemon);
  }

  playGame() {
    gameBoard.playGame();
  }

  stopGame() {
    gameBoard.stopGame();
  }

  mounted() {
    console.log('mounted');

    this.anim = lottie.loadAnimation({
      container: this.$refs.animation as any,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: jsonData,
    });
  }
}
</script>

<style lang="scss">
.game-content {
  margin: 0 auto;
  position: relative;
}
.pokemon-row {
  display: flex;
}

.game-container {
  display: flex;
}

.pokemon-item {
  height: 80px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #ccc;
  img {
    width: 50px;
    height: 50px;
  }
}

.pokemon-item {
  :hover {
    cursor: pointer;
  }
}

.active {
  border-color: aquamarine;
  background-color: yellow;
}

.bg-white {
  background-color: #fff;
}

.alert {
  display: flex;
  justify-content: center;
  align-items: center;
}

.disable-game {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.animation {
  height: 400px;
  width: 400px;
  position: absolute;
}
</style>
