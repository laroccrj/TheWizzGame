<template>
  <input type="radio"/>
</template>

<script>
export default {
  name: 'spell-creator-node',
  props: {
    row: Number,
    column: Number,
    options: Object
  },
  data() {
    return {}
  },
  methods: {
    onNodeEvent: function(event) {
      this.$emit('onNodeEvent', event, this.column, this.row)
    }
  }
}
</script>
