/**
 * NavLinks client component renders a navigation bar with various links.
 * It highlights the current active link based on the pathname.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 *
 * @component
 *
 * @remarks
 * This component uses the `usePathname` hook from Next.js to determine the current path.
 * It includes both regular and mobile explain navigation links.
 *
 * @see {@link usePathname} for more information on the hook used.
 * @see {@link NavLinkItem} for the individual navigation link component.
 * @see {@link RegularExplainNavLink} for the regular explain navigation link component.
 * @see {@link MobileExplainNavLink} for the mobile explain navigation link component.
 *
 * @requires {@link usePathname}
 * @requires {@link NavLinkItem}
 * @requires {@link RegularExplainNavLink}
 * @requires {@link MobileExplainNavLink}
 * @requires {@link ABOUT_PAGE_LINK}
 * @requires {@link FAQ_STUDENTS_PAGE_LINK}
 * @requires {@link FAQ_VOLUNTEERS_PAGE_LINK}
 * @requires {@link HOME_PAGE_LINK}
 * @requires {@link MATERIALS_PAGE_LINK}
 */
"use client";
//Next
import { usePathname } from "next/navigation";
//Components
import NavLinkItem from "./NavLinkItem";
import RegularExplainNavLink from "./Regular/RegularExplainNavLink";
import MobileExplainNavLink from "./Mobile/MobileExplainNavLink";
//Links
import {
  ABOUT_PAGE_LINK,
  FAQ_STUDENTS_PAGE_LINK,
  FAQ_VOLUNTEERS_PAGE_LINK,
  HOME_PAGE_LINK,
  MATERIALS_PAGE_LINK,
} from "@/constants/links";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex gap-4 lg:gap-10 items-center text-mainGray-800 nav-links text-18">
      <NavLinkItem
        href={HOME_PAGE_LINK}
        isHighlighted={pathname === HOME_PAGE_LINK}
      >
        דף הבית
      </NavLinkItem>
      <NavLinkItem
        href={ABOUT_PAGE_LINK}
        isHighlighted={pathname === ABOUT_PAGE_LINK}
      >
        אודות
      </NavLinkItem>

      <RegularExplainNavLink pathname={pathname} />
      <MobileExplainNavLink pathname={pathname} />
      <NavLinkItem
        href={MATERIALS_PAGE_LINK}
        isHighlighted={pathname === MATERIALS_PAGE_LINK}
      >
        חומרי לימוד למתנדבים
      </NavLinkItem>
      <NavLinkItem
        href={FAQ_STUDENTS_PAGE_LINK}
        isHighlighted={
          pathname === FAQ_STUDENTS_PAGE_LINK ||
          pathname === FAQ_VOLUNTEERS_PAGE_LINK
        }
      >
        שאלות ותשובות
      </NavLinkItem>
    </nav>
  );
}
