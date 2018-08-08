<template>
	<div>
		<div>
			<h1>Game Time</h1>
		</div>
		<div><button @click="castSpell(spell)">Cast Spell</button></div>
		<div><button @click='rotateLeft'>Rotate Left</button><button @click='moveForward'>Move Forward</button><button @click='rotateRight'>Rotate Right</button></div>
		<div>
			<grid ref="grid"
						:rows=11
						:columns=11
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
			spell:[],
			spellInstances: [],
			currentSpellNodes: []
		}
	},
	components: {
		Grid
	},
	mounted: function() {
		this.updatePlayer()
	},
	methods: {
		updatePlayer() {
			this.$refs.grid.setGridValue(this.playerPositionX, this.playerPositionY, this.playerNode)
		},
		nextTurn() {
      this.clearSpellNodes();
			let i = this.spellInstances.length;
			while(i--) {
			  let spellInstance = this.spellInstances[i]
			  this.drawSpellFrame(spellInstance)
			}
		},
		clearSpellNodes() {
      let i = this.currentSpellNodes.length;
      console.log(this.currentSpellNodes);

      while(i--) {
        let spellNode = this.currentSpellNodes[i]
				console.log(spellNode.y)
        this.$refs.grid.setGridValue(spellNode.x, spellNode.y, 'GameFieldNode')
      }

      this.currentSpellNodes.splice(0);
      console.log(this.currentSpellNodes);
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
		  let spellInstance = new SpellInstance(this.playerPositionX, this.playerPositionY, frames);
			this.spellInstances.push(spellInstance);
			this.nextTurn();
		},
		drawSpellFrame(spellInstance) {
		  let frame = spellInstance.getNextFrame()
		  let i = frame.length;
		  while(i--) {
		    let spellNode = frame[i];
		    let x = spellNode.x + spellInstance.originX
				let y = spellNode.y + spellInstance.originY

        this.$refs.grid.setGridValue(
          x,
					y,
					{
          	component: 'GameSpellNode'
          }
				)

				this.currentSpellNodes.push({x:x, y:y});
			}
		}
	},
  computed: {
		spellJSON: {
			get: function() {
				return JSON.stringify(this.spell)
			},
			set: function(spell) {
				this.spell =  JSON.parse(spell)
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
