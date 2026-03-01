import * as React from "react";
import Lottie from "lottie-react";
import { cn } from "@/src/lib/utils";

interface AnimatedIconProps {
  animationData: any;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  animationData,
  className,
  loop = true,
  autoplay = true,
}) => {
  return (
    <div className={cn("w-6 h-6 flex items-center justify-center", className)}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
