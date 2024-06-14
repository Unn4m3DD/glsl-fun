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
  float t2 = step(pow(length(p), 7.0), triangle(p, r));
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
  // vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y; // * pow(0.2, u_time);
  // uv = rot2d(uv, u_time * 0.8);
  // float result = sirp4(uv);
  
  float time = sin((u_time + 100.0) / 9000.0) * 9999.0;
  vec2 uv0 = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
  vec2 uv = rot2d((uv0 * time / 100.0), u_time);
  float value = (length(uv)) / 30.0 * sin(sirp4(rot2d(uv * sin(u_time), 0.0)));
  vec3 c = palette(value);
  c = c*sin(c * time / 10.0);
  c = sin(c * time / 1.0);
  c = 0.125 / c;
  c = abs(c);
  gl_FragColor = vec4(c, 1.0);
  
  // float result = triangleFrame(uv, initial_size);
  // gl_FragColor = vec4(palette(u_time) * result, 1.0);
  // fragColor = vec4(col,1.0);
}