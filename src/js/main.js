// Main file for Julia3D
var view;

function init()
{
	view = new WebGlView();
}

function go()
{
	var k1 = parseFloat(document.getElementById("k1").value);
	var k2 = parseFloat(document.getElementById("k2").value);
	var nMax = parseInt(document.getElementById("n").value);
	var juliaSet = new JuliaSet(k1, k2, nMax);
	view.initJulia(juliaSet, 100);
	view.render();
}
