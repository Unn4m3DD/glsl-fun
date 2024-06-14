
#extension GL_ARB_shading_language_include : enable
#include "lib/lib.glsl"

void main()
{
  vec2 uv_mouse = vec2(0.6, 0.6);
  vec2 uv = clip_space(gl_FragCoord.xy); 
  uv = rot2d(uv, u_time * 0.000001);
  float c = abs(1.0 - length(uv)) - length(uv_mouse) + sin(rand(uv)) / (5.0 + cos(u_time));
  c = step(0.0, c);
  gl_FragColor = vec4(c * vec3(length(uv.x), length(uv.y), length(uv.xy)) * 6.0, 1.0);
}