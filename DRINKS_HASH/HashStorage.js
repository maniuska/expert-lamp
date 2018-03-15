'use strict'
function HashStorage() {
  this.storage = {};
  
  //addValue(key, value) сохраняет указанное значение под указанным ключом
  this.addValue = function(key,value) {
    this.storage[key] = value;
  }  
  
  //getValue(key) возвращает значение по указанному ключу либо undefined
  this.getValue = function(key) {
    return this.storage[key];
  }
  
  //deleteValue(key) удаляет значение с указанным ключом, возвращает true если значение было удалено и false если такого значения не было в хранилище;
  this.deleteValue = function(key) { 
      if (key in this.storage) {
        delete this.storage[key];
        return true;
      }
      else 
        return false;  

  }
  
  //getKeys() возвращает массив, состоящий из одних ключей
  this.getKeys = function(){
    var keys = [];
    for (var k in this.storage)
      keys.push(k);
    return keys;
  }
}

var drinkStorage = new HashStorage;
//drinkStorage.addValue('wine', ['yes','drink made from fermented grape juice']);
//console.log ('vine: is alcoholic - ' + drinkStorage.getValue('wine'));
