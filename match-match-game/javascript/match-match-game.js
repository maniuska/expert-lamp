'use strict';

const startBlock = document.getElementById('start_block');
const gameBlock = document.getElementById('game_block');
const resultsBlock = document.getElementById("results_block");
const startButton = document.getElementById('start');
const newGameButton = document.getElementsByName('newGame')[0];
const bestResultsButton = document.getElementsByName('bestRes')[0];

const soundFlip = document.getElementById("onFlip"); 
const soundHide = document.getElementById("onHidingCards");
const soundWin = document.getElementById("onWin");

const arr2x2 = [1, 1, 2, 2];
const arr4x4 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
const arr6x6 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18];
const arrBXB = ['A', 'A', 'B', 'B'];
const arrHXH = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
const arrMXM = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'S', 'S', 'T', 'T'];

var first_name, last_name, email, cardTypeValue, levelValue;

var timer, startTime, finishTime;
var arr;
var index=0;
var cardPrev=null;
var totalCountCard;

var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var stringName='LYALIK_MATCH_MATCH_GAME_RECORDS';

startButton.addEventListener('click', saveGamerData);
startButton.addEventListener('click', activeGameBlock);
startButton.addEventListener('click', startTimer);

newGameButton.addEventListener('click', activeStartBlock);
bestResultsButton.addEventListener('click',showRecord);

function saveGamerData(){
    first_name = document.getElementsByName('first_name')[0].value;
    last_name = document.getElementsByName('last_name')[0].value;
    email = document.getElementsByName('email')[0].value;

    let card_type_arr = document.getElementsByName('card_type');
    for(var i = 0; i < card_type_arr.length; i++){
        if(card_type_arr[i].checked){
            cardTypeValue = card_type_arr[i].value;
        }
    }

    let levels_arr = document.getElementsByName('level');
    for(var i = 0; i < levels_arr.length; i++){
        if(levels_arr[i].checked){
            levelValue = levels_arr[i].value;
        }
    }

    /*
    var gamerInfo = {
        "firstName": first_name,
        "lastName": last_name,
        "email": email,
        "cardType": cardTypeValue,
        "level": levelValue
    };
    localStorage.setItem("gamerInfo", JSON.stringify(gamerInfo));
    */  

    buildRandomArray();
}

function buildRandomArray(){

    switch (levelValue*1){
        case 1: 
           arr = (cardTypeValue === 'letters') ? arrBXB : arr2x2;
           break;
        case 2: 
           arr = (cardTypeValue === 'letters') ? arrHXH : arr4x4;  
           break; 
        case 3: 
           arr = (cardTypeValue === 'letters') ? arrMXM : arr6x6;
           break;   
    }
    arr.sort(randomCompare);
    totalCountCard=arr.length;
}

function randomCompare(a, b){ 
    if ((Math.floor(Math.random() * 10) + 1) % 2 == 0) 
        return -1;
    else return 1;
}

function activeGameBlock(){
    startBlock.classList.add('hidden');
    gameBlock.classList.remove('hidden');
    buildGameField();
}

function activeStartBlock(){
    gameBlock.classList.add('hidden');
    resultsBlock.classList.add('hidden');
    document.getElementById('table').innerHTML = '';
    startBlock.classList.remove('hidden');
    document.getElementById("msgField").innerHTML='';
}

