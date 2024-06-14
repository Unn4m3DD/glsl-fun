vec2 rot2d(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, s, - s, c);
  return m * v;
}

vec3 rot3d(vec3 p,vec3 axis, float angle) {
  // Rodrigues' rotation formula
  return mix(dot(axis, p) * axis, p, cos(angle)) + cross(axis, p) * sin(angle);
}