// background.js
import { DOM } from './dom.js';
import { showError } from './ui.js';


function reloadResource(element, retries = 3, delay = 1000) {
    if (!element || !element.src) return;

    let attempts = 0;
    const originalSrc = element.src;

    function tryLoad() {
        attempts++;
        element.src = originalSrc + `?cacheBuster=${Date.now()}`;
    }

    element.addEventListener('error', function onError() {
        if (attempts < retries) {
            setTimeout(tryLoad, delay);
        } else {
            console.warn(`Failed to load resource: ${originalSrc}`);
        }
    }, { once: true });

    tryLoad();
}

export function checkResources() {
  if (!DOM.isMobile && !DOM.backgroundAnimation.classList.contains('visible')) {
    // showError('Video failed to load.'); basically unnecessary
    showError('Attempting to reload resource.', 'positive');
    reloadResource(DOM.backgroundAnimationVideo);
  }

  if (DOM.isMobile && !DOM.backgroundImage.classList.contains('visible')) {
    // showError('Image failed to load.'); basically unnecessary
    showError('Attempting to reload resource.', 'positive');
    reloadResource(DOM.backgroundImageImage);
  }
}

export function fetchLatestVideo() {
  fetch('/latest-video.json')
    .then(res => res.json())
    .then(data => {
      if (!data.videoId) {
        DOM.videoInfo.innerHTML = `<p class="error-format" title="Sometimes this shows if the API is not responding or the GitHub Workflow has an error.">&#10007; Error loading video.</p>`;
        DOM.videoInfo.classList.remove('ax');
        return;
      }
      const url = `https://www.youtube.com/watch?v=${data.videoId}`;
      DOM.videoInfo.innerHTML = `<a href="${url}" target="_blank">${data.title}</a>`;
    })
    .catch(err => {
      DOM.videoInfo.textContent = 'Error loading video.';
      console.error(err);
    });
}