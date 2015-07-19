// Webgl code needed for visualization

function WebGlView()
{
	this.juliaInitialized = false;
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	this.camera.position.x = 100;
	this.camera.position.z = 0;
	this.camera.position.y = 50;
	this.camera.lookAt(new THREE.Vector3(50,20,50));
	this.camera.updateProjectionMatrix();

	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( this.renderer.domElement );
	
	this.initJulia = function(juliaSet, size)
	{
		this.dataSize = size || 0;
		this.juliaSet = juliaSet;
		this.data = Array(this.dataSize);
		var i=0;
		var t=0;
		// Calculate data
		for(i=0;i<this.dataSize;i++)
		{
			this.data[i] = Array(this.dataSize);
			for(t=0;t<this.dataSize;t++)
			{
				this.data[i][t] = this.juliaSet.calculateValue(
					i/(this.dataSize || 0.0)*2.5-1.25,
					t/(this.dataSize || 0.0)*2.5-1.25
					);
				if(this.data[i][t] > 0.6)
					this.data[i][t] = 0.6;
			}
		}
		// Calculate geometry
		var geometry = new THREE.Geometry();
		// Verts
		for(i=0;i<this.dataSize;i++)
		{
			for(t=0;t<this.dataSize;t++)
			{
				geometry.vertices.push(
					new THREE.Vector3(i,this.data[i][t]*20,t)
				);
			}
		}
		// Faces
		for(i=0;i<(this.dataSize-1);i++)
		{
			for(t=0;t<(this.dataSize-1);t++)
			{
				geometry.faces.push(
					new THREE.Face3(i+t*this.dataSize,
									i+1+t*this.dataSize,
									i+(t+1)*this.dataSize),
					new THREE.Face3(i+1+t*this.dataSize,
									i+1+(t+1)*this.dataSize,
									i+(t+1)*this.dataSize)
				);
			}
		}
		geometry.computeBoundingSphere();
		//geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		// Material
		var material = new THREE.MeshPhongMaterial({
			color: 0x11ee11,
			wireframe: false,
			side: THREE.DoubleSide
		});
		
		// Object
		this.juliaSurface = new THREE.Mesh(geometry, material);
		this.juliaSurface.overdraw = true;
		// Add object to scene
		this.scene.add( this.juliaSurface);
		//Light
		//Ambient
		var ambientLight = new THREE.AmbientLight(0x222222);
		this.scene.add(ambientLight);
		//Directional Light
		//var directionalLight = new THREE.DirectionalLight(0xffffff);
		//directionalLight.position.set(0, 1, 0).normalize();
		//this.scene.add(directionalLight);
		var light = new THREE.PointLight(0xffffff, 1, 80);
		light.position.set(50, 50, 50);
		this.scene.add(light);
		this.juliaInitialized = true;
	};

	this.render = function()
	{
		//requestAnimationFrame(this.render);
		this.renderer.render( this.scene, this.camera);
	};
}
