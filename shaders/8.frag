#extension GL_ARB_shading_language_include : enable
#include "lib/lib.glsl"

void main()
{
  float time = (sin(u_time) + 1.0) * 2.0;
  vec2 uv_mouse = clip_space(u_mouse);
  vec2 uv0 = clip_space(gl_FragCoord.xy);
  vec2 uv = fract(uv0 * 10.0) + 0.5;
  float c = length(uv * uv);
  c = smoothstep(0.4 + sin(angle(uv) * time * 10.0) / 18.0 + time, 0.8, c);
  c = c + pow(c, 2.0);
  gl_FragColor = vec4(vec3(c), 1.0);
}