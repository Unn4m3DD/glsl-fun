import { FC } from "react";
import { Button } from "./components/ui/button";
import { Canvas } from "@react-three/fiber";

export const App: FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center flex-col">
      <div className="flex h-96 w-96">
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"orange"} />
          </mesh>
        </Canvas>
      </div>
      <Button>Hello World</Button>
    </div>
  );
};
