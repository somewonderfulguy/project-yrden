#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vec3(0.0, 0.06666666666666667, 0.5333333333333333), 1.0);
}
