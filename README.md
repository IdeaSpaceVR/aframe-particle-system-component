# aframe-particle-system-component

Particle system component for [A-Frame](https://aframe.io).

![particle-system](https://cloud.githubusercontent.com/assets/674727/19012611/92d694fa-876f-11e6-8b6b-1b93dcd586a8.gif)

### Examples

- [Stars](https://ideaspacevr.github.io/aframe-particle-system-component-default/)
- [Dust](https://ideaspacevr.github.io/aframe-particle-system-component-dust/)
- [Rain](https://ideaspacevr.github.io/aframe-particle-system-component-rain/)
- [Snow](https://ideaspacevr.github.io/aframe-particle-system-component-snow/)

### Properties

This component exposes only a subset of the [ShaderParticleEngine API](http://squarefeet.github.io/ShaderParticleEngine/docs/api/).

| Property           | Description                                                                                                                                                                                                                                     | Default Value        |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------|
| preset             | Preset configuration. Possible values are: `default`, `dust`, `snow`, `rain`.                                                                                                                                                                   | `default`            |
| maxAge             | The particle's maximum age in seconds.                                                                                                                                                                                                          | `6`                  |
| positionSpread     | Describes this emitter's position variance on a per-particle basis.                                                                                                                                                                             | `0 0 0`              |
| type               | The default distribution this emitter should use to control its particle's spawn position and force behaviour. Possible values are `1` (box), `2` (sphere), `3` (disc)                                                                          | 1 (box)              |
| rotationAxis       | Describes this emitter's axis of rotation. Possible values are `x`, `y` and `z`.                                                                                                                                                                | `x`                  |
| rotationAngle      | The angle of rotation, given in radians. `Dust` preset is `3.14`.                                                                                                                                                                               | `0`                  |
| accelerationValue  | Describes this emitter's base acceleration.                                                                                                                                                                                                     | `0, -10, 0`          |
| accelerationSpread | Describes this emitter's acceleration variance on a per-particle basis.                                                                                                                                                                         | `10 0 10`            |
| velocityValue      | Describes this emitter's base velocity.                                                                                                                                                                                                         | `0 25 0`             |
| velocitySpread     | Describes this emitter's acceleration variance on a per-particle basis.                                                                                                                                                                         | `10 7.5 10`          |
| color              | Describes a particle's color. This property is a "value-over-lifetime" property, meaning an array of values can be given to describe specific value changes over a particle's lifetime.                                                         | `#0000FF,#FF0000`    |
| size               | Describes a particle's size.                                                                                                                                                                                                                    | `1`                  |
| direction          | The direction of the emitter. If value is `1`, emitter will start at beginning of particle's lifecycle. If value is `-1`, emitter will start at end of particle's lifecycle and work it's way backwards.                                        | `1`                  |
| duration           | The duration in seconds that this emitter should live for. If not specified, the emitter will emit particles indefinitely.                                                                                                                      | `null`               |
| particleCount      | The total number of particles this emitter will hold. NOTE: this is not the number of particles emitted in a second, or anything like that. The number of particles emitted per-second is calculated by particleCount / maxAge (approximately!) | `1000`               |
| texture            | The texture used by this emitter.                                                                                                                                                                                                               | `./images/star2.png` |
| randomize          | When a particle is re-spawned, whether it's position should be re-randomised or not. Can incur a performance hit.                                                                                                                               | `false`              |
| opacity            | Either a single number to describe the opacity of a particle.                                                                                                                                                                                   | `1`                  |
| maxParticleCount   |                                                                                                                                                                                                                                                 | `250000`             |

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

### Browser Installation

Install and use by directly including the [browser files](dist).

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>A-Frame Particle System Component Example</title>
    <meta name="description" content="Hello, World!">
    <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-particle-system@1.0.x/dist/aframe-particle-system-component.min.js"></script>
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

### Credits

Based on the [ShaderParticleEngine by Squarefeet](https://github.com/squarefeet/ShaderParticleEngine).
