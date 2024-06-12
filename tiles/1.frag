#extension GL_ARB_shading_language_include : enable
#include "../lib/lib.glsl"

bool ccw(vec2 p1, vec2 p2) {
  return p1.x * p2.y - p1.y * p2.x >= 0.0;
}

bool above(vec2 p1, vec2 p2, vec2 p3) {
  return ccw(vec2(p2.x - p1.x, p2.y - p1.y), vec2(p3.x - p2.x, p3.y - p2.y));
}

bool inside(vec2 p, vec3 c) {
  return pow(c.x - p.x, 2.0) + pow(c.y - p.y, 2.0) <= pow(c.z, 2.0);
}

bool radius(vec2 p, vec3 c1, vec3 c2) {
  return inside(p, c2)&& ! inside(p, c1);
}

vec3 ring(vec2 p, vec3 c1, vec3 c2, vec3 c) {
  if (radius(p, c1, c2))return c;
  if (radius(p, vec3(c1.x, c1.y, c1.z), vec3(c1.x, c1.y, c1.z + 20.0)))
  return vec3(0.0, 0.0, 0.0);
  if (radius(p, vec3(c2.x, c2.y, c2.z - 2.0), vec3(c2.x, c2.y, c2.z)))
  return vec3(0.0, 0.0, 0.0);
}

float sqrt2 = sqrt(2.0);
vec3 yellow = vec3(255.0 / 255.0, 219.0 / 255.0, 77.0 / 255.0);
vec3 blue = vec3(0.0 / 255.0, 105.0 / 255.0, 224.0 / 255.0);

void main()
{
  vec2 uv = (gl_FragCoord.xy) / u_resolution.y;
  uv -= 0.5;
  uv = rot2d(uv, sin(u_time) / 2.0);
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
    ) + u_time
  );
  uv += 0.5;
  vec3 c = vec3(0.9);
  if (above(uv, vec2(0, 0), vec2(2, 2))) {
    if (
      radius(
        uv,
        vec3(1.0 / sqrt2, 0.0, 0.0),
        vec3(1.0 / sqrt2, 0.0, (sqrt2) / 2.0)
      )
    )
    c = yellow;
    if (
      radius(
        uv,
        vec3(-1.0 / 2.0, 1.0 / 2.0, 0.0),
        vec3(-1.0 / 2.0, 1.0 / 2.0, (sqrt2) / 2.0)
      )
    )
    c = yellow;
    
  } else {
    if (
      radius(
        uv,
        vec3(0.0, 1.0 / sqrt2, 0.0),
        vec3(0.0, 1.0 / sqrt2, (sqrt2 * 1.0) / 2.0)
      )
    )
    c = yellow;
    if (
      radius(
        uv,
        vec3(1.0 / 2.0, - 1.0 / 2.0, 0.0),
        vec3(1.0 / 2.0, - 1.0 / 2.0, (sqrt2) / 2.0)
      )
    )
    c = yellow;
  }
  if (ring(uv, vec3(0.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0 / 4.0), blue).g > 0.0) {
    c = blue;
  }
  gl_FragColor = vec4(palette(length(c*c * 10.0 + sin(u_time * 0.1))), 1.0);
  // fragColor = vec4(col,1.0);
}