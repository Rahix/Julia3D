// julia.js A class for julia sets

function JuliaSet(k1, k2, n_max)
{
	this.nMax = n_max || 0;
	this.k1 = k1 || 0.0;
	this.k2 = k2 || 0.0;
	//alert(this.k1+this.k2);
	//this.nMax = 2000+Math.sqrt(this.k1*this.k1+this.k2*this.k2);
	//this.nMax = this.nMax*this.nMax;
	
	this.calculateValue = function(x,y)
	{
		var zReal, zComplex;
		zReal = x || 0.0;
		zComplex = y || 0.0;
		for(var n=0;/*((zReal*zReal+zComplex*zComplex)<this.nMax)&&*/(n<=this.nMax);n++)
		{
			// z = k1 * z^2 + k2
			//alert("zReal: "+zReal+",zComplex: "+zComplex);
			//alert(zReal*zReal+zComplex*zComplex);
			var zRealTemp = (zReal*zReal-zComplex*zComplex) + this.k1;
			//alert("zRealTemp: "+zRealTemp);
			zComplex = (2*zReal*zComplex) + this.k2;
			zReal = zRealTemp;
			//alert(zReal*zReal+zComplex*zComplex);
		}
		if(n>1)
			//alert(n);
		// Calculate abs
		return zReal*zReal+zComplex*zComplex;
	};
}
