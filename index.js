/**
 * Particles component for A-Frame.
 *
 * ShaderParticleEngine by Squarefeet (https://github.com/squarefeet).
 */

var SPE = require('./lib/SPE.js');

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('particle-system', {

    schema: {
        preset: {
            type: 'string',
            default: '',
            oneOf: ['default', 'dust', 'snow', 'rain']
        },
        maxAge: {
            type: 'number'
        },
        positionSpread: {
            type: 'vec3'
        },
        type: {
            type: 'number'
        },
        rotationAxis: {
            type: 'string'
        },
        rotationAngle: {
            type: 'number'
        },
        accelerationValue: {
            type: 'vec3'
        },
        accelerationSpread: {
            type: 'vec3'
        },
        velocityValue: {
            type: 'vec3'
        },
        velocitySpread: {
            type: 'vec3'
        },
        color: {
            type: 'array'
        },
        size: {
            type: 'number'
        },
        direction: {
            type: 'number'
        },
        duration: {
            type: 'number'
        },
        particleCount: {
            type: 'number'
        },
        texture: {
            type: 'asset'
        },
        randomize: {
            type: 'boolean'
        },
        opacity: {
          type: 'number',
        },
        maxParticleCount: {
            type: 'number',
            default: 250000
        }
    },


    init: function() {

        this.presets = [];

        /* preset settings can be overwritten */

        this.presets['default'] = {
            maxAge: (this.data.maxAge!==0?this.data.maxAge:6),
            positionSpread: (this.data.positionSpread.x!==0||this.data.positionSpread.y!==0||this.data.positionSpread.z!==0?this.data.positionSpread:{x:0,y:0,z:0}),
            type: (this.data.type!==0?this.data.type:SPE.distributions.BOX), /* SPE.distributions.SPHERE, SPE.distributions.DISC */
            rotationAxis: (this.data.rotationAxis!==''?this.data.rotationAxis:'x'),
            rotationAngle: (this.data.rotationAngle!==0?this.data.rotationAngle:0),
            accelerationValue: (this.data.accelerationValue.x!==0||this.data.accelerationValue.y!==0||this.data.accelerationValue.z!==0?this.data.accelerationValue:{x: 0, y: -10, z: 0}),
            accelerationSpread: (this.data.accelerationSpread.x!==0||this.data.accelerationSpread.y!==0||this.data.accelerationSpread.z!==0?this.data.accelerationSpread:{x: 10, y: 0, z: 10}),
            velocityValue: (this.data.velocityValue.x!==0||this.data.velocityValue.y!==0||this.data.velocityValue.z!==0?this.data.velocityValue:{x: 0, y: 25, z: 0}),
            velocitySpread: (this.data.velocitySpread.x!==0||this.data.velocitySpread.y!==0||this.data.velocitySpread.z!==0?this.data.velocitySpread:{x: 10, y: 7.5, z: 10}),
            color: (this.data.color.length?this.data.color:['#0000FF','#FF0000']),
            size: (this.data.size!==0?this.data.size:1),
            opacity: { value: (this.data.opacity!=0?this.data.opacity:1) },
            direction: (this.data.direction!==0?this.data.direction:1),
            duration: (this.data.duration!=0?this.data.duration:null),
            particleCount: (this.data.particleCount!==0?this.data.particleCount:1000),
            texture: (this.data.texture!==''?this.data.texture:'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/star2.png'),
            randomize: false
        };


        this.presets['dust'] = {
            maxAge: (this.data.maxAge!==0?this.data.maxAge:20),
            positionSpread: (this.data.positionSpread.x!==0||this.data.positionSpread.y!==0||this.data.positionSpread.z!==0?this.data.positionSpread:{x:100,y:100,z:100}),
            type: (this.data.type!==0?this.data.type:SPE.distributions.BOX), /* SPE.distributions.SPHERE, SPE.distributions.DISC */
            rotationAxis: (this.data.rotationAxis!==''?this.data.rotationAxis:'x'),
            rotationAngle: (this.data.rotationAngle!==0?this.data.rotationAngle:3.14),
            accelerationValue: (this.data.accelerationValue.x!==0||this.data.accelerationValue.y!==0||this.data.accelerationValue.z!==0?this.data.accelerationValue:{x: 0, y: 0, z: 0}),
            accelerationSpread: (this.data.accelerationSpread.x!==0||this.data.accelerationSpread.y!==0||this.data.accelerationSpread.z!==0?this.data.accelerationSpread:{x: 0, y: 0, z: 0}),
            velocityValue: (this.data.velocityValue.x!==0||this.data.velocityValue.y!==0||this.data.velocityValue.z!==0?this.data.velocityValue:{x: 1, y: 0.3, z: 1}),
            velocitySpread: (this.data.velocitySpread.x!==0||this.data.velocitySpread.y!==0||this.data.velocitySpread.z!==0?this.data.velocitySpread:{x: 0.5, y: 1, z: 0.5}),
            color: (this.data.color.length?this.data.color:['#FFFFFF']),
            size: (this.data.size!==0?this.data.size:1),
            opacity: { value: (this.data.opacity!=0?this.data.opacity:1) },
            direction: (this.data.direction!==0?this.data.direction:1),
            duration: (this.data.duration!=0?this.data.duration:null),
            particleCount: (this.data.particleCount!==0?this.data.particleCount:100),
            texture: (this.data.texture!==''?this.data.texture:'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/smokeparticle.png'),
            randomize: false
        };


        this.presets['snow'] = {
            maxAge: (this.data.maxAge!==0?this.data.maxAge:20),
            positionSpread: (this.data.positionSpread.x!==0||this.data.positionSpread.y!==0||this.data.positionSpread.z!==0?this.data.positionSpread:{x:100,y:100,z:100}),
            type: (this.data.type!==0?this.data.type:SPE.distributions.BOX), /* SPE.distributions.SPHERE, SPE.distributions.DISC */
            rotationAxis: (this.data.rotationAxis!==''?this.data.rotationAxis:'x'),
            rotationAngle: (this.data.rotationAngle!==0?this.data.rotationAngle:3.14),
            accelerationValue: (this.data.accelerationValue.x!==0||this.data.accelerationValue.y!==0||this.data.accelerationValue.z!==0?this.data.accelerationValue:{x: 0, y: 0, z: 0}),
            accelerationSpread: (this.data.accelerationSpread.x!==0||this.data.accelerationSpread.y!==0||this.data.accelerationSpread.z!==0?this.data.accelerationSpread:{x: 0.2, y: 0, z: 0.2}),
            velocityValue: (this.data.velocityValue.x!==0||this.data.velocityValue.y!==0||this.data.velocityValue.z!==0?this.data.velocityValue:{x: 0, y: 8, z: 0}),
            velocitySpread: (this.data.velocitySpread.x!==0||this.data.velocitySpread.y!==0||this.data.velocitySpread.z!==0?this.data.velocitySpread:{x: 2, y: 0, z: 2}),
            color: (this.data.color.length?this.data.color:['#FFFFFF']),
            size: (this.data.size!==0?this.data.size:1),
            opacity: { value: (this.data.opacity!=0?this.data.opacity:1) },
            direction: (this.data.direction!==0?this.data.direction:1),
            duration: (this.data.duration!=0?this.data.duration:null),
            particleCount: (this.data.particleCount!==0?this.data.particleCount:200),
            texture: (this.data.texture!==''?this.data.texture:'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/smokeparticle.png'),
            randomize: false
        };


        this.presets['rain'] = {
            maxAge: (this.data.maxAge!==0?this.data.maxAge:1),
            positionSpread: (this.data.positionSpread.x!==0||this.data.positionSpread.y!==0||this.data.positionSpread.z!==0?this.data.positionSpread:{x:100,y:100,z:100}),
            type: (this.data.type!==0?this.data.type:SPE.distributions.BOX), /* SPE.distributions.SPHERE, SPE.distributions.DISC */
            rotationAxis: (this.data.rotationAxis!==''?this.data.rotationAxis:'x'),
            rotationAngle: (this.data.rotationAngle!==0?this.data.rotationAngle:3.14),
            accelerationValue: (this.data.accelerationValue.x!==0||this.data.accelerationValue.y!==0||this.data.accelerationValue.z!==0?this.data.accelerationValue:{x: 0, y: 3, z: 0}),
            accelerationSpread: (this.data.accelerationSpread.x!==0||this.data.accelerationSpread.y!==0||this.data.accelerationSpread.z!==0?this.data.accelerationSpread:{x: 2, y: 1, z: 2}),
            velocityValue: (this.data.velocityValue.x!==0||this.data.velocityValue.y!==0||this.data.velocityValue.z!==0?this.data.velocityValue:{x: 0, y: 75, z: 0}),
            velocitySpread: (this.data.velocitySpread.x!==0||this.data.velocitySpread.y!==0||this.data.velocitySpread.z!==0?this.data.velocitySpread:{x: 10, y: 50, z: 10}),
            color: (this.data.color.length?this.data.color:['#FFFFFF']),
            size: (this.data.size!==0?this.data.size:0.4),
            opacity: { value: (this.data.opacity!=0?this.data.opacity:1) },
            direction: (this.data.direction!==0?this.data.direction:1),
            duration: (this.data.duration!=0?this.data.duration:null),
            particleCount: (this.data.particleCount!==0?this.data.particleCount:1000),
            texture: (this.data.texture!==''?this.data.texture:'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/raindrop.png'),
            randomize: false
        };


    },


    update: function (oldData) {

        // Remove old particle group.
        if (this.particleGroup) {
            this.el.removeObject3D('particle-system');
        }

        if (this.data.preset != '' && this.data.preset in this.presets) {

            this.initParticleSystem(this.presets[this.data.preset]);

        } else {

            this.initParticleSystem(this.presets['default']);
        }

    },


    tick: function(time, dt) {

        this.particleGroup.tick(dt / 1000);
    },


    remove: function() {

        // Remove particle system.
        if (!this.particleGroup) { return; }
        this.el.removeObject3D('particle-system');
    },


    initParticleSystem: function(settings) {

        var loader = new THREE.TextureLoader();
        var particle_texture = loader.load(
            settings.texture,
            function (texture) {
                return texture;
            },
            function (xhr) {
              console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (xhr) {
              console.log('An error occurred');
            }
        );

        this.particleGroup = new SPE.Group({
            texture: {
                value: particle_texture
            },
            maxParticleCount: this.data.maxParticleCount
        });

        var emitter = new SPE.Emitter({
            maxAge: {
                value: settings.maxAge
            },
            type: {
                value: settings.type
            },
            position: {
                value: this.el.object3D.position,
                spread: new THREE.Vector3(settings.positionSpread.x, settings.positionSpread.y, settings.positionSpread.z),
                randomize: settings.randomize
                //spreadClamp: new THREE.Vector3( 2, 2, 2 ),
                //radius: 4
            },
            rotation: {
                axis: (settings.rotationAxis=='x'?new THREE.Vector3(1, 0, 0):(settings.rotationAxis=='y'?new THREE.Vector3(0, 1, 0):(settings.rotationAxis=='z'?new THREE.Vector3(0, 0, 1):new THREE.Vector3(0, 1, 0)))),
                angle: settings.rotationAngle,
                static: true
            },
            acceleration: {
                value: new THREE.Vector3(settings.accelerationValue.x, settings.accelerationValue.y, settings.accelerationValue.z),
                spread: new THREE.Vector3(settings.accelerationSpread.x, settings.accelerationSpread.y, settings.accelerationSpread.z)
            },
            velocity: {
                value: new THREE.Vector3(settings.velocityValue.x, settings.velocityValue.y, settings.velocityValue.z),
                spread: new THREE.Vector3(settings.velocitySpread.x, settings.velocitySpread.y, settings.velocitySpread.z)
            },
            color: {
                value: settings.color.map(function(c) { return new THREE.Color(c); })
            },
            size: {
                value: settings.size
            },
            /*wiggle: { value: 4, spread: 2 }, //settings.wiggle,*/
            /*drag: {
                value: settings.drag
            },*/
            direction: {
                value: settings.direction
            },
            duration: settings.duration,
            opacity: settings.opacity,
            particleCount: settings.particleCount
        });

        this.particleGroup.addEmitter(emitter);
        this.el.setObject3D('particle-system', this.particleGroup.mesh);
    }
});
