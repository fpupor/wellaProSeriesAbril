var vezes = 5;
//
var inPlay = false;
var first = true;
var point = {i:null, f:null};
var d = 1;
var steps = 0;

var times = 0;
var textoVez = 0;

var st;
var texto;
var vid;
var arrVid = [document.getElementById('vidD'), document.getElementById('vidE')];
var arrTexto = [document.getElementById('texto0'), document.getElementById('texto1'), document.getElementById('texto2')];

//var canvas = document.getElementById('canvas');
var val = document.getElementById('information');
var logo = document.getElementById('logo');
var ctr = document.getElementById('interact');
var backgroundFim = document.getElementById('backgroundFim');
var poster = document.getElementById('poster');
var btFim1 = document.getElementById('btFim1');
var btFim0 = document.getElementById('btFim0');
var textoFim = document.getElementById('txtFim');
var interactDispatched = false;
var st;

function info(info)
{
	setClass(val, "show");
	var args = Array.prototype.slice.call(arguments); 
	val.innerHTML = args[0]=="CLEAR"?"":val.innerHTML;
	for(var i=(args[0]=="CLEAR"?1:0); i<args.length; i++)
	{
		val.innerHTML += ((args[i] && args[i].name)?args[i].name:args[i]) + (i==args.length-1?"":" | ");
	}
	val.innerHTML += "<br>"
}

function setClass(obj, name, delay) 
{
	delay = delay?delay:0;
	//if(st) clearTimeout(st);
	st = setTimeout(function(){
		obj.className = name;
	}, delay*1000)
}

function loadVideoBefore(video)
{
	interactDispatched = true;
	video.play();
	setTimeout(function() {
		if(video.currentTime>1) video.currentTime=0;
		video.pause();
	}, 100);
}

function goURL(event)
{
	window.location.href = "http://wella.com.br"
}

function restart(event)
{
	setClass(backgroundFim, "animated alphaOut");
	setClass(btFim1, "animated bounceOut");
	setClass(btFim0, "animated bounceOut");
	setClass(textoFim, "animated alphaOut");
	//--
	setClass(backgroundFim, "hide", 1);
	setClass(btFim1, "hide", 1);
	setClass(btFim0, "hide", 1);
	setClass(textoFim, "hide", 1);
	//--
	btFim0.removeEventListener("click", goURL);
	btFim1.removeEventListener("click", restart);
	//--
	createListenerAgain();
}

function secStepInteract(event)
{
	//info(secStepInteract, event);
	point.i = event.pageX;
	
	if(local) ctr.removeEventListener('click', secStepInteract, false);
	ctr.removeEventListener('touchstart', secStepInteract, false);
	
	if(local) ctr.addEventListener('mousemove', initMoveInteract, false);
	ctr.addEventListener('touchmove', initMoveInteract, false);
}

function createListenerAgain()
{
	//info(createListenerAgain, textoVez);
	texto = arrTexto[textoVez]
	setClass(texto, "animated bounceIn", .5);
	
	if(local) ctr.addEventListener('click', secStepInteract, false);
	ctr.addEventListener('touchstart', secStepInteract, false);

	//if(local) logo.addEventListener('click', initDeviceMove, false);
	//window.addEventListener('deviceorientation', initDeviceMove, false);
}

function fechaVideo()
{
	//info(fechaVideo, textoVez);
	if(local) ctr.removeEventListener('click', notReturn, false);
	ctr.removeEventListener('touchstart', notReturn, false);
	
	vid.removeEventListener("timeupdate", onVideoUpdate, false);
	vid.pause();
	vid.passou0 =  false;
	vid.passou1 =  false;
	vid.currentTime = 0;
	point = {f:null, i:null};
	setClass(vid, "hide");
	if(textoVez==3) {
		textoVez = 1;
		setClass(backgroundFim, "animated alphaIn");
		setClass(btFim1, "animated bounceIn", .5);
		setClass(btFim0, "animated bounceIn", .7);
		setClass(textoFim, "animated alphaIn", 1);
		btFim0.addEventListener("click", goURL);
		btFim1.addEventListener("click", restart);
	} else {
		//info(fechaVideo, textoVez);
		createListenerAgain();
	}
}

function onVideoUpdate(event)
{
	if (vid.currentTime >= vid.duration-0.8 && !vid.passou1) {
		notReturnGo(event);
	}
}

function onCanplay(event)
{
	vid.currentTime = 0;
	vid.removeEventListener('canplay', onCanplay, false);
}

function notReturnGo(event)
{
	if(st) clearTimeout(st);
	vid.passou1 =  true;
	vid.passou0 =  true;
	textoVez++;
	setClass(poster, "animated alphaIn");
	setTimeout(fechaVideo, 200);
	if(local) ctr.removeEventListener('click', notReturnGo, false);
	ctr.removeEventListener('touchstart', notReturnGo, false);
	notReturn(event);
}

