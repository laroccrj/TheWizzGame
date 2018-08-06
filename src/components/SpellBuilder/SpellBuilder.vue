<template>
	<div>
		<h1>Spell Builder!</h1>
    <div>
      <button @click="playbackFrame(0)">Playback</button>
    </div>
    <div>
      <button v-for="frame in frameNumbers" :key="frame"
              :class="{selectedFrame: frame == currentFrame}"
              @click="loadFrame(frame)">
        {{ frame }}
      </button>
    </div>
    <div>
      <button @click="previousFrame"
              :disabled="currentFrame == 0">Prev Frame</button>
      <button @click="saveFrame(currentFrame)">Save Frame</button>
      <button @click="nextFrame">{{ currentFrame == frameCount ? 'New' : 'Next' }} Frame</button>
    </div>
    <div>
  		<table v-if="showGrid">
  			<tr v-for="row in displayGrid">
  				<td v-for="node in row.columns">
  					<component :is="node.val.component"
  										 :row="node.row"
  										 :column="node.column"
  										 :active="node.val.active"
                       :selected="node.val.selected"
  										 @playerNodeClick="onPlayerNodeClick"
                       @spellNodeClick="onSpellNodeClick"
  					></component>
  				</td>
    		</tr>
  		</table>
    </div>
    <div>
      Current frame: {{currentFrame}}
    </div>
    <div>
      <textarea v-model="spellJSON" class='spellLoader'></textarea>
    </div>
	</div>
</template>

<script>
import Vue from 'vue'
import Grid from '@/Domain/Grid/Grid'
import FrameCleaner from '@/Domain/Grid/FrameCleaner'
import PlayerNode from '@/components/SpellBuilder/Nodes/PlayerNode'
import SpellNode from '@/components/SpellBuilder/Nodes/SpellNode'

