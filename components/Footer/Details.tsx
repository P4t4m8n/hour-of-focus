/**
 * The `Details` is a server component renders a footer section with contact information and accessibility link.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered footer details component.
 *
 * @remarks
 * This component includes:
 * - A title with the text "שעה של פוקוס ©".
 * - A link to the contact us page.
 * - An email address with an envelope icon.
 * - A link to the accessibility statement page.
 *
 * @dependencies
 * - `EMAIL` from "@/constants/app"
 * - `ACCESSIBILITY_PAGE_LINK` and `CONTACT_US` from "@/constants/links"
 * - `EnvelopSvg` from "../UI/icons/Icons"
 * - `LinkCmp` from "../UI/LinkCmp"
 *
 * @see {@link "@/constants/app"}
 * @see {@link "@/constants/links"}
 * @see {@link "../UI/icons/Icons"}
 * @see {@link "../UI/LinkCmp"}
 */
//Constants
import { EMAIL } from "@/constants/app";
import { ACCESSIBILITY_PAGE_LINK, CONTACT_US } from "@/constants/links";
//UI
import { EnvelopSvg } from "../UI/icons/Icons";
import LinkCmp from "../UI/LinkCmp";

export default function Details() {
  return (
    <div className="flex flex-col gap-4 md:order-1 self-start ">
      <h6 className="pb-2 "> שעה של פוקוס © </h6>
      <LinkCmp
        styleMode="none"
        styleSize="none"
        href={CONTACT_US}
        className="text-14 leading-23"
        target="_blank"
      >
        צור קשר
      </LinkCmp>
      <span className="flex gap-2 items-center">
        <EnvelopSvg className="min-w-5 min-h-5  w-5 h-5 fill-white" />

        <a className="text-14 leading-23" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </span>
      <LinkCmp
        href={ACCESSIBILITY_PAGE_LINK}
        className="text-14 leading-23 underline"
      >
        הצהרת נגישות
      </LinkCmp>
    </div>
  );
}
