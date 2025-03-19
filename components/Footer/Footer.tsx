//Next
import Image from "next/image";
//Components
import Details from "./Details";
import FollowUs from "./FollowUs";
import CreatorsLinks from "./CreatorsLinks";
//Images
import { LOGO } from "@/constants/images";
/**
 * Footer component that renders the footer section of the application.
 * It includes the Details, FollowUs, and CreatorsLinks components, as well as the application logo.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {
  return (
    <footer className="w-full bg-mainOrange-700 py-10 px-sides sm:px-sides-sm text-mainWhite-0 grid grid-cols-[calc(65%-.5rem)_calc(35%-.5rem)] sm:grid-cols-[calc(65%)_calc(35%)] md:grid-cols-[35%_35%_30%] gap-y-10 gap-x-4 sm:gap-x-0 ">
      <Details />
      <Image
        src={LOGO}
        alt="logo"
        width={100}
        height={100}
        className=" brightness-0 invert md:order-3 justify-self-end "
        priority
      />
      <FollowUs />
      <div className="hidden md:order-4 md:block"></div>
      <CreatorsLinks />
    </footer>
  );
}
