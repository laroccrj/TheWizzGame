<template>
	<div>
		<h1>Spell Builder!</h1>
    <div>
      <button @click="startPlayback()">Playback</button>
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
              :disabled="currentFrame == 0 || playingBack">Prev Frame</button>
      <button @click="saveFrame(currentFrame)"
              :disabled="playingBack">Save Frame</button>
      <button @click="nextFrame"
              :disabled="playingBack">{{ currentFrame == frameCount ? 'New' : 'Next' }} Frame</button>
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
      <button type="button"
        v-clipboard:copy="spellJSON"
        v-clipboard:success="() => showAlert('Copied spell to clipboard')"
        v-clipboard:error="() => showAlert('Error copying spell to clipboard')">Copy Spell to Clipboard</button>
    </div>
	</div>
</template>

<script>
import Vue from 'vue'
import Grid from '@/Domain/Grid/Grid'
import FrameCleaner from '@/Domain/Frame/FrameCleaner'
import PlayerNode from '@/components/SpellBuilder/Nodes/PlayerNode'
import SpellNode from '@/components/SpellBuilder/Nodes/SpellNode'

export default {
  name: 'SpellBuilder',

  data() {
    return {
      gridWidth: 11,
      gridHeight: 11,
      showGrid: true,
      displayGrid: [],
      currentFrame: 0,
      frameHasChanges: false,
      frames: [],
      playingBack: false
    }
  },
  components: {
    PlayerNode,
    SpellNode
  },
  created: function() {
    this.grid = new Grid(this.gridWidth, this.gridHeight, {
      component: 'SpellNode',
      active: false,
      selected: false
    })

    // Place the player in the center and save the first frame as an empty frame
    var playerPosX = Math.round(this.gridWidth / 2) - 1
    var playerPosY = Math.round(this.gridHeight / 2) - 1
    this.originNode = { x: playerPosX, y: playerPosY }
    this.frames.push([])

    // Load initial frame and display it
    this.loadFrame(0)
    this.displayGrid = this.grid.getFormattedGrid()
  },
  methods: {
    /**
     * Will be received when a spell node is click
     * Just reverse the selected property of the node
     * Should not receive these for any inactive spell nodes
     * @param x
     * @param y
     *
     */
    onSpellNodeClick(x, y) {
      var node = this.grid.getGridValue(x, y)
      node.selected = !node.selected
    },

    /**
     * Activates all the nodes around a node
     * Useful when loading a new frame and need to enable all the frames around the ones selected in the previous frame
     * stopDuringPlayback, if set to false, this will happen during playback
     */
    activateAroundNode(x, y, stopDuringPlayback = true) {
      if (this.playingBack && stopDuringPlayback) return

      this.activateNode(x + 1, y)
      this.activateNode(x - 1, y)
      this.activateNode(x, y + 1)
      this.activateNode(x, y - 1)
      this.activateNode(x + 1, y + 1)
      this.activateNode(x + 1, y - 1)
      this.activateNode(x - 1, y + 1)
      this.activateNode(x - 1, y - 1)
    },

    /**
     * Activates a node, making it clickable
     * Can also set the component. Defaults to spell node because right now that is the case 99% of the time
     * @param x
     * @param y
     * @param component
     * @param stopDuringPlayback, if set to false, this will happen during playback
     */
    activateNode(x, y, component = 'SpellNode', stopDuringPlayback = true) {
      if (!this.grid.withinBounds(x, y)) return
      if (this.playingBack && stopDuringPlayback) return

      var node = this.grid.getGridValue(x, y)
      node.component = component
      if (!node.active) {
        node.active = true
      }
    },

    /**
     * Sets active and selected properties of a node to true.
     * Causes it to be clickable and shows it as selected
     * @param x
     * @param y
     */
    selectNode(x, y) {
      var node = this.grid.getGridValue(x, y)
      node.active = true
      node.selected = true
    },

    /**
     * Deselects all nodes and sets them to inactive
     */
    resetGrid() {
      var x = this.grid.width
      var y = this.grid.height

      while (y--) {
        while (x--) {
          var node = this.grid.getGridValue(x, y)
          node.active = false
          node.selected = false
          node.component = 'SpellNode'
        }
        x = this.grid.width
      }
    },

    /**
     * This builds a frame from the current state of the grid
     * Frames can be thought of as the steps of a spell
     * The format of a frame is an array of nodes which consist of an x property and a y property
     * ex: [{1:0},{1:2}]
     * @returns {Array}
     */
    getFrameFromGrid() {
      var frame = []
      var x = this.grid.width
      var y = this.grid.height

      while (y--) {
        while (x--) {
          var node = this.grid.getGridValue(x, y)

          if (node.selected && node.component == 'SpellNode') {
            frame.push({ x: x, y: y })
          }
        }
        x = this.grid.width
      }

      return frame
    },

    /**
     * This saves the current grid as a frame to the list of frames
     * If frameId is -1, it will create a new frame. If not, it will save over that frame
     * Validity of the spell will also be checked for every frame after this one, making sure that all future frames
     * are still possible
     * If the frame is saved with no selected nodes, therefore deleted, it will load the previous node
     * @param frameId
     * @returns {*}
     */
    saveFrame(frameId) {
      var frame = this.getFrameFromGrid()

      if (frameId == -1) {
        frameId = this.frames.push(frame) - 1
      } else {
        this.$set(this.frames, frameId, frame)
      }

      // clean frames
      if (frameId >= 0) {
        // no need to clean if it's a new frame
        let cleanFrom = frameId == 0 ? frameId : frameId - 1 // Want to clean from the previous frame unless we are at the first frame
        let spliceFrom = frameId == 0 ? 1 : frameId // Don't splice the first frame

        var framesToClean = this.frames.splice(spliceFrom)
        var cleanFrames = FrameCleaner.cleanFrames(this.frames[cleanFrom], framesToClean)
        Array.prototype.push.apply(this.frames, cleanFrames)
      }

      // If this was a save of an empty frame, this frame, and the ones after are all deleted so load the previous one
      if (frameId > this.frames.length - 1) {
        this.loadFrame(this.frames.length - 1)
      }

      return frameId
    },

    /**
     * Resets the grid, then activates and selects nodes according to the frame
     * Has a special case for the starting frame (id: 0) to set the origin to a player node
     * Sets the currentFrame to the id of the frame loaded after it is done loading
     * @param frameId
     */
    loadFrame(frameId) {
      this.resetGrid()

      if (frameId > this.frames.length - 1) {
        frameId = this.frames.length - 1
      }

      if (frameId < 0) {
        frameId = 0
      }

      var frame = this.frames[frameId] ? this.frames[frameId] : []
      var i = frame.length

      while (i--) {
        var node = frame[i]
        this.selectNode(node.x, node.y)
      }

      if (frameId == 0) {
        // Special case for the starting frame
        this.activateNode(this.originNode.x, this.originNode.y, 'PlayerNode', false)
        this.activateAroundNode(this.originNode.x, this.originNode.y)
      } else {
        var previousFrame = this.frames[frameId - 1]

        i = previousFrame.length
        while (i--) {
          var node = previousFrame[i]
          this.activateAroundNode(node.x, node.y)
          this.activateNode(node.x, node.y)
        }
      }

      this.currentFrame = frameId
    },

    /**
     * Loads the frame before the current frame
     */
    previousFrame() {
      this.checkForChanges()
      this.loadFrame(this.currentFrame - 1)
    },

    /**
     * Loads the frame after the current frame
     * If we are currently on the last frame, it will add a new one
     */
    nextFrame() {
      this.checkForChanges()
      if (this.currentFrame != this.frames.length - 1) {
        this.loadFrame(this.currentFrame + 1)
      } else {
        var newFrameId = this.saveFrame(-1)
        this.loadFrame(newFrameId)
      }
    },

    /**
     * Compares the current grid to the frame that is saved currentFrame
     * If there are differences, it asks the user if they want to save the changes
     */
    checkForChanges() {
      let frame = this.frames[this.currentFrame]
      if (!FrameCleaner.compareFrames(this.getFrameFromGrid(), frame)) {
        if (confirm('Save changes to current frame?')) {
          this.saveFrame(this.currentFrame)
        }
      }
    },

    startPlayback() {
      this.playingBack = true
      this.playbackFrame(0)
    },

    /**
     * Plays an animation of the spell
     * @param frameId
     */
    playbackFrame(frameId) {
      if (frameId != this.frames.length - 1) {
        var self = this

        setTimeout(function() {
          self.playbackFrame(self.currentFrame + 1)
        }, 1000)
      } else {
        this.playingBack = false
      }

      this.loadFrame(frameId)
    },

    /**
     * Shows a toast-style alert with the specified text
     * @param text
     */
    showAlert(text) {
      // Meh. This is a problem for when we feel like designing
      alert(text)
    }
  },
  computed: {
    frameCount() {
      return this.frames.length - 1
    },

    /**
     * Gets the keys of the frame array
     * @returns {Array}
     */
    frameNumbers() {
      var numbers = []
      var keys = this.frames.keys()

      for (let key of keys) {
        numbers.push(key)
      }

      return numbers
    },

    spellJSON: {
      /**
       * Takes the frames, sets their values relative to the origin, the outputs them as JSON
       *
       * @returns {string}
       */
      get: function() {
        let relativeFrames = []

        for (let i = 0; i < this.frames.length; i++) {
          let relativeFrame = []
          let frame = this.frames[i]

          for (let n = 0; n < frame.length; n++) {
            let node = frame[n]
            let relativeNode = {
              x: node.x - this.originNode.x,
              y: node.y - this.originNode.y
            }

            relativeFrame.push(relativeNode)
          }

          relativeFrames.push(relativeFrame)
        }

        return JSON.stringify(relativeFrames)
      },
      /**
       * Takes a JSON of frames, sets their values relative to the origin, then loads the first frame into the grid
       *
       * @param spell
       */
      set: function(spell) {
        let frames = []
        let relativeFrames = JSON.parse(spell)

        for (let i = 0; i < relativeFrames.length; i++) {
          let frame = []
          let relativeFrame = relativeFrames[i]

          for (let n = 0; n < relativeFrame.length; n++) {
            let relativeNode = relativeFrame[n]
            let node = {
              x: relativeNode.x + this.originNode.x,
              y: relativeNode.y + this.originNode.y
            }

            frame.push(node)
          }

          frames.push(frame)
        }

        this.frames = frames

        this.loadFrame(0)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.spellLoader {
  width: 100%;
  height: 200px;
}
.selectedFrame {
  background-color: green;
  color: white;
}
</style>