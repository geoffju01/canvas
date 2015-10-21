// JavaScript Document

var curShowTimeSenconds=0;
var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

var endTime = new Date();
endTime.setTime(endTime.getTime()+10*1000);
window.onload=function(){
    //WINDOW_WIDTH = document.documentElement.clientWidth;
    //WINDOW_HEIGHT = document.documentElement.clientHeight;
	WINDOW_WIDTH=document.documentElement.clientWidth||document.body.clientWidth ;
	WINDOW_HEIGHT=document.documentElement.clientHeight-20||document.body.clientHeight-20 ;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT /5);
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	curShowTimeSenconds = getcurShowTimeSenconds()
	setInterval(function(){
		render(context);
		update();
		},50);
}

function getcurShowTimeSenconds(){
	var curTime= new Date();
	//var ret=endTime.getTime() - curTime.getTime();
	//ret = Math.round(ret/1000);
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	return ret>=0? ret:0;
	}
function update(){
	var nextShowTimeSenconds = getcurShowTimeSenconds();
	var nextHours=parseInt(nextShowTimeSenconds/3600);
	var nextMinutes=parseInt((nextShowTimeSenconds-nextHours*3600)/60);
	var nextSeconds=parseInt(nextShowTimeSenconds%60);
	var curHours=parseInt(curShowTimeSenconds/3600);
	var curMinutes=parseInt((curShowTimeSenconds-curHours*3600)/60);
	var curSeconds=parseInt(curShowTimeSenconds%60);
    if( nextSeconds != curSeconds ){
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }
		curShowTimeSenconds =nextShowTimeSenconds;
	}
		udateBalls();
		console.log(balls.length);
}
function udateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
			balls[i].y=WINDOW_HEIGHT-RADIUS;
			balls[i].vy=-balls[i].vy*0.75;
			}
		}
	 var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ ){
		  if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
            balls[cnt++] = balls[i]
	}
	while( balls.length > Math.min(400,cnt)){
        balls.pop();
    }
}
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
					var aBall={
						x:x+j*2*(RADIUS+1)+(RADIUS+1),
						y:y+i*2*(RADIUS+1)+(RADIUS+1),
						g:1.5+Math.random(),
						vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
						vy:-5,
						color:colors[Math.floor(Math.random()*colors.length)]
						}
					balls.push(aBall);
				}
			}
		}
	}

function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//刷新图画
	var hours=parseInt(curShowTimeSenconds/3600);
	var minutes=parseInt((curShowTimeSenconds-hours*3600)/60);
	var seconds=parseInt(curShowTimeSenconds%60);
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
	
	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;
		cxt.beginPath()
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
		}
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle="rgb(0,102,153)";
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
				}
			}
		}
}








