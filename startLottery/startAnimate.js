var isStartAnimation=false;
var startEndFlag=false;
var startRunning=false;
(function(){
		var dr;
		window.onload = function(){
			if(!isStartAnimation)
			{
				startMagicCube();
				return;
			}
			canvas = document.getElementById("canvas2");
			ele = document.querySelectorAll(".ele");
			context = canvas.getContext('2d');
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			focallength = 250;
			index = 0;
			img = new Image();
			var pause = false;
			var dots = [];
			eachEle();
			
			function eachEle(){
				dr = 4;
				if(ele[index].getAttribute('data-dr')!==null){
					dr = parseInt(ele[index].getAttribute('data-dr'))
				}
				context.clearRect(0,0,canvas.width,canvas.height)
				if(ele[index].innerHTML.indexOf("img")>=0){
					img.src = ele[index].getElementsByTagName("img")[0].src;
					imgload(img , function(){
						context.drawImage(img , canvas.width/2 - img.width/2 , canvas.height/2 - img.height/2);
						dots = getimgData();
						initAnimate();
					})
				}
				else {
					var text = ele[index].innerHTML;
					for(var i=0;i<text.length;i++){
						context.save();
						var fontSize = Math.random()*50 + 150;
						context.font = fontSize+"px 微软雅黑 bold";
						context.textAlign = "center";
						context.textBaseline = "middle";
						var code = text.charAt(i);
						//context.fillStyle = "rgba("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+" , 1)";
						context.fillStyle="rgba(0,0,0,1)";
						context.fillText(code , canvas.width/2 - ((text.length/2 -  i)*150) , canvas.height/2);
						context.restore();
					}
					dots = getimgData();
					initAnimate();
				}
				index < (ele.length-1) ? index++ : startEndFlag=true;
				if(startEndFlag && !startRunning){
					startMagicCube();
				}
				// console.log(index)
			}


			function startMagicCube(){
				startRunning=true;
				document.getElementById('canvas2').style.display="none";
				para = [];
				var screenScalar = document.documentElement.clientWidth/document.documentElement.clientHeight;
				console.log(screenScalar);
				// point the screen resolution
				// 'para' is useless for the time being
				para.pointedWidth = 1024;
				para.pointedHeight = 768;
				// change resolution
				if(screenScalar > 3){ // 1366 * 768
					document.getElementById('glasspane').style.left = 50 + 60 + 'px';
					document.getElementById('resNumUnit').style.left = 190 + 60 + 'px';
					document.getElementById('resNumDecade').style.left = 110 + 60 + 'px';
					document.getElementById('resNumHundred').style.left = 30 + 60 + 'px';
					document.getElementById('res-frame').style.left = 360 + 'px';
				}
				else if(screenScalar > 2.3){ // 1366 * 768
					document.getElementById('glasspane').style.left = 50 + 60 + 'px';
					document.getElementById('resNumUnit').style.left = 190 + 60 + 'px';
					document.getElementById('resNumDecade').style.left = 110 + 60 + 'px';
					document.getElementById('resNumHundred').style.left = 30 + 60 + 'px';
					document.getElementById('res-frame').style.left = 360 + 60 + 'px';
				}
				else if(screenScalar > 2.0){ // 1920 * 1080
					document.getElementById('glasspane').style.left = 50 + (1920 - 1366)/2 + 140 + 'px';
					document.getElementById('resNumUnit').style.left = 190 + (1920 - 1366)/2 + 140 + 'px';
					document.getElementById('resNumDecade').style.left = 110 + (1920 - 1366)/2 + 140 + 'px';
					document.getElementById('resNumHundred').style.left = 30 + (1920 - 1366)/2 + 140 + 'px';
					document.getElementById('res-frame').style.left = 325 + (1920 - 1366)/2 + 140 + 'px';
				}
				else{ // 1024 * 768

				}
				// initialize cubic
				attachVirtualRubik(document.getElementById('canvas1'), para, configCubes);
				document.getElementById('canvas1').style.display="block";
				document.getElementById('glasspane').style.display="block";
				document.getElementById('res-frame').style.display="block";
				// for (var i = 0; i < 9; i++) {
				// 	document.getElementById('star_'+i).style.display="block";
				// };
				document.getElementById('resNumUnit').style.display="block";
				document.getElementById('resNumDecade').style.display="block";
				document.getElementById('resNumHundred').style.display="block";
				//document.getElementById('res-hundred').style.display="block";
				//document.getElementById('res-decade').style.display="block";
				//document.getElementById('res-unit').style.display="block";
				//console.log(startEndFlag);
				index=0;
				pause=true;
			}

			function imgload(img , callback){
				if(img.complete){
					callback.call(img);
				}
				else {
					img.onload = function(){
						callback.call(this);
					}
				}
			}

			var lastTime;
			function initAnimate(){
				dots.forEach(function(){
					this.x = getRandom(0 , canvas.width);
					this.y = getRandom(0 , canvas.height);
					this.z = getRandom(-focallength, focallength);

					this.tx = getRandom(0 , canvas.width);
					this.ty = getRandom(0 , canvas.height);
					this.tz = getRandom(-focallength, focallength);
				});
				dots.sort(function(a,b){
					return b.z-a.z;
				});
				dots.forEach(function(){
					this.paint();
				});
				lastTime = new Date();
				animate();
			}
			
			var derection = true;
			function animate(){
				animateRunning = true;
				var thisTime = +new Date();
				// context.clearRect(0,0,canvas.width , canvas.height);
					context.save();
					context.fillStyle = "rgba(0,0,0,0.1)"
					context.fillRect(0,0,canvas.width,canvas.height);
					context.restore();
				var sulv = 0.25; // control the speed of animation
				dots.forEach(function(){
					var dot = this;
					if(derection){
						if (Math.abs(dot.dx - dot.x) < 0.1 && Math.abs(dot.dy - dot.y) < 0.1 && Math.abs(dot.dz - dot.z)<0.1) {
							dot.x = dot.dx;
							dot.y = dot.dy;
							dot.z = dot.dz;
							if(thisTime - lastTime > 300) derection = false;
						} else {
							dot.x = dot.x + (dot.dx - dot.x) * sulv;
							dot.y = dot.y + (dot.dy - dot.y) * sulv;
							dot.z = dot.z + (dot.dz - dot.z) * sulv;
							lastTime = +new Date()
						}
					}
					else {
						if (Math.abs(dot.tx - dot.x) < 0.1 && Math.abs(dot.ty - dot.y) < 0.1 && Math.abs(dot.tz - dot.z)<0.1) {
							dot.x = dot.tx;
							dot.y = dot.ty;
							dot.z = dot.tz;
							pause = true;
						} else {
							dot.x = dot.x + (dot.tx - dot.x) * sulv;
							dot.y = dot.y + (dot.ty - dot.y) * sulv;
							dot.z = dot.z + (dot.tz - dot.z) * sulv;
							pause = false;
						}
					}
				});
				dots.sort(function(a,b){
					return b.z-a.z;
				});
				dots.forEach(function(){
					this.paint();
				})
				if(!pause) {
					if("requestAnimationFrame" in window){
						requestAnimationFrame(animate);
					}
					else if("webkitRequestAnimationFrame" in window){
						webkitRequestAnimationFrame(animate);
					}
					else if("msRequestAnimationFrame" in window){
						msRequestAnimationFrame(animate);
					}
					else if("mozRequestAnimationFrame" in window){
						mozRequestAnimationFrame(animate);
					}
				}
				else {
					context.clearRect(0,0,canvas.width,canvas.height)
					eachEle();
					derection=true;
	                pause = false;
				}
			}
		}

		Array.prototype.forEach = function(callback){
			for(var i=0;i<this.length;i++){
				callback.call(this[i]);
			}
		}

		function getRandom(a , b){
			return Math.random()*(b-a) + a
		}

		function getimgData(){
			var imgData = context.getImageData(0,0,canvas.width , canvas.height);
			context.clearRect(0,0,canvas.width , canvas.height);
			var dots = [];
			var canbreak = false;
			var i = 0;
			var dot;
			for(var x=0;x<imgData.width;x+=dr*2){
				for(var y=0;y<imgData.height;y+=dr*2){
					i = (y*imgData.width + x)*4;
					if(imgData.data[i+3] > 128){
						dot = new Dot(x-dr , y-dr , 0 , dr , {a:imgData.data[i] , b:imgData.data[i+1] , c:imgData.data[i+2]});
						dots.push(dot);
					}
				}
			}
			return dots;
		}

		var Dot = function(centerX , centerY , centerZ , radius , color){
			this.dx = centerX;
			this.dy = centerY;
			this.dz = centerZ;
			this.tx = 0;
			this.ty = 0;
			this.tz = 0;
			this.z = centerZ;
			this.x = centerX;
			this.y = centerY;
			this.radius = radius;
			this.color = color;
		}

		Dot.prototype = {
			paint:function(){
				context.save();
				context.beginPath();
				// var scale = focallength/(focallength + this.z);
				var scale = (this.z+focallength)/(2*focallength);
				context.arc(canvas.width/2 + (this.x-canvas.width/2)*scale , canvas.height/2 + (this.y-canvas.height/2) * scale, this.radius*scale , 0 , 2*Math.PI);
				context.fillStyle = "rgba("+this.color.a+","+this.color.b+","+this.color.c+","+ scale +")";
				context.fill()
				context.restore();
			}
		}
})();