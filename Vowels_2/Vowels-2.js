'use strict';

var testString = prompt('Введите, пожалуйста, строку:', '');  

// вариант #1: "forEach"
function count1 (str) {
  str = str.toLowerCase().split(""); 
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
  return str[str.length-1];
}
console.log("№1. Количество гласных букв = " + count1(testString));  


// вариант #2: "filter"
function count2 (str){
  str = str.toLowerCase().split(""); 
  function countRussianVowels2(v, i, args) {
    var vowels = {а:0, о: 0, у:0, ы:0, э:0, и:0, е:0, ё:0, ю:0, я:0};
    return (v in vowels);
  }
  return str.filter(countRussianVowels2).length;
} 
console.log("№2. Количество гласных букв = " + count2(testString)); 


// вариант #3: "reduce"
function count3(str){
  str = str.toLowerCase().split(""); 
  function countRussianVowels3(counter, v, i, args) {
    var vowels = {а:0, о: 0, у:0, ы:0, э:0, и:0, е:0, ё:0, ю:0, я:0};
    if (v in vowels)
      counter++;
    return counter;  
  }
  return str.reduce(countRussianVowels3,0); 
}
console.log("№3. Количество гласных букв = " + count3(testString)); 