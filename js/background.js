// background.js
import { DOM } from './dom.js';

export function checkResources() {
  if (!DOM.backgroundAnimation.classList.contains("visible")) {
    DOM.errorPanel.classList.add("error-message-active")
    DOM.errorPanel.textContent = "Video failed to load.";
    setTimeout(() => { DOM.errorPanel.classList.remove("error-message-active");  }, 2500);
  }
  if (!DOM.backgroundImage.classList.contains("visible" && isMobile)) {
    DOM.errorPanel.classList.add("error-message-active")
    DOM.errorPanel.textContent = "Image failed to load.";
    setTimeout(() => { DOM.errorPanel.classList.remove("error-message-active");  }, 2500);
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