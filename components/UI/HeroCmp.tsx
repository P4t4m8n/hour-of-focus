import { JSX } from "react";
import HeroImage from "./HeroImage";
/**
 * HeroCmp component renders a hero section with an image and a text overlay.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.text - The text to be displayed in the hero section.
 *
 * @returns {JSX.Element} The rendered hero component.
 */

export default function HeroCmp({ text }: { text: string }): JSX.Element {
  return (
    <div className="grid grid-cols-1 grid-rows-1 w-full h-40 md:h-52 items-center justify-items-center">
      <HeroImage />
      <h4 className="grid-stack z-10 text-mainWhite-0 text-center text-28 md:text-36">
        {text}
      </h4>
    </div>
  );
}
