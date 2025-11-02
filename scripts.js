const logo = document.querySelector('.logo');
const button = document.getElementById('button');
const samName = document.getElementById('name');
const videoBackground = document.getElementById('back-anim');
const videoPrefsCheck = document.getElementById('video-check');
const indicatorBlob = document.getElementById('video-check-indicator');
const tellText = document.getElementById('telltext');

var isSpinning = false;
var imaginary = 0;
var samsName = 'Sammy Oredunchinch';
var speed = 50;

function spinLogo() { // Its not a spin animation anymore tho but whatever
	if (isSpinning) return;
	isSpinning = true;
	logo.classList.add('spin');
}

function endSpin() {
	isSpinning = false;
	logo.classList.remove('spin');
}

function buttonEffect() {
	button.classList.add('activated');
	setTimeout(() => {
		button.classList.remove('activated');
	}, 200);
}

function nameTypeWrite() {
	if (imaginary < samsName.length) {
		let textArray = samName.textContent.split('');
		textArray[imaginary] = samsName.charAt(imaginary);
		samName.textContent = textArray.join('');
		imaginary++;
		setTimeout(nameTypeWrite, speed);
	}
}

function updateVideoStuffs() {
	videoBackground.classList.toggle('no-opacity', !videoPrefsCheck.checked);
	setTimeout(() => {
		videoBackground.classList.toggle('b-a-hidden', !videoPrefsCheck.checked);
	}, 500);
	indicatorBlob.classList.toggle('check-hidden', !videoPrefsCheck.checked);
}

function randomizeColor() {
	const textColor = [
		'#c3c382',
		'#FF00FF',
		'#4ae39eff',
		'#ff0000ff',
		'#c0830aff',
	];
	document.documentElement.style.setProperty('--text-color', textColor[Math.floor(Math.random() * textColor.length)]);
	setTimeout(() => {
		document.documentElement.style.setProperty('--text-color', '#00FFFF');
	}, 1000);
}

logo.addEventListener('click', spinLogo);
logo.addEventListener('animationend', endSpin);
button.addEventListener('touchstart', buttonEffect);
samName.addEventListener('click', randomizeColor);
videoPrefsCheck.addEventListener('change', updateVideoStuffs);

document.addEventListener('DOMContentLoaded', () => {
	videoPrefsCheck.checked = true;
	videoBackground.classList.remove('b-a-hidden');
	indicatorBlob.classList.remove('check-hidden');
	setTimeout(() => { nameTypeWrite() }, 200);
});
