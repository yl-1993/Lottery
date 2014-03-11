(function(){
  var isLottery = false;
  var isRunning;
  function iLottery(){
    isLottery = !isLottery;
    if(isLottery)
    {
      document.getElementById('canvas1').virtualrubik.lottery();
      isRunning = window.setInterval(function(){
        document.getElementById('canvas1').virtualrubik.lottery();
      },4000); // it take about 4 secs to transform 10 times
    }
    else
    {
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