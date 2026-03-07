// main.js
import { DOM, isMobile } from './dom.js';
import { showPage, spinLogo, endSpin, buttonEffect, nameTypeWrite, randomizeColor, showVideo, showImage, samsName, navEnter, navLeave } from './ui.js';
import { popOut, clickToReturn } from './infoPanel.js';
import { checkResources, fetchLatestVideo } from './background.js';

DOM.logo.addEventListener('click', spinLogo);
DOM.logo.addEventListener('animationend', endSpin);

['click', 'touchstart'].forEach(evt => DOM.button.addEventListener(evt, buttonEffect));
DOM.samName.addEventListener('click', randomizeColor);
DOM.infoToggle.addEventListener('change', popOut);
DOM.close.addEventListener('click', clickToReturn);
DOM.clickSpace.addEventListener('touchstart', clickToReturn);
DOM.clickSpace.addEventListener('click', clickToReturn);
DOM.clickSpace.addEventListener('touchend', e => {
	e.preventDefault(); // touchend makes like a click simulation
});

['click', 'touchstart'].forEach(evt => {
	DOM.menuCloseButton.addEventListener(evt, () => {
		DOM.navMenu.classList.toggle('nav-menu-open');
		DOM.clickSpace.classList.add('disabled');
	});

	DOM.menuOpenButton.addEventListener(evt, () => {
		DOM.navMenu.classList.toggle('nav-menu-open');
		DOM.clickSpace.classList.remove('disabled');
	});
});

DOM.navMenuArea.addEventListener('mouseenter', navEnter);
DOM.navMenuArea.addEventListener('mouseleave', navLeave);

DOM.backgroundAnimationVideo.addEventListener('canplaythrough', showVideo);

DOM.backgroundImageImage.addEventListener('load', showImage);

window.addEventListener('load', () => {
	document.body.style.visibility = 'visible';
});

document.addEventListener('DOMContentLoaded', () => {
	showPage();

	setTimeout(() => {
		DOM.infoToggle.checked = true;

		if (!isMobile) {
			setTimeout(nameTypeWrite, 200);
		}
		setTimeout(checkResources, 250);
		fetchLatestVideo();

	}, 250);
});