<template>
	<button :class="{ inactive: !active, selected: selected }"
					:disabled="active == false"
					@click="onClick"
	>-</button>
</template>

<script>
export default {

  name: 'SpellNode',
  props: {
  	row: Number,
  	column: Number,
  	active: Boolean,
  	selected: Boolean
  },
  data () {
    return {

    }
  },
  methods: {
  	onClick: function() {
  		this.$emit('spellNodeClick', this.column, this.row)
  	}
  }
}
</script>

<style lang="css" scoped>
	.inactive {
		background-color: #fff
	}
	.selected {
		background-color: #000
	}
</style>