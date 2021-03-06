define(function(){
    'use strict';

    var camTarget = new THREE.Vector3(0, 100, 0);

    function windowSize(){
        return {
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        };
    }

    function renderer(){
        var glRenderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        
        glRenderer.setClearColor(0xeeeeee, 1);

        return glRenderer;
    }

    function camera(){
        var wSize = windowSize();
        var cam = new THREE.PerspectiveCamera(40, wSize.width / wSize.height, 1, 20000);
        
        cam.position.set(0, 100, -1000);
        cam.lookAt(camTarget);

        return cam;
    }

    function lighting(){
        var group = new THREE.Group();
        var ambient = new THREE.AmbientLight(0xaaaaaa, 1);

        group.add(ambient);

        return group;
    }

    function rotateCamera(cam, ticks){
        var cameraDistance = 450;
        cam.position.x = Math.PI - Math.sin(ticks * 0.01) * cameraDistance;
        cam.position.y = (Math.cos(ticks * 0.01) * cameraDistance) / 2;
        cam.position.y += cameraDistance * 2/3;
        cam.position.z = Math.PI - Math.cos(ticks * 0.01) * cameraDistance;

        cam.lookAt(camTarget);
    }

    function Sandbox(){
        this.scene = new THREE.Scene();
        this.renderer = renderer();
        this.camera = camera();
        this.scene.add(lighting());

        this.resize();
        this.animate();
    }

    Sandbox.prototype.resize = function resize(){
        var wSize = windowSize();
        this.renderer.setSize(wSize.width, wSize.height);
        this.camera.aspect = wSize.width / wSize.height;
        this.camera.updateProjectionMatrix();
    };

    Sandbox.prototype.animate = function(){
        var cam = this.camera;
        var numTicks = 0;

        function tick(){
            requestAnimationFrame(tick);
            rotateCamera(cam, numTicks++);
        }
        tick();
    };

    Sandbox.prototype.appendTo = function appendTo(node){
        node.appendChild(this.renderer.domElement);
    };

    Sandbox.prototype.render = function render(){
        this.renderer.render(this.scene, this.camera);
    };

    Sandbox.prototype.add = function add(threeObject){
        this.scene.add(threeObject);
    };

    return Sandbox;

});
