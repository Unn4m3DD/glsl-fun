import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { FC, memo, useMemo, useRef } from "react";
import { MathUtils, Mesh, Vector2 } from "three";

export type FragmentShaderRendererProps = {
  shader: string;
};

export const FragmentShaderRendererInternal: FC<FragmentShaderRendererProps> =
  memo(
    ({ shader }) => {
      const {
        size: { width, height },
      } = useThree();
      const ref = useRef<Mesh<any, any>>(null);
      useFrame(({ clock, pointer, size: { width, height } }) => {
        if (!ref.current) return;
        ref.current.material.uniforms.u_time.value = clock.elapsedTime;
        ref.current.material.uniforms.u_resolution.value = new Vector2(
          width,
          height
        );
        ref.current.material.uniforms.u_mouse.value = new Vector2(
          ((pointer.x + 1) * width) / 2,
          ((pointer.y + 1) * height) / 2
        );
      });
      const uniforms = useMemo(
        () => ({
          u_time: { value: 0 },
          u_resolution: { value: new Vector2(width, height) },
          u_mouse: {
            value: new Vector2((1 * width) / 2, (1 * height) / 2),
          },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps -- Uniforms are updated on every frame by three-fiber
        []
      );
      return (
        <mesh ref={ref}>
          <planeGeometry args={[width, height]} />
          <shaderMaterial
            uniforms={uniforms}
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
    },
    (prevProps, nextProps) => {
      return prevProps.shader === nextProps.shader;
    }
  );

export const FragmentShaderRenderer: FC<FragmentShaderRendererProps> = ({
  shader,
}) => {
  return (
    <Canvas resize={{ scroll: false }}>
      <FragmentShaderRendererInternal shader={shader} />
    </Canvas>
  );
};
(FragmentShaderRenderer as any).key = MathUtils.generateUUID();