function notReturn(event)
{
	event.stopPropagation();
	event.preventDefault();
}

function playVideo(video)
{
	//info(playVideo, textoVez);
	setClass(poster, "animated alphaOut");

	if(local) ctr.removeEventListener('mousemove', initMoveInteract, false);
	ctr.removeEventListener('touchmove', initMoveInteract, false);
	
	if(local) ctr.addEventListener('click', notReturn, false);
	ctr.addEventListener('touchstart', notReturn, false);
	st = setTimeout(function() { 
		if(local) ctr.removeEventListener('click', notReturn, false);
		ctr.removeEventListener('touchstart', notReturn, false);
		if(local) ctr.addEventListener('click', notReturnGo, false);
		ctr.addEventListener('touchstart', notReturnGo, false);
	}, 3000);
	
	//if(local) logo.removeEventListener('click', initDeviceMove, false);
	//window.removeEventListener('deviceorientation', initDeviceMove, false);
	
	vid = video;
	//vid.addEventListener('progress', onCanplay, false);
	if(vid && vid.currentTime>1) vid.currentTime = 0;
	setClass(vid, "show");
	vid.addEventListener("timeupdate", onVideoUpdate, false);
	vid.play();
	
	setClass(texto, "animated bounceOut", .5);
}

function initMoveInteract(event)
{
	//info(initMoveInteract, event);
	point.f = event.pageX;
	if( event.pageX > Number(ctr.offsetLeft) + Number(200) && event.pageX < Number(ctr.offsetLeft) + Number(568) && event.pageY > 250 && event.pageY < 800 ) {
		var videoID = null;
		if(point.f && point.i) {
			if(point.f < point.i-10 && !inPlay) {
				videoID = arrVid[1];
			} 
			if(point.f > point.i+10 && !inPlay) {
				videoID = arrVid[0];
			}
		}
		if(videoID) {
			//info("CLEAR", initMoveInteract, point.i, point.f, videoID.id, textoVez)
			if(
				(videoID.id=="vidD" && textoVez == 1)||
				(videoID.id=="vidE" && textoVez == 2)
			) {
				//info(initMoveInteract, videoID.id);
				playVideo(videoID);
			}
		}
	}
	event.stopPropagation();
	event.preventDefault();
}

function initDeviceMove(event)
{
	//info("CLEAR", initDeviceMove, event, event.gamma);
	return;
	if(event.type=="click") {
		steps = 2;
	} else {
		if(event.gamma<-30 && steps==0) steps++;
		if(event.gamma>30 && steps==1) steps++;
	}
	if(steps>=2)
	{
		steps = 0;
		playVideo(arrVid[0]);
	}
}

function savePointi(event)
{
	//info("CLEAR", savePointi, event);
	//point.i = event.pageX;
}

function initStepInteract(event)
{
	//info(initStepInteract);
	
	if(st) clearTimeout(st);
	
	point.i = event.pageX;
	
	setClass(arrTexto[0],"animated bounceOut");
	setClass(arrTexto[1],"animated bounceIn", .5);
	//if(!interactDispatched) loadVideoBefore(arrVid[0]);
	
	texto = arrTexto[textoVez];
	
	if(local) ctr.removeEventListener('click', initStepInteract, false);
	ctr.removeEventListener('touchstart', initStepInteract, false);
	
	//if(local) ctr.addEventListener('click', savePointi, false);
	//ctr.addEventListener('touchstart', savePointi, false);
	
	if(local) ctr.addEventListener('mousemove', initMoveInteract, false);
	ctr.addEventListener('touchmove', initMoveInteract, false);

	//if(local) logo.addEventListener('click', initDeviceMove, false);
	//window.addEventListener('deviceorientation', initDeviceMove, false);	
}

function createButtonInit()
{
	//info(createButtonInit);
	
	if(local) ctr.removeEventListener('click', notReturn, false);
	ctr.removeEventListener('touchstart', notReturn, false);
	
	if(local) ctr.addEventListener('click', initStepInteract, false);
	ctr.addEventListener('touchstart', initStepInteract, false);
}

function initGame()
{
	texto = arrTexto[textoVez];
	//info(initGame, texto);
	setClass(logo, "animated getIn", 1.3);
	setClass(texto,"animated bounceIn", 1.5);
	setClass(background, "animated alphaIn", 1);
	setClass(poster, "animated alphaIn");
	textoVez++;
	if(local) ctr.addEventListener('click', notReturn, false);
	ctr.addEventListener('touchstart', notReturn, false);
	
	setTimeout(createButtonInit, 2000);
}

function onloadEvent(event)
{
	//info(event.type);
	local = String(window.location).indexOf("file:///Volumes")>-1 || String(window.location).indexOf("file:///C:")>-1;
	if(window.innerWidth==768 || local) {
		initGame();
	}
}
//info("--");
