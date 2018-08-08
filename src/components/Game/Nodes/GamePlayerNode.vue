<template>
  <div>
  	<img :src="'/static/wiz.png'" 
  			 :class="getFaceingClass()">
  </div>
</template>

<script>
import NodeComponent from '@/components/NodeComponent'

export default {
	extends: NodeComponent,
	name: 'GamePlayerNode',
	data() {
		return {}
	},
	methods: {
		getFaceingClass() {
			switch (this.options.facing) {
				case 'up':
					return 'face-up'
					break
				case 'right':
					return 'face-right'
					break
				case 'left':
					return 'face-left'
					break
				default:
					return 'face-down'
					break
			}
			return 'face-left'
		}
	}
}
</script>

<style scoped>
img {
	width: 50px;
	height: 50px;
}
.face-left {
	transform: rotate(90deg);
}
.face-up {
	transform: rotate(180deg);
}
.face-right {
	transform: rotate(270deg);
}
.face-down {
	transform: rotate(0deg);
}
</style>
