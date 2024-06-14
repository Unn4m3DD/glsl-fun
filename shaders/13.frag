#extension GL_ARB_shading_language_include : enable
#include "lib/lib.glsl"

float sdBoxFrame(vec3 p, vec3 b, float e) {
  p = abs(p) - b;
  vec3 q = abs(p + e) - e;
  return min(
    min(
      length(max(vec3(p.x, q.y, q.z), 0.0)) + min(max(p.x, max(q.y, q.z)), 0.0),
      length(max(vec3(q.x, p.y, q.z), 0.0)) + min(max(q.x, max(p.y, q.z)), 0.0)
    ),
    length(max(vec3(q.x, q.y, p.z), 0.0)) + min(max(q.x, max(q.y, p.z)), 0.0)
  );
}

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdSphere(vec3 p, float s) {
  return length(p) - s;
}

float opSmoothUnion(float d1, float d2, float k) {
  float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
  return mix(d2, d1, h) - k*h * (1.0 - h);
}
float scene(vec3 position) {
  vec3 fill_box_position = position - vec3(0, 0, 0.0);
  float fill_box = sdBox(fill_box_position , vec3(0.33));
  float hole = 1.0;
  const float max_iter_count = 3.0;
  for(float j = 1.0; j < max_iter_count; j ++ ) {
    float side_scale = pow(3.0, j);
    vec3 new_hole_position = (mod((fill_box_position - 1.5), 1. / side_scale) - 0.5 * 1. / side_scale);
    // new_hole_position = fill_box_position;
    float new_hole = min(
      min(
        sdBox(new_hole_position, vec3(0.33 , 0.33 , 1.2) /side_scale/side_scale),
        sdBox(new_hole_position, vec3(0.33 , 1.2 , 0.25) /side_scale/side_scale)),
        sdBox(new_hole_position, vec3(1.2 , 0.33 , 0.25) /side_scale/side_scale
      )
    );
    hole = min(hole, new_hole);
  }
  return max(fill_box, hole);
  // return hole;
  // return fill_box;
  return max(fill_box, - hole);
}

vec3 origin = vec3(0., 0., - 3.0);

void main() {
  vec3 uv = vec3(clip_space(gl_FragCoord.xy), 0.0);
  vec2 cs_mouse = clip_space(u_mouse.xy);
  origin.xz = rot2d(origin.xz, -u_time);
  uv.xz = rot2d(uv.xz, -u_time);

  origin.yz = rot2d(origin.yz, -u_time);
  uv.yz = rot2d(uv.yz, -u_time);
  vec3 ray_dir = normalize(uv - origin);
  float dist = 0.0;
  for(int i = 0; i < 10000; i ++ ) {
    vec3 current_pos = origin + ray_dir * dist;
    float current_dist = scene(current_pos);
    dist += current_dist;
    if (current_dist < 0.0001) {
      break;
    }
    if (dist > 500.0) {
      dist = 500.0;
      break;
    }
  }
  vec3 c = vec3(dist / 10.0);
  // vec3 c = vec3(float(iteration_count) / 100.0);
  gl_FragColor = vec4(c, 1.0);
}