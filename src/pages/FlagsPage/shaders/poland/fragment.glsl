#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;

void main() {
  vec3 white  = vec3(1.0, 1.0, 1.0);          // #ffffff
  vec3 red    = vec3(0.8627, 0.0784, 0.2352); // #DC143C

  float top = step(0.5, vUv.y);
  vec3 color = mix(red, white, top);
  gl_FragColor = vec4(color, 1.0);
}
