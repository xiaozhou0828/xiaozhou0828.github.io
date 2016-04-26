function getStyle(b,a){
	return(b.currentStyle||getComputedStyle(b,false))[a]
};
	
function move(f,d,c){
	c=c||{};
	c.duration=c.duration||800;
	c.easing=c.easing||"ease-out";
	var e=Math.round(c.duration/30);
	var h={};
	var a={};
	for(var b in d){
		h[b]=parseFloat(getStyle(f,b));
		if(isNaN(h[b])){
			switch(b){
				case"left":h[b]=f.offsetLeft;
				break;
				case"top":h[b]=f.offsetTop;
				break;
				case"width":h[b]=f.offsetWidth;
				break;
				case"height":h[b]=f.offsetHeight;
				break;
				case"marginLeft":h[b]=f.offsetLeft;
				break;
				case"borderWidth":h[b]=0;
				break
			}
		}
		a[b]=d[b]-h[b];
	}
	var g=0;
	clearInterval(f.timer);
	f.timer=setInterval(function(){
		g++;
		for(var j in d){
			switch(c.easing){
				case"linear":
				var i=g/e;var k=h[j]+a[j]*i;
				break;
				case"ease-in":
				var i=g/e;
				var k=h[j]+a[j]*i*i*i;
				break;
				case"ease-out":
				var i=1-g/e;var k=h[j]+a[j]*(1-i*i*i);
				break
			}
			if(j=="opacity"){
				f.style.opacity=k;
				f.style.filter="alpha(opacity:"+k*100+")"
			}else{
				f.style[j]=k+"px"
			}
		}
		if(g==e){
			clearInterval(f.timer);
			c.complete&&c.complete();
		}
	},30);
};