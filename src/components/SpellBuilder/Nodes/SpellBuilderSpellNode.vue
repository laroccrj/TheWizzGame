<template>
  <button class="spell-node-button"
          :class="{ active: options.active, inactive: !options.active, selected: options.selected}"
          :disabled="options.active == false"
          @click="onNodeEvent('click')"
  >{{options.selected ? '⚡' : '&nbsp;'}}</button>
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
  background-color: #fae5e5;
}
.active {
  background-color: #dd8888;
}
.selected {
  background-color: #3f000b;
}
.spell-node-button {
  padding: 0;
  border: 0;
  width: 90%;
  height: 90%;
  border-radius: 3px;
}
</style>
