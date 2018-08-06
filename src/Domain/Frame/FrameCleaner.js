export default class FrameCleaner {
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

	static cleanFrame(previousFrame, frame) {
		var i = frame.length;

		while(i--)
			if(!FrameCleaner.nodePossible(previousFrame, frame[i])) frame.splice(i, 1);

		return frame;
	}

	static nodePossible(previousFrame, node) {
		var i = previousFrame.length;

		while(i--)
			if(FrameCleaner.touching(previousFrame[i], node)) return true;

		return false;
	}

	static touching(node1, node2) {
		if(Math.abs(node1.x - node2.x) <= 1 && Math.abs(node1.y - node2.y) <= 1) {
			return true;
		}

		return false;
	}

	static compareFrames(frame1, frame2) {
		var equal = true;

		if(frame1.length != frame2.length) return false;

		var i = frame1.length;
		while(i--) equal &= (frame1[i].x == frame2[i].x && frame1[i].y == frame2[i].y);

		return equal;
	}
}