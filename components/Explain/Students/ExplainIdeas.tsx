import {
  HomeSvg,
  HeartSvg,
  DonateSvg,
  PenAndPaperSvg,
  GroupSvg,
} from "@/components/UI/icons/Icons";

export default function ExplainIdeas() {
  return (
    <section className="sm:px-sides-sm px-sides">
      <h5 className="pb-8">רעיונות פשוטים ומשמעותיים</h5>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-gaps items-center">
        {items.map(({ icon, header, text }, index) => (
          <li
            key={index}
            className="flex h-fit items-center gap-y-1 gap-x-4 "
          >
            {icon}
            <div>
              <h6 className="text-mainGray-600 text-16 md:text-18">{header}</h6>
              <p className="text-16 md:text-18">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const items: { header: string; text: string; icon: React.ReactNode }[] = [
  {
    header: "מכתב לחיילים",
    text: "כתבו מילים חמות שיחזקו את רוחם של המגנים עלינו",
    icon: (
      <HeartSvg className="h-14 min-h-14 min-w-14 w-14 p-2 rounded-base bg-mainOrange-700 fill-mainOrange-700 stroke-mainWhite-0 row-span-2" />
    ),
  },
  {
    header: "עזרה בלימודים",
    text: "הקדישו חצי שעה כדי לסייע לחבר מהכיתה שמתקשה",
    icon: (
      <PenAndPaperSvg className="h-14 min-h-14 min-w-14 w-14 p-2 rounded-base bg-mainOrange-700 fill-mainOrange-700 stroke-mainWhite-0 row-span-2" />
    ),
  },
  {
    header: "אחריות בבית",
    text: "קחו אחריות על מטלה משפחתית עבור כל שיעור שתעברו",
    icon: (
      <HomeSvg className="h-14 min-h-14 min-w-14 w-14 p-2 rounded-base bg-mainOrange-700 fill-mainOrange-700 stroke-mainWhite-0 row-span-2" />
    ),
  },
  {
    header: "צירוף חברים או התנדבות בעצמכם",
    text: "הצטרפו וסייעו לתלמידים צעירים יותר. במיוחד אם אתם תלמידי תיכון",
    icon: (
      <GroupSvg className="h-14 min-h-14 min-w-14 w-14 p-2 rounded-base bg-mainOrange-700 fill-mainWhite-0 row-span-2" />
    ),
  },
  {
    header: "תרומה לעמותה",
    text: `תרומה קטנה של 10 ש"ח יכולה ליצור שינוי גדול`,
    icon: (
      <DonateSvg className="h-14 min-h-14 min-w-14 w-14 p-2 rounded-base bg-mainOrange-700 fill-mainOrange-700 stroke-mainWhite-0 row-span-2" />
    ),
  },
];
