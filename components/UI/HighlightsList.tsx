import { ClockSvg, GroupSvg, HeartSvg } from "./icons/Icons";

export default function HighlightsList() {
  return (
    <ul className="flex flex-col-reverse sm:flex-row justify-around gap-6 w-full lg:max-w-[70vw]">
      {items.map((item, index) => (
        <li
          key={index}
          className="grid justify-items-center h-fit  gap-4 text-mainOrange-700"
        >
          {item.icon}
          <p className="text-18 xl:text-24 text-mainOrange-700 font-bold text-center">
            {item.title}
          </p>
          <p className="leading-30 text-18  text-wrap sm:text-center">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

const items = [
  {
    icon: <ClockSvg className="md:w-14 md:h-14 w-12 h-12 fill-none" />,
    title: "גמישות מלאה",
    text: "התנדבות בזמנים שמתאימים לכם",
  },
  {
    icon: (
      <GroupSvg className="md:w-14 md:h-14 w-12 h-12 fill-mainOrange-700" />
    ),
    title: "ליווי אישי",
    text: "צוות תומך לאורך כל הדרך",
  },
  {
    icon: (
      <HeartSvg className="md:w-14 md:h-14 w-12 h-12 stroke-mainOrange-700 fill-none" />
    ),
    title: "השפעה אמיתית",
    text: "תרומה משמעותית למפונים",
  },
];
