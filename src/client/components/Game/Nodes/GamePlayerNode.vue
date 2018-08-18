<template>
  <div :class="{faceUp: facingUp,
  							faceDown: facingDown,
  							faceLeft: facingLeft,
  							faceRight: facingRight,
  							selected: options.selected}">
  		
	</div>
</template>

<script>
import NodeComponent from '@/components/NodeComponent'
import Player from '@/Domain/Game/Player'

export default {
	extends: NodeComponent,
	name: 'GamePlayerNode',
	data() {
		return {}
	},
	computed: {
		facingUp: function() {
			return this.options.facing == Player.FACING_UP
		},
		facingDown: function() {
			return this.options.facing == Player.FACING_DOWN
		},
		facingLeft: function() {
			return this.options.facing == Player.FACING_LEFT
		},
		facingRight: function() {
			return this.options.facing == Player.FACING_RIGHT
		}
	}
}
</script>

<style scoped>
div {
	width: 100%;
	height: 100%;
	background-image: url('/static/wiz.png');
	background-size: 100%;
}
.selected {
	border: 1px solid red;
}
.faceLeft {
	transform: rotate(90deg);
}
.faceUp {
	transform: rotate(180deg);
}
.faceRight {
	transform: rotate(270deg);
}
.faceDown {
	transform: rotate(0deg);
}
</style>
