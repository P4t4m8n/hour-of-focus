"use client";
import { CONTACT_US } from "@/constants/links";
import NavLinks from "./NavLinks";
import LinkCmp from "../UI/LinkCmp";
import Model from "../UI/Model";
import { HamburgerSvg } from "../UI/icons/Icons";

export default function MobileHeader() {
  return (
    <Model
      containerClassName="lg:hidden block"
      withOverlay
      button={{
        content: <HamburgerSvg />,
        props: {
          className: "hamburger fill-mainOrange-600 w-12 h-12 lg:hidden block",
          "aria-controls": "primary-navigation",
          "aria-expanded": "false",
        },
      }}
      model={
        <div className="bg-mainWhite-0 pr-16 py-16 top-20 h-[calc(100%-5rem)] w-full max-w-[min(90vw,17rem)] rounded-l-base absolute right-0 flex flex-col menu-model z-50">
          <NavLinks />
          <LinkCmp
            styleMode="full"
            styleSize="small"
            href={CONTACT_US}
            className="content-us"
          >
            צור קשר
          </LinkCmp>
        </div>
      }
    ></Model>
  );
}
