<template>
	<div>
		<div>
			<h1>Game Time</h1>
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
import Vue from 'vue'
import Grid from '@/components/Grid'
import GameController from '@/Domain/Game/GameController'
import SpellInstance from '@/Domain/Game/SpellInstance'

export default {
  name: 'Game',
	data() {
		return {
			playerNode: {
				component: 'GamePlayerNode',
				facing: 'down'
			},
			playerPositionX: 0,
			playerPositionY: 5,
			spell: [[{ x: 0, y: -1 }], [{ x: 0, y: -2 }], [{ x: 0, y: -3 }], [{ x: 0, y: -4 }]],
			spellInstances: [],
			currentSpellNodes: []
		}
	},
	components: {
		Grid
	},
	mounted: function() {
    this.gameController = new GameController(this.$refs.grid)
	},
	methods: {
		updatePlayer() {
			this.$refs.grid.setGridValue(this.playerPositionX, this.playerPositionY, this.playerNode)
			this.nextTurn()
		},
		nextTurn() {
			this.clearSpellNodes()
			let i = this.spellInstances.length
			while (i--) {
				let spellInstance = this.spellInstances[i]
				this.drawSpellFrame(spellInstance)
			}
		},
		clearSpellNodes() {
			let i = this.currentSpellNodes.length

			while (i--) {
				let spellNode = this.currentSpellNodes[i]
				this.$refs.grid.setGridValue(spellNode.x, spellNode.y, { component: 'GameFieldNode' })
			}

			this.currentSpellNodes = []
		},
		rotateRight() {
			switch (this.playerNode.facing) {
				case 'left':
					this.playerNode.facing = 'up'
					break
				case 'up':
					this.playerNode.facing = 'right'
					break
				case 'right':
					this.playerNode.facing = 'down'
					break
				case 'down':
					this.playerNode.facing = 'left'
					break
				default:
					this.playerNode.facing = 'down'
					console.error('Invalid playerNode.facing. Defaulting to down', this.playerNode.facing)
					break
			}
			this.updatePlayer()
		},
		rotateLeft() {
			switch (this.playerNode.facing) {
				case 'left':
					this.playerNode.facing = 'down'
					break
				case 'up':
					this.playerNode.facing = 'left'
					break
				case 'right':
					this.playerNode.facing = 'up'
					break
				case 'down':
					this.playerNode.facing = 'right'
					break
				default:
					this.playerNode.facing = 'down'
					console.error('Invalid playerNode.facing. Defaulting to down', this.playerNode.facing)
					break
			}
			this.updatePlayer()
		},
		moveForward() {
			switch (this.playerNode.facing) {
				case 'left':
					this.movePlayer(-1, 0)
					break
				case 'up':
					this.movePlayer(0, -1)
					break
				case 'right':
					this.movePlayer(1, 0)
					break
				case 'down':
					this.movePlayer(0, 1)
					break
			}
		},
		movePlayer(changeX, changeY) {
			let newX = this.playerPositionX + changeX
			let newY = this.playerPositionY + changeY

      if (!this.$refs.grid.withinBounds(newX, newY)) return

      this.$refs.grid.setGridValue(this.playerPositionX, this.playerPositionY, {
        component: 'GameFieldNode'
      })

      this.playerPositionY = newY
      this.playerPositionX = newX

			this.updatePlayer()
		},
		castSpell(frames) {
			let spellInstance = new SpellInstance(
				this.playerNode.facing,
				this.playerPositionX,
				this.playerPositionY,
				frames
			)
			this.spellInstances.push(spellInstance)
			this.nextTurn()
		},
		drawSpellFrame(spellInstance) {
			let frame = spellInstance.getNextFrame()
			let i = frame.length
			while (i--) {
				let spellNode = frame[i]
				let x = spellInstance.originX
				let y = spellInstance.originY

				switch (spellInstance.direction) {
					case 'left':
						x += spellNode.y
						y -= spellNode.x
						break
					case 'up':
						x += spellNode.x
						y += spellNode.y
						break
					case 'right':
						x -= spellNode.y
						y += spellNode.x
						break
					case 'down':
						x -= spellNode.x
						y -= spellNode.y
						break
				}

				if (!this.$refs.grid.withinBounds(x, y)) return

				this.$refs.grid.setGridValue(x, y, {
					component: 'GameSpellNode'
				})
				this.currentSpellNodes.push({ x: x, y: y })
			}
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
