<template>
	<div>
		<div>
			<a href="/#/SpellBuilder/"> <button>Spell Creator</button></a>
		</div>
		<div>
			<grid :rows=11
						:columns=11
						defaultComponent="SpellNode">
				
			</grid>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import grid from './Grid.vue'

export default {
	name: 'HomePageComponent',
	data() {
		return {}
	},
	components: {
		grid
	}
}
</script>
