import { PEOPLE_ON_LAWN_IMAGE } from "@/constants/images";
import Image from "next/image";
import React from "react";
import GenericInfoCmp from "../UI/GenericInfoCmp";

export default function AboutOurStory() {
  return (
    <GenericInfoCmp
      info={Info}
      image={
        <Image
          width={512}
          height={512}
          src={PEOPLE_ON_LAWN_IMAGE}
          alt="people on lawn"
          className="w-full h-full object-fill rounded-tl-base rounded-br-base"
        />
      }
      imgConStyle="order-1 lg:order-2 before:bg-mainOrange-700 after:bg-mainOrange-700"
      className="home-layout-who-we-are"
    />

  );
}

const Info = (
  <article className="flex flex-col gap-8">
    <h5 className="">הסיפור שלנו</h5>
    <p className="text-18 text-mainGray-800 leading-10">{`פרויקט 'שעה של פוקוס' נוצר בפברואר 2024 על ידי מילואימניקים שהחליטו כי חשוב להמשיך בערבות ההדדית גם בעורף. מה שהתחיל כיוזמה צנועה עם מספר מתנדבים בודדים, צמח בהדרגה לפרויקט חינוכי משמעותי, הודות למאות מתנדבים שפועלים מתוך תחושת אחריות ועזרה לזולת.
`}</p>
    <p className="text-18 text-mainGray-800 leading-10">
      במסגרת המיזם, מתנדבים רבים מעניקים תמיכה לימודית לתלמידים הזקוקים לה, תוך
      התאמה אישית לצרכיהם. הפרויקט ממשיך לגדול ולהתרחב, ומספר המתנדבים והתלמידים
      המשתתפים בו הולך ועולה, מתוך מחויבות מתמשכת לסיוע ולחיזוק הקהילה.
    </p>
  </article>
);