function buildGameField(){
    index=0;
    var cardImageSRC;
    if (cardTypeValue=="digits")
        cardImageSRC="img/digits_card.jpg";
        else 
            cardImageSRC="img/abc_card.jpg";
    var str = "<img src='"+cardImageSRC+"' class=image>"; 

    for (var i=0; i<levelValue*2; i++){
        var newtr = document.createElement('tr');     // создаем строку в таблице
        document.getElementById('table').appendChild(newtr); // добавляем созданную строку в DOM
        for (var j=0; j<levelValue*2; j++){ 
            var newtd = document.createElement('td');   // создаем соответстующее кол-во ячеек в строке
            var cardDiv = document.createElement('div'); // в каждой ячейке создаем div
            cardDiv.classList.add('card');

            var frontDiv = document.createElement('div'); // в каждой ячейке создаем frontDiv
            frontDiv.classList.add('front');
            frontDiv.classList.add('side');
            frontDiv.innerHTML = str;    // вставляем в созданный div соответстующее выбранной рубашке изображение
    
            var backDiv = document.createElement('div'); // в каждой ячейке создаем backDiv
            backDiv.classList.add('back');
            backDiv.classList.add('side');
            
            cardDiv.cardValue = arr[index++]; // присваиваем каждой карте последовательно значение из предопределенного массива, упорядоченного случайным образом       

            backDiv.innerHTML = cardDiv.cardValue;
            cardDiv.appendChild(frontDiv);
            cardDiv.appendChild(backDiv);

            cardDiv.addEventListener('click', showCard);
            gameBlock.getElementsByTagName('tr')[i].appendChild(newtd); // добавляем все созданные ячейки в строку
            gameBlock.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].appendChild(cardDiv);  // в каждую ячейку прикрепляем div     
        }
    }

    
    function showCard(e){

        var currentDiv = e.currentTarget;
        
        if (cardPrev!=currentDiv){
            if(cardPrev===null){
                cardPrev=currentDiv;
            } else {
                if(cardPrev.cardValue!=currentDiv.cardValue){
                    setTimeout(function(){doFlip(cardPrev,true)}, 1000);
                    setTimeout(function(){doFlip(currentDiv)}, 1000);
                } else { 
                    setTimeout(function(){hideCard(cardPrev)},1200);
                    setTimeout(function(){hideCard(currentDiv)},1200);                   
                }
            }
        } else {
            cardPrev=null;
        }
        doFlip(currentDiv);

        function doFlip(arg, isClearPrevCard){
            if (arg.className == "card"){
                arg.className += " rotated";
                soundFlip.play();
            }
            else {
                arg.className = "card";
                if(isClearPrevCard)
                   cardPrev=null;
            }
        }

    }
    
    /*
    function showCardBackSide(cardDiv){
        var cardImageSRC;
        if (cardTypeValue=="digits")
            cardImageSRC="img/digits_card.jpg";
            else 
                cardImageSRC="img/abc_card.jpg";
        var str = "<img src='"+cardImageSRC+"' class=image>"; 
        cardDiv.innerHTML = str;
    }*/

    function hideCard(cardDiv){
        cardDiv.innerHTML="";
        soundHide.play();
        totalCountCard--;
        cardPrev=null;
        isVin();
    }

    function isVin(){
        if(totalCountCard==0){
            var vinField=document.getElementById("msgField");
            vinField.innerHTML="УРА! ПОЗДРАВЛЯЮ С ПОБЕДОЙ!";
            clearInterval(timer);
            finishTime = Date.now() - startTime;
          //  localStorage.setItem("finishTime", finishTime);
            saveRecord();  
            soundWin.play();  
        }    
    }
    
}

function startTimer(){
    startTime = Date.now();
    timer = setInterval(updateTime,1000);

    function updateTime() {
        var spentTime = Date.now() - startTime;
        var sec = spentTime / 1000 % 60; 
        var min = (spentTime / 1000 / 60 >=60) ? (spentTime / 1000 / 60 % 60) : (spentTime / 1000 / 60); 
        var hour = (spentTime / 1000 / 60 / 60 >=60) ? (spentTime / 1000 / 60 /60 % 60) : (spentTime / 1000 / 60 / 60); 
        var spentTimeStr = "Затрачено: " + Math.floor(hour) + " часов " + Math.floor(min) + " минут " + Math.floor(sec) + " секунд" ;
        document.getElementById('timer').textContent = spentTimeStr;
    }  
}

