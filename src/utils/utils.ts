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
