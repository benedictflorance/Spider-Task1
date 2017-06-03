var b1=document.getElementById("box1");
var b2=document.getElementById("box2");
var b3=document.getElementById("box3");
var stat=document.getElementById("status");
var points=0;
var count=0;
var countpic=0;
var picpoints=0;
var incr=Math.floor(Math.random()*20+1);
var incrpic=Math.floor(Math.random()*20+1);
function addNos(e){
	count++;
	e.preventDefault();
	//To increase the probability for winning, at some random try within 20 all the boxes are made the same number
	if(incr==count)
	{b1.textContent=b2.textContent=b3.textContent=Math.floor(Math.random()*9+1);
	incr+=20;}
	else{
	b1.textContent=Math.floor(Math.random()*9+1);
	b2.textContent=Math.floor(Math.random()*9+1);
	b3.textContent=Math.floor(Math.random()*9+1);}
	if((b1.textContent==b2.textContent)&&(b2.textContent==b3.textContent))
	{	points+=50;
		stat.innerHTML="Congrats, You won! :) <br><br> Points: "+points;
	}
	else
	{	points--;
		stat.innerHTML="Better luck, next time :/ <br><br> Points: "+points;
	}
}

function addPics(e){
	countpic++;
	e.preventDefault();
	//To increase the probability for winning, at some random try within 20 all the boxes are made the same number
	if(incrpic==countpic)
	{	
	b1.innerHTML=b2.innerHTML=b3.innerHTML="<img src=\"images\\"+Math.floor(Math.random()*9+1)+".png\" id=\"setsize\" />";
	incrpic+=20;
	picpoints+=50;
	stat.innerHTML="Congrats, You won! :) <br><br> Points: "+picpoints;}
	else{
	var a=Math.floor(Math.random()*9+1);
	var b=Math.floor(Math.random()*9+1);
	var c=Math.floor(Math.random()*9+1);
	b1.innerHTML="<img src=\"images\\"+a+".png\" id=\"setsize\" />";
	b2.innerHTML="<img src=\"images\\"+b+".png\" id=\"setsize\" />";
	b3.innerHTML="<img src=\"images\\"+c+".png\" id=\"setsize\" />";
	if(a==b&b==c)
	{	picpoints+=50;
		stat.innerHTML="Congrats, You won! :) <br><br> Points: "+picpoints;
	}
	else
	{	picpoints--;
		stat.innerHTML="Better luck, next time :/ <br><br> Points: "+picpoints;
	}
	}
	
}
function picMode(e){
e.preventDefault();
spinEl.addEventListener('click', addPics, false);
}

var spinEl = document.getElementById('spin');
spinEl.addEventListener('click', addNos, false);

var picEl = document.getElementById('pictures');
picEl.addEventListener('click', picMode, false);

