import { ApproveSvg } from "@/components/UI/icons/Icons";
import LinkCmp from "@/components/UI/LinkCmp";
import { COORDINATOR_SIGNUP } from "@/constants/links";

export default function ExplainStudentsMiddle() {
  return (
    <div className="bg-mainWhite-50 md:py-gaps-md py-gaps px-sides sm:px-sides-sm items-center flex flex-col lg:rounded-b-[160px] gap-28 mobile:gap-14 w-full">
      <div className="items-center flex flex-col gap-10 max-w-[39rem]">
        <h4 className="text-center text-24 md:text-36">
          כיצד נרשמים ל׳שעה של פוקוס׳?
        </h4>
        <p className="text-16 md:text-18 leading-30 text-mainGray-600 text-center">{`מעוניינים להצטרף ל"שעה של פוקוס"? ההרשמה פשוטה ומתבצעת דרך הרכז החינוכי או המחנך במוסד הלימודים שלכם!`}</p>

        <ul className=" bg-mainWhite-0 border-t-8 border-mainOrange-700 rounded-base flex flex-col gap-4 md:gap-10 p-sides shadow-[0px_4px_10px_1px_#CF4A0D1A]">
          {items.map((item, i) => (
            <li key={i} className="flex gap-4 items-center md:items-start">
              <ApproveSvg />
              <p className=" text-16 md:text-18 leading-30 text-mainGray-600">
                {item}
              </p>
            </li>
          ))}
        </ul>
        <LinkCmp
          href={COORDINATOR_SIGNUP}
          styleMode="full"
          styleSize="large"
          className=""
          target="_blank"
        >
          טופס רישום לרכזי חינוך
        </LinkCmp>
      </div>
    </div>
  );
}

const items = [
  "ההרשמה לתוכנית מתבצעת אך ורק דרך צוות בית הספר ולא דרך האתר.",
  "פנו אל הרכז החינוכי או המורה והם ידאגו לרשום אתכם.",
  "העבירו את המידע לחברים נוספים שעשויים להתעניין בתוכנית.",
];
