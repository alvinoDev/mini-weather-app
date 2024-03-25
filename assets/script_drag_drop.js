const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');

const image_1 = document.querySelector('#image_1');

let file;
let button = document.querySelector('.button');
let input = document.querySelector('input');

button.onclick = () => {
	input.click();
};

input.addEventListener('change', function () {
	file = this.files[0];
	dragArea.classList.add('active');
	displayFile();
});

dragArea.addEventListener('dragover', (event) => {
	event.preventDefault();
	dragText.textContent = 'Soltar para cargar';
	dragArea.classList.add('active');
	// console.log('Archivo ARRASTRADO SOBRE del area');
});

dragArea.addEventListener('dragleave', (event) => {
	dragText.textContent = 'Arrastrar & soltar';
	dragArea.classList.remove('active');
	// console.log('Archivo FUERA del area de ARRASTRE');
});

dragArea.addEventListener('drop', (event) => {
	event.preventDefault();
	file = event.dataTransfer.files[0];

	displayFile();
});

// function displayFile() {
//     let fileType = file.type;
// 	let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

// 	if (validExtensions.includes(fileType)) {
// 		let fileReader = new FileReader();

// 		fileReader.onload = () => {
// 			let fileURL = fileReader.result;
// 			let imgTag = `<img src="${fileURL}" alt="">`;
// 			image_1.innerHTML = imgTag;
// 		};
// 		fileReader.readAsDataURL(file);
// 	} else {
// 		alert('Este archivo no es una imagen');
// 		dragArea.classList.remove('active');
// 	}
// }

function displayFile() {
	let fileType = file.type;
	let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

	if (validExtensions.includes(fileType)) {
		let fileReader = new FileReader();

		fileReader.onload = () => {
			let fileURL = fileReader.result;

			let targetIndex = 1;
			for (let i = 1; i <= 4; i++) {
				const imageTarget = document.querySelector(`#image_${i}`);
				if (imageTarget.innerHTML === '') {
					console.log(imageTarget.innerHTML+" INDEX: "+i);
					targetIndex = i;
					break;
				}
			}

			if (targetIndex <= 4) {
				const imgTag = `<img src="${fileURL}" alt="">`;
				const imageTarget = document.querySelector(`#image_${targetIndex}`);
				imageTarget.innerHTML = imgTag;
			} else {
				console.log('Todas las tarjetas ya tienen una imagen.');
			}
		};
		fileReader.readAsDataURL(file);
	} else {
		alert('Este archivo no es una imagen');
		dragArea.classList.remove('active');
	}
}
