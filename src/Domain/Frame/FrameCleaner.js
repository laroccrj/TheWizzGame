export default class FrameCleaner {
  /**
   * A frame is a step a spell that is saved as a list of nodes where the spell is present
   * ex: [{1,2},{2,2}]
   *
   * Each node of a frame must be present in the previous frame, or adjacent to a node in the previous frame
   * Diagonal counts as adjecent
   */

  /**
   * Checks if the nodes are possible for the next frames based off previous frame
   * Removes impossible nodes
   * @param previousFrame
   * @param frames
   * @returns {Array}
   */
	static cleanFrames(previousFrame, frames) {
		if(!frames || frames.length == 0) return;

		var newFrames = [];

		var frame = frames.shift();
		frame = FrameCleaner.cleanFrame(previousFrame, frame);

		if(frame.length > 0) {
			newFrames.push(frame);

			if(frames.length > 0) {
				Array.prototype.push.apply(newFrames, FrameCleaner.cleanFrames(frame, frames));
			}
		}

		return newFrames;
	}

  /**
   * Removes any nodes that are not possible based on the previous frame
   * @param previousFrame
   * @param frame
   * @returns {*}
   */
	static cleanFrame(previousFrame, frame) {
		var i = frame.length;

		while(i--)
			if(!FrameCleaner.nodePossible(previousFrame, frame[i])) frame.splice(i, 1);

		return frame;
	}

  /**
   * Checks if the node is adjacent or diagonal to any nodes from the previous frame
   * @param previousFrame
   * @param node
   * @returns {boolean}
   */
	static nodePossible(previousFrame, node) {
		var i = previousFrame.length;

		while(i--)
			if(FrameCleaner.touching(previousFrame[i], node)) return true;

		return false;
	}

  /**
   * Checks if a node is adjacent or diagonal to another node
   * @param node1
   * @param node2
   * @returns {boolean}
   */
	static touching(node1, node2) {
		if(Math.abs(node1.x - node2.x) <= 1 && Math.abs(node1.y - node2.y) <= 1) {
			return true;
		}

		return false;
	}

  /**
   * Checks if two frames have the same nodes set
   * @param frame1
   * @param frame2
   * @returns {boolean}
   */
	static compareFrames(frame1, frame2) {
		var equal = true;

		if(frame1.length != frame2.length) return false;

		var i = frame1.length;
		while(i--) equal &= (frame1[i].x == frame2[i].x && frame1[i].y == frame2[i].y);

		return equal;
	}
}