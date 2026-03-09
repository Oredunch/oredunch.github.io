// main.js
import { DOM, isMobile, htmlEl, bodyEl, isSmall } from './dom.js';
import { showPage, spinLogo, endSpin, buttonEffect, nameTypeWrite, randomizeColor, showVideo, showImage, samsName, showCursor, hideCursor, checkOrientation, alert } from './ui.js';
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

if (!isMobile()) {
	hideCursor();
}

DOM.mouseToggle.addEventListener('click', () => {
	if (bodyEl.classList.contains('no-cur')) {
		showCursor();
	} else {
		hideCursor();
	}
	DOM.cursor.classList.toggle('visible');
	DOM.mouseToggle.classList.toggle('mTactive');
});

window.addEventListener('resize', () => {
	if (bodyEl.classList.contains('no-cur')) {
		showCursor();
		DOM.cursor.classList.toggle('visible');
		DOM.mouseToggle.classList.toggle('mTactive');
		alert('Resize detected: Disabling cursor effect', 'positive');
	}
	if (isSmall() && !isMobile()) {
		bodyEl.classList.add('ismobile', 'desktop');
	} else if (!isSmall() && !isMobile()) {
		bodyEl.classList.remove('ismobile', 'desktop');
	}
})

window.addEventListener('orientationchange', () => {
	checkOrientation();
});

if (isMobile()) {
	bodyEl.classList.add('ismobile');
}

if (isSmall() && !isMobile()) {
	bodyEl.classList.add('ismobile', 'desktop');
}


DOM.backgroundAnimationVideo.addEventListener('canplaythrough', showVideo);

DOM.backgroundImageImage.addEventListener('load', showImage);

window.addEventListener('load', () => {
	document.body.style.visibility = 'visible';
});

document.addEventListener('DOMContentLoaded', () => {
	showPage();

	setTimeout(() => {
		DOM.infoToggle.checked = true;

		if (!isMobile()) {
			setTimeout(nameTypeWrite, 200);
		}
		setTimeout(checkResources, 250);
		fetchLatestVideo();
	}, 250);

	checkOrientation();
});