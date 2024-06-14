
#extension GL_ARB_shading_language_include : enable
#include "lib/lib.glsl"

void main()
{
  vec2 uv_mouse = vec2(0.6, 0.6);
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
  uv = rot2d(uv, u_time * 0.000001);
  // vec2 uv = uv0;
  float c = abs(1.0 - length(uv)) - length(uv_mouse) + sin(rand(uv)) / (5.0 + cos(u_time));
  // c = abs(c);
  c = step(0.0, c);
  gl_FragColor = vec4(c * vec3(length(uv.x), length(uv.y), length(uv.xy)) * 6.0, 1.0);
}