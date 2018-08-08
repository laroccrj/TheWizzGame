<template>
  <table>
    <tr v-for="row in displayGrid">
      <td v-for="node in row.columns">
        <component :is="node.val.component"
                   :row="node.row"
                   :column="node.column"
                   :options="node.val"
                   @onNodeEvent="onNodeEvent"
        ></component>
      </td>
    </tr>
  </table>
</template>

<script>
import Vue from 'vue'
import SpellBuilderSpellNode from '@/components/SpellBuilder/Nodes/SpellBuilderSpellNode'
import SpellBuilderPlayerNode from '@/components/SpellBuilder/Nodes/SpellBuilderPlayerNode'
import GamePlayerNode from '@/components/Game/Nodes/GamePlayerNode'
import GameFieldNode from '@/components/Game/Nodes/GameFieldNode'
import GameSpellNode from '@/components/Game/Nodes/GameSpellNode'
import NodeComponent from './NodeComponent'
import Utils from '@/Domain/Utils'

export default {
  name: 'grid',

  data() {
    return {
      displayGrid: []
    }
  },
  props: {
    rows: Number,
    columns: Number,
    defaultComponent: {
      type: String,
      default: 'NodeComponent'
    },
    defaultOptions: Object
  },
  created: function() {
    this.grid = Utils.createArray(this.rows, this.columns)
    this.gridCached = false

    let defaultOptions = this.defaultOptions ? this.defaultOptions : {}
    defaultOptions.component = this.defaultComponent

    let x = this.columns
    let y = this.rows

    while (y--) {
      while (x--) this.setGridValue(x, y, Vue.util.extend({}, defaultOptions)) // Might cause issue, not sure how deep this extend copies
      x = this.columns
    }

    this.displayGrid = this.getFormattedGrid()
  },
  // Needs to include all possible nodes
  components: {
    SpellBuilderSpellNode,
    NodeComponent,
    SpellBuilderPlayerNode,
    GamePlayerNode,
    GameFieldNode,
    GameSpellNode
  },
  methods: {
    onNodeEvent(event, row, column) {
      this.$emit('onNodeEvent', event, row, column)
    },

    setGridValue(x, y, value) {
      if (!this.withinBounds(x, y)) {
        console.error('Tried to set grid value out of bounds')
        return
      }

      this.grid[y][x] = value
      this.gridCached = false
      this.displayGrid = this.getFormattedGrid()
    },

    getGridValue(x, y) {
      if (!this.withinBounds(x, y)) {
        console.error('Tried to get grid value out of bounds')
        return
      }

      return this.grid[y][x]
    },

    withinBounds(x, y) {
      return !(x < 0 || x >= this.columns || y < 0 || y >= this.rows)
    },

    getFormattedGrid() {
      let grid = []
      if (this.gridCached) return this.gridCached

      let x = this.columns
      let y = this.rows

      while (y--) {
        let row = {
          row: y,
          columns: []
        }

        while (x--) {
          row.columns[x] = {
            row: y,
            column: x,
            val: this.getGridValue(x, y)
          }
        }
        x = this.columns
        grid[y] = row
      }

      return grid
    }
  }
}
</script>

<style lang="css" scoped>
</style>
