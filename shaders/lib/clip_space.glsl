vec2 clip_space(vec2 p) {
  return (p.xy * 2.0 - u_resolution.xy) / u_resolution.y;
}