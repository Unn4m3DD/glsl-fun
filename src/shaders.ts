import shader1 from "../shaders/1.frag";
import shader2 from "../shaders/2.frag";
import shader3 from "../shaders/3.frag";
import shader4 from "../shaders/4.frag";
import shader5 from "../shaders/5.frag";
import shader6 from "../shaders/6.frag";
import shader7 from "../shaders/7.frag";
import shader8 from "../shaders/8.frag";
import shader9 from "../shaders/9.frag";
import shader10 from "../shaders/10.frag";
import shader11 from "../shaders/11.frag";
import shader12 from "../shaders/12.frag";
import shader13 from "../shaders/13.frag";
import shader14 from "../shaders/14.frag";

export const shaders = [
  shader1,
  shader2,
  shader3,
  shader4,
  shader5,
  shader6,
  shader7,
  shader8,
  shader9,
  shader10,
  shader11,
  shader12,
  shader13,
  shader14,
].map(e => e.replace(/#extension GL_ARB_shading_language_include : enable/g, ""));
