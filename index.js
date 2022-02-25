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
            type: 'number',
            default: 6
        },
        positionSpread: {
            type: 'vec3',
            default: { x: 0, y: 0, z: 0 }
        },
        type: {
            type: 'number',
            default: SPE.distributions.BOX
        },
        rotationAxis: {
            type: 'string',
            default: 'x'
        },
        rotationAngle: {
            type: 'number',
            default: 0
        },
        rotationAngleSpread: {
            type: 'number',
            default: 0
        },
        accelerationValue: {
            type: 'vec3',
            default: { x: 0, y: -10, z: 0 }
        },
        accelerationSpread: {
            type: 'vec3',
            default: { x: 10, y: 0, z: 10 }
        },
        velocityValue: {
            type: 'vec3',
            default: { x: 0, y: 25, z: 0 }
        },
        velocitySpread: {
            type: 'vec3',
            default: { x: 10, y: 7.5, z: 10 }
        },
        dragValue: {
            type: 'number',
            default: 0
        },
        dragSpread: {
            type: 'number',
            default: 0
        },
        dragRandomise: {
            type: 'boolean',
            default: false
        },
        color: {
            type: 'array',
            default: [ '#0000FF', '#FF0000' ]
        },
        size: {
            type: 'array',
            default: [ '1' ]
        },
        sizeSpread: {
            type: 'array',
            default: [ '0' ]
        },
        direction: {
            type: 'number',
            default: 1
        },
        duration: {
            type: 'number',
            default: Infinity
        },
        particleCount: {
            type: 'number',
            default: 1000
        },
        texture: {
            type: 'asset',
            default: 'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/star2.png'
        },
        randomise: {
            type: 'boolean',
            default: false
        },
        opacity: {
          type: 'array',
          default: [ '1' ]
        },
        opacitySpread: {
            type: 'array',
            default: [ '0' ]
          },
        maxParticleCount: {
            type: 'number',
            default: 250000
        },
        blending: {
            type: 'number',
            default: THREE.AdditiveBlending,
            oneOf: [THREE.NoBlending,THREE.NormalBlending,THREE.AdditiveBlending,THREE.SubtractiveBlending,THREE.MultiplyBlending]
        },
        enabled: {
            type:'boolean',
            default:true
        }
    },


    init: function() {

        this.presets = {};

        /* preset settings can be overwritten */

        this.presets['dust'] = {
            maxAge: 20,
            positionSpread: {x:100,y:100,z:100},
            rotationAngle: 3.14,
            accelerationValue: {x: 0, y: 0, z: 0},
            accelerationSpread: {x: 0, y: 0, z: 0},
            velocityValue: {x: 1, y: 0.3, z: 1},
            velocitySpread: {x: 0.5, y: 1, z: 0.5},
            color: ['#FFFFFF'],
            particleCount: 100,
            texture: 'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/smokeparticle.png'
        };


        this.presets['snow'] = {
            maxAge: 20,
            positionSpread: {x:100,y:100,z:100},
            rotationAngle: 3.14,
            accelerationValue: {x: 0, y: 0, z: 0},
            accelerationSpread: {x: 0.2, y: 0, z: 0.2},
            velocityValue: {x: 0, y: 8, z: 0},
            velocitySpread: {x: 2, y: 0, z: 2},
            color: ['#FFFFFF'],
            particleCount: 200,
            texture: 'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/smokeparticle.png'
        };


        this.presets['rain'] = {
            maxAge: 1,
            positionSpread: {x:100,y:100,z:100},
            rotationAngle: 3.14,
            accelerationValue: {x: 0, y: 3, z: 0},
            accelerationSpread: {x: 2, y: 1, z: 2},
            velocityValue: {x: 0, y: 75, z: 0},
            velocitySpread: {x: 10, y: 50, z: 10},
            color: ['#FFFFFF'],
            size: 0.4,
            texture: 'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/raindrop.png'
        };


    },


    update: function (oldData) {

        // Remove old particle group.
        if (this.particleGroup) {
            this.el.removeObject3D('particle-system');
        }

        // Set the selected preset, if any, or use an empty object to keep schema defaults
        this.preset = this.presets[this.data.preset] || {};

        // Get custom, preset, or default data for each property defined in the schema
        for (var key in this.data) {
            this.data[key] = this.applyPreset(key);
        }

        this.initParticleSystem(this.data);

        if(this.data.enabled === true) {
            this.startParticles()
        } else {
            this.stopParticles()
        }
    },


    applyPreset: function (key) {
        // !this.attrValue[key] = the user did not set a custom value
        // this.preset[key] = there exists a value for this key in the selected preset
        if (!this.attrValue[key] && this.preset[key]) {
            return this.preset[key];
        } else {
            // Otherwise stick to the user or schema default value
            return this.data[key];
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

    startParticles: function() {
        this.particleGroup.emitters.forEach(function(em) { em.enable() });
    },

    stopParticles: function() {
        this.particleGroup.emitters.forEach(function(em) { em.disable() });
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
            maxParticleCount: settings.maxParticleCount,
            blending: settings.blending
        });

        var emitter = new SPE.Emitter({
            maxAge: {
                value: settings.maxAge
            },
            type: {
                value: settings.type
            },
            position: {                
                spread: new THREE.Vector3(settings.positionSpread.x, settings.positionSpread.y, settings.positionSpread.z),
                randomise: settings.randomise
                //spreadClamp: new THREE.Vector3( 2, 2, 2 ),
                //radius: 4
            },
            rotation: {
                axis: (settings.rotationAxis=='x'?new THREE.Vector3(1, 0, 0):(settings.rotationAxis=='y'?new THREE.Vector3(0, 1, 0):(settings.rotationAxis=='z'?new THREE.Vector3(0, 0, 1):new THREE.Vector3(0, 1, 0)))),
                angle: settings.rotationAngle,
                angleSpread: settings.rotationAngleSpread,
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
            drag: {
                value: new THREE.Vector3(settings.dragValue.x, settings.dragValue.y, settings.dragValue.z),
                spread: new THREE.Vector3(settings.dragSpread.x, settings.dragSpread.y, settings.dragSpread.z),
                randomise: settings.dragRandomise
            },
            color: {
                value: settings.color.map(function(c) { return new THREE.Color(c); })            
            },
            size: { value: settings.size.map(function (s) { return parseFloat(s); }),
                    spread: settings.sizeSpread.map(function (s) { return parseFloat(s); }) },
            
            /*wiggle: { value: 4, spread: 2 }, //settings.wiggle,*/
            /*drag: {
                value: settings.drag
            },*/
            direction: {
                value: settings.direction
            },
            duration: settings.duration,
            opacity: { value: settings.opacity.map(function (o) { return parseFloat(o); }),
                       spread: settings.opacitySpread.map(function (o) { return parseFloat(o); }) },            
            particleCount: settings.particleCount
        });

        this.particleGroup.addEmitter(emitter);
        this.particleGroup.mesh.frustumCulled = false;
        this.el.setObject3D('particle-system', this.particleGroup.mesh);
    }
});
