//Types
import { TFaq } from "@/types/faqs";
//UI
import ItemList from "../UI/ItemList";
import HeroCmp from "../UI/HeroCmp";
//Components
import FaqItem from "./FaqItem";
import FaqSwitch from "./FaqSwitch";

interface FaqIndexProps {
  type: "volunteers" | "students";
  faqs: TFaq[];
}
export default function FaqIndex({ type, faqs }: FaqIndexProps) {
  return (
    <section className="grid w-full items-center justify-items-center pb-gaps gap-gaps h-fit">
      <HeroCmp text="שאלות ותשובות" />

      <div className="grid w-full items-center gap-gaps justify-items-center px-sides sm:px-sides-sm ">
        <FaqSwitch type={type} />
        <ItemList
          items={faqs}
          listStyle="grid gap-6 w-full"
          renderItem={(faq) => <FaqItem {...faq} />}
        />
      </div>
    </section>
  );
}
