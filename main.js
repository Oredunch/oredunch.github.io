const logo = document.getElementById('logo-image');
const button = document.getElementById('button');
const samName = document.getElementById('name');
const infoTab = document.getElementById('info-tab');
const infoToggle = document.getElementById('info-toggle');
const popLabel = document.getElementById('pop-label');
const centerPrimary = document.getElementById('center-1');
const clickSpace = document.getElementById('clickspace');
const closeButton = document.getElementById('close');
const coverUp = document.getElementById('cover');
const errorPanel = document.getElementById('error-message-tab');

const backgroundAnimation = document.getElementById('video-animation');
const backgroundAnimationVideo = document.getElementById('video-resource');
const backgroundImage = document.getElementById('still-image');
const backgroundImageImage = document.getElementById('still-image-resource');

const popoutIndicator = document.getElementById('arrow');
const videoInfo = document.getElementById('latest-video');

const root = document.documentElement;
const isMobile = window.matchMedia('(max-width: 768px)').matches;

let isSpinning = false;
let typeIndex = 0;

const targetName = 'Sammy Oredunchinch';
const typeSpeed = 50;
const DEFAULT_COLOR = '#00FFFF';

function showError(message) {
  errorPanel.textContent = message;
  errorPanel.classList.add('error-message-active');
  setTimeout(() => {
    errorPanel.classList.remove('error-message-active');
  }, 2500);
}

function showPage() {
  setTimeout(() => coverUp.classList.add('opaq'), 100);
  setTimeout(() => coverUp.classList.add('disabled'), 1500);
}

function spinLogo() {
  if (isSpinning) return;
  isSpinning = true;
  logo.classList.add('spin');
}

function endSpin() {
  isSpinning = false;
  logo.classList.remove('spin');
}

function showVideo() {
  backgroundAnimation.classList.add('visible');
}

function showImage() {
  backgroundImage.classList.add('visible');
}

function buttonEffect() {
  button.classList.add('activated');
  closeButton.classList.add('active');

  setTimeout(() => {
    button.classList.remove('activated');
    closeButton.classList.remove('active');
  }, 10);
}

function nameTypeWrite() {
  if (typeIndex >= targetName.length) return;

  const chars = samName.textContent.split('');
  chars[typeIndex] = targetName[typeIndex];
  samName.textContent = chars.join('');

  typeIndex++;
  setTimeout(nameTypeWrite, typeSpeed);
}

function updatePopState(isOpen) {
  infoTab.classList.toggle('poppedout', isOpen);
  centerPrimary.classList.toggle('minimized', isOpen);
  popoutIndicator.classList.toggle('down', isOpen);
  popLabel.classList.toggle('active', isOpen);
  clickSpace.classList.toggle('disabled', !isOpen);
}

function popOut() {
  updatePopState(!infoToggle.checked);
}

function clickToReturn() {
  setTimeout(() => {
    infoToggle.checked = true;
    updatePopState(false);
  }, 10);
}

function checkResources() {
  if (!isMobile && !backgroundAnimation.classList.contains('visible')) {
    showError('Video failed to load.');
  }

  if (isMobile && !backgroundImage.classList.contains('visible')) {
    showError('Image failed to load.');
  }
}

function randomizeColor() {
  const colors = ['#c3c382', '#FF00FF', '#4ae39eff', '#ff0000ff', '#c0830aff'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  root.style.setProperty('--sam-color', color);
  setTimeout(() => {
    root.style.setProperty('--sam-color', DEFAULT_COLOR);
  }, 1000);
}

logo.addEventListener('click', spinLogo);
logo.addEventListener('animationend', endSpin);

['click', 'touchstart'].forEach(evt =>
  button.addEventListener(evt, buttonEffect)
);

samName.addEventListener('click', randomizeColor);
infoToggle.addEventListener('change', popOut);
closeButton.addEventListener('click', clickToReturn);
clickSpace.addEventListener('touchstart', clickToReturn);

backgroundAnimationVideo.addEventListener('canplaythrough', showVideo);
backgroundImageImage.addEventListener('load', showImage);

document.addEventListener('DOMContentLoaded', () => {
  showPage();

  setTimeout(() => {
    infoToggle.checked = true;
    clickSpace.classList.add('disabled');

    if (isMobile) {
      setTimeout(() => {
        samName.classList.remove('break-anywhere');
        root.style.setProperty('--sam-color', '#ff0000');
        setTimeout(() => {
          root.style.setProperty('--sam-color', DEFAULT_COLOR);
        }, 1000);
      }, 1200);
    }

    setTimeout(nameTypeWrite, 200);
    setTimeout(checkResources, 4000);

    fetch('/latest-video.json')
      .then(res => res.json())
      .then(data => {
        if (!data.videoId) {
          videoInfo.innerHTML =
            `<p class="error-format" title="Sometimes this shows if the API is not responding or the GitHub Workflow has an error.">&#10007; Error loading video.</p>`;
          videoInfo.classList.remove('ax');
          return;
        }

        const url = `https://www.youtube.com/watch?v=${data.videoId}`;
        videoInfo.innerHTML =
          `<a href="${url}" target="_blank">${data.title}</a>`;
      })
      .catch(err => {
        videoInfo.textContent = 'Error loading video.';
        console.error(err);
      });

  }, 250);
});
