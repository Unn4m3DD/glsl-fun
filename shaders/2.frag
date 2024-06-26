#extension GL_ARB_shading_language_include : enable
#include "lib/lib.glsl"

void main()
{
  vec2 uv0 = clip_space(gl_FragCoord.xy);
  vec2 uv = fract(uv0 * 2.0) - 0.5;
  float show = atan(smoothstep(0.7, 0.99, sin(length(uv) * 8.0 * sin(u_time))));
  vec3 c = palette(sin(u_time)) * show;
  
  gl_FragColor = vec4(c, 1.0);
}