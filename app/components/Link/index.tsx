"use client";

import Link from "next/link";

type LinkProps = {
  external?: boolean;
  to: string;
  text: string;
};

export const CustomLink = ({ to, text, external = false }: LinkProps) => {
  return (
    <Link
      target={external ? "_blank" : ""}
      className="duration-150 group md:gap-8 hover:text-white text-sky-500"
      href={to}
    >
      {text}
    </Link>
  );
};
