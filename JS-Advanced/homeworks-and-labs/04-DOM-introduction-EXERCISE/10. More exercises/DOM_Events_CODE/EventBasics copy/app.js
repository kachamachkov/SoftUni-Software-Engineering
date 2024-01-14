const button = document.querySelector('button');
const h1 = document.querySelector('h1');

button.addEventListener('click', function () {
	const newColor = makeRandomColor();

	document.body.style.backgroundColor = newColor;
	h1.innerText = newColor;
});

const makeRandomColor = () => {
	const r = Math.floor(Math.random() * 255);
	const g = Math.floor(Math.random() * 255);
	const b = Math.floor(Math.random() * 255);

	const sum = r + g + b;
	if (sum <= 200) {
		h1.style.color = 'white';
	} else {
		h1.style.color = 'black';
	}
	return `rgb(${r}, ${g}, ${b})`;
};
