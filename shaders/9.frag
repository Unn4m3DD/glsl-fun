#extension GL_ARB_shading_language_include : enable
#include "lib/lib.glsl"

float band(float pos, float start, float finish) {
  return step(start , pos) - step(finish - 0.01, pos);
}

void main() {
  vec2 uv_mouse = clip_space(u_mouse.xy);
  vec2 uv0 = clip_space(gl_FragCoord.xy);
  
  float c = band(uv0.x - uv_mouse.x + sin(uv0.y * 9.0) / 10.0, 0.0, 0.03);
  gl_FragColor = vec4(vec3(c), 1.0);
}