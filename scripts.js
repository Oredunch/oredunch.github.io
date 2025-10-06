const logo = document.querySelector('.logo');
let isSpinning = false;

function spinLogo(e) {
	e.preventDefault();
	if (isSpinning) return;
	isSpinning = true;
	logo.style.filter = 'none';
	logo.style.transform = 'none';
	void logo.offsetWidth;
	logo.classList.add('spin');
}

function endSpin() {
	isSpinning = false;
	logo.classList.remove('spin');
	logo.style.filter = 'drop-shadow(5px 15px 5px #000A)';
	logo.style.transform = 'none';
}

logo.addEventListener('click', spinLogo);
logo.addEventListener('animationend', endSpin);
