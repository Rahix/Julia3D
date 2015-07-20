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
		//if(n>1)
			//alert(n);
		// Calculate abs
		return zReal*zReal+zComplex*zComplex;
	};
}

function getABS(q0, q1, q2, q3)
{
	return Math.sqrt(q0*q0+q1*q1+q2*q2+q3*q3);
}

function JuliaQuaternion(k0, k1, k2, k3, max)
{
	this.k0 = k0;
	this.k1 = k1;
	this.k2 = k2;
	this.k3 = k3;
	this.max = 100000000000000000;
	
	this.calculateValue = function(x, y, z)
	{
		var q0, q1, q2, q3, n;
		q0 = x;
		q1 = y;
		q2 = z;
		q3 = 0;
		//alert("Start: " + getABS(q0, q1, q2, q3));
		for(n=0; (getABS(q0, q1, q2, q3) < this.max) && (n <= 150);n++)
		{
			var p0 , p1, p2, p3;
			p0 = (q0*q0-q1*q1-q2*q2-q3*q3)+this.k0;
			p1 = 2*q0*q1+this.k1;
			p2 = 2*q0*q2+this.k2;
			p3 = 2*q0*q3+this.k3;
			q0 = p0;
			q1 = p1;
			q2 = p2;
			q3 = p3;
			//alert("n:" + n + "abs: " + getABS(q0, q1, q2, q3));
		}
		if(n!=2)
		alert("End: n: " + n + "abs: " + getABS(q0, q1, q2, q3));
		return n;
	};

}
