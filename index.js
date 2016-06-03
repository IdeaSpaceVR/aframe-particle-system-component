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
        }, 
        maxAge: {
            type: 'number',
            default: 2
        },
        positionSpread: {
            type: 'vec3',
            default: {x: 0, y: 0, z: 0}
        },
        type: {
            type: 'number',
            default: SPE.distributions.BOX
            /* SPE.distributions.SPHERE, SPE.distributions.DISC */
        },
        rotationAxis: {
            type: 'string',
            default: 'x'
        },
        rotationAngle: {
            type: 'number',
            default: 3.14 
        },
        accelerationValue: {
            type: 'vec3',
            default: {x: 0, y: 0, z: 0}
        },
        accelerationSpread: {
            type: 'vec3',
            default: {x: 0, y: 0, z: 0}
        },
        velocityValue: {
            type: 'vec3',
            default: {x: 0, y: 25, z: 0}
        },
        velocitySpread: {
            type: 'vec3',
            default: {x: 10, y: 7.5, z: 10}
        },
        wiggle: {
            type: 'number',
            default: 0
        },
        drag: {
            type: 'number',
            default: 0 
        },
        color: {
            type: 'string',
            default: '#FFFFFF'
        },
        size: {
            type: 'number',
            default: 1
        },
        opacity: {
            type: 'number',
            default: 1
        },
        direction: {
            type: 'number',
            default: 1
            /* -1 */
        },
        duration: {
            type: 'number',
            default: null 
        },
        particleCount: {
            type: 'number',
            default: 2000
        }, 
        maxParticleCount: {
            type: 'number',
            default: 250000
        },
        texture: {
            type: 'string',
            default: './images/smokeparticle.png'
        } 
    },


    init: function() {

        /*this.presets['snow'] = {
            rotationAxis: 'x', 
            rotationAngle: 3.14, 
            accelerationSpread: {x: 0, y: 0, z: 0}, 
            accelerationValue: {x: 0, y: 0, z: 0},
            positionSpread: {x: 100, y: 100, z: 100},
            texture: this.data.texture,
        };*/

    },
 

    update: function (oldData) {

        var loader = new THREE.TextureLoader();
        var particle_texture = loader.load(
            this.data.texture,
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

        this.clock = new THREE.Clock();

        this.particleGroup = new SPE.Group({
            texture: {
                value: particle_texture 
            },
            maxParticleCount: this.data.maxParticleCount
        });


        /* color */
        var color_arr = [];
        this.data.color.split(',').forEach((function(c) {
            color_arr.push(new THREE.Color(this.hexToRgb(c).r, this.hexToRgb(c).g, this.hexToRgb(c).b));
        }).bind(this));


        var emitter = new SPE.Emitter({
            maxAge: {
                value: this.data.maxAge
            },
            type: {
                value: this.data.type
            },
            position: {
                value: this.el.object3D.position, 
                spread: new THREE.Vector3(this.data.positionSpread.x, this.data.positionSpread.y, this.data.positionSpread.z)
                //spreadClamp: new THREE.Vector3( 2, 2, 2 ),
                //radius: 4
            },
            rotation: {
                axis: (this.data.rotationAxis=='x'?new THREE.Vector3(1, 0, 0):(this.data.rotationAxis=='y'?new THREE.Vector3(0, 1, 0):(this.data.rotationAxis=='z'?new THREE.Vector3(0, 0, 1):new THREE.Vector3(0, 1, 0)))), 
                angle: this.data.rotationAngle,
                static: true
            },
            acceleration: {
                value: new THREE.Vector3(this.data.accelerationValue.x, this.data.accelerationValue.y, this.data.accelerationValue.z),
                spread: new THREE.Vector3(this.data.accelerationSpread.x, this.data.accelerationSpread.y, this.data.accelerationSpread.z)
            },
            velocity: {
                value: new THREE.Vector3(this.data.velocityValue.x, this.data.velocityValue.y, this.data.velocityValue.z), 
                spread: new THREE.Vector3(this.data.velocitySpread.x, this.data.velocitySpread.y, this.data.velocitySpread.z)  
            },
            color: {
                value: color_arr 
            },
            size: {
                value: this.data.size
            },
            wiggle: {
                value: this.data.wiggle
            },
            drag: {
                value: this.data.drag
            },
            direction: {
                value: this.data.direction
            },
            duration: {
                value: this.data.duration
            },
            opacity: this.data.opacity,
            particleCount: this.data.particleCount
        });

        this.particleGroup.addEmitter(emitter);
        this.el.sceneEl.object3D.add(this.particleGroup.mesh);
    },


    tick: function(time) {

        this.particleGroup.tick(this.clock.getDelta());
    },


    remove: function() {},


    hexToRgb: function(hex) {

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;

    }

});


