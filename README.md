# aframe-particle-system-component

Particle system component for [A-Frame](https://aframe.io).

![Particle System](https://cloud.githubusercontent.com/assets/674727/24214966/6d43ef14-0ef4-11e7-973f-c561b81d175f.gif)

### Examples

- [Stars](https://ideaspacevr.github.io/aframe-particle-system-component/examples/stars/)
- [Dust](https://ideaspacevr.github.io/aframe-particle-system-component/examples/dust/)
- [Rain](https://ideaspacevr.github.io/aframe-particle-system-component/examples/rain/)
- [Snow](https://ideaspacevr.github.io/aframe-particle-system-component/examples/snow/)
- [Colors](https://ideaspacevr.github.io/aframe-particle-system-component/examples/colors/)

### Properties

This component exposes only a subset of the [ShaderParticleEngine API](http://squarefeet.github.io/ShaderParticleEngine/docs/api/).

| Property           | Description                                                                                                                                                                                                                                     | Default Value        |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|
| preset              | Preset configuration. Possible values are: `default`, `dust`, `snow`, `rain`.                                                                                                                                                                   | `default`            |
| maxAge              | The particle's maximum age in seconds.                                                                                                                                                                                                          | `6`                  |
| positionSpread      | Describes this emitter's position variance on a per-particle basis.                                                                                                                                                                             | `0 0 0`              |
| type                | The default distribution this emitter should use to control its particle's spawn position and force behaviour. Possible values are `1` (box), `2` (sphere), `3` (disc)                                                                          | 1 (box)              |
| rotationAxis        | Describes this emitter's axis of rotation. Possible values are `x`, `y` and `z`.                                                                                                                                                                | `x`                  |
| rotationAngle       | The angle of rotation, given in radians. `Dust` preset is `3.14`.                                                                                                                                                                               | `0`                  |
| rotationAngleSpread | The amount of variance in the angle of rotation per-particle, given in radians.                                                                                                                                                                 | `0`                  |
| accelerationValue   | Describes this emitter's base acceleration.                                                                                                                                                                                                     | `0, -10, 0`          |
| accelerationSpread  | Describes this emitter's acceleration variance on a per-particle basis.                                                                                                                                                                         | `10 0 10`            |
| velocityValue       | Describes this emitter's base velocity.                                                                                                                                                                                                         | `0 25 0`             |
| velocitySpread      | Describes this emitter's acceleration variance on a per-particle basis.                                                                                                                                                                         | `10 7.5 10`          |
| dragValue           | Number between 0 and 1 describing drag applied to all particles.                                                                                                                                                                                | `0`                  |
| dragSpread          | Number describing drag variance on a per-particle basis.                                                                                                                                                                                        | `0`                  |
| dragRandomise       | WHen a particle is re-spawned, whether it's drag should be re-randomised or not. Can incur a performance hit.                                                                                                                                   | `false`              |
| color               | Describes a particle's color. This property is a "value-over-lifetime" property, meaning an array of values can be given to describe specific value changes over a particle's lifetime.                                                         | `#0000FF,#FF0000`    |
| size                | Describes a particle's size.  Either a single number, or an array of values can be given to describe specific value changes over a particle's lifetime.                                                                                   | `1`                  |
| sizeSpread | Per-particle variation in size.  Either a single number, or an array of values can be given to describe specific value changes over a particle's lifetime. | 0 |
| direction           | The direction of the emitter. If value is `1`, emitter will start at beginning of particle's lifecycle. If value is `-1`, emitter will start at end of particle's lifecycle and work it's way backwards.                                        | `1`                  |
| duration            | The duration in seconds that this emitter should live for. If not specified, the emitter will emit particles indefinitely.                                                                                                                      | `null`               |
| enabled             | When `true` the emitter will emit particles, when `false` it will not. This value can be changed dynamically during a scene. While particles are emitting, they will disappear immediately when set to `false`.  | `true`               |
| particleCount       | The total number of particles this emitter will hold. NOTE: this is not the number of particles emitted in a second, or anything like that. The number of particles emitted per-second is calculated by particleCount / maxAge (approximately!) | `1000`               |
| texture             | The texture used by this emitter.                                                                                                                                                                                                               | `./images/star2.png` |
| randomise           | When a particle is re-spawned, whether it's position should be re-randomised or not. Can incur a performance hit.                                                                                                                               | `false`              |
| opacity             | Either a single number to describe the opacity of a particle, or an array of values can be given to describe specific value changes over a particle's lifetime.                                                                               | `1`                  |
| opacitySpread | Per-particle variation in opacity.  Either a single number, or an array of values can be given to describe specific value changes over a particle's lifetime. | 0 |
| blending            | The blending mode of the particles. Possible values are `0` (no blending), `1` (normal), `2` (additive), `3` (subtractive), `4` (multiply)                                                                                                      | `2`                  |
| maxParticleCount    |                                                                                                                                                                                                                                                 | `250000`             |

### Usage

```html
<a-entity position="0 2.25 -15" particle-system="preset: dust"></a-entity>
```

```html
<a-entity position="0 2.25 -15" particle-system="preset: snow"></a-entity>
```

```html
<a-entity position="0 2.25 -15" particle-system="preset: rain"></a-entity>
```

```html
<a-entity position="0 2.25 -15" particle-system="preset: dust; texture: ./images/star2.png; color: #0000FF,#00FF00,#FF0000"></a-entity>
```

### Functions

#### startParticles
Enables the emitters. Useful to start the animations when `enabled` is set to `false`.

#### stopParticles
Disables the emitters.

### Usage
```javascript
this.el.components['particle-system'].startParticles();
this.el.components['particle-system'].stopParticles();
```

### Browser Installation

Install and use by directly including the [browser files](dist).

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>A-Frame Particle System Component Example</title>
    <meta name="description" content="Hello, World!">
    <script src="https://aframe.io/releases/1.4.1/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-particle-system-component@1.0.x/dist/aframe-particle-system-component.min.js"></script>
  </head>
  <body>
    <a-scene>
      <!-- Particle system uses 'default' preset, setting custom colors. -->
      <a-entity position="0 2.25 -15" particle-system="color: #EF0000,#44CC00"></a-entity>

      <a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-box position="-1 0.5 1" rotation="0 45 0" width="1" height="1" depth="1"  color="#4CC3D9"></a-box>
      <a-cylinder position="1 0.75 1" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>

      <a-sky color="#000000"></a-sky>
    </a-scene>
  </body>
</html>
```

### npm

https://www.npmjs.com/package/aframe-particle-system-component

```
npm install aframe-particle-system-component
```

### Local Development

```
npm install
npm run dev
```

To rebuild:

```
npm run dist
```

### Credits

Based on the [ShaderParticleEngine by Squarefeet](https://github.com/squarefeet/ShaderParticleEngine).
