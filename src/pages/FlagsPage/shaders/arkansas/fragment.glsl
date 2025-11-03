#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vec3(191.0/255.0, 10.0/255.0, 49.0/255.0), 1.0);
}
