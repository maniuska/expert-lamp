'use strict';

/*A2+ 
Написать чистую функцию, эффективно удаляющую из переданной ей строки
все начальные и конечные пробелы, не используя метод строки trim.
Если умеете работать с регулярными выражениям - не используйте и их :)*/

var str = "  ff  ";

function myTrim(arg){
  var counter=0;
  for (var i=0; (arg[i] == " " && i<arg.length); i++)
    counter++;  
  arg = arg.substr(counter);

  counter = 0;    
  for (var i=arg.length-1; (arg[i] == " "&& i>=0); i--)
    counter++;  
  arg = arg.substr(0, arg.length-counter);
  
  return arg;
}

console.log("*" + str + "*");
console.log("*" + myTrim(str) + "*");