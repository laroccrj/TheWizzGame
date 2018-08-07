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
      onNodeClick: function () {
        this.$emit('onNodeClick', this.column, this.row)
      }
    }
  }
</script>