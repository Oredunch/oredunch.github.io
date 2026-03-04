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
		DOM.samName.textContent = "_".repeat(samsName.length);
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

export function showError(message, type = 'error') {

	DOM.errorPanel.classList.toggle('notice', type === 'positive');

	DOM.errorPanel.textContent = message;
	DOM.errorPanel.classList.add('error-message-active');
	setTimeout(() => {
		DOM.errorPanel.classList.remove('error-message-active');
	}, 2500);
}