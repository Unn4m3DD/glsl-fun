import { useFrame, useThree } from "@react-three/fiber";
import { FC, memo, useMemo, useRef } from "react";
import { Mesh, Vector2 } from "three";
import { geometry } from "maath";
export type FragmentShaderRendererProps = {
  shader: string;
  cardGeometry: geometry.RoundedPlaneGeometry;
};

export const FragmentShaderRenderer: FC<FragmentShaderRendererProps> = memo(
  ({ shader, cardGeometry }) => {
    const {
      size: { width, height },
    } = useThree();
    const ref = useRef<Mesh<any, any>>(null);
    useFrame(({ clock, pointer, size: { width, height } }) => {
      if (!ref.current) return;
      ref.current.material.uniforms.u_time.value = clock.elapsedTime;
      ref.current.material.uniforms.u_offset.value = new Vector2(
        ref.current.geometry.boundingBox?.min.x,
        ref.current.geometry.boundingBox?.min.y
      );
      ref.current.material.uniforms.u_mouse.value = new Vector2(
        ((pointer.x + 1) * width) / 2,
        ((pointer.y + 1) * height) / 2
      );
    });
    const uniforms = useMemo(
      () => ({
        u_time: { value: 0 },
        u_offset: { value: new Vector2(width, height) },
        u_resolution: { value: new Vector2(width, height) },
        u_mouse: {
          value: new Vector2((1 * width) / 2, (1 * height) / 2),
        },
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps -- Uniforms are updated on every frame by three-fiber
      []
    );
    return (
      <mesh ref={ref} geometry={cardGeometry}>
        <planeGeometry args={[width, height]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={`
varying vec2 vUv;
void main() {
  vUv = (uv - .5) * 2.;
  vec4 projectedPosition = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
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
