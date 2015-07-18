// Main file for Julia3D

function go()
{
	var k1 = document.getElementById("k1").value || 0.0;
	var k2 = document.getElementById("k2").value || 0.0;
	var nMax = document.getElementById("n").value || 0;
	var juliaSet = new JuliaSet(k1, k2, nMax);
	var view = new WebGlView(juliaSet);
}
