<template>
  <button :class="{ inactive: !options.active, selected: options.selected }"
          :disabled="options.active == false"
          @click="onNodeEvent('click')"
  >-</button>
</template>

<script>
import NodeComponent from '@/components/NodeComponent'
export default {
  extends: NodeComponent,
  name: 'SpellBuilderSpellNode',
  data() {
    return {}
  }
}
</script>

<style lang="css" scoped>
.inactive {
  background-color: #fff;
}
.selected {
  background-color: #000;
}
</style>
