// Webgl code needed for visualization

function WebGlView(juliaSet)
{
	// Constants
	this.dataSize = 100;
	// Attributes
	this.juliaSet = juliaSet;
	this.data = Array(this.dataSize);
	for(var i;i<this.dataSize;i++)
	{
		data[i] = Array(this.dataSize);
		for(var t;t<this.dataSize;t++)
		{
			data[i][t] = this.juliaSet.calculateValue(i/(this.dataSize || 0.0),t/(this.dataSize || 0.0));
		}
	}
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( this.renderer.domElement );
}
