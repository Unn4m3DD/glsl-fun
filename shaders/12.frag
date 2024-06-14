#extension GL_ARB_shading_language_include : enable
#include "./lib/lib.glsl"

bool ccw(vec2 p1, vec2 p2) {
  return p1.x * p2.y - p1.y * p2.x >= 0.0;
}

bool above(vec2 p1, vec2 p2, vec2 p3) {
  return ccw(vec2(p2.x - p1.x, p2.y - p1.y), vec2(p3.x - p2.x, p3.y - p2.y));
}

float circle(vec2 uv, vec2 center, float radius) {
  return step(radius, length(uv - center));
}

float ring(vec2 p, vec2 c1, float r1, vec2 c2, float r2) {
  return circle(p, c1, r1) - circle(p, c2, r2);
}

vec3 dealRing(vec2 p, vec2 c1, float r1, vec2 c2, float r2, vec3 c) {
  return mix(
    mix(
      vec3(0.0),
      c,
      ring(p, c1, r1, c2, r2) -
      ring(p, c1, r2, c2, r2 + 0.001)
    ),
    vec3(1.0),
    ring(p, c1, r2 + 0.01, c2, r2 + 99.0)
  );
}

vec3 paint_over(vec3 olc_c, vec3 new_c) {
  if (new_c != vec3(1.0)) {
    return new_c;
  }
  return olc_c;
}

float sqrt2 = sqrt(2.0);
vec3 yellow = vec3(255.0 / 255.0, 219.0 / 255.0, 77.0 / 255.0);
vec3 blue = vec3(0.0 / 255.0, 105.0 / 255.0, 224.0 / 255.0);

void main()
{
  vec2 uv = clip_space(gl_FragCoord.xy);
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
    )
    + u_time
  );
  uv += 0.5;
  vec3 c = vec3(0.9);
  if (above(uv, vec2(0, 0), vec2(2, 2))) {
    c = dealRing(
      uv,
      vec2(1.0 / sqrt2, 0.0), 0.0,
      vec2(1.0 / sqrt2, 0.0), sqrt2 / 2.0,
      yellow
    );
    c = paint_over(c,
      dealRing(
        uv,
        vec2(-0.5, 0.5), 0.0,
        vec2(-0.5, 0.5), sqrt2 / 2.0,
        yellow
      )
    );
    
  } else {
    c = dealRing(
      uv,
      vec2(0.0, 1.0 / sqrt2),
      0.0,
      vec2(0.0, 1.0 / sqrt2),
      sqrt2 / 2.0,
      yellow
    );
    c = paint_over(c,
      dealRing(
        uv,
        vec2(0.5, - 0.5), 0.0,
        vec2(0.5, - 0.5), sqrt2 / 2.0,
        yellow
      )
    );
  }
  c = paint_over(
    c,
    dealRing(uv, vec2(0.0, 0.0), 0.0, vec2(0.0, 0.0), 0.25, blue)
  );
  
  gl_FragColor = vec4(vec3(c), 1.0);
}