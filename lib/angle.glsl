float angle(in vec2 vector) {
  return acos(dot(normalize(vector), vec2(0.0, - 1.0))) / PI ;
}

float unsigned_angle(in vec2 vector) {
  float result =  acos(dot(normalize(vector), vec2(0.0, - 1.0))) / PI ;
  if (result < 0.0) {
    result += 2.0 * PI;
  }
  return result;
}