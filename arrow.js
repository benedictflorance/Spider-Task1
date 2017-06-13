var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var image = document.getElementById('bow');
var sound=document.getElementById('arrow');
var impact=document.getElementById('impact');
var fire=document.getElementById('fire');
var multiply=document.getElementById('multiply');
var bgm=document.getElementById('bgm');
var bonus=document.getElementById('bonus');
var fsound=document.getElementById('fsound');
var bowX = 50,fromx=45,tox=120,fromy,toy,bullX=650,bullY=45,bullSpeed=2,wPressed = false,sPressed = false;
var space=false,lives=10,score=0,flag=1,animate,toggle=1,fire1X=175,fire1Y=80,fire2X=500,fire2Y=360;
var mulX=345,mulY=canvas.height-80,mulSpeed=-3,fflag=1,random,incr=false;
var bowY = (canvas.height-123)/2;
fromy=toy=(canvas.height+4)/2;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
window.addEventListener("load", function(){alert("Welcome to Bow and Arrow Game! \n Points: \n Yellow - 50 \n Red - 30 \n Blue - 10 \n Arrow burns in fire \n Shoot at bonus to get extra arrows \n Shoot at 2x to fly faster")}, false);
function keyDownHandler(e) {
    if(e.keyCode == 87||e.keyCode==38) {
        wPressed = true;
    }
    else if(e.keyCode == 83||e.keyCode==40) {
        sPressed = true;
    }
    else if(e.keyCode==32){
        space = true;
        sound.play();
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 87||e.keyCode==38) {
        wPressed = false;
    }
    else if(e.keyCode == 83||e.keyCode==40) {
        sPressed = false;
    }
}
function drawBow() {
    ctx.drawImage(image,bowX,bowY);
}
function drawArrow(){
                var headlen = 10;
                var angle = Math.atan2(toy-fromy,tox-fromx);
                //arrow
                ctx.beginPath();
                ctx.moveTo(fromx, fromy);
                ctx.lineTo(tox, toy);
                ctx.strokeStyle = "rgb(185,115,255)";
                ctx.lineWidth = 3;
                ctx.stroke();
                //arrowhead
                ctx.moveTo(tox, toy);
                ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
                ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));
                ctx.lineTo(tox, toy);
                ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));
                //draws the paths created above
                ctx.strokeStyle = "rgb(185,115,255)";
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.fillStyle = "rgb(185,115,255)";
                ctx.fill();
}
function drawBullsEye()
{
 ctx.beginPath();
 ctx.moveTo(bullX,bullY);
 ctx.arc(bullX,bullY,8,0,2*Math.PI,true);
 ctx.fillStyle="yellow";
 ctx.fill();
 ctx.beginPath();
 ctx.moveTo(bullX,bullY);
 ctx.arc(bullX,bullY,20,0,2*Math.PI,true);
 ctx.fillStyle="red";
 ctx.fill();
 ctx.beginPath();
 ctx.moveTo(bullX,bullY);
 ctx.arc(bullX, bullY, 40, 0, 2*Math.PI, true);
 ctx.fillStyle="blue";
 ctx.fill();
 
}
function collisionDetection()
{
        if(tox>bullX-40&&flag)
    {
        if(toy>=bullY-40&&toy<=bullY+40){
        impact.play();
        if(toy<bullY-20||toy>bullY+20)
        {
            score+=10;
            document.getElementById("status").textContent="That was a 10! :)";
            document.getElementById("status").style.background="blue";
        }
        else if(toy<=bullY-8||toy>=bullY+8)
        {
            score+=30
            document.getElementById("status").textContent="That was a 30! ;)";
            document.getElementById("status").style.background="red";
        }
        else
        {
            score+=50;
            document.getElementById("status").textContent="That was a 50! :O";
            document.getElementById("status").style.background="yellow";
        }
    }
    else
        {document.getElementById("status").textContent="Try Hard";
        document.getElementById("status").style.background="rgb(146,192,17)";
        return;}
    flag=0;
setTimeout(function(){if(lives){
                space=false;
                incr=false;
                lives--;
                fromx=45; 
                tox=120;
                fromy=toy=bowY+62;
                drawArrow();
                flag=1;
            }},50);
    }
}
function pause(e){
        e.preventDefault(); 
        if(toggle){
            toggle=0;
            cancelAnimationFrame(animate);
            document.getElementById("pause").textContent="Resume";
        } 
        else{
            toggle=1; 
            document.getElementById("pause").textContent="Pause";
            animate=requestAnimationFrame(draw);
        }
}
function drawBonus(){
    ctx.drawImage(fire,fire1X,fire1Y);
    ctx.drawImage(fire,fire2X,fire2Y);
    if(mulY<canvas.height/4||(mulY>canvas.height/2&&mulY<0.75*canvas.height))
    {ctx.drawImage(multiply,mulX,mulY);
    random=1;}
    else
    {ctx.drawImage(bonus,mulX,mulY);
        random=0;}
}
function bonusCollision(){
    if((toy>=80&&toy<=150&&tox>=180)||(toy>=360&&toy<=430&&tox>=505))
        {       if(fflag)
                    {lives--; fflag=0;}
                fsound.play();
                setTimeout(function(){
                space=false;
                fromx=45; 
                tox=120;
                fromy=toy=bowY+62;
                drawArrow()
                fflag=1;},100);
        }
    if(toy>=mulY&&toy<=mulY+70&&tox==mulX+15)
    {
        if(random)
            incr=true;
        else
            lives+=3;
    }

}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation ='destination-over';
    drawArrow();
    drawBow();
    drawBullsEye();
    drawBonus();
    bonusCollision();
    collisionDetection();
    document.getElementById("lives").textContent=lives+" arrow(s) in your quiver!";
	document.getElementById("score").textContent="Score: "+score;
    if(wPressed&&bowY>2&&!space){
    	bowY-=4;
    	fromy-=4;
    	toy-=4;
    }
    else if(sPressed&&bowY<canvas.height-125&&!space){
    	bowY+=4;
    	fromy+=4;
    	toy+=4;
    }
    else if(space)
    {   if(!incr)
        {
    	fromx+=8;
    	tox+=8;}
        else
        {fromx+=16;
        tox+=16;}

    }
    if(fromx>canvas.width+5&&lives)
    {
   	lives--;
    incr=false;
    fromx=45; 
    tox=120
	fromy=toy=bowY+62;
	space=false;
	drawArrow();
    }
    if(bullY<45||bullY>canvas.height-42)
    {bullSpeed=-1*bullSpeed;}
    bullY+=bullSpeed;
        if(mulY<5||mulY>canvas.height-72)
    {mulSpeed=-1*mulSpeed;}
    mulY+=mulSpeed;
    if(!lives)
    {
        setTimeout(function(){
        alert("GAME OVER \n Score: "+score);
        document.location.reload();
        },1000);
    }
    animate=requestAnimationFrame(draw);
}
animate=requestAnimationFrame(draw);
document.getElementById("restart").addEventListener("click",function(e){ e.preventDefault(); window.location.reload();},false);
document.getElementById("pause").addEventListener("click",pause,false); 
bgm.play();