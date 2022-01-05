const loadingPhrases = [
'Загружаем...',
'Читаем кэш...',
'Читаем куки...'
]
document.getElementById('content').style.display = 'none';

let result = loadingPhrases[Math.random() * loadingPhrases.length >> 0];
document.getElementById('loader').innerText = result;

setTimeout(() => {
	document.getElementById('loader').remove();
	document.getElementById('content').style.display = '';
}, 1500);

