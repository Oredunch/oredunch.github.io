// ui.js
import { DOM, isMobile } from './dom.js';

let isSpinning = false;
const speed = 50;
let imaginary = 0;
export const samsName = 'Sammy Oredunchinch';

export function showPage() {
	initName();
	setTimeout(() => DOM.coverUp.classList.add('opaq'), 100);
	setTimeout(() => DOM.coverUp.classList.add('disabled'), 1500);
}

export function spinLogo() {
	if (isSpinning) return;
	isSpinning = true;
	DOM.logo.classList.add('spin');
}

export function endSpin() {
	isSpinning = false;
	DOM.logo.classList.remove('spin');
}

export function showVideo() {
	DOM.backgroundAnimation.classList.add("visible");
}

export function showImage() {
	DOM.backgroundImage.classList.add("visible");
}

export function buttonEffect() {
	DOM.button.classList.add('activated');
	setTimeout(() => DOM.button.classList.remove('activated'), 10);

	DOM.close.classList.add('active');
	setTimeout(() => DOM.close.classList.remove('active'), 10);
}

export function initName() {
	if (!isMobile) {
		DOM.samName.textContent = "#".repeat(samsName.length);
	} else {
		DOM.samName.textContent = samsName;
	}
}

export function nameTypeWrite() {
	if (imaginary < samsName.length) {
		const textArray = DOM.samName.textContent.split('');
		textArray[imaginary] = samsName.charAt(imaginary);
		DOM.samName.textContent = textArray.join('');
		imaginary++;
		setTimeout(nameTypeWrite, speed);
	}
}

export function randomizeColor() {
	const textColor = ['#c3c382', '#FF00FF', '#4ae39eff', '#ff0000ff', '#c0830aff'];
	document.documentElement.style.setProperty('--sam-color', textColor[Math.floor(Math.random() * textColor.length)]);
	setTimeout(() => document.documentElement.style.setProperty('--sam-color', '#00FFFF'), 1000);
}

export function alert(message, type = 'error') {

	DOM.errorPanel.classList.toggle('notice', type === 'positive');

	DOM.errorPanel.textContent = message;
	DOM.errorPanel.classList.add('error-message-active');
	setTimeout(() => {
		DOM.errorPanel.classList.remove('error-message-active');
	}, 2500);
}

export function showCursor() {
	document.querySelectorAll('*').forEach(el => {
		el.classList.remove('no-cur');
	});
}

export function hideCursor() {
	document.querySelectorAll('*').forEach(el => {
		el.classList.add('no-cur');
	});
}

export function checkOrientation() {
	if (!isMobile) return;

	const orientation = window.orientation;
	if (orientation === 90 || orientation === -90) {
		document.body.classList.add('rotate-splash');
	} else {
		document.body.classList.remove('rotate-splash');
	}
}

export function addLabelNew() {
	let newElement = document.createElement('div');
	newElement.textContent = 'New!';
	newElement.classList.add('newIndicatorLabel');
	setTimeout(() => { newElement.classList.add('visible') ; }, 500);
	DOM.popLabel.appendChild(newElement);
}

export function rmLabel() {
	DOM.popLabel.removeChild(DOM.popLabel.lastChild)
}