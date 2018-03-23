'use strict';

//var str = '-(2.02+3.0*((-4.0001-3)/3+6+101))';
//console.log('Вычисляем выражение: ' + str);


function calculate(arr) {
	//проверяем на наличие скобок, вычисляем выражения в скобках
	for (var j = 0; j < arr.length; j++) {
		if (arr[j] == ')') {
			for (var i = j - 1; i >= 0; i--)
				if (arr[i] == '(') {
					arr[i] = calculateFragment(arr.slice(i + 1, j));
					arr.splice(i + 1, j - i);
					break;
				}
			i = 0;
			j = 0;
		}
	}
	return calculateFragment(arr);

	function calculateFragment(arg) {
		// check for starting with "-"
		if (arg[0] == '-') {
			if (arg[1][0] !== '-') arg[1] = arg[1] * -1;
			else arg[1] = arg[1] * -1;
			arg.splice(0, 1);
		}

		//check * /
		for (var i = 1; i < arg.length - 1; i += 2) {
			if (arg[i] == '*') {
				arg[i - 1] = arg[i - 1] * arg[i + 1];
				arg.splice(i, 2);
				i -= 2;
			}
			if (arg[i] == '/') {
				arg[i - 1] = arg[i - 1] / arg[i + 1];
				arg.splice(i, 2);
				i -= 2;
			}
		}

		//check + -
		for (i = 1; i < arg.length - 1; i += 2) {
			if (arg[i] == '+') {
				arg[i - 1] = arg[i - 1] * 1 + arg[i + 1] * 1; // приводим строки к числам и складываем их
				arg.splice(i, 2);
				i -= 2;
			}
			if (arg[i] == '-') {
				arg[i - 1] = arg[i - 1] - arg[i + 1];
				arg.splice(i, 2);
				i -= 2;
			}
		}
		return arg[0];
	}
}