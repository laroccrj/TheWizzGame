<template>
	<span @click="selected">P</span>
</template>

<script>
export default {
  name: 'PlayerNode',

  data() {
    return {}
  },
  props: {
    row: Number,
    column: Number
  },
  methods: {
    selected: function() {
      this.$emit('playerNodeClick', this.row, this.column)
    }
  }
}
</script>

<style lang="css" scoped>
</style>