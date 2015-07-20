// Main file for Julia3D
var view;

function init()
{
	//view = new WebGlView();
	view = new QuaternionView();
}
var k1;
var k2;
var nMax;
var xOff;
var yOff;
var scale;
var juliaSet;
var quaternionSet;
function go()
{
	k1 = parseFloat(document.getElementById("k1").value);
	k2 = parseFloat(document.getElementById("k2").value);
	nMax = parseInt(document.getElementById("n").value);
	xOff = 0.0;
	yOff = 0.0;
	scale = 2.5;
	//juliaSet = new JuliaSet(k1, k2, nMax);
	//view.initJulia(juliaSet, 100, xOff, yOff, scale);
	//view.render();
	quaternionSet = new JuliaQuaternion(-0.72, -0.029, 1.0, 200000000000);
	view.initJulia(quaternionSet);
	view.render();
}

window.onkeyup = function(e)
{
	var key = e.keyCode ? e.keyCode : e.which;

	switch(key)
	{
		case 171: //+
			scale -= 0.1;
			break;
		case 173: //-
			scale += 0.1;
			break;
		case 38: //Up
			xOff -= 0.1;
			break;
		case 40: //Down
			xOff += 0.1;
			break;
		case 37: //Left
			yOff += 0.1;
			break;
		case 39: //Right
			yOff -= 0.1;
			break;
		default:
			return;
	}
	//view.initJulia(juliaSet, 100, xOff, yOff, scale);
	//view.render();
};
