(function(){
  var isLottery = false;
  var isRunning=0, isTextChange=0, runningInterval=0, stopingInterval=0;
  var perRotationTime = 4000;
  var textTimer = 0;
  var textTimeInverval = 100;
  var timerArray=[0];

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
          localClearInterval();
          setStopStatus();
        },dur-8*textTimeInverval);
      }
      else{
        localClearInterval();
        setStopStatus();
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
    var remain = (count - textTimer)/2;
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
    return remain*textTimeInverval;
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