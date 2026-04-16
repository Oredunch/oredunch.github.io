// main.js
import { DOM, isMobile, htmlEl, bodyEl, isSmall, isTablet } from './dom.js';
import { showPage, spinLogo, endSpin, buttonEffect, nameTypeWrite, randomizeColor, showVideo, showImage, showCursor, hideCursor, checkOrientation, alert, anchorPanel } from './ui.js';
import { popOut, clickToReturn } from './infoPanel.js';
import { checkResources, fetchLatestVideo } from './background.js';

let canClick = true;
const clickDelay = 300; // milliseconds

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
		if (!canClick) return;
		canClick = false;
		setTimeout(() => canClick = true, clickDelay);

		DOM.navMenu.classList.toggle('nav-menu-open');
		DOM.clickSpace.classList.add('disabled');
	});

	DOM.menuOpenButton.addEventListener(evt, () => {
		if (!canClick) return;
		canClick = false;
		setTimeout(() => canClick = true, clickDelay);

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

window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "m") {
        const mouseToggle = document.getElementById("mouseToggle");
        if (mouseToggle) {
            mouseToggle.click();
        }
    }
});

window.addEventListener('resize', () => {
	if (bodyEl.classList.contains('no-cur')) {
		showCursor();
		DOM.cursor.classList.toggle('visible');
		DOM.mouseToggle.classList.toggle('mTactive');
		alert('Resize detected: Disabling cursor effect', 'positive');
	}
	if (isSmall() && !isMobile() && !isTablet()) {
		bodyEl.classList.add('ismobile', 'desktop');
	} else if (!isSmall() && !isMobile()) {
		bodyEl.classList.remove('ismobile');
	}

	anchorPanel();
	checkOrientation();
})

window.addEventListener('orientationchange', () => {
	checkOrientation();
});

if (isMobile()) {
	bodyEl.classList.add('ismobile');
	bodyEl.classList.remove('desktop');
}

if (isTablet()) {
	bodyEl.classList.add('istablet');
	bodyEl.classList.remove('desktop');
}

if (isSmall() && !isMobile() && !isTablet()) {
	bodyEl.classList.add('ismobile', 'desktop');
}

DOM.backgroundAnimationVideo.addEventListener('canplaythrough', showVideo);

DOM.backgroundImageImage.addEventListener('load', showImage);

window.addEventListener('load', () => {
	document.body.style.visibility = 'visible';
	anchorPanel();
});

document.addEventListener('DOMContentLoaded', () => {
	showPage();

	setTimeout(() => {
		DOM.infoToggle.checked = true;

		if (!isMobile() && !isTablet()) {
			setTimeout(nameTypeWrite, 200);
		}
		setTimeout(checkResources, 250);
		fetchLatestVideo();
	}, 250);

	checkOrientation();
});

