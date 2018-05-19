    "use strict";

    for (var i=0; i<12; i++){
       pos(i);
    }    

    function pos(arg) {
        var green = document.createElement('div');
        green.classList.add('green');
        document.getElementById('orange').appendChild(green);

        var hours = document.createElement('div');
        hours.classList.add('hours');
        hours.innerHTML = (arg===0)? 12 : arg;
        document.getElementsByClassName('green')[arg].appendChild(hours);

        var hourAngle = 30;
        var angle = hourAngle*arg/180*Math.PI;
        var orange=document.getElementById('orange');

        var suitableMultiplier = 0.7;
        var radius = orange.offsetWidth/2-suitableMultiplier*green.offsetWidth;
    
        var orangeCenterX=orange.offsetLeft+orange.offsetWidth/2;
        var orangeCenterY=orange.offsetTop+orange.offsetHeight/2;

        var greenCenterX=orangeCenterX+radius*Math.sin(angle);
        var greenCenterY=orangeCenterY-radius*Math.cos(angle);

        green.style.left=Math.round(greenCenterX-green.offsetWidth/2)+'px';
        green.style.top=Math.round(greenCenterY-green.offsetHeight/2)+'px';

        document.getElementById('orange').appendChild(green);
        document.getElementsByClassName('green')[arg].appendChild(hours);

    }

  //  var hourAngle = 30;
  //  var angle = hourAngle*arg/180*Math.PI;
    var orange=document.getElementById('orange');

    //var suitableMultiplier = 0.7;
   // var radius = orange.offsetWidth/2-suitableMultiplier*green.offsetWidth;

    var orangeCenterX=orange.offsetLeft+orange.offsetWidth/2;
    var orangeCenterY=orange.offsetTop+orange.offsetHeight/2;

    var hourHand = document.getElementById("hour_hand");
   
    console.log(orange.offsetWidth);
    hourHand.style.left = orange.offsetWidth/2 + "px";
    hourHand.style.top = orange.offsetHeight/2 + "px";
    hourHand.style.transformOrigin = "top left";
    hourHand.style.transform = "rotate(-20deg)";
    hourHand.style.left = - hourHand.offsetWidth/2;