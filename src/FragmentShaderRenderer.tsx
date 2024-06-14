import { useFrame, useThree } from "@react-three/fiber";
import { FC, useRef } from "react";
import { Mesh, Vector2 } from "three";

export type FragmentShaderRendererProps = {
  shader: string;
};

export const FragmentShaderRenderer: FC<FragmentShaderRendererProps> = ({
  shader,
}) => {
  const {
    size: { width, height },
  } = useThree();
  const ref = useRef<Mesh<any, any>>(null);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    ref.current.material.uniforms.u_time.value = clock.elapsedTime;
    ref.current.material.uniforms.u_mouse.value = new Vector2(
      mouse.x * width,
      mouse.y * height
    );
  });
  return (
    <mesh ref={ref}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        uniforms={{
          u_resolution: { value: new Vector2(width, height) },
          u_time: { value: 0 },
          u_mouse: { value: new Vector2(width / 2, height / 2) },
        }}
        vertexShader={`
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
}`}
        fragmentShader={shader}
      />
    </mesh>
  );
};
