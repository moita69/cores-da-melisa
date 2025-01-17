//import { objTouch } from './Objeto.js';
	//secao utilidade publica....
    //object Objeto - START
	var objetoTouchMethod = {};

	objetoTouchMethod.updateDirVel = function()//movimento de formiguinhas.
	{
	    this.direcaoGraus =  (Math.atan2((-this.posInicialY+this.y),(-this.posInicialX+this.x)))*(180/Math.PI);
	    this.velocidade =  (Math.sqrt((this.x-this.posInicialX)*(this.x-this.posInicialX) +(this.y-this.posInicialY)*(this.y-this.posInicialY)))/((Date.now() - this.touchStartTime)/1000);
	};

	var objTouch =  () =>
	{
        var results = {};
        
		results.naTela = false;
		results.x = 0;
	    results.y = 0;
	    results.h = 5;
	    results.w = 5;
	    results.velocidade = 0.0;
	    results.direcaoGraus = 0.0;
	    results.touchStartTime=0.0;
	    results.posInicialX = -50;
	    results.posInicialY = -50;
	    results.previousTouchTime = 0.0;
	    results.posAnteriorX = -50;
	    results.posAnteriorY = -50;

	    results.updateDirVel = objetoTouchMethod.updateDirVel;
	    return results;
    }
    
    // const objTouch = 
	// {
	// 	naTela : false,
	// 	x : 0,
	//     y : 0,
	//     h : 5,
	//     w : 5,
	//     velocidade : 0.0,
	//     direcaoGraus : 0.0,
	//     touchStartTime:0.0,
	//     posInicialX : -50,
	//     posInicialY : -50,
	//     previousTouchTime : 0.0,
	//     posAnteriorX : -50,
	//     posAnteriorY : -50,

	//     updateDirVel : () => {
    //         direcaoGraus =  (Math.atan2((-posInicialY+y),(-posInicialX+x)))*(180/Math.PI);
    //         velocidade =  (Math.sqrt((x-posInicialX)*(x-posInicialX) +(y-posInicialY)*(y-posInicialY)))/((Date.now() - touchStartTime)/1000);
    //     },
    // };
    //object Objeto - END



    //needed by render
	function tocouObj(listaObjs,objetoTouch)//da forma que esta o unico objeto retornado eh o ultimo que for desenhado
    {    // isso implica em passar uma listaObjs ordenada por ordem de desenho sendo que o ultimo desenhado eh o ultimo da lista.
		offset=0//serve para prover um gap
		var listaColisoes = [];
		var conf = false;
		var j = objetoTouch;
		//var listaPula = [];
    	for (i in listaObjs)
    	{
    	    if (listaObjs[i].x < j.x + j.w &&
            listaObjs[i].x + listaObjs[i].w > j.x &&
            listaObjs[i].y < j.y + j.h &&
            listaObjs[i].h + listaObjs[i].y > j.y)
            {
    	        listaColisoes = [listaObjs[i],j];
    	        conf = true;
    	    }
        }
        return [conf,listaColisoes]
    }

    //import {objTouch} from './Objeto.js';
	//var global	//var global	//var global	//var global	//var global	//var global	//var global
	var dedo =   objTouch();
	//var dedo =   new objTouch();
	var touchX = 0;
	var touchY = 0;
	var mouseX,mouseY,mouseDown=0;
    var colisaoResult = [];
    var firstRender = Date.now();
    var presentTime = Date.now();
    var lastRender = Date.now();
    var delta = 0;
    var listaDeObjs = [];
    var listaDeCirculos = [];
    var colisaoTelaResult=[];
	//var global	//var global	//var global	//var global	//var global	//var global	//var global


	//////algorithmo de achar objs em listas INICIO
    var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
    };//http://stackoverflow.com/questions/7378228/check-if-an-element-is-present-in-an-array    - resposta no meio

	//////algorithmo de achar objs em listas FIM

