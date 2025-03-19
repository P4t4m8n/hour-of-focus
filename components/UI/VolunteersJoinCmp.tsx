//Components
import LinkCmp from "./LinkCmp";
//Constants
import {
  CONTACT_US,
  LOGISTIC_SIGNUP,
  TEACHERS_SIGNUP,
} from "@/constants/links";

/**
 * A React component that renders a section for volunteers to join.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.isHome] - A flag to determine if the component is rendered on the home page.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function VolunteersJoinCmp({
  isHome,
}: {
  isHome?: boolean;
}): React.JSX.Element {
  return (
    <div className="flex flex-col gap-10 px-sides">
      <article className="flex flex-col gap-4 items-center">
        {isHome ? (
          <>
            <h3 className="text-center text-24 lg:text-44 leading-10">
              הצטרפו עכשיו למשפחת המתנדבים שלנו
            </h3>
            <p className="text-mainGray-500 sm:text-20 text-18 text-center ">
              יחד נוכל לעשות שינוי משמעותי בחיי תלמידים
            </p>
          </>
        ) : (
          <h3 className="text-24 md:text-44">רוצים להתנדב?</h3>
        )}
      </article>

      <nav className="grid grid-cols-1 sm:grid-cols-2 justify-items-center  w-full gap-5 ">
        <LinkCmp
          styleMode="full"
          styleSize="large"
          className="md:place-self-end"
          href={TEACHERS_SIGNUP}
          target="_blank"

        >
          הצטרפו כמורים
        </LinkCmp>
        <LinkCmp
          styleMode="coloredBorder"
          styleSize="large"
          className="font-bold md:place-self-start"
          href={LOGISTIC_SIGNUP}
          target="_blank"

        >
          הצטרפו לצוות הלוגיסטי
        </LinkCmp>

        <LinkCmp
          styleMode="arrow"
          styleSize="long"
          className="text-mainOrange-700 border-mainOrange-700 hover:text-mainOrange-800 hover:border-mainOrange-800 text-center xs:text-right sm:col-span-2 col-span-1"
          href={CONTACT_US}
          target="_blank"


        >
          יש לכם שאלות? דברו איתנו ונשמח לסייע
        </LinkCmp>
      </nav>
    </div>
  );
}
