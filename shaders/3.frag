#extension GL_ARB_shading_language_include : enable
#include "lib/lib.glsl"

float triangle(in vec2 p, in float r)
{
  r *= 0.85;
  const float k = sqrt(3.0);
  p.x = abs(p.x) - r;
  p.y = p.y + r / k;
  if (p.x + k*p.y > 0.0)p = vec2(p.x - k*p.y, - k*p.x - p.y) / 2.0;
  p.x -= clamp(p.x, - 2.0 * r, 0.0);
  return - length(p) * sign(p.y);
}

float r = 1.0;
float triangleFrame(in vec2 p) {
  float t1 = step(0.01 * length(p), triangle(p, r));
  float t2 = step(pow(0.02, length(p)), triangle(p, r));
  float t = t1 - t2;
  float c = step(r - 0.004, length(p)) - step(r, length(p));
  return t; // + c;
}

float sirp1(in vec2 p) {
  float result = triangleFrame(p);
  result += triangleFrame(2.0 * (p - rot2d(vec2(0.0, r / 2.0), 0.0)));
  result += triangleFrame(2.0 * (p - rot2d(vec2(0.0, r / 2.0), 2.0 * PI / 3.0)));
  result += triangleFrame(2.0 * (p - rot2d(vec2(0.0, r / 2.0), - 2.0 * PI / 3.0)));
  
  return result;
}

float sirp2(in vec2 p) {
  float result = triangleFrame(p);
  result += sirp1(2.0 * (p - rot2d(vec2(0.0, r / 2.0), 0.0)));
  result += sirp1(2.0 * (p - rot2d(vec2(0.0, r / 2.0), 2.0 * PI / 3.0)));
  result += sirp1(2.0 * (p - rot2d(vec2(0.0, r / 2.0), - 2.0 * PI / 3.0)));
  return result;
}

float sirp3(in vec2 p) {
  float result = triangleFrame(p);
  result += sirp2(2.0 * (p - rot2d(vec2(0.0, r / 2.0), 0.0)));
  result += sirp2(2.0 * (p - rot2d(vec2(0.0, r / 2.0), 2.0 * PI / 3.0)));
  result += sirp2(2.0 * (p - rot2d(vec2(0.0, r / 2.0), - 2.0 * PI / 3.0)));
  return result;
}

float sirp4(in vec2 p) {
  float result = triangleFrame(p);
  result += sirp3(2.0 * (p - rot2d(vec2(0.0, r / 2.0), 0.0)));
  result += sirp3(2.0 * (p - rot2d(vec2(0.0, r / 2.0), 2.0 * PI / 3.0)));
  result += sirp3(2.0 * (p - rot2d(vec2(0.0, r / 2.0), - 2.0 * PI / 3.0)));
  return result;
}

void main()
{
  vec2 uv = clip_space(gl_FragCoord.xy);
  uv = rot2d(uv, u_time * 0.8);
  float result = sirp4(uv);
  gl_FragColor = vec4(palette(u_time) * result, 1.0);
}