import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/src/lib/utils";

const avatarSizes = {
  "5": "h-5 w-5 text-[8px]",
  "6": "h-6 w-6 text-[10px]",
  "8": "h-8 w-8 text-xs",
  "10": "h-10 w-10 text-sm",
  "12": "h-12 w-12 text-base",
  "14": "h-14 w-14 text-base",
  "16": "h-16 w-16 text-lg",
  "20": "h-20 w-20 text-xl",
};

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: keyof typeof avatarSizes;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size = "10", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex shrink-0 overflow-hidden rounded-full bg-slate-100",
      avatarSizes[size],
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-slate-100 font-medium text-slate-600 uppercase",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const AvatarGroup = ({
  children,
  className,
  limit = 3,
}: {
  children: React.ReactNode;
  className?: string;
  limit?: number;
}) => {
  const avatars = React.Children.toArray(children);
  const totalAvatars = avatars.length;
  const displayAvatars = avatars.slice(0, limit);
  const remaining = totalAvatars - limit;

  return (
    <div className={cn("flex -space-x-3", className)}>
      {displayAvatars.map((avatar, i) => (
        <div key={i} className="ring-2 ring-white rounded-full">
          {avatar}
        </div>
      ))}
      {remaining > 0 && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-600 ring-2 ring-white">
          +{remaining}
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
