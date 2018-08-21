<template>
  <div>
    <div>
      <h2>Game Time</h2>
    </div>
    <div class="game-control-pad">
      <div class="game-control-pad-span-3">
        <h3 class="game-control-turn-notification">{{ displayName }}</h3>
      </div>
      <div>&nbsp;</div>
      <div><button class="push--flat" @click='moveForward'>⬆</button></div>
      <div>&nbsp;</div>
      <div><button class="push--flat" @click='rotateLeft'>↪</button></div>
      <div><button class="push--flat" @click="castSpell(spell)">🔥</button></div>
      <div><button class="push--flat" @click='rotateRight'>↩</button></div>
      <div>&nbsp;</div>
      <div><button class="push--flat" @click='moveForward'>⬇</button></div>
      <div>&nbsp;</div>
    </div>
    <div>
      <grid ref="grid"
            :rows=11
            :columns=11
            :width=500
            defaultComponent="GameFieldNode"
      >
      </grid>
    </div>
    <div>
      <textarea v-model="spellJSON" class='spellLoader'></textarea>
    </div>
  </div>
</template>

<script>
import Grid from '@/components/Grid'
import GameController from '@/Domain/Game/GameController'
import Utils from '@/Domain/Utils'
import Vue from 'vue'
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:3000');

export default {
  name: 'Game',
  data() {
    return {
      spell: [[{ x: 0, y: -1 }], [{ x: 0, y: -2 }], [{ x: 0, y: -3 }], [{ x: 0, y: -4 }]],
      displayName: ''
    }
  },
  components: {
    Grid
  },
  mounted: function() {
    this.gameController = new GameController(this.$refs.grid)
    this.updateScene()
  },
  methods: {
    rotateRight() {
      this.gameController.rotateRight()
      this.updateScene()
    },
    rotateLeft() {
      this.gameController.rotateLeft()
      this.updateScene()
    },
    moveForward() {
      this.$socket.emit('move_forward', '');
      this.gameController.movePlayerForward()
      this.updateScene()
    },
    castSpell(originalFrames) {
      let frames = Utils.deepCopy(originalFrames)
      this.gameController.castSpell(frames)
      this.updateScene()
    },
    updateScene() {
      this.displayName = this.gameController.currentPlayer.displayName
    }
  },
  computed: {
    spellJSON: {
      get: function() {
        return JSON.stringify(this.spell)
      },
      set: function(spell) {
        this.spell = JSON.parse(spell)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.spellLoader {
  width: 100%;
  height: 200px;
}
.game-control-pad {
  display: grid;
  grid-template-columns: repeat(3, 90px);
  grid-template-rows: repeat(4, 90px);
  margin: 20px auto;
  width: 280px;
  border: 5px solid #3f000b;
  border-radius: 25px;
  background-color: #ccc;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.game-control-pad div {
  padding: 5px;
}
.game-control-pad-span-3 {
  grid-column: span 3;
}
.game-control-turn-notification {
  font-size: 300%;
  height: 80px;
  line-height: 80px;
}

/* Vendored CSS below here
 * Sourced from https://codepen.io/thierrymichel/pen/Pwzbmd */
[class*='push'] {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
  line-height: 60px;
  border: 0;
  outline: none;
  background-color: #c2290a;
  border-radius: 50%;
  cursor: pointer;
  transition: box-shadow 200ms;
  font-size: 40px;
}

.push--flat {
  box-shadow: inset 0 2.5px 0 #da2e0b, inset 0 -2.5px 0 #aa2409, inset 0 0 0 2.5px #b32609,
    inset 0 0 0 6.6666666667px #c2290a, inset 0 0 0 8px #611405, inset 0 0 0 8.6956521739px black,
    inset 0 0 0 10.6666666667px rgba(247, 133, 110, 0.7), inset 0 0 0 14.5454545455px #c2290a,
    inset 0 32px 10.6666666667px #aa2409, inset 0 0 8px 13.3333333333px #911f08,
    0 4px 0 rgba(0, 0, 0, 0.3);
}
.push--flat:after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 8px;
  display: block;
  width: 64px;
  height: 64px;
  border: 5.3333333333px solid rgba(0, 0, 0, 0.3);
  border-width: 0 0 5.3333333333px;
  border-radius: 50%;
  transition-duration: 200ms;
}
.push--flat:active,
.push--flat.is-pushed {
  box-shadow: inset 0 2.5px 0 #da2e0b, inset 0 -2.5px 0 #aa2409, inset 0 0 0 2.5px #b32609,
    inset 0 0 0 6.6666666667px #c2290a, inset 0 0 0 8px #611405, inset 0 0 0 9.4117647059px black,
    inset 0 0 0 10.6666666667px rgba(247, 133, 110, 0.2), inset 0 0 0 14.5454545455px #b32609,
    inset 0 32px 10.6666666667px #9b2108, inset 0 0 8px 13.3333333333px #791a06,
    0 4px 0 rgba(0, 0, 0, 0.3);
  background-color: #b8270a;
}
.push--flat:active:after,
.push--flat.is-pushed:after {
  bottom: 9.3333333333px;
  border-width: 0;
}
</style>
