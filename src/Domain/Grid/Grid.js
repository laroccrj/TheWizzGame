import Utils from '@/Domain/Utils'
import Vue from 'vue'

export default class Grid {

	constructor (width, height, def) {
		this.width = width;
		this.height = height;
		this.grid = Utils.createArray(height, width);
		this.gridCached = false;

		var x = width;
		var y = height;

		while(y--) {
			while(x--) this.setGridValue(x, y, Vue.util.extend({}, def)); // Might cause issue, not sure how deep this extend copies
			x = width;
		}

		this.getFormattedGrid();
	}

	setGridValue(x, y, value) {
		if(!this.withinBounds(x, y)) {
			console.error('Tried to set grid value out of bounds');
			return;
		}

		this.grid[y][x] = value;
		this.gridCached = false;
	}

	getGridValue(x, y) {
		if(!this.withinBounds(x, y)) {
			console.error('Tried to get grid value out of bounds');
			return;
		}

		return this.grid[y][x];
	}
	
	getRow(y) {
		if(y < 0 || y >= this.height) {
			console.error('Tried to get grid row out of bounds');
			return;
		}

		return this.grid[y];
	}

	getFormattedGrid() {
		var grid = [];
		if(this.gridCached) return this.gridCached;

		var x = this.width;
		var y = this.height;

		while(y--) {
			var row = {
				row : y,
				columns : []
			}

			while(x--) {
				row.columns[x] = {
					row: y,
					column: x,
					val: this.getGridValue(x, y),
				}
			} 
			x = this.width;
			grid[y] = row;
		}

		this.formattedGrid = grid;
		return grid;
	}

	withinBounds(x, y) {
		return !(x < 0 || x >= this.width || y < 0 || y >= this.height);
	}

}