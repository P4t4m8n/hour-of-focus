import { HamburgerSvg } from "@/components/UI/icons/Icons";
import Input from "@/components/UI/Input";
import Label from "@/components/UI/Label";
import React from "react";

export default function Hamburger() {
  return (
    <Input
      type="checkbox"
      id="menu-toggle"
      className="hidden hamburger-checkbox "
      divStyle="hamburger-con w-12 h-12"
      hidden
    >
      <Label
        aria-controls="primary-navigation"
        htmlFor="menu-toggle"
        className="hamburger fill-mainOrange-600"
        aria-expanded="false"
      >
        <HamburgerSvg />
      </Label>
    </Input>
  );
}
