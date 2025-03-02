import { GIRL_STUDY_2 } from "@/constants/images";
import Image from "next/image";
import React from "react";

export default function ExplainVolunteersInfo() {
  return (
    <div className="px-24 flex justify-around gap-36  w-full ">
      <article className="flex flex-col gap-6">
        <h5>הצטרפו למיזם ׳שעה של פוקוס׳</h5>

        {item.map((item, index) => (
          <p key={index} className="text-mainGray-800 leading-30 text-18">
            {item}
          </p>
        ))}
      </article>

      <div className="image-border before:bg-mainGold-500 after:bg-mainGold-500 relative w-[100%] aspect-square min-w-[30rem] ">
        <Image
          width={512}
          height={256}
          src={GIRL_STUDY_2}
          alt="people on lawn"
          className="w-full h-full rounded-none"
        />
      </div>
    </div>
  );
}

const item = [
  `התנדבות במיזם שלנו היא הזדמנות להשפיע, לחולל שינוי אמיתי ולהיות חלק
          מקהילה שתומכת בתלמידים המפונים הזקוקים לעזרה, במיוחד בתקופה מאתגרת זו.
          המתנדבים שלנו הם הכוח שמניע את המיזם, ומאפשרים לילדים להמשיך ללמוד,
          לשמור על רצף לימודי ולהרגיש שיש להם מישהו שתומך בהם.`,
  `אנו מחפשים מתנדבים מסורים ואכפתיים שיכולים להתחייב לליווי אישי של
          תלמידים במסגרת שיעורים פרטיים אונליין. כל מתנדב במיזם ממלא תפקיד חיוני
          בליווי התלמידים – לא רק בהעברת ידע, אלא גם בהענקת ביטחון, מוטיבציה
          ותחושת יציבות בתקופה לא פשוטה.`,
  `אנחנו מחפשים בנוסף מתנדבים שירצו לשמש כרכזים ומראיינים. כמו כן, מורים
          המעוניינים בכך יכולים לשמש כמנטורים וללוות את צוות המתנדבים הקיים.`,
];
