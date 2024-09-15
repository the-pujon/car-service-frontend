import { Lock } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface OverlayProps {
  title: string;
}

const Overlay: React.FC<OverlayProps> = ({ title }) => {
  return (
    <div className="absolute bg-background/50 backdrop-blur-[10px] bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
      <div className="flex flex-col gap-5 justify-center items-center h-screen dark:invert">
        <div>
          <div className="text-5xl font-semibold tracking-wide text-center">
            {title}
          </div>
          <p className="text-sm text-gray-300 text-center pt-3">
            Please login first
          </p>
        </div>
        <Lock className="animate-bounce" size={50} />
        <Button
          asChild
          className="bg-foreground hover:bg-white text-white hover:text-black font-bold uppercase tracking-widest"
        >
          <Link to={"/auth/signin"}>
            Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default Overlay;
