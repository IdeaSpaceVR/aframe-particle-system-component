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
            default: ''
        }, 
        maxAge: {
            type: 'number',
            default: 10 
        },
        positionSpread: {
            type: 'vec3',
            default: {x: 100, y: 100, z: 100}
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
            default: {x: 1, y: 0.3, z: 1}
        },
        velocitySpread: {
            type: 'vec3',
            default: {x: 0.5, y: 1, z: 0.5}
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
            default: 100
        }, 
        maxParticleCount: {
            type: 'number',
            default: 250000
        },
        texture: {
            type: 'string',
            default: './images/smokeparticle.png'
        },
        randomize: {
            type: 'boolean',
            default: true
        } 
    },


    init: function() {

        this.presets['snow'] = {
            rotationAxis: 'x', 
            rotationAngle: 3.14, 
            accelerationSpread: {x: 0, y: 0, z: 0}, 
            accelerationValue: {x: 0, y: 0, z: 0},
            velocityValue: {x: 0, y: 5, z: 0},
            velocitySpread: {x: 0, y: 7, z: 0}, 
            positionSpread: {x: 100, y: 100, z: 100},
            texture: './images/smokeparticle.png'
        };

    },
 

    update: function (oldData) {

        this.clock = new THREE.Clock();

        if (this.data.preset != '' && this.data.preset in this.presets) {

            this.initParticleSystem(this.presets[this.data.preset]); 

        } else {

            this.initParticleSystem(this.data);
        }

    },


    tick: function(time) {

        this.particleGroup.tick(this.clock.getDelta());
    },


    remove: function() {},


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
            maxParticleCount: settings.maxParticleCount
        });

        /* color */
        var color_arr = [];
        settings.color.split(',').forEach((function(c) {
            color_arr.push(new THREE.Color(this.hexToRgb(c).r, this.hexToRgb(c).g, this.hexToRgb(c).b));
        }).bind(this));

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
                value: color_arr 
            },
            size: {
                value: settings.size
            },
            wiggle: {
                value: settings.wiggle
            },
            drag: {
                value: settings.drag
            },
            direction: {
                value: settings.direction
            },
            duration: {
                value: settings.duration
            },
            opacity: settings.opacity,
            particleCount: settings.particleCount
        });

        this.particleGroup.addEmitter(emitter);
        this.el.sceneEl.object3D.add(this.particleGroup.mesh);
    },


    hexToRgb: function(hex) {

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;

    }

});


