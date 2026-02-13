const logo = document.querySelector('.logo');
const button = document.getElementById('button');
const samName = document.getElementById('name');
const tellText = document.getElementById('telltext');
const infoTab = document.getElementById("info-tab");
const infoToggle = document.getElementById("info-toggle");
const popLabel = document.getElementById("pop-label");
const centerPrimary = document.getElementById("center-1");
const clickSpace = document.getElementById("clickspace");
const htmlEl = document.documentElement;
const bodyEl = document.body;
const close = document.getElementById("close");
const coverUp = document.getElementById("cover");

const popoutIndicator = document.getElementById("arrow");

const videoInfo = document.getElementById('latest-video');

const isMobile = window.matchMedia("(max-width: 768px)").matches;

var isSpinning = false;
var imaginary = 0;
var samsName = 'Sammy Oredunchinch';
var speed = 50;

const eventTw = document.createEvent("Event");

eventTw.initEvent("aftertypewrite", true, true);

function showPage() {
	setTimeout(() => { coverUp.classList.add('opaq'); }, 100);
	setTimeout(() => { coverUp.classList.add('disabled'); }, 1500);
}
 
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
	}, 10);
	close.classList.add('active');
	setTimeout(() => {
		close.classList.remove('active');
	}, 10);
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

function popOut() {
	infoTab.classList.toggle('poppedout', !infoToggle.checked);
	centerPrimary.classList.toggle('minimized', !infoToggle.checked);
	popoutIndicator.classList.toggle('down', !infoToggle.checked);
	popLabel.classList.toggle('active', !infoToggle.checked);
	clickSpace.classList.toggle('disabled', infoToggle.checked);
}

function clickToReturn() {
	setTimeout(() => {
		infoToggle.checked = true;
		infoTab.classList.toggle('poppedout', !infoToggle.checked);
		centerPrimary.classList.toggle('minimized', !infoToggle.checked);
		popoutIndicator.classList.toggle('down', !infoToggle.checked);
		popLabel.classList.remove("active")
		clickSpace.classList.toggle('disabled', !infoToggle.checked == false);
	}, 10);
}

function randomizeColor() {
	const textColor = [
		'#c3c382',
		'#FF00FF',
		'#4ae39eff',
		'#ff0000ff',
		'#c0830aff',
	];
	document.documentElement.style.setProperty('--sam-color', textColor[Math.floor(Math.random() * textColor.length)]);
	setTimeout(() => {
		document.documentElement.style.setProperty('--sam-color', '#00FFFF');
	}, 1000);
}

logo.addEventListener('click', spinLogo);
logo.addEventListener('animationend', endSpin);
button.addEventListener('touchstart', buttonEffect);
samName.addEventListener('click', randomizeColor);
infoToggle.addEventListener('change', popOut);
close.addEventListener('click', clickToReturn)
clickSpace.addEventListener('touchstart', clickToReturn);

document.addEventListener('DOMContentLoaded', () => {
	showPage();
	setTimeout(() => {
		infoToggle.checked = true;
		clickSpace.classList.add('disabled');
		if (isMobile) {
			setTimeout(() => {
				samName.classList.remove("break-anywhere")
				document.documentElement.style.setProperty('--sam-color', '#ff0000');
				setTimeout(() => {
					document.documentElement.style.setProperty('--sam-color', '#00FFFF');
				}, 1000);

			}, 1200);
		}
		setTimeout(() => { nameTypeWrite(); }, 200);
	}, 250);
});

document.addEventListener('DOMContentLoaded', () => {
	const videoInfo = document.getElementById('latest-video');
	fetch('/latest-video.json')
		.then(res => res.json())
		.then(data => {
			if (!data.videoId) {
				videoInfo.innerHTML = `<p class="error-format" title="Sometimes this shows if the API is not responding or the GitHub Workflow has an error.">&#10007; Error loading video.</p>`;
				videoInfo.classList.remove('ax');
				return;
			}
			const url = `https://www.youtube.com/watch?v=${data.videoId}`;
			videoInfo.innerHTML = `<a href="${url}" target="_blank">${data.title}</a>`;
		})
		.catch(err => {
			videoInfo.textContent = 'Error loading video.';
			console.error(err);
		});
});

