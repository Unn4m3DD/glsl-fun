import { FC } from "react";
import { Button } from "./components/ui/button";
import { Canvas } from "@react-three/fiber";
import { shaders } from "./shaders";
import { FragmentShaderRenderer } from "./FragmentShaderRenderer";

export const App: FC = () => {
  return (
    <div className="grid grid-cols-3 h-full w-full">
      {shaders.map((shader, i) => (
        <div key={i} className="flex w-full justify-center items-center">
          <div className="flex h-64 w-64">
            <Canvas resize={{ scroll: false }}>
              <FragmentShaderRenderer shader={shader} />
            </Canvas>
          </div>
        </div>
      ))}
      <Button>Hello World</Button>
    </div>
  );
};
