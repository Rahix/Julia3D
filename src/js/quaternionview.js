// View for quaternion julia set

function QuaternionView()
{
	this.juliaInitialized = false;
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera( 75, (window.innerWidth-50)/(window.innerHeight-50), 0.1, 10000 );
	this.camera.position.set(500, 0, 500);
	this.camera.lookAt(new THREE.Vector3(5,0,5));
	this.camera.updateProjectionMatrix();

	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize( (window.innerWidth-50), (window.innerHeight-50) );
	document.body.appendChild( this.renderer.domElement );

	this.initJulia = function(quaternionSet)
	{
		this.quaternionSet = quaternionSet;
		this.scene = new THREE.Scene();
		var geometry = this.calculateGeometry();
		var material = new THREE.PointCloudMaterial({
			size: 2,
			vertexColors: THREE.VertexColors
		});
		var juliaCloud = new THREE.PointCloud(geometry, material);
		this.scene.add(juliaCloud);
		this.juliaInitialized = true;
	};

	this.calculateGeometry = function()
	{
		var x,y,z,result,k;
		var geometry = new THREE.BufferGeometry();
		var numPoints = 100000;
		var positions = new Float32Array(numPoints * 3);
		var colors = new Float32Array(numPoints * 3);
		k=0;
		for(var i=0;i<numPoints;i++)
		{
			// Calculate random numbers for julia set
			x = Math.random() * 10;
			y = Math.random() * 10;
			z = Math.random() * 10;
			// Calculate result
			result = this.quaternionSet.calculateValue(x,y,z);
			if(result !== 2)
				alert("Result is " + result);
			// If not drawn rerun
			if(result < 10 || result > 12)
			{
				//i--;
				//continue;
			}
			// Add point to Scene
			positions[3*k] = result;
			positions[3*k+1] = result;
			positions[3*k+2] = result;
			/*switch(result)
			{
				case 10:
					colors[3*k] = 255;
					colors[3*k+1] = 0;
					colors[3*k+2] = 0;
					break;
				case 11:
					colors[3*k] = 0;
					colors[3*k+1] = 255;
					colors[3*k+2] = 0;
					break;
				case 12:
					colors[3*k] = 0;
					colors[3*k+1] = 0;
					colors[3*k+2] = 255;
					break;
			}*/
			colors[3*k] = result;
			colors[3*k+1] = result;
			colors[3*k+2] = result;
			k++;
		}
		geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
		geometry.addAttribute("color", new THREE.BufferAttribute(colors, 3));
		geometry.computeBoundingBox();

		return geometry;
	};

	this.render = function()
	{
		//requestAnimationFrame(this.render);
		this.renderer.render(this.scene, this.camera);
	};
}
