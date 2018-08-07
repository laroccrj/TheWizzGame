<template>
	<table>
		<tr v-for="row in displayGrid">
			<td v-for="node in row.columns">
				<component :is="node.val.component"
									 :row="node.row"
									 :column="node.column"
									 :value="node.value"
				></component>
			</td>
		</tr>
	</table>
</template>

<script>
import Grid from '@/Domain/Grid/Grid'
import SpellNode from '@/components/SpellBuilder/Nodes/SpellNode'

export default {

  name: 'grid',

  data () {
    return {
    	displayGrid: [],
    }
  },
  props: {
  	rows: Number,
  	columns: Number,
  	defaultComponent: String
  },
  created: function () {
    this.grid = new Grid(this.columns, this.rows, {component:this.defaultComponent});
    this.displayGrid = this.grid.getFormattedGrid();
  },
  components: {
  	SpellNode
  }
}
</script>

<style lang="css" scoped>
</style>