function saveRecord() {
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        }
    );
}

function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        console.log(callresult.error); 
    else {
        // нам всё равно, что было прочитано - всё равно перезаписываем
       // console.log(callresult);
       let info=JSON.parse(callresult.result); 
       let level="level"+levelValue;
       console.log(level);
       console.log(finishTime);
       if(info[level].player3.time>finishTime){
             if(info[level].player2.time>finishTime){
                if(info[level].player1.time>finishTime){
                   info[level].player3.time= info[level].player2.time;
                   info[level].player2.time= info[level].player1.time;
                   info[level].player3.name= info[level].player2.name;
                   info[level].player2.name= info[level].player1.name;
                   info[level].player1.time=finishTime;
                   info[level].player1.name=first_name+" "+last_name;
                } else {
                   info[level].player3.time= info[level].player2.time;
                   info[level].player2.time=finishTime;
                   info[level].player3.name= info[level].player2.name;
                   info[level].player2.name=first_name+" "+last_name;
                }
             } else {
                info[level].player3.time=finishTime;
                info[level].player3.name=first_name+" "+last_name;
             }
       }

      //  info.level3.player1.time = 100067000;
      // info.level3.player2.time = 100030000;
     //  info.level3.player3.time = 100000020;
       //console.log(info);
       console.log(finishTime);
       
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : stringName, v : JSON.stringify(info), p : updatePassword },
                success : updateReady, error : errorHandler
            }
        );

        
    }
}

function updateReady(callresult) {vv
    if ( callresult.error!=undefined )
        console.log(callresult.error); 
}

function showRecord() {
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : readReady, error : errorHandler
        }
    );
}

function readReady(callresult) {
    if ( callresult.error!=undefined )
        console.log(callresult.error); 
    else if ( callresult.result!="" ) {
        let info=JSON.parse(callresult.result); 
        let str="";
        str += "<h1>Лучшие результаты участников</h1>";
        str += "<h2>Уровень 2х2</h2>";
        str += info.level1.player1.name + ": " + Math.floor(info.level1.player1.time/1000) + "c " + info.level1.player1.time % 1000 + "мc<br>";
        str += info.level1.player2.name + ": " + Math.floor(info.level1.player2.time/1000) + "c " + info.level1.player2.time % 1000 + "мc<br>";
        str += info.level1.player3.name + ": " + Math.floor(info.level1.player3.time/1000) + "c " + info.level1.player3.time % 1000 + "мc<br>";
        str += "<h2>Уровень 4х4</h2>";
        str += info.level2.player1.name + ": " + Math.floor(info.level2.player1.time/1000) + "c " + info.level2.player1.time % 1000 + "мc<br>";
        str += info.level2.player2.name + ": " + Math.floor(info.level2.player2.time/1000) + "c " + info.level2.player2.time % 1000 + "мc<br>";
        str += info.level2.player3.name + ": " + Math.floor(info.level2.player3.time/1000) + "c " + info.level2.player3.time % 1000 + "мc<br>";
        str += "<h2>Уровень 6х6</h2>";
        str += info.level3.player1.name + ": " + Math.floor(info.level3.player1.time/1000) + "c " + info.level3.player1.time % 1000 + "мc<br>";
        str += info.level3.player2.name + ": " + Math.floor(info.level3.player2.time/1000) + "c " + info.level3.player2.time % 1000 + "мc<br>";
        str += info.level3.player3.name + ": " + Math.floor(info.level3.player3.time/1000) + "c " + info.level3.player3.time % 1000 + "мc<br>";
        
        resultsBlock.innerHTML=str;
        startBlock.classList.add('hidden');
        gameBlock.classList.add('hidden');
        resultsBlock.classList.remove('hidden');
        
   
    }
}

function errorHandler(jqXHR,statusStr,errorStr) {
    console.log(statusStr+' '+errorStr);
}
 


