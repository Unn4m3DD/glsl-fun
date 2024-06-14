import { Environment } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Root,
  Container,
  Text,
  setPreferredColorScheme,
  Content,
} from "@react-three/uikit";
import { Defaults } from "@/theme";
import { signal } from "@preact/signals-core";
import { easing, geometry } from "maath";

import { useMemo, useRef } from "react";
import { FragmentShaderRenderer } from "./FragmentShaderRenderer";
import { shaders } from "./shaders";

setPreferredColorScheme("light");

export const App = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 32.5 }}
      style={{ height: "100dvh", touchAction: "none" }}
      gl={{ localClippingEnabled: true }}
    >
      <Defaults>
        <ambientLight intensity={Math.PI} />
        <spotLight
          decay={0}
          position={[0, 5, 10]}
          angle={0.25}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <CardPage />

        <Environment preset="city" />
        <Rig />
      </Defaults>
    </Canvas>
  );
};

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.pointer.x * 2, state.pointer.y * 2, 18],
      0.35,
      delta
    );
    state.camera.lookAt(0, 0, -10);
  });
  return null;
}

const cardGeometry = new geometry.RoundedPlaneGeometry(1, 1, 0.025);

export function CardPage() {
  const {
    size: { width, height },
  } = useThree();
  const openRef = useRef(false);
  const translateY = useMemo(() => signal(-460), []);
  const translateZ = useMemo(() => signal(0), []);
  useFrame((_, delta) => {
    easing.damp(translateY, "value", openRef.current ? 0 : -460, 0.2, delta);
    easing.damp(translateZ, "value", openRef.current ? 200 : 0, 0.2, delta);
  });
  return (
    <Root
      width={width}
      height={height}
      flexDirection="row"
      flexWrap={"wrap"}
      pixelSize={0.01}
      overflow={"scroll"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Defaults>
        {shaders.map((shader, index) => (
          <Container
            key={index}
            backgroundColor={0xffffff}
            dark={{ backgroundColor: 0x0 }}
            borderRadius={20}
            onClick={(e) => (
              e.stopPropagation(), (openRef.current = !openRef.current)
            )}
            cursor="pointer"
            flexDirection="column"
            width={400}
            zIndexOffset={10}
            transformTranslateZ={translateZ}
          >
            <Content
              transformTranslateZ={1}
              padding={14}
              keepAspectRatio={false}
              width={400}
              height={400}
            >
              <FragmentShaderRenderer
                shader={shader}
                cardGeometry={cardGeometry}
              />
            </Content>
            <Container
              backgroundColor={0xffffff}
              dark={{ backgroundColor: 0x0 }}
              flexDirection="row"
              padding={28}
              paddingTop={28 + 4}
              alignItems="center"
              justifyContent="space-between"
              borderBottomRadius={20}
              castShadow
            >
              <Container flexDirection="column" gap={8}>
                <Text fontWeight="normal" fontSize={24} lineHeight="100%">
                  Shader {`${index + 1}`}
                </Text>
              </Container>
            </Container>
          </Container>
        ))}
      </Defaults>
    </Root>
  );
}
