// background.js
import { DOM } from './dom.js';
import { alert, showImage, showVideo } from './ui.js';


function reloadResource(element, onSuccess, retries = 3, delay = 1000) {
	if (!element) return;

	if (element.complete && element.naturalWidth > 0) {
		onSuccess?.();
		return;
	}

	let attempts = 0;
	const baseSrc = element.src.split('?')[0];

	function tryLoad() {
		attempts++;
		element.src = `${baseSrc}?cacheBuster=${Date.now()}`;
	}

	function onError() {
		if (attempts < retries) {
			setTimeout(tryLoad, delay);
		} else {
			console.warn(`Failed to load resource: ${baseSrc}`);
			element.removeEventListener('error', onError);
			element.removeEventListener('load', onLoad);
		}
	}

	function onLoad() {
		element.removeEventListener('error', onError);
		element.removeEventListener('load', onLoad);
		onSuccess?.();
	}

	element.addEventListener('error', onError);
	element.addEventListener('load', onLoad);

	tryLoad();
}

export function checkResources() {
	if (
		DOM.isMobile &&
		!(DOM.backgroundImageImage.complete && DOM.backgroundImageImage.naturalWidth > 0)
	) {
		showError('Attempting to reload resource.', 'positive');
		setTimeout(() => {
			reloadResource(DOM.backgroundImageImage, showImage);
		}, 500);
	} else {
		showImage();
	}

	if (
		!DOM.isMobile &&
		DOM.backgroundAnimationVideo.readyState < 3
	) {
		showError('Attempting to reload resource.', 'positive');
		setTimeout(() => {
			reloadResource(DOM.backgroundAnimationVideo, showVideo);
		}, 500);
	} else {
		showVideo();
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
			DOM.videoInfo.innerHTML = `<a data-cursor="pointer" class="no-cur" href="${url}" target="_blank">${data.title}</a>`;
		})
		.catch(err => {
			DOM.videoInfo.textContent = 'Error loading video.';
			console.error(err);
		});
}