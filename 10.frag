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
  vec3 sp = vec3(cos(u_time) * 1.0, sin(u_time * 2.0) * 1.0, 0.5);
  float s1 = sdSphere(position - sp, 0.2);
  position.z += sin(u_time / 10.0) * 4.0;
  vec3 bp = position - vec3(0.0, 0.0, 1.0);
  bp = mod(bp, 0.6) - 0.5 * 0.6;
  bp.xz = rot2d(bp.xz, PI / 4.0 * sin(u_time));
  bp.xy = rot2d(bp.xy, PI / 4.0 * sin(u_time));
  vec3 bs = vec3(0.5, 0.5, 0.5) * 0.2;
  float b1 = sdBoxFrame(bp, bs, 0.03);
  return opSmoothUnion(s1, b1, 0.3);
}

vec3 origin = vec3(0.0, 0.0, - 1.0);

void main() {
  vec3 uv = vec3(clip_space(gl_FragCoord.xy).xy, 0.0);
  vec3 origin = vec3(0.0, 0.0, sin(u_time) / 2.0 - 1.0);
  // uv = mod(uv * 4.0, 1.0) - vec3(0.5);
  vec3 ray_dir = normalize(uv - origin);
  float dist = 0.0;
  int iteration_count;
  for(int i = 0; i < 1000; i ++ ) {
    vec3 current_pos = origin + ray_dir * dist;
    current_pos.xy = rot2d(current_pos.xy, dist /4.);
    float current_dist = scene(current_pos);
    dist += current_dist;
    if (current_dist < 0.0001) {
      iteration_count = i;
      break;
    }
    if (current_pos.z > 5.0) {
      dist = 1103.0;
      iteration_count = i;
      break;
    }
  }
  vec3 c = palette((float(dist)));
  // vec3 c = vec3(float(iteration_count) / 100.0);
  gl_FragColor = vec4((c), 1.0);
}