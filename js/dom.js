// dom.js
export const DOM = {
	logo: document.getElementById('logo-image'),
	button: document.getElementById('button'),
	samName: document.getElementById('name'),
	infoTab: document.getElementById('info-tab'),
	infoToggle: document.getElementById('info-toggle'),
	popLabel: document.getElementById('pop-label'),
	centerPrimary: document.getElementById('center-1'),
	clickSpace: document.getElementById('clickspace'),
	close: document.getElementById('close'),
	coverUp: document.getElementById('cover'),
	errorPanel: document.getElementById('error-message-tab'),
	navMenu: document.getElementById('nav-menu'),
	navMenuArea: document.getElementById('nav-menu-area'),
	menuCloseButton: document.getElementById('close-menu-button'),
	menuOpenButton: document.getElementById('open-menu-button'),
	backgroundAnimation: document.getElementById("video-animation"),
	backgroundAnimationVideo: document.getElementById("video-resource"),
	backgroundImage: document.getElementById("still-image"),
	backgroundImageImage: document.getElementById("still-image-resource"),
	popoutIndicator: document.getElementById("arrow"),
	videoInfo: document.getElementById('latest-video'),
	aspectRatio: window.innerWidth / window.innerHeight,
	cursor: document.getElementById('cursor'),
	mouseToggle: document.getElementById('mouseToggle'),
};

export const htmlEl = document.documentElement;
export const bodyEl = document.body;
// export const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
// export const isSmall = window.matchMedia('(max-width: 1024px)').matches;

export function isSmall() {
	return window.matchMedia('(max-width: 1024px)').matches;
}

export function isMobile() {
	const ua = navigator.userAgent;
	const isTouchDevice = 'ontouchend' in document;
	return /Mobi|Android|iPhone|iPod/i.test(ua) && !(navigator.platform === 'MacIntel' && isTouchDevice);
}

export function isTablet() {
	const ua = navigator.userAgent;
	const isTouchDevice = 'ontouchend' in document;
	return /iPad|Android/i.test(ua) || (navigator.platform === 'MacIntel' && isTouchDevice);
}