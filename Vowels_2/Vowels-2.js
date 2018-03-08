'use strict';

var str = prompt('Введите, пожалуйста, строку:', '');  
str = str.toLowerCase().split(""); 

// вариант #1: "forEach"
function countRussianVowels1(v, i, args) {
  var vowels = {а:0, о: 0, у:0, ы:0, э:0, и:0, е:0, ё:0, ю:0, я:0};
// при первой итерации добавляем в конец массива элемент, 
// который будет счетчиком гласных:  
  if (i===0)
   args[args.length] = 0;  
  if (v in vowels)
    args[args.length-1]++;
} 
str.forEach(countRussianVowels1); 
console.log("№1. Количество гласных букв = " + str[str.length-1]);  


// вариант #2: "filter"
function countRussianVowels2(v, i, args) {
  var vowels = {а:0, о: 0, у:0, ы:0, э:0, и:0, е:0, ё:0, ю:0, я:0};
  return (v in vowels);
}
console.log("№2. Количество гласных букв = " + str.filter(countRussianVowels2).length); 


// вариант #3: "reduce"
function countRussianVowels3(counter, v, i, args) {
  var vowels = {а:0, о: 0, у:0, ы:0, э:0, и:0, е:0, ё:0, ю:0, я:0};
  if (v in vowels)
    counter++;
  return counter;  
}
console.log("№3. Количество гласных букв = " + str.reduce(countRussianVowels3,0)); 