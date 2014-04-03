var randomImageCount = 1;
(function(){
  var isLottery = false;
  var isRunning=0, isTextChange=0, runningInterval=0, stopingInterval=0;
  var perRotationTime = 2000; // below this value may cause a bug when running too long
  var perBlinkTime = 2000;
  var textTimer = 0;
  var textTimeInverval = 100;
  var timerArray=[0];
  var indexRes = 0; // the index of results
  var countScramble = 0;

  function setStopBackground(){
      localClearInterval();
      setStopStatus(); 
      window.setTimeout(function(){ 
         drawResultList();
      }, 1200);
      /*
      window.setTimeout(function(){ 
         iResultList();
      }, 2200);
      */
      //setResultBlinking();// if you want to blink the result, please active this line
      //document.getElementById('res-decade').style.lineHeight="2500px"; 
      //document.getElementById('res-unit').style.lineHeight="2500px"; 
  }

  function setResultBlinking(){
      addClassName(document.getElementById('res-hundred'),"blink_me");
      window.setTimeout(function(){
        removeClassName(document.getElementById('res-hundred'),"blink_me");
        addClassName(document.getElementById('res-decade'),"blink_me");
      }, perBlinkTime);
      window.setTimeout(function(){
        removeClassName(document.getElementById('res-decade'),"blink_me");
        addClassName(document.getElementById('res-unit'),"blink_me");
      }, perBlinkTime*2);
      window.setTimeout(function(){
        removeClassName(document.getElementById('res-unit'),"blink_me");
      }, perBlinkTime*3);
  }


  /**
  *
  */
  function drawResultList(){
    try {
        var rubik = document.getElementById('canvas1').virtualrubik;
        var res = rubik.drawResultList();
        //console.log(res);
        var resDiv = document.getElementById("resNumUnit");
        resDiv.className = "resNumLayer liquidCrystal c"+res['unit'];
        resDiv.style.left = 220 + "px";
        resDiv.style.display = "block";
        //decade
        resDiv = document.getElementById("resNumDecade");
        resDiv.className = "resNumLayer liquidCrystal c"+res['decade'];
        resDiv.style.left = 120 + "px";
        resDiv.style.display = "block";
        //hundred
        resDiv = document.getElementById("resNumHundred");
        resDiv.className = "resNumLayer liquidCrystal c"+res['hundred'];
        resDiv.style.display = "block";
    }
     catch (e) {
        // Suppress error message when mouse is released
        // outside the canvas
        console.log(e);
     }

  }

  function changeRunStatus(cmd){
    if(cmd=="Run")
    {
      setRunningStatus();
    }
    else if(cmd=="Stop")
    {
      var dur = checkTextDuration();
      /*
      if(dur>4*textTimeInverval){
        window.setTimeout(function(){
            setStopBackground();
        },dur);
      }
      else{
        setStopBackground();
      }*/
      console.log(dur);
      if(isRunning != 0){
        dur += 2000;
        console.log('error');
      }
      
      console.log(isRunning);
      window.setTimeout(function(){
          setStopBackground();
      },dur);
    }
    else
    {
      document.getElementById('startButton').innerHTML="START";
    }
  }

  function setTextTimer(){
      textTimer=0;
      isTextChange = window.setInterval(function(){
        textTimer++;
        if(textTimer>19)
          textTimer = 0;
      },textTimeInverval);
  }

  function localClearInterval(){
    //window.clearInterval(isTextChange);
    for(var i=0; i<timerArray.length; i++)
      window.clearInterval(timerArray[i]);
    //isTextChange=0;
    runningInterval=0;
    stopingInterval=0;
  }

  function setRunningStatus(){
    document.getElementById('startButton').style.color="yellow";
    document.getElementById('startButton').innerHTML="RUNNING";
  }

  function setStopStatus(){
    document.getElementById('startButton').style.color="yellow";
    document.getElementById('startButton').innerHTML="STOP";
  }

  function setEndingStatus(){
    document.getElementById('startButton').style.color="gray";
  }

  // check when to change the text (from 'running' to 'stop')
  function checkTextDuration(){
    window.clearInterval(isTextChange);
    isTextChange=0;
    //var count = perRotationTime*2/textTimeInverval;
    //var remain = (count - textTimer)*textTimeInverval/2;
    //console.log(remain);
    var remain = perRotationTime - textTimer*textTimeInverval + textTimeInverval;
    console.log(remain);
    if(remain == perRotationTime)
      remain += perRotationTime;
    if(remain < 0)
      remain  = 2*perRotationTime;
    if(remain < perRotationTime/2)
        remain = perRotationTime;
    remain += 500;
    addClassName(document.getElementById('startButton'),"blink_me");
    window.setTimeout(function(){
      removeClassName(document.getElementById('startButton'),"blink_me");
    }, remain);
    /*
    for(var i = 0; i < 2; i++)
    {
      //setTimeout("setRunningStatus()","textTimeInverval");
      //setRunningStatus();
      
      runningInterval = window.setInterval(function(){
        setRunningStatus();
      },textTimeInverval-30);
      timerArray = timerArray.concat(runningInterval);
      stopingInterval =  window.setInterval(function(){
        setEndingStatus();
      },textTimeInverval+30);
      timerArray = timerArray.concat(stopingInterval);
      console.log(stopingInterval);
    }
          */
    return remain;
  }

  function iLottery(){
    isLottery = !isLottery;
    if(isLottery)
    {
      if(isRunning != 0) return;
      changeRunStatus("Run");
      document.getElementById('canvas1').virtualrubik.lottery();
      setTextTimer();
      isRunning = window.setInterval(function(){
        /*
        if(countScramble == 5){
          countScramble = 0;
          return;
        }
        countScramble++;
        */
        document.getElementById('canvas1').virtualrubik.lottery(); 
      },perRotationTime); // it take about 2 secs to transform 10 times
    }
    else
    {
      window.clearInterval(isRunning);
      isRunning = 0;
      changeRunStatus("Stop");
    }
  }

  function iRestart(){
    document.getElementById('canvas1').virtualrubik.reset();
    // clear timer
    if(isRunning)
      isRunning=window.clearInterval(isRunning);
    if(isLottery)
      isLottery=!isLottery;
  }

  function iResultList() {
     var canvas = document.getElementById("canvas1");
     var url = canvas.toDataURL();
     
     var newImg = document.createElement("img");
     newImg.src = url;
     newImg.className = "clipImage";
     /* //left style
     newImg.style.top = 180+indexRes*100+"px";
     newImg.style.marginLeft = (-160 + indexRes*10) + "px";
     */
     //right style
     newImg.style.top = indexRes*100+"px";
     newImg.style.marginRight = (-200 - indexRes*10) + "px";
     document.body.appendChild(newImg);
     indexRes++;
     if(indexRes > 3) indexRes = 0;
     //console.log(indexRes);
  }


  function addClassName(element, className)   
  {  
      if (!element) return;  
      var elementClassName = element.className;  
      if (elementClassName.length == 0)   
      {  
          element.className = className;  
          return;  
      }  
      if (elementClassName == className || elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))   
          return;  
      element.className = elementClassName + " " + className;  
      element.style.color="red";
  };  
    
  function removeClassName(element, className)   
  {  
      if (!element) return;  
      var elementClassName = element.className;  
      if (elementClassName.length == 0) return;  
      if(elementClassName == className)  
      {  
          element.className = "";  
          return;  
      }  
      element.style.color="red";
      if (elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))  
          element.className = elementClassName.replace((new RegExp("(^|\\s)" + className + "(\\s|$)"))," ");  
  };  

  document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){ // Enter 
      iLottery();
    }
    if(e && e.keyCode==32){ // Esc
      iRestart();
    }
  };
})();