// julia.js A class for julia sets

function JuliaSet(k1, k2, n_max)
{
	this.nMax = n_max || 0;
	this.k1 = k1 || 0.0;
	this.k2 = k2 || 0.0;
	
	this.calculateValue = function(x,y)
	{
		var zReal, zComplex;
		zReal = x || 0.0;
		zComplex = y || 0.0;
		for(var n=0;n<this.n_max;n++)
		{
			// z = k1 * z^2 + k2
			var zRealTemp = k1 * (zReal*zReal-zComplex*zComplex) + k2;
			zComplex = k1 * (2*zReal*zComplex);
			zReal = zRealTemp;
		}
		// Calculate abs
		return zReal*zReal+zComplex*zComplex;
	};
}
