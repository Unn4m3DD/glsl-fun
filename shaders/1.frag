#extension GL_ARB_shading_language_include : enable
#include "lib/lib.glsl"

void main()
{
  float time = sin((u_time + 100.0) / 9000.0) * 9000.0;
  vec2 uv0 = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
  vec2 uv = fract(uv0 * 3.0) - 0.5;
  float value = (length(uv)) / 20.0 * sin(angle(uv0) * time / 20.0);
  vec3 c = palette(value);
  c = c*sin(c * time / 10.0);
  c = sin(c * time / 1.0);
  c = 0.15 / c;
  c = abs(c);
  gl_FragColor = vec4(c, 1.0);
  // fragColor = vec4(col,1.0);
}