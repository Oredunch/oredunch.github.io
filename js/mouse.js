import { DOM } from './dom.js';

const cursor = DOM.cursor;

let mouseX = 0;
let mouseY = 0;

let x = 0;
let y = 0;

const damping = 0.2;

window.addEventListener("mousemove", (e) => {

	mouseX = e.clientX;
	mouseY = e.clientY;

	const el = document.elementFromPoint(e.clientX, e.clientY);

	if (el && el.closest("[data-cursor='pointer']")) {
		cursor.classList.add("pointer");
	} else {
		cursor.classList.remove("pointer");
	}
});

function animate() {
	x += (mouseX - x) * damping;
	y += (mouseY - y) * damping;

	cursor.style.transform =
		`translate(${x - 6}px, ${y - 4}px)`;

	requestAnimationFrame(animate);
}

animate();