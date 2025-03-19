import { ArrowSvg } from "@/components/UI/icons/Icons";
import LinkCmp from "@/components/UI/LinkCmp";
import Image from "next/image";

interface ExplainStudentsCharitiesItemProps {
  item: {
    name: string;
    img: string;
    text: string;
    link: string;
  };
}
export default function ExplainStudentsCharitiesItem({
  item,
}: ExplainStudentsCharitiesItemProps) {
  const { img, name, text, link } = item;
  return (
    <li className="border-t-8 border-mainGold-500 rounded-base flex items-center p-4 xs:gap-6 gap-2 shadow-[0px_4px_4px_0px_#00000026]">
      <Image
        src={img}
        width={80}
        height={80}
        alt={name}
        className="bg-mainWhite-150 h-20 aspect-square object-contain p-4"
      />
      <div className="grid gap-4">
        <h6 className="text-mainGray-600">{name}</h6>
        <p className="leading-7">{text}</p>
        <LinkCmp
          styleMode="arrow"
          styleSize="none"
          className="pb-2 border-b-mainGray-600"
          href={link}
          target="_blank"
        >
      בקרו באתר העמותה
          <ArrowSvg />
        </LinkCmp>
      </div>
    </li>
  );
}
