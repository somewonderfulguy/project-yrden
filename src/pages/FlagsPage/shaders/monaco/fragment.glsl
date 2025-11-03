#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;

void main() {
  vec3 white  = vec3(1.0, 1.0, 1.0);          // #ffffff
  vec3 red    = vec3(0.8078, 0.0667, 0.1490); // #CE1126

  float top = step(0.5, vUv.y);
  vec3 color = mix(white, red, top);
  gl_FragColor = vec4(color, 1.0);
}
