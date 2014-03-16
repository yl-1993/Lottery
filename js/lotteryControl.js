var randomImageCount = 1;
(function(){
  var isLottery = false;
  var isRunning=0, isTextChange=0, runningInterval=0, stopingInterval=0;
  var perRotationTime = 4000;
  var perBlinkTime = 2000;
  var textTimer = 0;
  var textTimeInverval = 100;
  var timerArray=[0];

  function setStopBackground(){
      localClearInterval();
      setStopStatus();  
      setResultBlinking();
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

  function changeRunStatus(cmd){
    if(cmd=="Run")
    {
      setRunningStatus();
    }
    else if(cmd=="Stop")
    {
      var dur = checkTextDuration();
      if(dur>8*textTimeInverval){
        window.setTimeout(function(){
            setStopBackground();
        },dur-8*textTimeInverval);
      }
      else{
        setStopBackground();
      }
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
      },textTimeInverval);
  }

  function localClearInterval(){
    window.clearInterval(isTextChange);
    for(var i=0; i<timerArray.length; i++)
      window.clearInterval(timerArray[i]);
    isTextChange=0;
    runningInterval=0;
    stopingInterval=0;
  }

  function setRunningStatus(){
    document.getElementById('startButton').style.color="black";
    document.getElementById('startButton').innerHTML="RUNNING";
  }

  function setStopStatus(){
    document.getElementById('startButton').style.color="black";
    document.getElementById('startButton').innerHTML="STOP";
  }

  function setEndingStatus(){
    document.getElementById('startButton').style.color="gray";
  }

  // check when to change the text (from 'running' to 'stop')
  function checkTextDuration(){
    window.clearInterval(isTextChange);
    isTextChange=0;
    var count = perRotationTime*2/textTimeInverval;
    var remain = (count - textTimer)*textTimeInverval/2;
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
    changeRunStatus("Run");
    if(isLottery)
    {
      document.getElementById('canvas1').virtualrubik.lottery();
      isRunning = window.setInterval(function(){
        document.getElementById('canvas1').virtualrubik.lottery();
        setTextTimer(); 
      },perRotationTime); // it take about 4 secs to transform 10 times
    }
    else
    {
      changeRunStatus("Stop");
      window.clearInterval(isRunning);
      isRunning = 0;
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
      element.style.color="black";
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