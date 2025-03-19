import React from "react";
import LinkCmp from "../UI/LinkCmp";

interface NavLinkProps {
  href: string;
  isHighlighted?: boolean;
  children?: React.ReactNode;
}
export default function NavLinkItem({
  href,
  children,
  isHighlighted,
}: NavLinkProps) {
  return (
    <LinkCmp
      className={`leading-7 ${isHighlighted ? "font-bold" : ""} `}
      href={href}
    >
      {children}
    </LinkCmp>
  );
}
