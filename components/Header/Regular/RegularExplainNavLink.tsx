import Model from "@/components/UI/Model";
import React from "react";
import NavLinkItem from "../NavLinkItem";
import {
  EXPLAIN_STUDENTS_PAGE_LINK,
  EXPLAIN_VOLUNTEERS_PAGE_LINK,
} from "@/constants/links";
import { DirectionSvg } from "@/components/UI/icons/Icons";

interface NavLinkProps {
  pathname: string;
}

export default function RegularExplainNavLink({ pathname }: NavLinkProps) {
  return (
    <Model
      containerClassName="hidden md:block"
      withOverlay={false}
      model={
        <div className="absolute right-3/4 top-6 bg-mainWhite-0 p-4 rounded-base flex flex-col gap-2 z-50 shadow-sm border">
          <NavLinkItem
            href={EXPLAIN_VOLUNTEERS_PAGE_LINK}
            isHighlighted={pathname === EXPLAIN_VOLUNTEERS_PAGE_LINK}
          >
            מתנדבים
          </NavLinkItem>
          <NavLinkItem
            href={EXPLAIN_STUDENTS_PAGE_LINK}
            isHighlighted={pathname === EXPLAIN_STUDENTS_PAGE_LINK}
          >
            תלמידים
          </NavLinkItem>
        </div>
      }
      button={{
        props: {
          className: "flex items-center gap-1",
        },
        content: (
          <>
            <p
              className={
                pathname.includes("explain") ? "font-semibold" : "font-normal"
              }
            >
              הסברים
            </p>
            <DirectionSvg className="w-4 h-4" />
          </>
        ),
      }}
    ></Model>
  );
}
