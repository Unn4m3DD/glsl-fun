import { FC } from "react";
import { Button } from "./components/ui/button";

export const App: FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center ">
      <Button>Hello World</Button>
    </div>
  );
};