//obj explosao
var objetoExplosao = function (alcanceRaio,intencidade){

    var results = {};
    results.x
    results.y
    results.alcanceRaio = alcanceRaio;
    results.intencidade = intencidade;
    return results;
};
var chakaBum = objetoExplosao(50,30);



//objeto forca para gravidade e afins. INICIO/////////////////
var objetoForca = function (direcao,intencidade){

    var results = {};
    results.direcaoGraus = direcao;
    results.intencidade = intencidade;
    return results;
};


var grav = objetoForca(280,10);
//objeto forca para gravidade e afins. FIM////////////////////

function updateForcaG()
{
    grav.direcaoGraus = parseFloat(document.getElementById('gravDirectionInput').value);
    grav.intencidade = parseFloat(document.getElementById('gravForceInput').value);
}

//#####################################################CIRCULO!!!!!!!INICIO

var objetoCirculoMethod = {};
var imgsCarregadasCirculo = false;
objetoCirculoMethod.caminho = 'nada';
//alert(objetoRetMethod.caminho);
objetoCirculoMethod.carregaImg = function(context1,img)
{
    //img = new Image();
    this.img.onload = function(img){
    // qualquer acao depois de carregar img 100%
    //context1.drawImage(img,this.x,this.y,this.w,this.h);
    imgsCarregadasCirculo = true;
    };
    this.img.src = this.figura;
    //alert(this.figura);
};


objetoCirculoMethod.move = function(delta)//movimento de formiguinhas.
{
    //this.x =  this.x + ((this.velocidade*Math.cos(this.direcaoGraus*(Math.PI/180)))*(delta/1000));
    //this.y =  this.y + ((this.velocidade*Math.sin(-this.direcaoGraus*(Math.PI/180)))*(delta/1000));
    this.prevFrameX = this.x;
    this.prevFrameY = this.y;
    var vecX = this.velocidade*Math.cos(this.direcaoGraus*(Math.PI/180));
    var vecY = this.velocidade*Math.sin(this.direcaoGraus*(Math.PI/180));
    var gravVecX = grav.intencidade*Math.cos(grav.direcaoGraus*(Math.PI/180));
    var gravVecY = grav.intencidade*Math.sin(grav.direcaoGraus*(Math.PI/180));
    var resultVecX = vecX+gravVecX;
    var resultVecY = vecY+gravVecY;
    var resultDirecao = (Math.atan2(resultVecY,resultVecX))*(180/Math.PI);
    var resultVelocidade = (Math.sqrt((resultVecX*resultVecX) +(resultVecY*resultVecY)));
    this.velocidade = resultVelocidade;
    this.direcaoGraus = resultDirecao;

    this.x =  this.x + ((resultVelocidade*Math.cos(resultDirecao*(Math.PI/180)))*(delta/1000));
    this.y =  this.y + ((resultVelocidade*Math.sin(-resultDirecao*(Math.PI/180)))*(delta/1000));
    this.cx = this.x + this.r;
    this.cy = this.y + this.r;
};