export default {

  name: 'SpellBuilder',

  data () {
    return {
    	gridWidth: 11,
    	gridHeight: 11,
    	showGrid: true,
      displayGrid: [],
      currentFrame: 0,
      frameHasChanges: false,
      frames: []
    }
  },
  components: {
    PlayerNode,
    SpellNode
  },
  created: function () {
    this.grid = new Grid(this.gridWidth, this.gridHeight, {component:'SpellNode', active: false, selected: false});
    var playerPosX = Math.round(this.gridWidth / 2) - 1;
    var playerPosY = Math.round(this.gridHeight / 2) - 1;
    this.originNode = {x:playerPosX, y:playerPosY};
    this.startingFrame = [{x:playerPosX, y:playerPosY}];
    this.frames.push(this.startingFrame);
    this.loadFrame(0);
    this.displayGrid = this.grid.getFormattedGrid();
  },
  methods: {
  	onPlayerNodeClick(row, column) {
  		this.grid.setGridValue(row, column, {component:'SpellNode', active:true});
  	},

    onSpellNodeClick(x, y) {
      var node = this.grid.getGridValue(x,y);
      node.selected = !node.selected;
    },

  	activateAroundNode(x, y) {
  		this.activateNode(x + 1, y);
	  	this.activateNode(x - 1, y);
	  	this.activateNode(x, y + 1);
	  	this.activateNode(x, y - 1);
	  	this.activateNode(x + 1, y + 1);
	  	this.activateNode(x + 1, y - 1);
	  	this.activateNode(x - 1, y + 1);
	  	this.activateNode(x - 1, y - 1);
  	},

  	activateNode(x, y) {
      if(!this.grid.withinBounds(x, y)) return;

  		var node = this.grid.getGridValue(x,y);
  		if(!node.active) {
  			node.active = true;
  		}
  	},

    selectNode(x, y) {
      var node = this.grid.getGridValue(x,y);
      node.active = true;
      node.selected = true;
    },

    resetGrid() {
      var x = this.grid.width;
      var y = this.grid.height;

      while(y--) {
        while(x--) {
          var node = this.grid.getGridValue(x,y);
          node.active = false;
          node.selected = false;
        }
        x = this.grid.width;
      }
    },

    getFrameFromGrid() {
      var frame = [];
      var x = this.grid.width;
      var y = this.grid.height;

      while(y--) {
        while(x--) {
          var node = this.grid.getGridValue(x,y);

          if(node.selected) {
            frame.push({x:x, y:y});
          }
        }
        x = this.grid.width;
      }

      return frame;
    },

    saveFrame(frameId) {
      var frame = this.getFrameFromGrid();

      if(frameId == -1) {
        frameId = this.frames.push(frame) - 1;
      } else {
        this.$set(this.frames, frameId, frame);
      }

      if(frameId > 0) {
        // clean frames
        var framesToClean = this.frames.splice(frameId);
        var cleanFrames = FrameCleaner.cleanFrames(this.frames[frameId - 1], framesToClean);
        Array.prototype.push.apply(this.frames, cleanFrames);
      }

      return frameId;
    },

    loadFrame(frameId) {
      this.resetGrid();
      var frame = this.frames[frameId];
      var i = frame.length;
      while(i--) {
        var node = frame[i];
        this.selectNode(node.x, node.y)
      }

      if(frameId == 0) {
        var previousFrame = this.startingFrame;
      } else {
        var previousFrame = this.frames[frameId - 1];
      }

      i = previousFrame.length;
      while(i--) {
        var node = previousFrame[i];
        this.activateNode(node.x, node.y);
        this.activateAroundNode(node.x, node.y);
      }

      this.currentFrame = frameId;
    },

    previousFrame() {
      this.checkForChanges();
      this.loadFrame(this.currentFrame - 1);
    },

    nextFrame() {
  	  this.checkForChanges();
      if(this.currentFrame != this.frames.length - 1) {
        this.loadFrame(this.currentFrame + 1);
      } else {
        var newFrameId = this.saveFrame(-1);
        this.loadFrame(newFrameId);
      }
    },

    checkForChanges() {
  	  let frame = this.frames[this.currentFrame];
  	  if(!FrameCleaner.compareFrames(this.getFrameFromGrid(), frame)) {
  	    if(confirm("Save changes to current frame?")) {
  	      this.saveFrame(this.currentFrame);
        }
      }
    },

    playbackFrame(frameId) {
      this.loadFrame(frameId);

      if(frameId != this.frames.length - 1) {
        var self = this;

        setTimeout(function(){
          self.playbackFrame(self.currentFrame + 1);
        }, 1000);
      }

    }
  },
  computed: {
    selectedCount() {
      var selected = 0;

      var x = this.grid.width;
      var y = this.grid.height;

      while(y--) {
        while(x--) {
          var node = this.grid.getGridValue(x,y);

          if(node.selected) {
            selected++;
          }
        }
        x = this.grid.width;
      }

      return selected;
    },

    frameCount() {
      return this.frames.length - 1;
    },

    frameNumbers() {
      var numbers = [];
      var keys = this.frames.keys();

      for(let key of keys) {
        numbers.push(key);
      }

      return numbers;
    },

    spellJSON: {
      get: function() {
        let relativeFrames = [];

        for (let i = 0; i < this.frames.length; i++) {
          let relativeFrame = [];
          let frame = this.frames[i];

          for(let n = 0; n < frame.length; n++) {
            let node = frame[n];
            let relativeNode = {
              x:node.x - this.originNode.x,
              y:node.y - this.originNode.y
            };

            relativeFrame.push(relativeNode);
          }

          relativeFrames.push(relativeFrame);
        }

        return JSON.stringify(relativeFrames)
      },
      set: function(spell) {
        let frames = [];
        let relativeFrames = JSON.parse(spell);

        for (let i = 0; i < relativeFrames.length; i++) {
          let frame = [];
          let relativeFrame = relativeFrames[i];

          for(let n = 0; n < relativeFrame.length; n++) {
            let relativeNode = relativeFrame[n];
            let node = {
              x:relativeNode.x + this.originNode.x,
              y:relativeNode.y + this.originNode.y
            };

            frame.push(node)
          }

          frames.push(frame);
        }

        this.frames = frames;

        this.loadFrame(0);
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .spellLoader {
    width:100%;
    height:200px;
  }
  .selectedFrame {
    background-color: green;
    color:white;
  }
</style>