//Constants
import { CONTACT_US } from "@/constants/links";
import { LOGO } from "@/constants/images";
//UI
import LinkCmp from "../UI/LinkCmp";
//Components
import MobileHeader from "./MobileHeader";
import NavLinks from "./NavLinks";
//Next
import Image from "next/image";

/**
 * Header server component that renders the main header of the application.
 * It includes a logo, navigation links, a contact link, and a mobile header.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header() {
  return (
    <header className="flex justify-between items-center h-20 w-full px-sides lg:px-8 xl:px-gaps-md sticky top-0 z-50 bg-mainWhite-0 shadow-sm">
      <Image
        src={LOGO}
        alt="logo"
        width={64}
        height={64}
        priority
        className="w-16 h-16"
      />

      <NavLinks />
      <LinkCmp
        styleMode="full"
        styleSize="large"
        href={CONTACT_US}
        className="hidden lg:flex"
        target="_blank"

      >
        צור קשר
      </LinkCmp>
      <MobileHeader />
    </header>
  );
}
