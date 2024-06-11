#extension GL_ARB_shading_language_include : enable
#include "lib/lib.glsl"

void main()
{
  float time = (sin(u_time) + 1.0) * 2.0;
  vec2 uv_mouse = (u_mouse.xy * 2.0 - u_resolution.xy) / u_resolution.y;
  // vec2 uv_mouse = vec2(0.5, 0.5);
  vec2 uv0 = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
  vec2 uv = fract(uv0 * 10.0) + 0.5;
  // vec2 uv = uv0;
  float c = length(uv * uv);
  // c = abs(c);
  c = smoothstep(0.4 + sin(angle(uv) * time * 10.0) / 18.0 + time, 0.8, c);
  c = c + pow(c, 2.0);
  gl_FragColor = vec4(vec3(c), 1.0);
}