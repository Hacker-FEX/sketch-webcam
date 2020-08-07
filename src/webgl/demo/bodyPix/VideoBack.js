import {
  Mesh,
  PlaneBufferGeometry,
  RawShaderMaterial,
  Vector2,
  Vector3
} from 'three';
import MathEx from 'js-util/MathEx';

import store from '@/store';

import vs from './glsl/Video.vs';
import fs from './glsl/VideoBack.fs';

export default class VideoBack extends Mesh {
  constructor() {
    // Define Geometry
    const geometry = new PlaneBufferGeometry(1, 1);

    // Define Material
    const material = new RawShaderMaterial({
      uniforms: {
        resolution: {
          value: store.state.resolution
        },
        video: {
          value: null
        },
        texture: {
          value: null
        },
        imgRatio: {
          value: new Vector2()
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true
    });
    super(geometry, material);
    this.size = new Vector3();
  }
  start(texture) {
    this.material.uniforms.video.value = store.state.webcam.videoTexture;
    this.material.uniforms.texture.value = texture;
    this.position.set(0, 0, -50);
  }
  resize() {
    const { camera, webcam } = store.state;
    const height = Math.abs(
      (camera.position.z - this.position.z) *
        Math.tan(MathEx.radians(camera.fov) / 2) *
        2
    );
    const width = height * camera.aspect;

    this.size.set(width, height, 1);
    this.scale.copy(this.size);
    this.material.uniforms.imgRatio.value.set(
      Math.min(
        1,
        ((this.size.x / this.size.y) * webcam.resolution.y) /
          webcam.resolution.x
      ),
      Math.min(
        1,
        ((this.size.y / this.size.x) * webcam.resolution.x) /
          webcam.resolution.y
      )
    );
  }
}
