/**
 * Component that renders information about the "Explain Volunteers" section.
 * It uses the `GenericInfoCmp` component to display the information along with an image.
 *
 * @component
 *
 * @returns {JSX.Element} The `ExplainVolunteersInfo` component.
 */
//Images
import GenericInfoCmp from "@/components/UI/GenericInfoCmp";
import { GIRL_PAINTING_IMAGE } from "@/constants/images";
//Next
import Image from "next/image";

export default function ExplainVolunteersInfo() {
  return (
    <GenericInfoCmp
      className="md:py-gaps-md py-gaps"
      info={Info}
      image={
        <Image
          width={512}
          height={256}
          src={GIRL_PAINTING_IMAGE}
          alt="people on lawn"
          className="w-full h-full object-fill rounded-tl-base rounded-br-base"
        />
      }
    />
  );
}

const Info = (
  <article className="flex flex-col gap-3 xl:gap-6 font-normal ">
    <h5 className="">שיטת המעשים הטובים 🌍💙</h5>

    <h6 className="text-mainGray-500 font-medium leading-30 text-20 pb-3 ">
      מעבירים את זה הלאה
    </h6>
    <p className="text-mainGray-800 leading-30 text-16 md:text-18">{`בפרויקט "שעה של פוקוס", אנחנו מאמינים שלא רק הלמידה חשובה, אלא גם מעשים טובים שמייצרים שינוי חיובי. לכן, אנחנו מזמינים אתכם לבחור, אם תרצו, מעשה טוב עבור כל שיעור שתעברו בפרויקט.`}</p>
    <p className="text-mainGray-800 leading-30 text-16 md:text-18">
      <b>שימו לב:</b> מדובר בהמלצה בלבד – אין חובה להשתתף, אבל כל מעשה קטן יכול
      להשפיע בענק! 🌟
    </p>
  </article>
);
