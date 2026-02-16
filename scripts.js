const logo = document.getElementById('logo-image');
const button = document.getElementById('button');
const samName = document.getElementById('name');
const infoTab = document.getElementById("info-tab");
const infoToggle = document.getElementById("info-toggle");
const popLabel = document.getElementById("pop-label");
const centerPrimary = document.getElementById("center-1");
const clickSpace = document.getElementById("clickspace");
const close = document.getElementById("close");
const coverUp = document.getElementById("cover");
const errorPanel = document.getElementById("error-message-tab");


const htmlEl = document.documentElement;
const bodyEl = document.body;

const backgroundAnimation = document.getElementById("video-animation");
const backgroundAnimationVideo = document.getElementById("video-resource");

const backgroundImage = document.getElementById("still-image");
const backgroundImageImage = document.getElementById("still-image-resource");


const popoutIndicator = document.getElementById("arrow");
const videoInfo = document.getElementById('latest-video');

const isMobile = window.matchMedia("(max-width: 768px)").matches;

let isSpinning = false;
let imaginary = 0;
const samsName = 'Sammy Oredunchinch';
const speed = 50;

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
  backgroundAnimation.classList.add("visible");
}

function showImage() {
  backgroundImage.classList.add("visible");
}

function buttonEffect() {
  button.classList.add('activated');
  setTimeout(() => button.classList.remove('activated'), 10);

  close.classList.add('active');
  setTimeout(() => close.classList.remove('active'), 10);
}

function nameTypeWrite() {
  if (imaginary < samsName.length) {
    const textArray = samName.textContent.split('');
    textArray[imaginary] = samsName.charAt(imaginary);
    samName.textContent = textArray.join('');
    imaginary++;
    setTimeout(nameTypeWrite, speed);
  }
}

function popOut() {
  const popped = !infoToggle.checked;
  infoTab.classList.toggle('poppedout', popped);
  centerPrimary.classList.toggle('minimized', popped);
  popoutIndicator.classList.toggle('down', popped);
  popLabel.classList.toggle('active', popped);
  clickSpace.classList.toggle('disabled', infoToggle.checked);
}

function clickToReturn() {
  setTimeout(() => {
    infoToggle.checked = true;
    infoTab.classList.toggle('poppedout', !infoToggle.checked);
    centerPrimary.classList.toggle('minimized', !infoToggle.checked);
    popoutIndicator.classList.toggle('down', !infoToggle.checked);
    popLabel.classList.remove("active");
    clickSpace.classList.toggle('disabled', infoToggle.checked);
  }, 10);
}

function checkResources() {
  if (!backgroundAnimation.classList.contains("visible")) {
    errorPanel.classList.add("error-message-active")
    errorPanel.textContent = "Video failed to load.";
    setTimeout(() => { errorPanel.classList.remove("error-message-active");  }, 2500);
  }
  if (isMobile && !backgroundImage.classList.contains("visible")) {
    errorPanel.classList.add("error-message-active");
    errorPanel.textContent = "Image failed to load.";
    setTimeout(() => errorPanel.classList.remove("error-message-active"), 2500);
  }
}

function randomizeColor() {
  const textColor = ['#c3c382','#FF00FF','#4ae39eff','#ff0000ff','#c0830aff'];
  document.documentElement.style.setProperty('--sam-color', textColor[Math.floor(Math.random() * textColor.length)]);
  setTimeout(() => document.documentElement.style.setProperty('--sam-color', '#00FFFF'), 1000);
}

// Event listeners
logo.addEventListener('click', spinLogo);
logo.addEventListener('animationend', endSpin);
['click', 'touchstart'].forEach(evt => button.addEventListener(evt, buttonEffect));
samName.addEventListener('click', randomizeColor);
infoToggle.addEventListener('change', popOut);
close.addEventListener('click', clickToReturn);
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
        samName.classList.remove("break-anywhere");
        document.documentElement.style.setProperty('--sam-color', '#ff0000');
        setTimeout(() => document.documentElement.style.setProperty('--sam-color', '#00FFFF'), 1000);
      }, 1200);
    }

    setTimeout(nameTypeWrite, 200);

    setTimeout(checkResources, 4000);

    // Fetch latest video
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

  }, 250);
});
