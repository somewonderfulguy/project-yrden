#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;

void main() {
  // Ukraine flag colors
  vec3 blue = vec3(0.0, 0.36, 0.733);   // #005BBB
  vec3 yellow = vec3(1.0, 0.833, 0.0);  // #FFD500

  float top = step(0.5, vUv.y);
  vec3 color = mix(yellow, blue, top);
  gl_FragColor = vec4(color, 1.0);
}
