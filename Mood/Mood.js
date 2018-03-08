'use strict';

function randomDiap(n, m) {
	return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
	if ((colorsCount < 1) || (colorsCount > 7))  
	  alert ('Необходимо задать число от 1 до 7');
	else {
		var colors = [
			'',
			'красный',
			'оранжевый',
			'жёлтый',
			'зелёный',
			'голубой',
			'синий',
			'фиолетовый',
		];
		var used = {};
		console.log('цветов: ' + colorsCount);
		var counter = 0;
		for (var i = 1; counter < colorsCount; i++) {
			var n = randomDiap(1, 7);
			var colorName = colors[n];
			if (colorName in used) continue;
			used[colorName] = true;
			counter++;
			console.log(colorName);
		}
	}
}
mood(7);
