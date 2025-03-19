import { ArrowSvg } from "@/components/UI/icons/Icons";
import LinkCmp from "@/components/UI/LinkCmp";

interface ArticleProps {
  publishPlace: string;
  preview: string;
  publishDate: string;
  link: string;
  isFading?: boolean;
}
export default function ArticleItem({
  publishPlace,
  preview,
  publishDate,
  link,
  isFading,
}: ArticleProps) {
  return (
    <div
      className={`max-w-[49rem] h-72 w-full flex  flex-col items-start border-t-8 border-t-mainGold-500 px-2 xs:px-6 pt-6 xs:pt-12 pb-8 justify-between shadow-[0px_3px_6px_0px_#00000026] rounded-base transition-opacity duration-300
       ${isFading ? "opacity-0" : "opacity-100"}`}
    >
      <p className="text-right text-18 pr-1 text-mainGray-800 italic line-clamp-3">
        {preview}
      </p>

      <p className="text-mainGray-500 xs:text-18 text-16 text-right">
        <b>{publishPlace}</b>, {publishDate}
      </p>
      <LinkCmp
        href={link}
        styleMode="arrow"
        styleSize="none"
        className="items-start place-items-start justify-start"
        target="_blank"
      >
        <h6 className="text-right text-14">לכתבה המלאה</h6>
        <ArrowSvg />
      </LinkCmp>
    </div>
  );
}
