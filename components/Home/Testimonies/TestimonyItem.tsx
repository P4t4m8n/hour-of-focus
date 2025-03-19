import { RichTextRender } from "@/components/UI/RichTextRender";
import { TTestimony } from "@/types/testimonies.type";

interface TestimonyItemProps {
  testimony: TTestimony;
  isFading?: boolean;
}
export default function TestimonyItem({
  testimony,
  isFading,
}: TestimonyItemProps) {
  const { delta } = testimony;
  return (
    <article
      className={`w-full text-16 sm:text-24 font-normal text-mainGray-800 italic  h-52 leading-8 md:leading-40 flex justify-center items-center transition-opacity duration-300 truncate ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="truncate text-wrap w-full px-2">
        <RichTextRender delta={delta} />
      </div>
    </article>
  );
}
