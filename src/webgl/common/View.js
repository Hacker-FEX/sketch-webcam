import { Mesh, PlaneBufferGeometry, RawShaderMaterial } from 'three';

import store from '@/store';

import vs from './glsl/View.vs';
import fs from './glsl/View.fs';

export default class View extends Mesh {
  constructor() {
    // Define Geometry
    const geometry = new PlaneBufferGeometry(2, 2);

    // Define Material
    const material = new RawShaderMaterial({
      uniforms: {
        time: {
          value: 0
        },
        resolution: {
          value: store.state.resolution
        },
        texture1: {
          value: null
        },
        texture2: {
          value: null
        }
      },
      vertexShader: vs,
      fragmentShader: fs,
      transparent: true
    });

    // Create Object3D
    super(geometry, material);
    this.name = 'View';
  }
  start(texture1, texture2) {
    this.material.uniforms.texture1.value = texture1;
    this.material.uniforms.texture2.value = texture2;
  }
  update(t) {
    const { time } = this.material.uniforms;

    time.value += t;
  }
  reset() {
    const { time } = this.material.uniforms;

    time.value = 0;
  }
}
