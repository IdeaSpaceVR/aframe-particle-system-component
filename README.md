# aframe-particle-system-component

Create particle systems in A-Frame.

### Properties

| Property | Description                                                                               | Default Value |
| --------- | -----------                                                                               | ------------- |
| preset   |                                                      | `default`        |
| maxAge   |                                                      |         |
| positionSpread   |                                                      |         |
| type   |                                                      |         |
| rotationAxis   |                                                      |         |
| rotationAngle   |                                                      |         |
| accelerationValue   |                                                      |         |
| accelerationSpread   |                                                      |         |
| velocityValue   |                                                      |         |
| velocitySpread   |                                                      |         |
| color   |                                                      |         |
| size   |                                                      |         |
| direction   |                                                      |         |
| duration   |                                                      |         |
| particleCount   |                                                      |         |
| texture   |                                                      |         |
| randomize   |                                                      |         |
| maxParticleCount   |                                                      | 250000        |

### Usage Examples

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


#### Browser Installation

Install and use by directly including the [browser files](dist). Make sure the images directory (particle textures) is in the same
directory as the component.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>A-Frame Particle System Component Example</title>
    <meta name="description" content="Hello, World!">
    <script src="./aframe.min.js"></script>
    <script src="./aframe-particle-system-component.js"></script>
  </head>
  <body>
    <a-scene>

      <!-- particle system uses 'default' preset, setting custom colors //-->
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

### Examples

- http://ideaspacevr.github.io/aframe-particle-system-component-default
- http://ideaspacevr.github.io/aframe-particle-system-component-rain
- http://ideaspacevr.github.io/aframe-particle-system-component-snow
- http://ideaspacevr.github.io/aframe-particle-system-component-dust
- http://ideaspacevr.github.io/aframe-particle-system-component-custom

