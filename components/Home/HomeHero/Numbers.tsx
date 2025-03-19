export default function Numbers() {
  return (
    <ul className="w-full justify-center grid grid-cols-2 gap-0 md:flex md:gap-gaps-md  ">
      {items.map((item, index) => (
        <li key={index}>
          <p className="leading-8 text-20 md:text-36">
            <span className="text-mainWhite-0 leading-8 text-20 md:text-36 font-bold">{item.number}</span>
            <span className=" text-mainGold-400 leading-8 text-20 md:text-36 font-bold">{item.symbol}</span>
          </p>
          <p className="text-20 leading-34 font-normal">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

const items = [
  {
    number: 200,
    symbol: "+",
    text: "שיעורים שבועיים",
  },
  {
    number: 350,
    symbol: "+",
    text: "מתנדבים",
  },
  {
    number: 350,
    symbol: "+",
    text: "תלמידים",
  },
  {
    number: 100,
    symbol: "%",
    text: "סיוע למפונים",
  },
];
