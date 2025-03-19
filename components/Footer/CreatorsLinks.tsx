/**
 * `CreatorsLinks` is a server component that renders a navigation section
 * with links to the creators' websites and social profiles.
 *
 * @component
 *
 * @returns {JSX.Element} A navigation element containing links to the creators' websites and social profiles.
 *
 * @remarks
 * This component uses the `LinkCmp` component to render the links and includes SVG icons for visual representation.
 * The text and icons are styled using Tailwind CSS classes.
 *
 * @dependencies
 * - `LinkCmp`: A custom link component used for navigation.
 * - `GitSvg`, `GlobeSvg`, `LinkedinSvg`: SVG icon components for GitHub, website, and LinkedIn respectively.
 * - `BATEL_WEBSITE`, `ERAN_GIT`, `ERAN_LINKEDIN`: Constants containing the URLs for the respective links.
 *
 * @see {@link ../UI/LinkCmp} for the `LinkCmp` component.
 * @see {@link ../UI/icons/Icons} for the SVG icon components.
 * @see {@link @/constants/links} for the URL constants.
 */
//UI
import LinkCmp from "../UI/LinkCmp";
import { GitSvg, GlobeSvg, LinkedinSvg } from "../UI/icons/Icons";
//Links
import { BATEL_WEBSITE, ERAN_GIT, ERAN_LINKEDIN } from "@/constants/links";

export default function CreatorsLinks() {
  return (
    <nav className="text-14 flex flex-col gap-2 items-center self-center col-span-2 md:col-span-1 md:order-5 w-full ">
      <LinkCmp href={BATEL_WEBSITE} className="flex items-center gap-1" target="_blank">
        <p className="text-14">{`עוצב ע"י BY.Creations`}</p>
        <GlobeSvg className="md:w-6 md:h-6 w-4 h-4 fill-mainWhite-0" />
      </LinkCmp>

      <div className="flex items-center gap-1 justify-center w-full">
        <p>{`נבנה ע"י Eran Michaeli`}</p>
        <span className="flex gap-1">
          <LinkCmp href={ERAN_GIT} target="_blank">
            <GitSvg />
          </LinkCmp>
          <LinkCmp href={ERAN_LINKEDIN} className="md:w-6 md:h-6 w-4 h-4 " target="_blank">
            <LinkedinSvg />
          </LinkCmp>
        </span>
      </div>
    </nav>
  );
}
