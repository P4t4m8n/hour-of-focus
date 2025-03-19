//Types
import { TTextBlock } from "@/types/app.type";
//UI
import Input from "../UI/Input";
import Label from "../UI/Label";
import { MinusSvg, PlusSvg } from "../UI/icons/Icons";
import { RichTextRender } from "../UI/RichTextRender";

interface FaqItemProps {
  _id?: string;
  deltaQuestion?: TTextBlock[];
  deltaAnswer?: TTextBlock[];
}
/**
 * FaqItem server component renders a FAQ item with a question and answer.
 *
 * @component
 * @param {FaqItemProps} props - The props for the component.
 * @param {string} props._id - The unique identifier for the FAQ item.
 * @param {TTextBlock[]} props.deltaQuestion - The question for the FAQ item.
 * @param {TTextBlock[]} props.deltaAnswer - The answer for the FAQ item.
 *
 * @returns {JSX.Element} The rendered FaqItem component.
 */
export default function FaqItem({
  deltaQuestion,
  deltaAnswer,
  _id,
}: FaqItemProps) {
  return (
    <Input
      type="radio"
      id={_id}
      name="faq"
      hidden
      className="faq-radio "
      divStyle="w-full min-h-20 hover:cursor-pointer h-auto grid gap-0 transition-all duration-200 bg-mainWhite-0 shadow-[0px_4px_10px_0px_#00000026] rounded-base p-4 border-t-[0.375rem] border-mainGold-500 "
    >
      <Label
        htmlFor={_id}
        className="faq-label hover:cursor-pointer grid w-full justify-between items-center h-full gap-4 grid-cols-[1fr,1.5rem]"
      >
        <span className=" text-mainGray-800">
          <RichTextRender delta={deltaQuestion} />
        </span>
        <PlusSvg className="plus" />
        <MinusSvg className="minus " />
        <div
          className={`faq-answer grid transition-all duration-300 grid-rows-[0fr] `}
        >
          <div className="overflow-hidden">
            <span className="text-mainGray-800">
              {" "}
              <RichTextRender delta={deltaAnswer} />
            </span>
          </div>
        </div>
      </Label>
    </Input>
  );
}
