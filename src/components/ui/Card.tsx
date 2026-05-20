import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "outline" | "subtle";
  lift?: boolean;
}

const toneMap: Record<NonNullable<CardProps["tone"]>, string> = {
  default:
    "bg-white/[0.04] border border-white/12 backdrop-blur-sm",
  outline: "bg-transparent border border-white/20",
  subtle: "bg-white/[0.02] border border-white/8",
};

export default function Card({
  tone = "default",
  lift = true,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-6 lg:p-8",
        toneMap[tone],
        lift && "card-lift hover:border-windowBlue/40 hover:shadow-card-hover",
        className,
      )}
      {...rest}
    />
  );
}