var objetoCirculo = function (r,figura){

    var results = {};
    results.img = new Image();
    results.x = -50.0;
    results.y = -50.0;
    results.r = parseFloat(r);
    results.h = parseFloat(2*r);
    results.w = parseFloat(2*r);
    results.cx = parseFloat(results.x+r);
    results.cy = parseFloat(results.y+r);
    results.velocidade = 1.0;
    results.direcaoGraus = 0.0;
    results.posInicialX = -50.0;
    results.posInicialY = -50.0;
    results.peso = 0.001;
    results.figura = figura;//'file:///C:/Repositorios/TowerDefenseCanvasClassic/indv.png';
    results.carregaImg = objetoCirculoMethod.carregaImg;
    results.move = objetoCirculoMethod.move;
    results.txtLivre = '';

    results.prevFrameX = -50.0;
    results.prevFrameY = -50.0;

    return results;
};
//#####################################################CIRCULO!!!!!!!FIM






    //Inicio objeto retangular..
    var imgsCarregadasRet = false;
    var objetoRetMethod = {};
    objetoRetMethod.caminho = 'nada';
    //alert(objetoRetMethod.caminho);
    objetoRetMethod.carregaImg = function(context1,img)
    {
    //img = new Image();
        this.img.onload = function(img){
        // qualquer acao depois de carregar img 100%
        //context1.drawImage(img,this.x,this.y,this.w,this.h);
        imgsCarregadasRet = true;
        };
        this.img.src = this.figura;
        //alert(this.figura);
	};

  var max = -1;
	objetoRetMethod.move = function(delta)//movimento de formiguinhas.
	{
        //fazendo gravidade para ver como fica...INICIO

        var vecX = this.velocidade*Math.cos(this.direcaoGraus*(Math.PI/180));
        var vecY = this.velocidade*Math.sin(this.direcaoGraus*(Math.PI/180));
        var gravVecX = grav.intencidade*Math.cos(grav.direcaoGraus*(Math.PI/180));
        var gravVecY = grav.intencidade*Math.sin(grav.direcaoGraus*(Math.PI/180));
        var resultVecX = vecX+gravVecX;
        var resultVecY = vecY+gravVecY;
        var resultDirecao = (Math.atan2(resultVecY,resultVecX))*(180/Math.PI);
        var resultVelocidade = (Math.sqrt((resultVecX*resultVecX) +(resultVecY*resultVecY)));
        this.velocidade = resultVelocidade;
        this.direcaoGraus = resultDirecao;
        if (max > 0)
        {
          console.log("velocidade: "+this.velocidade);
          console.log("direcaoGraus: "+this.direcaoGraus);
          console.log("intencidade: "+grav.intencidade);
          console.log("GRAV direcaoGraus: "+grav.direcaoGraus);
          console.log("vecY: "+vecY);
          console.log("gravVecX: "+gravVecX);
          console.log("gravVecY: "+gravVecY);
          console.log("resultVecX: "+resultVecX);
          console.log("resultVecY: "+resultVecY);
          console.log("resultDirecao: "+resultDirecao);
          console.log("resultVelocidade: "+resultVelocidade);
          console.log("nda");
          max = max -1;
        }

        this.x =  this.x + ((resultVelocidade*Math.cos(resultDirecao*(Math.PI/180)))*(delta/1000));
        this.y =  this.y + ((resultVelocidade*Math.sin(-resultDirecao*(Math.PI/180)))*(delta/1000));
        this.cx = this.x + this.w/2;
        this.cy = this.y + this.h/2;

        //fazendo gravidade para ver como fica...Fim

        //TODO Travar velocidades abaixo de 0.67 para 0

        //this.x =  this.x + ((resultVelocidade*Math.cos(-resultDirecao*(Math.PI/180)))*(delta/1000));
        //this.y =  this.y + ((resultVelocidade*Math.sin(resultDirecao*(Math.PI/180)))*(delta/1000));
	};

	var objetoRet = function (w,h,figura){

	    var results = {};
	    results.img = new Image();
	    results.x = -50;
	    results.y = -50;
	    results.w = w;
	    results.h = h;
        results.cx = -50//this.x+(w/2);
        results.cy = -50//this.y+(h/2);
	    results.velocidade = 1.0;
	    results.direcaoGraus = 0.0;
	    results.posInicialX = -50;
	    results.posInicialY = -50;
	    results.peso = 0.001;
	    results.figura = figura;//'file:///C:/Repositorios/TowerDefenseCanvasClassic/indv.png';
	    results.carregaImg = objetoRetMethod.carregaImg;
	    results.move = objetoRetMethod.move;
	    results.txtLivre = '';
	    return results;


	//Fim objeto retangular..

	};



    function reflexaoCirculos (circA,circB)//pode ficar cada vez menos fiel o quao rapido estiver se movendo
    {
        vetNovo = [circA.cx-circB.cx , circA.cy-circB.cy];//novo ou linha entre os dois objetos

        anguloNovo = ((Math.atan2(vetNovo[1],vetNovo[0]))+Math.PI/2)*(180/Math.PI);//vetor normal u mais ou menos isso
        vetNormal = [-vetNovo[1],vetNovo[0]];
        angReflexA = (-(circA.direcaoGraus - anguloNovo)+180)%360;
        angReflexB = (-(circB.direcaoGraus - anguloNovo)+180)%360;

        return [angReflexA,angReflexB];
    }




    function colisaoSimplesRetangulo(listaObjs)
    {
		offset=0//serve para prover um gap
		var listaColisoes = [];
		var conf = false;
		var listaPula = [];
    	for (i in listaObjs)
    	{
    	    for (j in listaObjs)
    	    {
    	        if(i==j){continue}
    	        if(contains.call(listaPula,''+j+''+i)){continue;}//colisao triangulo
    	        if (listaObjs[i].x < listaObjs[j].x + listaObjs[j].w)
                {
                    if (listaObjs[i].x + listaObjs[i].w > listaObjs[j].x)
                    {
                        if (listaObjs[i].y < listaObjs[j].y + listaObjs[j].h)
                        {
                            if (listaObjs[i].h + listaObjs[i].y > listaObjs[j].y)
                            {
                                listaColisoes.push([listaObjs[i],listaObjs[j]]);
                                conf = true;
                                listaPula.push(''+i+''+j);

                            }
                        }
                    }
                }
            }
        }
        return [conf,listaColisoes]
    }

    function colisaoSimplesCirculo(listaObjs)
    {

		var listaColisoes = [];
        var novaDirecao = [];
		var conf = false;
		var listaPula = [];
    	for (i in listaObjs)
    	{
    	    for (j in listaObjs)
    	    {
    	        if(i==j){continue;}
    	        if(contains.call(listaPula,''+j+''+i)){continue;}

                var tam1 = parseFloat((listaObjs[j].cx-listaObjs[i].cx)*(listaObjs[j].cx-listaObjs[i].cx) + (listaObjs[j].cy-listaObjs[i].cy)*(listaObjs[j].cy-listaObjs[i].cy));
                var dist1 = parseFloat((listaObjs[j].r+listaObjs[i].r)*(listaObjs[j].r+listaObjs[i].r));

    	        if ( tam1 <= dist1 )
                {
                    //alert(tam1+" "+dist1);
                    //alert(Math.sqrt(tam1)+" "+Math.sqrt(dist1));
    	            listaColisoes.push([listaObjs[i],listaObjs[j]]);
                    //novas direcoes
                    var res = reflexaoCirculos(listaObjs[i],listaObjs[j]);
                    listaObjs[i].direcaoGraus = res[0];
                    listaObjs[j].direcaoGraus = res[1];
                    listaObjs[i].x = listaObjs[i].prevFrameX;
                    listaObjs[i].y = listaObjs[i].prevFrameY;
                    listaObjs[j].x = listaObjs[j].prevFrameX;
                    listaObjs[j].y = listaObjs[j].prevFrameY;
    	            listaPula.push(''+i+''+j);
                    conf = true;
                    //alert("alabama 4"+res);
    	        }
            }
        }
        return [conf,listaColisoes]
    }

	function colisaoSimplesTela(listaObjs,telaW,telaH)
    {
		offset=0//serve para prover um gap
		var listaColisoes = [];
		var listaEixo = [];
		var conf = false;
		//var listaPula = [];
		for (i in listaObjs)
		{
			//if(i==j){continue}
			//if(contains.call(listaPula,''+i)){continue;}//colisao triangulo
			if (listaObjs[i].x + listaObjs[i].w > telaW)
			{
				listaColisoes.push(listaObjs[i]);
				listaEixo.push('xr');
				conf = true;
				continue;
			}
			if (listaObjs[i].x < 0)
			{
				listaColisoes.push(listaObjs[i]);
				listaEixo.push('xl');
				conf = true;
				continue;
			}
			if (listaObjs[i].y + listaObjs[i].h > telaH)
			{
				listaColisoes.push(listaObjs[i]);
				listaEixo.push('yd');
				conf = true;
				continue;
			}
			if (listaObjs[i].y < 0)
			{
				listaColisoes.push(listaObjs[i]);
				listaEixo.push('yu');
				conf = true;
				continue;
			}//listaPula.push(''+i);
		}
        return [conf,listaColisoes,listaEixo]
    }

	function arredondaInt(somenum){
	    //aseguir tecnica rapida com bitwise para transformar em num int
        // With a bitwise or.
        rounded = (0.5 + somenum) | 0;
        // A double bitwise not.
        rounded = ~~ (0.5 + somenum);
        // Finally, a left bitwise shift.
        rounded = (0.5 + somenum) << 0;
        return rounded;
        //acima tecnica rapida com bitwise para transformar em num int
	}

	 // Keep track of the mouse button being pressed and draw a dot at current location
    function sketchpad_mouseDown() {
        mouseDown=1;
		    aleatorioPressMouse = Math.ceil(Math.random()*6)-1;
        //drawDot(context,mouseX,mouseY,12);
        //var Azul = objetoRet(30,30,nomePng[aleatorioPressMouse]);
        var circ1 = objetoCirculo(15,"src/circulo.png");
        //Azul.direcaoGraus = 91;
        //Azul.x = mouseX;
  	    //Azul.y = mouseY;
        circ1.x = mouseX;
        circ1.y = mouseY;
        //Azul.carregaImg(context);
        circ1.carregaImg(context);
        //listaDeObjs.push(Azul);
        listaDeObjs.push(circ1);
        listaDeCirculos.push(circ1);
        totalObjs = totalObjs+1;
        totalCirculos = totalCirculos+1;
        if (totalObjs > maxObjs || totalCirculos > maxObjs)
        {
  			    listaDeObjs.shift();//remove o primeiro elemento
                listaDeCirculos.shift();
  			    totalObjs = totalObjs-1;
                totalCirculos = totalCirculos-1;
  		}
        //alert(" m "+ circ1);
    }

	var nomePng = ['src/Azul.png','src/Amarelo.png','src/Vermelho.png','src/Verde.png', 'src/Roxo.png','src/Laranja.png'];
	var aleatorioPressMouse = 0;
    // Keep track of the mouse button being released
    function sketchpad_mouseUp() {
        mouseDown=0;
    }

    // Keep track of the mouse position and draw a dot if mouse button is currently pressed
    function canvasMouseMove(e) {
        // Update the mouse co-ordinates when moved
        getMousePos(e);

      //var Azul = objetoRet(30,30,nomePng[aleatorioPressMouse]);
      //Azul.direcaoGraus = 360*Math.random();
	    //Azul.x = mouseX;
	    //Azul.y = mouseY;
	    //Azul.posInicialX = touchX;
	    //Azul.posInicialY = touchY;
	    //Azul.carregaImg(context);

	    //listaDeObjs.push(Azul);
      //  totalObjs = totalObjs+1;
      //  if (totalObjs > maxObjs)
      //  {
			//listaDeObjs.shift();//remove o primeiro elemento
			//totalObjs = totalObjs-1;
		  //}

    }

    // Get the current mouse position relative to the top-left of the canvas
    function getMousePos(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
     }

	// Draw something when a touch start is detected
    function canvasTouchStart() {
		dedo = objTouch();
        // Update the touch co-ordinates
        getTouchPos();

        //drawDot(ctx,touchX,touchY,12);

        dedo.x=touchX;
        dedo.y=touchY;
        //dedo.updateDirVel();
		dedo.posInicialX = touchX;
		dedo.posInicialY = touchY;
		dedo.posAnteriorX = touchX;
	    dedo.posAnteriorY = touchY;
	    dedo.touchStartTime=Date.now();
	    dedo.previousTouchTime = Date.now();
	    //dedo.updateDirVel();

        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    }

    // Draw something and prevent the default scrolling when touch movement is detected
    function canvasTouchMove(e) {
        // Update the touch co-ordinates
        getTouchPos(e);

        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        //drawDot(ctx,touchX,touchY,12);


	    dedo.x=touchX;
        dedo.y=touchY;
        dedo.updateDirVel();
        dedo.previousTouchTime = Date.now();
	    dedo.posAnteriorX = touchX;
	    dedo.posAnteriorY = touchY;

		var laranja = objetoRet(30,30,'src/Laranja.png');
		laranja.direcaoGraus = 360*Math.random();
	    laranja.x = touchX;
	    laranja.y = touchY;
	    laranja.posInicialX = touchX;
	    laranja.posInicialY = touchY;
	    laranja.carregaImg(context);

	    listaDeObjs.push(laranja);
        totalObjs = totalObjs+1;
        if (totalObjs > maxObjs)
        {
			listaDeObjs.shift();//remove o primeiro elemento
			totalObjs = totalObjs-1;
		}

        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();


	}
	var dirFinal = 0;
	var velFinal = 0;

	function canvasTouchEnd (e) {
        // Update the touch co-ordinates
        getTouchPos(e);

        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        //drawDot(ctx,touchX,touchY,12);



	    dedo.x=touchX;
        dedo.y=touchY;
        dedo.updateDirVel();
        dedo.previousTouchTime = Date.now();
	    dedo.posAnteriorX = touchX;
	    dedo.posAnteriorY = touchY;

	    dirFinal = dedo.direcaoGraus;
	    velFinal = dedo.velocidade;

	    dedo.x=-10;
        dedo.y=-10;
        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
    }

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    function getTouchPos(e) {
        if (!e)
            var e = event;

        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
            }
        }
    }

	var canvas = [];
	var context = [];
	var canvasBg = [];
	var contextBg = [];
	var canvasHUD = [];
	var contextHUD = [];
	var tamanhoCanvasHUDH = 0;
	var tamanhoCanvasHUDW = 0;
	var tamanhoCanvasFgH  = 0;
	var tamanhoCanvasFgW = 0;
	var tamanhoCanvasBgH = 0;
	var tamanhoCanvasBgW = 0;
	var totalObjs = 0;
    var totalCirculos = 0;
	var maxObjs = 20;

	function init ()
	{
		canvas = document.getElementById("canvas");
		if (canvas.getContext){context = canvas.getContext("2d")};

		canvasBg = document.getElementById("canvasbg");
		if (canvas.getContext){contextBg = canvasBg.getContext("2d")};

		canvasHUD = document.getElementById("canvasHUD");
		if (canvas.getContext){contextHUD = canvasBg.getContext("2d")};


		// React to mouse events on the canvas, and mouseup on the entire document
		canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
		canvas.addEventListener('mousemove', canvasMouseMove, false);
		window.addEventListener('mouseup', sketchpad_mouseUp, false);

		// React to touch events on the canvas
		canvas.addEventListener('touchstart', canvasTouchStart, false);
		canvas.addEventListener('touchmove', canvasTouchMove, false);
		canvas.addEventListener("touchend",canvasTouchEnd, false);

		tamanhoCanvasHUDH = contextHUD.canvas.clientHeight;
		tamanhoCanvasHUDW = contextHUD.canvas.clientWidth;

		tamanhoCanvasFgH = context.canvas.clientHeight;
		tamanhoCanvasFgW = context.canvas.clientWidth;

		tamanhoCanvasBgH = contextBg.canvas.clientHeight;
		tamanhoCanvasBgW = contextBg.canvas.clientWidth;

	    //seta bg...
	    var imgbg = new Image();
        imgbg.onload = function(){
        //qualquer acao depois de carregar img 100%
            contextBg.drawImage(imgbg,0,0,tamanhoCanvasBgW,tamanhoCanvasBgH);
        };
        imgbg.src = 'src/Background.png';
        //seta bg fim
        render();
	}

	//secao utilidade publica....





    function render() {
      context.clearRect(0,0,tamanhoCanvasFgW,tamanhoCanvasFgH) //devera limpar o quadro completo, neste caso o foreground.

      presentTime = Date.now() - firstRender;
      delta = Date.now() - lastRender;
      lastRender = Date.now();

      colisaoTelaResult = colisaoSimplesTela(listaDeObjs,tamanhoCanvasFgW,tamanhoCanvasFgH);
      objTocadoResult = tocouObj(listaDeObjs,dedo);
      resultColisaoCirculos = colisaoSimplesCirculo(listaDeObjs);

      if (objTocadoResult[0])//toque dos dedos
      {

		  //alert('touch');
	      //alert(objTocadoResult[1][1].direcaoGraus);
	      //objTocadoResult[1][0].direcaoGraus = dirFinal;
	      //objTocadoResult[1][0].velocidade = velFinal;
	  }
      if (colisaoTelaResult[0])//colisao com tela.
      {

	      for (k in colisaoTelaResult[1])
	      {
			colisaoTelaResult[1][k].posInicialX = colisaoTelaResult[1][k].x
			colisaoTelaResult[1][k].posInicialY = colisaoTelaResult[1][k].y
			if (colisaoTelaResult[2][k] == 'xr' || colisaoTelaResult[2][k] == 'xl')
			{
				colisaoTelaResult[1][k].direcaoGraus = ((-colisaoTelaResult[1][k].direcaoGraus)+180)%360;//-(colisaoTelaResult[1][k].direcaoGraus);//poderi ser +180 ou -180 ou valor+180mod360...
                colisaoTelaResult[1][k].velocidade = colisaoTelaResult[1][k].velocidade - (colisaoTelaResult[1][k].velocidade/2)
			}
			if (colisaoTelaResult[2][k] == 'yu' || colisaoTelaResult[2][k] == 'yd')
			{
				colisaoTelaResult[1][k].direcaoGraus = (-colisaoTelaResult[1][k].direcaoGraus)%360;//-(colisaoTelaResult[1][k].direcaoGraus);//poderi ser +180 ou -180 ou valor+180mod360...
                colisaoTelaResult[1][k].velocidade = colisaoTelaResult[1][k].velocidade - (colisaoTelaResult[1][k].velocidade/2)
			}
			//reseta posicao...
			if (colisaoTelaResult[2][k] == 'xr')
			{
			    colisaoTelaResult[1][k].x = tamanhoCanvasFgW-colisaoTelaResult[1][k].w;
			}
			else if(colisaoTelaResult[2][k] == 'xl')
			{
			    colisaoTelaResult[1][k].x = 0;
			}
			else if (colisaoTelaResult[2][k] == 'yu')
			{
			    colisaoTelaResult[1][k].y = 0;
			}
			else if (colisaoTelaResult[2][k] == 'yd')
			{
			    colisaoTelaResult[1][k].y = tamanhoCanvasFgH-colisaoTelaResult[1][k].h;
			}
            else
            {
                alert("DOOM! " + colisaoTelaResult[2][k]);
            }
			//colisaoTelaResult[1][k].direcaoGraus = ((-colisaoTelaResult[1][k].direcaoGraus)+180)%360;//-(colisaoTelaResult[1][k].direcaoGraus);//poderi ser +180 ou -180 ou valor+180mod360...
			//colisaoTelaResult[1][k].direcaoGraus = (colisaoTelaResult[1][k].direcaoGraus+180)%360;//-(colisaoTelaResult[1][k].direcaoGraus);//poderi ser +180 ou -180 ou valor+180mod360...
		  }
	  }

      i=0;
      while(i<totalObjs)
      {
		listaDeObjs[i].move(delta)

		 //if (imgsCarregadasRet){// && imgsCarregadasCirculo){
         if (imgsCarregadasCirculo){
             context.drawImage(listaDeObjs[i].img,listaDeObjs[i].x,listaDeObjs[i].y,listaDeObjs[i].w,listaDeObjs[i].h);
         }
		 i++;
	  }

      requestAnimationFrame(render);

    }
    //render();




//HTML documents inserctions.
window.onload = init();