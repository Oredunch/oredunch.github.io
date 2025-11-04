const logo = document.querySelector('.logo');
const button = document.getElementById('button');
const samName = document.getElementById('name');
const videoBackground = document.getElementById('back-anim');
const videoPrefsCheck = document.getElementById('video-check');
const indicatorBlob = document.getElementById('video-check-indicator');
const tellText = document.getElementById('telltext');
const infoTab = document.getElementById("info-tab");
const infoToggle = document.getElementById("info-toggle");
const popLabel = document.getElementById("pop-label");
const centerPrimary = document.getElementById("center-1");
const clickSpace = document.getElementById("clickspace");
const htmlEl = document.documentElement;
const bodyEl = document.body;

const line1 = document.getElementById("labelline");
const line2 = document.getElementById("labelline2");

const videoInfo = document.getElementById('latest-video');

var isSpinning = false;
var imaginary = 0;
var samsName = 'Sammy Oredunchinch';
var speed = 50;

const eventTw = document.createEvent("Event");

eventTw.initEvent("aftertypewrite", true, true);

function showPage() {
	htmlEl.classList.add('opaq');
	bodyEl.classList.add('opaq');
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

function flashUnderLine() {
	samName.classList.add('underline');
	setTimeout(() => {
		samName.classList.remove('underline');
	}, 500);
}


function popOut() {
	infoTab.classList.toggle('poppedout', !infoToggle.checked);
	centerPrimary.classList.toggle('minimized', !infoToggle.checked);
	line1.classList.toggle('down', !infoToggle.checked);
	line2.classList.toggle('down2', !infoToggle.checked);
	clickSpace.classList.toggle('disabled', !infoToggle.checked == false);
}

function clickToReturn() {
	setTimeout(() => {
		infoToggle.checked = true;
		infoTab.classList.toggle('poppedout', !infoToggle.checked);
		centerPrimary.classList.toggle('minimized', !infoToggle.checked);
		line1.classList.toggle('down', !infoToggle.checked);
		line2.classList.toggle('down2', !infoToggle.checked);
		clickSpace.classList.toggle('disabled', !infoToggle.checked == false);
	}, 100);
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
	document.documentElement.style.setProperty('--sam-color', textColor[Math.floor(Math.random() * textColor.length)]);
	setTimeout(() => {
		document.documentElement.style.setProperty('--sam-color', '#00FFFF');
	}, 1000);
}

logo.addEventListener('click', spinLogo);
logo.addEventListener('animationend', endSpin);
button.addEventListener('touchstart', buttonEffect);
samName.addEventListener('click', randomizeColor);
samName.addEventListener('aftertypewrite', flashUnderLine);
videoPrefsCheck.addEventListener('change', updateVideoStuffs);
infoToggle.addEventListener('change', popOut);
clickSpace.addEventListener('touchstart', clickToReturn);

document.addEventListener('DOMContentLoaded', () => {
	showPage();
	setTimeout(() => {
		infoToggle.checked = true;
		videoPrefsCheck.checked = true;
		clickSpace.classList.add('disabled');
		videoBackground.classList.remove('b-a-hidden');
		indicatorBlob.classList.remove('check-hidden');
		setTimeout(() => { nameTypeWrite(); }, 200);
	}, 250);
});

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

