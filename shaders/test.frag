#extension GL_ARB_shading_language_include : enable
#include "lib/lib.glsl"

void main()
{
  vec2 uv = clip_space(gl_FragCoord.xy);
  gl_FragColor = vec4(vec3(length(uv)), 1.0);
}