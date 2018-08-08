<template>
	<div>
		<div>
			<h1>Game Time</h1>
		</div>
		<div><button @click='rotateLeft'>Rotate Left</button><button @click='moveForward'>Move Forward</button><button @click='rotateRight'>Rotate Right</button></div>
		<div>
			<grid ref="grid"
						:rows=11
						:columns=11
						defaultComponent="GameFieldNode"
			>
			</grid>
		</div>
	</div>
</template>

<script>
import Grid from '@/components/Grid'

export default {
	name: "Game",

	data() {
		return {
			playerNode: {
				component: 'GamePlayerNode', 
				facing: 'down',
			},
			playerPositionX: 0,
			playerPositionY: 5,
		};
	},
	components: {
	  Grid
	},
	mounted: function() {
		this.updatePlayer();
	},
	methods: {
		updatePlayer() {
			this.$refs.grid.setGridValue(this.playerPositionX, this.playerPositionY, this.playerNode);
		},
		rotateRight() {
			switch(this.playerNode.facing) {
				case "left":
					this.playerNode.facing = "up";
					break;
				case "up":
					this.playerNode.facing = "right";
					break;
				case "right":
					this.playerNode.facing = "down";
					break;
				case "down":
					this.playerNode.facing = "left";
					break;
				default:
					this.playerNode.facing = "down";
					console.error('Invalid playerNode.facing. Defaulting to down', this.playerNode.facing);
					break;
			}
			this.updatePlayer();
		},
		rotateLeft() {
			switch(this.playerNode.facing) {
				case "left":
					this.playerNode.facing = "down";
					break;
				case "up":
					this.playerNode.facing = "left";
					break;
				case "right":
					this.playerNode.facing = "up";
					break;
				case "down":
					this.playerNode.facing = "right";
					break;
				default:
					this.playerNode.facing = "down";
					console.error('Invalid playerNode.facing. Defaulting to down', this.playerNode.facing);
					break;
			}
			this.updatePlayer();
		},
		moveForward() {
			let changeY = 0;
			let changeX = 0;

			switch(this.playerNode.facing) {
				case "left":
					this.movePlayer(-1, 0);
					break;
				case "up":
					this.movePlayer(0, -1);
					break;
				case "right":
					this.movePlayer(1, 0);
					break;
				case "down":
					this.movePlayer(0, 1);
					break;
			}
		},
		movePlayer(changeX, changeY) {
			let newX = this.playerPositionX + changeX;
			let newY = this.playerPositionY + changeY;

			if(!this.$refs.grid.withinBounds(newX, newY)) return;

			this.$refs.grid.setGridValue(this.playerPositionX, this.playerPositionY, {component: 'GameFieldNode'});

			this.playerPositionY = newY;
			this.playerPositionX = newX;

			this.updatePlayer();
		}

	}
};
</script>

<style lang="css" scoped>
</style>
