import GenericInfoCmp from "@/components/UI/GenericInfoCmp";
import { GIRL_STUDY_TWO_IMAGE } from "@/constants/images";
import Image from "next/image";

export default function ExplainVolunteersInfo() {
  return (
    <GenericInfoCmp
      info={Info}
      image={
        <Image
          width={480}
          height={432}
          src={GIRL_STUDY_TWO_IMAGE}
          alt="people on lawn"
          className="w-full h-full rounded-none "
        />
      }
    />
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

const Info = (
  <article className="flex flex-col gap-6">
    <h5 className="">הצטרפו למיזם ׳שעה של פוקוס׳</h5>

    {item.map((item, index) => (
      <p
        key={index}
        className="text-mainGray-800 leading-30 md:text-18 text-16"
      >
        {item}
      </p>
    ))}
  </article>
);
