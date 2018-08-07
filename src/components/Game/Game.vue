<template>
	<div>
		<div>
			<h1>Game Time</h1>
		</div>
		<div>
			<grid ref="grid"
						:rows=11
						:columns=11>
			</grid>
		</div>
	</div>
</template>

<script>
import Grid from '@/components/Grid'

export default {
	name: "Game",

	data() {
		return {};
	},
	components: {
	  Grid
	}
};
</script>

<style lang="css" scoped>
</style>
