'use strict';

/*A2+ 
Написать чистую функцию, эффективно удаляющую из переданной ей строки
все начальные и конечные пробелы, не используя метод строки trim.
Если умеете работать с регулярными выражениям - не используйте и их :)*/

var str = "   ftkhg hukj   ";

function myTrim(arg){
  while ((arg[0] == " ") && (arg.length !== 0)){
    arg = arg.substr(1);
  }

  while ((arg[arg.length-1] == " ") && (arg.length !== 0)){
    arg = arg.substr(0, arg.length-2);
  }
  return arg;
}

console.log("*" + str + "*");
console.log("*" + myTrim(str) + "*");