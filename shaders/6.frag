#extension GL_ARB_shading_language_include : enable
#include "lib/lib.glsl"

void main()
{
  vec2 uv = clip_space(gl_FragCoord.xy);
  uv = uv * u_resolution.y / 2.0 - u_time * PI * PI * 10.0;
  float scan_lines = sin((uv.y + u_time * 100.0) / 10.0) / 2.0 + 0.5;
  scan_lines += sin((uv.x + u_time * 100.0) / 10.0) / 2.0;
  scan_lines = smoothstep(0.5 - pow(2.0, cos(u_time)), 0.5 + sin(u_time), scan_lines);
  scan_lines = fract(scan_lines);
  gl_FragColor = vec4(palette(pow(scan_lines * 2.0, sin(u_time) * 2.0)), 1.0);
}