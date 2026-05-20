"use client";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "ghostOnDark";
type Size = "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-sm transition-all duration-200 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none overflow-hidden";

const variantMap: Record<Variant, string> = {
  primary:
    "bg-sunsetPink text-deepNight hover:brightness-110 active:scale-[0.98] focus-visible:ring-sunsetPink focus-visible:ring-offset-deepNight shadow-glow-pink",
  secondary:
    "bg-transparent text-white border-[1.5px] border-white/70 hover:border-windowLight hover:text-windowLight focus-visible:ring-windowLight focus-visible:ring-offset-deepNight",
  ghost:
    "bg-transparent text-white hover:bg-white/8 focus-visible:ring-windowBlue focus-visible:ring-offset-deepNight",
  ghostOnDark:
    "bg-transparent text-white border-[1.5px] border-white hover:border-sunsetPink hover:text-sunsetPink focus-visible:ring-sunsetPink focus-visible:ring-offset-deepNight",
};

const sizeMap: Record<Size, string> = {
  md: "px-6 py-3 text-[15px]",
  lg: "px-8 py-4 text-[16px]",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  ripple?: boolean;
}

interface LinkProps extends BaseProps {
  href: string;
  external?: boolean;
  type?: never;
  onClick?: never;
}

interface ButtonProps
  extends BaseProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "className" | "children" | "disabled"
    > {
  href?: undefined;
}

type Props = LinkProps | ButtonProps;

export default function Button(props: Props) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const ripple = props.ripple ?? variant === "primary";
  const [bursts, setBursts] = useState<number[]>([]);

  const classes = cn(base, variantMap[variant], sizeMap[size], props.className);

  const onPointerDown = () => {
    if (!ripple) return;
    const id = Date.now();
    setBursts((b) => [...b, id]);
    window.setTimeout(() => {
      setBursts((b) => b.filter((x) => x !== id));
    }, 720);
  };

  const rippleNode = ripple ? (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {bursts.map((id) => (
        <span
          key={id}
          className="absolute inset-0 rounded-sm bg-sunsetPink/30 animate-ripple"
        />
      ))}
    </span>
  ) : null;

  if ("href" in props && props.href) {
    const linkProps = props as LinkProps;
    if (linkProps.external) {
      return (
        <a
          href={linkProps.href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onPointerDown={onPointerDown}
        >
          {linkProps.children}
          {rippleNode}
        </a>
      );
    }
    return (
      <Link
        href={linkProps.href}
        className={classes}
        onPointerDown={onPointerDown}
      >
        {linkProps.children}
        {rippleNode}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    ripple: _r,
    children,
    onPointerDown: onPD,
    ...rest
  } = props as ButtonProps;

  return (
    <button
      className={classes}
      onPointerDown={(e) => {
        onPointerDown();
        onPD?.(e);
      }}
      {...rest}
    >
      {children}
      {rippleNode}
    </button>
  );
}
