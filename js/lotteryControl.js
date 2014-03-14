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
      drawResFrame();
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

  function getCanvasCtx(){
    var canvas = document.getElementById("canvas1");
    if (canvas.getContext) { //检测浏览器是否兼容
      console.log(canvas);
      var ctx = canvas.getContext("2d"); //你的canvas代码在这里
      return ctx;
    }
    console.log('canvas is null');
    return null;
  }

  function drawResFrame(){
var canvas = document.getElementById("canvas1");
              if (canvas == null)
                  return false;
              var context = canvas.getContext("2d");
              //实践表明在不设施fillStyle下的默认fillStyle=black
              context.fillRect(0, 0, 100, 100);
              //实践表明在不设施strokeStyle下的默认strokeStyle=black
              context.strokeRect(120, 0, 100, 100);
 
             //设置纯色
             context.fillStyle = "red";
             context.strokeStyle = "blue";
             context.fillRect(0, 120, 100, 100);
             context.strokeRect(120, 120, 100, 100);
 
             //设置透明度实践证明透明度值>0,<1值越低，越透明，值>=1时为纯色，值<=0时为完全透明
             context.fillStyle = "rgba(255,0,0,0.2)";
             context.strokeStyle = "rgba(255,0,0,0.2)";
             context.fillRect(240,0 , 100, 100);
             context.strokeRect(240, 120, 100, 100);
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