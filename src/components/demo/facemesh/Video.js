import {
  Mesh,
  PlaneBufferGeometry,
  RawShaderMaterial,
  Vector2,
  Vector3,
  VideoTexture
} from 'three';
import MathEx from 'js-util/MathEx';

import store from '@/store';

import vs from './glsl/Video.vs';
import fs from './glsl/Video.fs';

export default class Video extends Mesh {
  constructor() {
    // Define Geometry
    const geometry = new PlaneBufferGeometry(1, 1);

    // Define Material
    const material = new RawShaderMaterial({
      uniforms: {
        resolution: {
          type: 'v2',
          value: store.state.resolution
        },
        video: {
          type: 't',
          value: new VideoTexture(store.state.webcam.video)
        },
        imgRatio: {
          type: 'v2',
          value: new Vector2()
        }
      },
      vertexShader: vs,
      fragmentShader: fs
    });
    super(geometry, material);
    this.size = new Vector3();
  }
  resize() {
    const { camera } = store.state;

    const height = Math.abs(
      (camera.position.z - this.position.z) *
        Math.tan(MathEx.radians(camera.fov) / 2) *
        2
    );
    const width = height * camera.aspect;

    this.size.set(width, height, 1);
    this.scale.copy(this.size);

    const { resolution } = store.state.webcam;
    this.material.uniforms.imgRatio.value.set(
      Math.min(1, ((this.size.x / this.size.y) * resolution.y) / resolution.x),
      Math.min(1, ((this.size.y / this.size.x) * resolution.x) / resolution.y)
    );
  }
}