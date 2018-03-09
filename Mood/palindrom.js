'use strict';

/*A3+
Написать чистую функцию, проверяющую, что переданная ей фраза является палиндромом.
(Палиндром - это фраза, которая слева направо читается так же как справа налево)
Массивы при решении не использовать.
При проверке должны игнорироваться:
 - регистр букв;
 - пробелы;
 - знаки препинания;
 - мягкие и твёрдые знаки;
 - разница между буквами "е" и "ё".*/

var str = "Я иду с мечём судия!";

function isPalindrom(){ 
  str = str.toLowerCase();
  str = str.replace('ё', 'е');
  var excludeMarks = {" ":0, ",":0, ".":0, "!":0, "?":0, ":":0, ";":0, "...":0, "ь":0, "ъ":0};

  for (var i=0; i<str.length; i++){
    if (str[i] in excludeMarks){
      str = str.split(str[i]);
      str = str.join("");
    }  
  }
  console.log(str);
  var result = true;
  for (var i=0; i<str.length/2; i++){
    if (str[i] !== (str[str.length-1-i])){
      result = false;
      break;
    }  
  } 

return result;
}

console.log (isPalindrom(str));