import React from "react";
import LinkCmp from "../../UI/LinkCmp";
import Numbers from "./Numbers";
import HeroImage from "./HeroImage";
import { LOGISTIC_SIGNUP, TEACHERS_SIGNUP } from "@/constants/links";

export default function HomeHero() {
  return (
    <div className="w-full grid grid-cols-1 grid-rows-1 ">
      <HeroImage />
      <div className="w-full h-full grid-stack z-10 flex flex-col  items-center text-white-0 text-center pt-24">
        <h5>למען המפונים מהדרום והמצפון</h5>

        <h1 className="py-10">
          <span className="font-normal">שעה של </span>
          <span className=" text-mainGold-400">פוקוס</span>
        </h1>

        <p className="text-md leading-34 font-thin">
          מחברים בין תלמידים למתנדבים לשעה שבועית של למידה ממוקדת
        </p>

        <div className="flex flex-col gap-10 items-center py-12  ">
          <LinkCmp styleMode="full" styleSize="large" href={TEACHERS_SIGNUP}>
            הצטרפו כמורים
          </LinkCmp>
          <div className="flex gap-8">
            <LinkCmp
              styleMode="grayBorder"
              styleSize="large"
              href={LOGISTIC_SIGNUP}
            >
              <h6 className="leading-21">הצטרפו לצוות הלוגיסטי</h6>
            </LinkCmp>
            <LinkCmp styleMode="grayBorder" styleSize="large" href="">
              <h6>מידע נוסף לתלמידים</h6>
            </LinkCmp>
          </div>
        </div>
        <Numbers />
      </div>
    </div>
  );
}
