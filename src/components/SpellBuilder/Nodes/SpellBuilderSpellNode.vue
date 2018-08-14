<template>
  <button class="spell-node-button"
          :class="{ inactive: !options.active, selected: options.selected}"
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
  background-color: #f3e8e8;
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

button {
  background: #ff9f9f;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

button:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
