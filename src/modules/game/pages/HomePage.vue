<template>
  <div class="home">
    <h1>Pokemon Game</h1>
    <h2>Game level: {{ level }}</h2>
    <h2>Count down: {{ time }}</h2>
    <h2>Score: {{ score }}</h2>
    <div class="alert d-none">
      <h1>You Win!!</h1>
    </div>
    <div class="game-content">
      <div class="pokemon-col" v-for="(items, col) in images" :key="col">
        <div class="pokemon-row" v-for="(item, row) in items" :key="row">
          <div
            class="pokemon-item"
            :style="{ backgroundColor: randomColor }"
            @click="selectAction($event)"
            :id="item.name"
          >
            <img :src="item.icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import icons from '../icons';
import GameBoard, { GameSize } from '../models/game-board';
import Pokemon from '../models/pokemon';
import _ from 'lodash';

const pokemonList: Pokemon[] = [];
_.forEach(icons, (item, key) => {
  pokemonList.push(new Pokemon({ name: key, icon: item }));
});

const gameBoard = new GameBoard(pokemonList);

const audioElement = new Audio(require('@/assets/sounds/pop.mp3'));

@Options({})
export default class HomePage extends Vue {
  count = 0;
  started = false;
  interval: any = null;

  get images() {
    return this.game.makeTable();
  }

  get score() {
    return this.game.score.value;
  }

  get game() {
    return gameBoard;
  }

  get level() {
    return _.capitalize(this.game.level);
  }

  get time() {
    return this.game.time.value;
  }

  changeTime() {
    this.interval = setInterval(() => {
      this.game.time.value = this.game.time.value - 1;
      if (this.game.time.value === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  get randomColor() {
    let color = '#';
    for (let i = 0; i < 3; i++)
      color += (
        '0' + Math.floor((Math.random() * Math.pow(16, 2)) / 2).toString(16)
      ).slice(-2);
    return color;
  }

  get audio() {
    return audioElement;
  }

  onWinGame() {
    clearInterval(this.interval);
    var audio = new Audio(require('@/assets/sounds/win.mp3'));
    audio.play();
  }

  selectAction(event: any) {
    var { target } = event;
    this.audio.play();

    if (this.started === false) {
      this.started = true;
      this.changeTime();
    }

    if (target.localName === 'img') {
      target = target.parentElement;
    }
    if (target.classList.contains('pokemon-selected')) {
      target.classList.remove('pokemon-selected');
    } else {
      target.classList.add('pokemon-selected');
      var result = this.game.onSelectPokemon(
        new Pokemon({ name: target.id, icon: target.childNodes[0].src }),
      );
      if (result === false) return;
      if (result === null) {
        document.querySelectorAll('.pokemon-selected').forEach((item) => {
          item.classList.remove('pokemon-selected');
        });
        return;
      }
      if (result === true) {
        _.map(document.querySelectorAll('.pokemon-selected'), (item) => {
          item.classList.remove('pokemon-selected');
          item.classList.add('d-none', 'bg-white');
        });
        const totalSquare = GameSize[this.game.level].col * GameSize[this.game.level].row;
        if (this.game.score.value === totalSquare / 2) {
          this.onWinGame();
        }
      }
    }
  }
}
</script>

<style>
.game-content {
  margin-top: 20px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.pokemon-row {
  height: 80px;
  border: 1px solid #ccc;
}
.pokemon-col {
  width: 80px;
}
.pokemon-item {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon-item:hover > img {
  cursor: pointer;
  width: 50px;
}

.pokemon-selected,
.pokemon-item:active {
  border: 4px solid #fbff91;
}

.d-none {
  display: none;
}

.bg-white {
  background-color: #fff;
}

.alert {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
