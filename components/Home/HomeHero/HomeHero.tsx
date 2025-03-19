/**
 * HomeHero server component renders the hero section of the home page.
 * It includes a background image, a title, a description, and navigation links.
 *
 * @component
 * @example
 *
 * @returns {JSX.Element} The rendered HomeHero component.
 *
 * @remarks
 * This component uses Tailwind CSS for styling and includes responsive design adjustments.
 * The image have parallax effect and overlay color. see global.css
 *
 * @see {@link ../../app/global.css} for global styles used in the application.
 * @see {@link ../../UI/LinkCmp} for the LinkCmp component used for navigation links.
 * @see {@link ./Numbers} for the Numbers component displayed at the bottom.
 *
 * @constant {string} LOGISTIC_SIGNUP - URL for logistic team signup.
 * @constant {string} TEACHERS_SIGNUP - URL for teachers signup.
 */
//UI
import LinkCmp from "../../UI/LinkCmp";
//Components
import Numbers from "./Numbers";
//Links
import {
  EXPLAIN_STUDENTS_PAGE_LINK,
  LOGISTIC_SIGNUP,
  TEACHERS_SIGNUP,
} from "@/constants/links";

export default function HomeHero() {
  return (
    <div className="w-full grid grid-cols-1 grid-rows-1 home-layout-hero relative max-h-none">
      <div className="bg-cover bg-center grid-stack bg-fixed w-full h-full relative bg-blend-multiply bg-ginger-kid before:backdrop-blur-sm before:inset-0 before:absolute before:bg-imageOverlay-60"></div>

      <div className="w-full h-full grid-stack pb-gaps z-10 flex flex-col items-center justify-center gap-8 py-8 px-sides md:px-sides-sm text-mainWhite-0 text-center">
        <p className="text-mainWhite-0 text-20 md:text-24 font-semibold leading-28">
          למען המפונים מהדרום והמצפון
        </p>

        <h1 className="text-36 md:text-[4rem]">
          <span className="font-normal">שעה של </span>
          <span className=" text-mainGold-400">פוקוס</span>
        </h1>

        <p className="text-18 md:text-20 leading-34">
          מחברים בין תלמידים למתנדבים לשעה שבועית של למידה ממוקדת
        </p>

        <nav className="flex flex-col lg:gap-10 gap-4 items-center lg:py-12 py-4 w-full ">
          <LinkCmp
            styleMode="full"
            styleSize="large"
            href={TEACHERS_SIGNUP}
            target="_blank"
          >
            הצטרפו כמורים
          </LinkCmp>
          <div className="flex md:gap-8 gap-4 flex-col sm:flex-row items-center justify-center w-full">
            <LinkCmp
              styleMode="whiteBorder"
              styleSize="large"
              href={LOGISTIC_SIGNUP}
              className=""
              target="_blank"
            >
              הצטרפו לצוות הלוגיסטי
            </LinkCmp>
            <LinkCmp
              styleMode="whiteBorder"
              styleSize="large"
              href={EXPLAIN_STUDENTS_PAGE_LINK}
              className=""
            >
              מידע נוסף לתלמידים
            </LinkCmp>
          </div>
        </nav>
        <Numbers />
      </div>
    </div>
  );
}
