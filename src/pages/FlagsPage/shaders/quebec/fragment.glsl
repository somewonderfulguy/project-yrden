#ifdef GL_ES
precision mediump float;
#endif
#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
varying vec2 vUv;

// Signed distance to an axis-aligned box with half-size b (sharp corners)
float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

// Helper: build an antialiased fill from an SDF value
float fillFromSDF(float d) {
  float aa = fwidth(d) * 1.2;
  return smoothstep(0.0, -aa, d); // inside when d < 0
}

void main() {
  // Quebec flag base blue color (#003399)
  vec3 blue = vec3(0.0, 0.2, 0.6);

  // Centered cross dimensions based on full flag size
  // Vertical arm width = 1/6 of flag width -> half-width = 1/12
  float halfVertical = 1.0 / 12.0;
  float halfHorizontal = 1.0 / 8.0;

  float dx = abs(vUv.x - 0.5);
  float dy = abs(vUv.y - 0.5);

  // Cross mask: either inside vertical bar or horizontal bar
  float inVertical = step(dx, halfVertical);
  float inHorizontal = step(dy, halfHorizontal);
  float cross = clamp(inVertical + inHorizontal, 0.0, 1.0);
  
  float fleurMask = 0.0;
  {
    vec2 p = vUv - vec2(0.209, 0.76);
    float d = sdBox(p, vec2(0.0328, 0.01));
    fleurMask = max(fleurMask, fillFromSDF(d));
  }
  {
    vec2 p = vUv - vec2(0.795, 0.76);
    float d = sdBox(p, vec2(0.0328, 0.01));
    fleurMask = max(fleurMask, fillFromSDF(d));
  }
  {
    vec2 p = vUv - vec2(0.209, 0.133);
    float d = sdBox(p, vec2(0.0328, 0.01));
    fleurMask = max(fleurMask, fillFromSDF(d));
  }
  {
    vec2 p = vUv - vec2(0.795, 0.133);
    float d = sdBox(p, vec2(0.0328, 0.01));
    fleurMask = max(fleurMask, fillFromSDF(d));
  }

  // Ensure lilies stay only in blue quadrants (do not draw over the cross)
  float fleurInBlue = fleurMask * (1.0 - cross);
  float whiteMask = clamp(cross + fleurInBlue, 0.0, 1.0);

  vec3 color = mix(blue, vec3(1.0), whiteMask);
  gl_FragColor = vec4(color, 1.0);
}