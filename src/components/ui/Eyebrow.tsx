import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: React.ReactNode;
  tone?: "twilight" | "windowLight" | "sunsetPink" | "windowBlue";
  className?: string;
  as?: "p" | "span";
}

const toneMap: Record<NonNullable<EyebrowProps["tone"]>, string> = {
  twilight: "text-twilight",
  windowLight: "text-windowLight",
  sunsetPink: "text-sunsetPink",
  windowBlue: "text-windowBlue",
};

export default function Eyebrow({
  children,
  tone = "twilight",
  className,
  as = "p",
}: EyebrowProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "text-eyebrow font-mono uppercase font-bold",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
