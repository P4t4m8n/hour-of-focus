import { RichTextRender } from "@/components/UI/RichTextRender";
import { TTestimony } from "@/types/testimonies.type";

interface TestimonyItemProps {
  testimony?: TTestimony;
  isFading?: boolean;
}
export default function TestimonyItem({
  testimony,
  isFading,
}: TestimonyItemProps) {
  return (
    <article
      className={`w-full text-16 sm:text-24 font-normal text-mainGray-800 italic   leading-8 md:leading-40 flex justify-center items-center transition-all duration-300  ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className=" text-wrap w-full px-2">
        {testimony?.delta ? <RichTextRender delta={testimony?.delta} /> : ""}
      </div>
    </article>
  );
}
