#define PI 3.141592653589793238462643383279
#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 vUv;

#include "angle.glsl"
#include "palette.glsl"
#include "rotate.glsl"
#include "rand.glsl"
#include "clip_space.glsl"