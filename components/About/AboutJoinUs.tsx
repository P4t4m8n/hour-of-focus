import React from "react";
import LinkCmp from "../UI/LinkCmp";
import {
  EXPLAIN_STUDENTS_PAGE_LINK,
  EXPLAIN_VOLUNTEERS_PAGE_LINK,
} from "@/constants/links";

export default function AboutJoinUs() {
  return (
    <div className="bg-mainOrange-700 py-10 flex flex-col gap-10 px-sides md:px-0 justify-center items-center  md:rounded-[5rem] rounded-none md:w-[calc(100%-12rem)] w-full ">
      <h3 className=" text-mainWhite-0 text-center text-24 md:text-44 ">הצטרפות למיזם</h3>
      <p className="md:text-20 text-16 leading-10 text-mainWhite-0 text-center md:max-w-[35rem]">
        על מנת להצטרף למיזם, התלמידים מתבקשים לפנות דרך הצוות החינוכי האחראי
        עליהם, אשר יוכל ליצור איתנו קשר דרך האתר.
      </p>
      <nav className="flex flex-col sm:flex-row md:flex-col lg:flex-row md:gap-8 gap-4 w-full justify-center items-center">
        <LinkCmp
          styleMode="whiteBorder"
          styleSize="large"
          href={EXPLAIN_STUDENTS_PAGE_LINK}
        >
          מידע נוסף לתלמידים
        </LinkCmp>
        <LinkCmp
          styleMode="whiteBorder"
          styleSize="large"
          href={EXPLAIN_VOLUNTEERS_PAGE_LINK}
        >
          מידע נוסף למתנדבים
        </LinkCmp>
      </nav>
    </div>
  );
}
