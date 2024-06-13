#extension GL_ARB_shading_language_include : enable
#include "./lib/lib.glsl"

void main()
{
  vec2 uv = (gl_FragCoord.xy) / u_resolution.y;
  uv -= 0.5;
  // uv = rot2d(uv, sin(u_time) / 2.0);
  uv += 0.5;
  float x_par = float(int(uv.x * 8.0));
  float y_par = float(int(uv.y * 8.0));
  uv = fract(uv * 8.0);
  uv -= 0.5;
  uv = rot2d(uv, PI / 2.0 *
    (
      mod(x_par, 2.0) == 0.0 && mod(y_par, 2.0) == 0.0 ? 1.0 :
      mod(x_par, 2.0) == 1.0 && mod(y_par, 2.0) == 0.0 ? 2.0 :
      mod(x_par, 2.0) == 1.0 && mod(y_par, 2.0) == 1.0 ? 3.0 :
      4.0
    )
    + u_time
  );
  uv += 0.5;
  
  vec3 c = vec3(uv.x, 0.0, uv.x);
  gl_FragColor = vec4(vec3(c), 1.0);
  // fragColor = vec4(col,1.0);
}