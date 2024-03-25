const API_KEY = 'db7e239d8cee6f72e81e64950500d463';

const wrapper = document.querySelector('.wrapper'),
	inputPart = wrapper.querySelector('.input-part'),
	infoTxt = inputPart.querySelector('.info-txt'),
	inputField = inputPart.querySelector('input'),
	locationBtn = inputPart.querySelector('#locationBtn'),
	weatherIcon = wrapper.querySelector('.weather-part img'),
	arrawBack = wrapper.querySelector('header i');
let apiOpenWeatherMap;

inputField.addEventListener('keyup', (event) => {
	//if user pressed enter botton and inputvalue is not empty
	if (event.key == 'Enter' && inputField.value != '') {
		requestAPI(inputField.value);
	}
});

locationBtn.addEventListener('click', () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	} else {
		alert('Su navegador no soporta la API de geolocalización');
	}
});

function onSuccess(position) {
	const { latitude, longitude } = position.coords;
	apiOpenWeatherMap = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}&lang=es`;
	fetchData();
}

function onError(error) {
	infoTxt.innerHTML = error.message;
	infoTxt.classList.add('error');
}

function requestAPI(city) {
	apiOpenWeatherMap = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=es`;
	fetchData();
}

function fetchData() {
	infoTxt.innerHTML = 'Obteniendo detalles del tiempo...';
	infoTxt.classList.add('pending');
	fetch(apiOpenWeatherMap)
		.then((response) => response.json())
		.then((result) => weatherDeatils(result));
}

function weatherDeatils(info) {
	console.log(info);
	infoTxt.classList.replace('pending', 'error');
	if (info.cod == '404') {
		infoTxt.innerHTML = `${inputField.value} no es un nombre de ciudad válido`;
	} else {
		const city = info.name;
		const country = info.sys.country;
		const { description, id } = info.weather[0];
		const { feels_like, humidity, temp } = info.main;

		if (id == 800) {
			weatherIcon.src = 'assets/icons/clear.svg';
		} else if (id >= 200 && id <= 232) {
			weatherIcon.src = 'assets/icons/strom.svg';
		} else if (id >= 600 && id <= 622) {
			weatherIcon.src = 'assets/icons/snow.svg';
		} else if (id >= 701 && id <= 781) {
			weatherIcon.src = 'assets/icons/haze.svg';
		} else if (id >= 801 && id <= 804) {
			weatherIcon.src = 'assets/icons/cloud.svg';
		} else if ((id >= 301 && id <= 321) || (id >= 501 && id <= 531)) {
			weatherIcon.src = 'assets/icons/rain.svg';
		}

		wrapper.querySelector('.temp .numb').innerText = Math.floor(temp);
		wrapper.querySelector('.weather').innerText = description;
		wrapper.querySelector('.location span').innerText = `${city}, ${country}`;
		wrapper.querySelector('.temp .numb-2').innerText = Math.floor(feels_like);
		wrapper.querySelector('.humidity span').innerText = `${humidity}%`;

		infoTxt.classList.remove('pending', 'error');
		wrapper.classList.add('active');
	}
}

arrawBack.addEventListener('click', () => {
	wrapper.classList.remove('active');
});
