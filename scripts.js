const logo = document.querySelector('.logo');
const buttonTapHover = document.getElementById('button');
let isSpinning = false;

function spinLogo(e) {
	e.preventDefault();
	if (isSpinning) return;
	isSpinning = true;
	logo.style.filter = 'none';
	logo.style.transform = 'none';
	logo.style.cursor = 'default';
	void logo.offsetWidth;
	logo.classList.add('spin');
}

function endSpin() {
	isSpinning = false;
	logo.classList.remove('spin');
	logo.style.filter = 'drop-shadow(0px 0px 10px #07556955) blur(0px)';
	logo.style.cursor = 'pointer';
	logo.style.transform = 'none';
	logo.offsetHeight;
	logo.style.transform = 'translateZ(0)'; //nudge gpu
}

function buttonEffect() {
	buttonTapHover.classList.add('activated');
	setTimeout(() => {
		buttonTapHover.classList.remove('activated');
	}, 200);
}

logo.addEventListener('click', spinLogo);
logo.addEventListener('animationend', endSpin);
buttonTapHover.addEventListener('touchstart', buttonEffect);