import { PEOPLE_ON_LAWN_IMAGE } from "@/constants/images";
import Image from "next/image";
import React from "react";

export default function AboutOurStory() {
  return (
    <div className="flex mobile:flex-col-reverse mobile:items-center px-24 mobile:p-4 justify-around gap-10 h-[20rem] mobile:h-fit w-full">
      <article className="flex flex-col gap-8">
        <h5 className="">הסיפור שלנו</h5>
        <p className="text-18 text-mainGray-800">{`פרויקט 'שעה של פוקוס' נוצר בפברואר 2024 על ידי מילואימניקים שהחליטו כי חשוב להמשיך בערבות ההדדית גם בעורף. מה שהתחיל כיוזמה צנועה עם מספר מתנדבים בודדים, צמח בהדרגה לפרויקט חינוכי משמעותי, הודות למאות מתנדבים שפועלים מתוך תחושת אחריות ועזרה לזולת.
`}</p>
        <p className="text-18 text-mainGray-800">
          במסגרת המיזם, מתנדבים רבים מעניקים תמיכה לימודית לתלמידים הזקוקים לה,
          תוך התאמה אישית לצרכיהם. הפרויקט ממשיך לגדול ולהתרחב, ומספר המתנדבים
          והתלמידים המשתתפים בו הולך ועולה, מתוך מחויבות מתמשכת לסיוע ולחיזוק
          הקהילה.
        </p>
      </article>

      <div className="image-border block before:bg-mainOrange-700 after:bg-mainOrange-700 relative w-[50%] mobile: min-w-[30rem] mobile:min-w-0 mobile:h-64 mobile:w-[15.8rem] ">
        <Image
          width={512}
          height={256}
          src={PEOPLE_ON_LAWN_IMAGE}
          alt="people on lawn"
          className="w-full h-full rounded-tl-base rounded-br-base"
        />
      </div>
    </div>
  );
}
