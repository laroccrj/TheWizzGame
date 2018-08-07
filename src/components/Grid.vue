<template>
	<table>
		<tr v-for="row in displayGrid">
			<td v-for="node in row.columns">
				<component :is="node.val.component"
									 :row="node.row"
									 :column="node.column"
									 :options="node.val"
									 @onNodeClick="onNodeClick"
				></component>
			</td>
		</tr>
	</table>
</template>

<script>

import Vue from 'vue'
import Grid from '@/Domain/Grid/Grid'
import SpellNode from '@/components/SpellBuilder/Nodes/SpellNode'
import PlayerNode from '@/components/SpellBuilder/Nodes/PlayerNode'
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
		defaultComponent: String,
		defaultOptions: Object,
	},
	created: function() {
    this.grid = Utils.createArray(this.rows, this.columns);
    this.gridCached = false;

    let defaultOptions = this.defaultOptions ? this.defaultOptions : {};
    defaultOptions.component = this.defaultComponent;

    let x = this.columns;
    let y = this.rows;

    while (y--) {
      while (x--) this.setGridValue(x, y, Vue.util.extend({}, defaultOptions)) // Might cause issue, not sure how deep this extend copies
      x = this.columns;
    }

		this.displayGrid = this.getFormattedGrid();
	},
	// Needs to include all possible nodes
	components: {
		SpellNode,
		NodeComponent,
		PlayerNode
	},
	methods: {
    onNodeClick(row, column) {
      this.$emit('onNodeClick', row, column);
    },

    setGridValue(x, y, value) {
      if (!this.withinBounds(x, y)) {
        console.error('Tried to set grid value out of bounds')
        return
      }

      this.grid[y][x] = value;
      this.gridCached = false
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
      let grid = [];
      if (this.gridCached) return this.gridCached;

      let x = this.columns;
      let y = this.rows;

      while (y--) {
        let row = {
          row: y,
          columns: []
        };

        while (x--) {
          row.columns[x] = {
            row: y,
            column: x,
            val: this.getGridValue(x, y)
          }
        }
        x = this.columns;
        grid[y] = row
      }

      return grid
    },
	}
}
</script>

<style lang="css" scoped>
</style>
