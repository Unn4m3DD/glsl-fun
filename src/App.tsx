import { FC } from "react";
import { Button } from "./components/ui/button";
import { shaders } from "./shaders";
import { FragmentShaderRenderer } from "./FragmentShaderRenderer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

export const App: FC = () => {
  return (
    <div className="flex h-full w-full flex-col p-4 overflow-y-auto overflow-x-hidden">
      <div className="grid grid-cols-[repeat(auto-fill,18rem)] justify-between gap-4 w-full">
        {shaders.map((shader, i) => (
          <Card
            key={i}
            className="flex flex-col w-[calc(100vw-3rem)] sm:w-fit h-fit items-center justify-center"
          >
            <CardHeader>
              <CardTitle>Shader {i + 1}</CardTitle>
            </CardHeader>
            <CardContent className="flex h-72 w-72">
              <FragmentShaderRenderer shader={shader} />
            </CardContent>
            <CardFooter className="flex items-center gap-4 justify-center">
              {/* <Button variant="secondary">Edit</Button> */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Maximize</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[80%] h-[80%]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center justify-center h-full w-full">
                    <FragmentShaderRenderer shader={shader} />
                  </div>
                  <DialogFooter></DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
