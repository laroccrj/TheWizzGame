<template>
  <div>
    <div>
      <h2>Game Time</h2>
    </div>
    <div>
      <h3>{{ displayName }}'s turn</h3>
    </div>
    <div>
      <button @click="castSpell(spell)">Cast Spell</button>
    </div>
    <div>
      <button @click='rotateLeft'>Rotate Left</button>
      <button @click='moveForward'>Move Forward</button>
      <button @click='rotateRight'>Rotate Right</button>
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

export default {
  name: 'Game',
	data() {
		return {
			spell: [[{ x: 0, y: -1 }], [{ x: 0, y: -2 }], [{ x: 0, y: -3 }], [{ x: 0, y: -4 }]],
			displayName : ''
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
</style>
