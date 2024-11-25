/* eslint-disable @typescript-eslint/no-explicit-any */
export const enterFullscreen = () => {
	const docElm = document.documentElement;
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	if (isMobile) {
		if (docElm.requestFullscreen) {
			docElm.requestFullscreen();
		} else if ((docElm as any).webkitRequestFullscreen) {
			// iPad Safari
			(docElm as any).webkitRequestFullscreen();
		} else if ((docElm as any).msRequestFullscreen) {
			// IE/Edge
			(docElm as any).msRequestFullscreen();
		} else if ((docElm as any).mozRequestFullScreen) {
			// Firefox
			(docElm as any).mozRequestFullScreen();
		} else {
			alert("Fullscreen API is not supported!");
		}
	}
};

// Function to generate points for a 90-degree curve
export const createCurvePoints = (
	start: [number, number, number],
	radius: number,
	direction: "up-right" | "down-right" | "up-left" | "down-left"
) => {
	const curvePoints: [number, number, number][] = [];
	const segments = 20; // Number of segments for the curve (smoothness)

	for (let i = 0; i <= segments; i++) {
		const angle = (Math.PI / 2) * (i / segments); // Angle increment for a 90-degree curve
		let x = start[0];
		const y = start[1];
		let z = start[2];

		if (direction === "up-right") {
			x = start[0] + radius * (1 - Math.cos(angle));
			z = start[2] - radius * Math.sin(angle);
		} else if (direction === "down-right") {
			x = start[0] + radius * Math.sin(angle);
			z = start[2] + radius * (1 - Math.cos(angle));
		} else if (direction === "up-left") {
			x = start[0] - radius * (1 - Math.cos(angle));
			z = start[2] - radius * Math.sin(angle);
		} else if (direction === "down-left") {
			x = start[0] - radius * Math.sin(angle);
			z = start[2] + radius * (1 - Math.cos(angle));
		}

		curvePoints.push([x, y, z]);
	}

	return curvePoints;
};
