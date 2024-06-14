#extension GL_ARB_shading_language_include : enable
#include "lib/lib.glsl"

void main()
{
  float time = sin((u_time + 100.0) / 9000.0) * 9000.0;
  vec2 uv = clip_space(gl_FragCoord.xy); 
  float c = length(uv) * 2.0 - (sin(angle(uv) * sin(u_time) * PI * 10.0 + PI / 2.0) * 0.3) - 1.0;
  c = step(0.01, abs(c));
  gl_FragColor = vec4(c, c, c, 1.0);
  // fragColor = vec4(col,1.0);
}