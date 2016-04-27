// JavaScript Document	
	function apple(obj){
		var oApple=document.getElementById(obj);
		var oAppleaImg=oApple.children;
		document.onmousemove=function(ev){
			var oEvt=ev||event;
			for(var i=0;i<oAppleaImg.length;i++){
				var a = oAppleaImg[i].offsetLeft-oEvt.clientX+oAppleaImg[i].offsetWidth/2;
				var b = oAppleaImg[i].offsetTop+oApple.offsetTop-oEvt.clientY+oAppleaImg[i].offsetHeight/2;
				var dis=Math.sqrt(a*a+b*b);
				var scale=1-dis/300;
				if(scale<0.5) scale=0.5;
				oAppleaImg[i].style.width=128*scale+'px';
				oAppleaImg[i].style.height=128*scale+'px';
			}
		};	
	};
	
	
	function LBT(obj1,obj2){
		var oDiv=document.getElementById(obj1);
		var oUl=oDiv.children[0];
		var oOl=oDiv.children[1];
		var	aSpan=oDiv.children[1].getElementsByTagName('span');
		var now=0;
		var ready=true;
		oUl.style.width=oUl.children.length*oUl.children[0].offsetWidth+'px';
		next();
		function next(){
			move(aSpan[now],{width:80},{type:'linear',time:1000,fn:function(){
				for(var i=0;i<aSpan.length;i++){
					aSpan[i].style.width=0;	
				}
				now++;
				now%=(aSpan.length+1);
				move(oUl,{left:-now*oUl.children[0].offsetWidth},{fn:function(){
					if(now == 4){oUl.style.left = 0;now=0;}	
					if(ready){next()};
				},time:1000});
			}});
		};
		oDiv.onmouseover=function(){
			oLbt1ready=false;
			clearInterval(aSpan[now].timer);
			aSpan[now].style.width=0;	
		};
		oDiv.onmouseout=function(){
			ready=true;
			next();	
		};
		var oDiv2=document.getElementById(obj2);
		var oPrev=oDiv2.children[0];
		var oNext=oDiv2.children[1];
		var oOl2=oDiv2.children[2];
		var aTou=oOl2.children;
		var oUl2=oDiv2.children[3];
		var aTi=oUl2.children;
		var now2=0;
		var timer=null;
		oUl2.style.width=oUl2.children.length*oUl2.children[0].offsetWidth+'px';
		for(var i=0;i<aTou.length;i++){
			aTou[i].index=i;
			aTou[i].onclick=function(){
				for(var j=0;j<aTou.length;j++){
					aTou[j].className="";
				}
				this.className="active";
				move(oUl2,{left:-aTi[0].offsetWidth*this.index},{time:1000});
			};
		}
		oDiv2.onmouseover=function(){
			clearInterval(timer);	
		};
		oDiv2.onmouseout=function(){
			timer=setInterval(function(){onext();},3000);
		};
		oNext.onclick=onext;
		function onext(){
			now2++;
			if(now2==4){now2=0}
			tab();
		};
		timer=setInterval(function(){onext();},3000);
		function tab(){
			for(var j=0;j<aTou.length;j++){
				aTou[j].className="";
			}
			aTou[now2].className="active";
			move(oUl2,{left:-aTi[0].offsetWidth*now2},{time:1000});	
		};
		oPrev.onclick=function(){
			now2--;
			if(now2==-1){ now2=3;}
			tab();
		};	
	};
	
	
	
	
	function ltfztp(obj){
		var oUl = document.getElementById(obj);
		var aLi = oUl.children;
		var aClass = [];
		var bReady = true;
		var oCur=null;
		for(var i = 0; i < aLi.length; i++){
			aClass.push(aLi[i].className);
		}
		for(var i = 0; i <  aLi.length; i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				oCur = oUl.querySelector(".cur");
				if(this.index==aLi.length-1 || this.index==0 || this.index==oCur.index) return;
				if(this.index>oCur.index){
					if(!bReady) return ;
					bReady = false;
					aClass.unshift(aClass.pop());
					tab();
				}else{
					if(!bReady) return ;
					bReady = false;
					aClass.push(aClass.shift());
					tab();
				}
			};
		}
		function tab(){
			for(var i = 0; i <  aLi.length; i++){
				aLi[i].className = aClass[i];
			}
			oCur.addEventListener("transitionend",function(){
				bReady = true;
			},false);
		};
	};
	
	
	
	function magnnifier(obj){
		var oDiv1=document.getElementById(obj);
		var oDiv2=oDiv1.children[2];
		var oMark=oDiv1.children[1];
		var oImg2=oDiv2.children[0];
		oDiv1.onmouseover=function(){
			oMark.style.display='block';
			oDiv2.style.display='block';	
		};
		oDiv1.onmousemove=function(ev){
			var oEvt=ev||event;
			var l=(oEvt.clientX-80)-oMark.offsetWidth/2;
			var t=(oEvt.clientY-150)-oMark.offsetHeight/2;
			var w=oDiv1.offsetWidth-oMark.offsetWidth;
			var h=oDiv1.offsetHeight-oMark.offsetHeight;
			if(l<0) l=0;
			if(l>w) l=w;
			if(t<0) t=0;
			if(t>h) t=h;
			oMark.style.left=l+'px';
			oMark.style.top=t+'px';
			var oDiv1W=oDiv1.offsetWidth;
			var oMarkW=oMark.offsetWidth;
			var oDiv2W=oDiv2.offsetWidth;
			var oImg2W=oImg2.offsetWidth;
			var oDiv1H=oDiv1.offsetHeight;
			var oMarkH=oMark.offsetHeight;
			var oDiv2H=oDiv2.offsetHeight;
			var oImg2H=oImg2.offsetHeight;
			oImg2.style.left=oMark.offsetLeft/(oDiv1W-oMarkW)*(oDiv2W-oImg2W)+'px';
			oImg2.style.top=oMark.offsetTop/(oDiv1H-oMarkH)*(oDiv2H-oImg2H)+'px';
		};
		oDiv1.onmouseout=function(){
			oMark.style.display='none';
			oDiv2.style.display='none';	
		};
	};
	
	
	
	
	function pathmenu(obj1,obj2){
		var oDiv=document.getElementById(obj1);
		var oBtn=document.getElementById(obj2);
		var aImg=oDiv.getElementsByTagName("img");
		var bl=true;
		for(var i=0;i<aImg.length;i++){
			setPos(aImg[i],0);
			aImg[i].rotate=0;
		}
		function move(obj,iTarget){
			var start=obj.rotate;
			var dis=iTarget-start;
			var count=Math.round(700/30);
			var n=0;
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				n++;
				var a=1-n/count;
				var cur=start+dis*(1-a*a*a);
				setPos(obj,cur);
				obj.rotate=cur;
				if(n==count){
					clearInterval(obj.timer);	
				}
			},30);
		};
		oBtn.onclick=function(){
			if(bl){
				for(var i=0;i<aImg.length;i++){
					move(aImg[i],i*(360/(aImg.length)));
				}
				bl=false;
				this.value="收起";	
			}else{
				for(var i=0;i<aImg.length;i++){
					move(aImg[i],0);
				}
				bl=true;
				this.value="展开";
			}
		};
		function setPos(obj,ang){
			var a=Math.sin(a2r(ang))*oDiv.offsetWidth/2;
			var b=Math.cos(a2r(ang))*oDiv.offsetHeight/2;
			obj.style.left=oDiv.offsetWidth/2-aImg[0].offsetWidth/2+a+'px';
			obj.style.top=oDiv.offsetHeight/2-aImg[0].offsetHeight/2-b+'px';
		};
		function a2r(n){
			return 	n*Math.PI/180;
		};
	};
	
	
	
	function rnd(n,m){
		return 	Math.floor(Math.random()*(m-n) + n);
	};
	function PB(obj){
		var oC = document.getElementById(obj);
		var gd = oC.getContext("2d");
		var winW = window.innerWidth;
		var winH = window.innerHeight;
		oC.width = winW;
		oC.height = winH;
		var N = 5;
		var aPoint = [];
		for(var i = 0; i < N; i++){
			aPoint[i] = {
				w:10,
				h:10,
				x:rnd(0,winW),
				y:rnd(0,winH),
				speedX:rnd(-10,10),
				speedY:rnd(-10,10),	
			}
		}
		var oldPoint = [];
		setInterval(function(){
			gd.clearRect(0,0,oC.width,oC.height);
			for(var i = 0; i < N; i++){
				gd.fillStyle = "green";
				gd.fillRect(aPoint[i].x,aPoint[i].y,aPoint[i].w,aPoint[i].h);
				gd.strokeRect(aPoint[i].x,aPoint[i].y,aPoint[i].w,aPoint[i].h);
				aPoint[i].x += aPoint[i].speedX;
				aPoint[i].y += aPoint[i].speedY;
				if(aPoint[i].x < 0){
					aPoint[i].speedX *= -1;
				}
				if(aPoint[i].x > winW){
					aPoint[i].speedX *= -1;
				}
				if(aPoint[i].y < 0){
					aPoint[i].speedY *= -1;
				}
				if(aPoint[i].y > winH){
					aPoint[i].speedY *= -1;
				}
			}
			gd.beginPath();
			gd.moveTo(aPoint[0].x,aPoint[0].y);
			for(var i = 1; i < N; i++){
				gd.lineTo(aPoint[i].x,aPoint[i].y); 
			}
			gd.closePath();
			gd.strokeStyle = "green";
			gd.stroke();
			var arr = [];
			for(var i = 0; i < N; i++){
				arr[i] = {x:aPoint[i].x,y:aPoint[i].y};
			}
			oldPoint.push(arr);
			while(oldPoint.length > 10){
				oldPoint.shift();
			}
			for(var i = 0; i < oldPoint.length; i++){
				var arr = oldPoint[i];
				gd.beginPath();
				gd.moveTo(arr[0].x,arr[0].y);
				
				for(var j = 1; j < N; j++){
					gd.lineTo(arr[j].x,arr[j].y); 
				}
				gd.closePath();
				gd.strokeStyle = "green";
				gd.stroke();
			}
		},30);
	};
	
	
	
	
	function picturedrag(obj){
	var oDiv=document.getElementById(obj);
	var oUl=oDiv.children[0];
	var aLi=oUl.children;
	var aImg=oUl.getElementsByTagName('img');
	var aSpan=oUl.getElementsByTagName('span');
	oUl.style.width=oUl.children.length*aLi[0].offsetWidth+'px';	
	oUl.onmousedown=function(ev){
		var oEvt=ev||event;
		var disX=oEvt.clientX-oUl.offsetLeft;
		document.onmousemove=function(ev){
			var oEvt=ev||event;
			var l=oEvt.clientX-disX;
			if(l>oDiv.offsetWidth/2-(0+0.5)*aLi[0].offsetWidth){
				l=oDiv.offsetWidth/2-(0+0.5)*aLi[0].offsetWidth;
			}
			if(l<oDiv.offsetWidth/2-(aLi.length-1+0.5)*aLi[0].offsetWidth){
				l=oDiv.offsetWidth/2-(aLi.length-1+0.5)*aLi[0].offsetWidth;
			}
			oUl.style.left=l+'px';
			setSize();
		};	
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;	
		};
		return false;
	};
	function setSize(){
		for(var i=0;i<aImg.length;i++){
			var dis=Math.abs(oDiv.offsetWidth/2-(oUl.offsetLeft+aLi[i].offsetLeft+aLi[i].offsetWidth/2));
			var scale=1-dis/800;	
			if(scale<0.5) scale=0.5;
			aImg[i].style.width=520*scale+'px';
			aImg[i].style.height=358*scale+'px';
			aImg[i].style.marginLeft=-(aImg[i].offsetWidth-aLi[i].offsetWidth)/2+'px';
			aImg[i].style.marginTop=-(aImg[i].offsetHeight-aLi[i].offsetHeight)/2+'px';
			aImg[i].style.zIndex=parseInt(scale*10000);
			aImg[i].style.opacity=scale+0.1;
		}	
	};
	setCenter(parseInt(aLi.length/2));
	function setCenter(n){
		oUl.style.left=oDiv.offsetWidth/2-(n+0.5)*aLi[0].offsetWidth+'px';
		setSize();
	};
	window.onresize=setSize;
	};
	
	
	
	function sfq(obj){
	var oDiv=document.getElementById(obj);
	var aDiv=oDiv.children;
	for(var i=1;i<aDiv.length;i++){
		aDiv[i].style.left=aDiv[i].offsetWidth+40*(i-1)+'px';
	}
	for(var i=0;i<aDiv.length;i++){
		(function(index){
			aDiv[i].onmouseover=function(){
				for(var i=0;i<aDiv.length;i++){
					if(i<=index){
						move(aDiv[i],{left:i*40},{time:1000});
					}else{
						move(aDiv[i],{left:aDiv[i].offsetWidth+40*(i-1)},{time:1000});
					}
				}
			};	
		})(i);
	}
	};
	
	
	
	
	function bztp(obj){
	var oDiv = document.getElementById(obj);
	var R = 4;
	var C = 7;
	var len = R*C;
	for(var r = 0; r < R; r++){
		for(var c = 0; c < C; c++){
			var oSpan = document.createElement("span");
			oDiv.appendChild(oSpan);
			oSpan.style.width = oDiv.offsetWidth/C + "px";
			oSpan.style.height = oDiv.offsetHeight/R + "px";
			
			oSpan.style.left = oSpan.offsetWidth*c + "px";
			oSpan.style.top  = oSpan.offsetHeight*r + "px";
			
			oSpan.style.backgroundPosition = -oSpan.offsetLeft+"px -"+oSpan.offsetTop + "px";
		}
	}
	var iNow = 1;
	var aSpan = oDiv.children;
	oDiv.onclick = function(){
		for(var i = 0; i < len; i++){
			aSpan[i].style.transition = "none";	
			aSpan[i].style.opacity = "1";
			aSpan[i].style.transform = "translate(0px,0px) rotateX(0deg) rotateY(0deg)";
			aSpan[i].style.backgroundImage = "url(../images/l"+iNow%13+".jpg)";
		}
		if(iNow==12){iNow=0;}
		oDiv.style.backgroundImage = "url(../images/l"+(iNow+1)%13+".jpg)";
		iNow++;
		setTimeout(function(){
			for(var i = 0; i < len; i++){
				aSpan[i].style.transition = "1s all ease";
				var x = aSpan[i].offsetLeft + aSpan[i].offsetWidth/2 - oDiv.offsetWidth/2;
				var y = aSpan[i].offsetTop + aSpan[i].offsetHeight/2 - oDiv.offsetHeight/2;
				aSpan[i].style.transform = "translate("+x+"px,"+y+"px) rotateX("+rnd(-180,180)+"deg) rotateY("+rnd(-180,180)+"deg)";
				aSpan[i].style.opacity = "0";
			}
		},0);
	};
	function rnd(n,m){
		return Math.floor(Math.random()*(m-n)+n);
	};
	};
	
	
	
	
	function pbl(obj){
	var oDiv=document.getElementById(obj);
	var aUl=oDiv.children;
	var count=-1;
	function createLi(){
		count++;
		var oLi=document.createElement('li');
		if(count==70){count=0;}
		oLi.innerHTML='<img src="../images/'+count+'.jpg">'
		oLi.style.height=parseInt(100+Math.random()*(300-100))+'px';
		return oLi;	
	};
	function insertToUl(n){
		for(var j=0;j<n;j++){
			var arr=[];
			for(var i=0;i<aUl.length;i++){
				arr.push(aUl[i]);
			}
			arr.sort(function(ul1,ul2){return ul1.offsetHeight-ul2.offsetHeight});
			arr[0].appendChild(createLi());
			
		}	
	};
	insertToUl(20);
	window.onscroll=function(){
		var scrTop=document.documentElement.scrollTop||document.body.scrollTop;
		var cHeight=document.documentElement.clientHeight;
		var bodyH = document.body.scrollHeight; 
		if(bodyH<=scrTop+cHeight){
			insertToUl(30);
		}	
	};
	};
	
	
	
	
	function pztp(obj){
	var oUl = document.getElementById(obj);
	var aLi = oUl.children;
	var len = aLi.length;
	for(var i = 0; i < len; i++){
		aLi[i].style.transition = "1s all ease " + (len - i)*200 +"ms"
		aLi[i].style.transform = "rotateY("+360/len*i+"deg) translateZ(300px)";
		aLi[i].innerHTML+="<span><img src="+"../images/"+(i+26)+".jpg"+" /></span>";
	}
	var y = 0;
	var x = 150;
	var speedX = 0;
	var speedY = 0;
	var lastX = 0;
	var lastY = 0;
	var timer = null;
	var count = 0;
	oUl.onmousedown = function(ev){
		clearInterval(timer);
		var disX = ev.clientX - y;
		var disY = ev.clientY - x;
		document.onmousemove = function(ev){
			y = ev.clientX - disX;
			x = ev.clientY - disY;
			if(x > 600){
				x = 600;
			} else if(x < -600){
				x = -600;	
			}
			speedX = x - lastX;
			speedY = y - lastY;
			lastX = x;
			lastY = y;		
			oUl.style.transform = "perspective(800px) rotateX("+-x/10+"deg) rotateY("+y/10+"deg)";
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			clearInterval(timer);
			timer = setInterval(function(){
				x += speedX;
				y += speedY;
				speedX *= 0.95;
				speedY *= 0.95;
				if(Math.abs(speedX) < 1){
					speedX = 0;
				}
				if(Math.abs(speedY) < 1){
					speedY = 0;
				}
				if(speedX == 0&& speedY == 0){
					clearInterval(timer);
				}
				oUl.style.transform = "perspective(800px) rotateX("+-x/10+"deg) rotateY("+y/10+"deg)"
			},30);
		};
		return false;	
	};
	};
	
	
	
	
	function time(obj){
	var oDiv = document.getElementById(obj);
	var oH   = oDiv.querySelector(".hour");
	var oM   = oDiv.querySelector(".min");
	var oS   = oDiv.querySelector(".sec"); 
	function clock(){
		var oDate = new Date();
		var iH = oDate.getHours();
		var iM = oDate.getMinutes();
		var iS = oDate.getSeconds();
		var iMs = oDate.getMilliseconds();
		
		oH.style.transform = "rotate("+(iH*30 + iM/60*30) +"deg)";
		oM.style.transform = "rotate("+(iM*6+ iS/60*6) +"deg)";
		oS.style.transform = "rotate("+(iS*6+ iMs/1000*6 )+"deg)";
	};
	clock();
	setInterval(clock,30);
		for(var i = 0; i < 60; i++){
			var oSpan = document.createElement("span");
			oDiv.appendChild(oSpan);
			oSpan.style.transform = "rotate("+i*6+"deg)";
			if(i%5 == 0){
				oSpan.classList.add("on");
				if(i == 0){
					oSpan.innerHTML = "<strong>12<\/strong>";
				} else {
					oSpan.innerHTML = "<strong>"+i/5+"<\/strong>";
				}
				oSpan.children[0].style.transform = "rotate(-"+i*6+"deg)";
			}
		}
	
	var winW=document.documentElement.clientWidth;
	var winH=document.documentElement.clientHeight;
	oDiv.onmousedown = function(ev){
		var oEvent = ev || event;
		var disX = oEvent.clientX - oDiv.offsetLeft;
		var disY = oEvent.clientY - oDiv.offsetTop;
		document.onmousemove = function(ev){
			var oEvent = ev || event;
			var l=oEvent.clientX - disX;
			var t=oEvent.clientY - disY
			if(l<=0){l=0;}
			if(l>=winW-oDiv.offsetWidth-20){l=winW-oDiv.offsetWidth-20;}
			if(t<=0){t=0;}
			if(t>=winH-oDiv.offsetHeight-20){t=winH-oDiv.offsetHeight-20;}
			oDiv.style.left = l + "px";
			oDiv.style.top  = t + "px";
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			oDiv.releaseCapture && oDiv.releaseCapture();
		};	
		oDiv.setCapture && oDiv.setCapture();
		return false;
	};
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
