//UI
import { ApproveSvg } from "@/components/UI/icons/Icons";
import HighlightsList from "@/components/UI/HighlightsList";
/**
 * ExplainVolunteersMiddle is a server component that renders a section
 * explaining what is expected from volunteers and the benefits of joining.
 *
 * @component
 *
 * @returns {JSX.Element} A JSX element containing the explanation for volunteers.
 *
 * @dependencies
 * - ApproveSvg: A component that renders an SVG icon for approval.
 * - HighlightsList: A component that renders a list of highlights.
 *
 */
export default function ExplainVolunteersMiddle() {
  return (
    <div className="bg-mainWhite-50 flex flex-col sm:rounded-b-[160px] sm:items-center  pt-gaps gap-gaps lg:gap-gaps-md px-sides sm:px-10 lg:px-sides-sm pb-gaps lg:mx-24">
      <div className=" flex flex-col gap-gaps w-full sm:items-center">
        <h4 className="text-24 md:text-36 sm:text-center text-right w-fit">
          מה מצופה מהמתנדבים?
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-2 md:gap-x-10 w-fit  ">
          {items.map((item, index) => (
            <li key={index} className="flex gap-2">
              <ApproveSvg />
              <p className=" leading-2 text-16 md:text-18 text-mainGray-800">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="items-center justify-center flex flex-col gap-gaps w-full ">
        <h4 className="text-24 md:text-36 self-start sm:self-center">
          למה כדאי להצטרף אלינו?
        </h4>
        <HighlightsList />
      </div>
    </div>
  );
}

const items = [
  "מחויבות לשעת הוראה שבועית קבועה",
  "רצון להשקיע ולתרום מהידע שלך",
  "יכולת הוראה מרחוק (דרך זום או פלטפורמה דומה)",
  "עדיפות לסטודנטים או בעלי רקע אקדמי",
];
