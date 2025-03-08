import { EXAM_IMAGE, GIRL_STUDY_ONE_IMAGE, HANDS_IMAGE } from "@/constants/images";
import AboutInfoImage from "./AboutInfoImage";
import AboutInfoText from "./AboutInfoText";

export default function AboutInfo() {
  return (
    <ul className="grid grid-rows-3 justify-items-center px-24 mobile:px-4 about-info max-w-[80vw] medium:max-w-full">
      <li className="pl-6">
        <AboutInfoText
          header="איך זה עובד?"
          text="בטופס ההרשמה, כל תלמיד מתבקש לציין מקצוע וזמנים מועדפים לקיום השיעור, ובהתאם משובץ למתנדב מתאים. יחד הם מקיימים שיעור אונליין שבועי בן 60 דקות במקצוע המבוקש. בנוסף, התלמידים יכולים לפנות למורים עם שאלות גם אחרי השיעור ולקבל תמיכה נוספת דרך הוואטסאפ."
        />
      </li>
      <li className="h-[30rem]  place-self-start w-full">
        <AboutInfoImage
          src={GIRL_STUDY_ONE_IMAGE}
          alt="girl studying"
          borderColors="mainGold-500"
        />
      </li>
      <li className="h-[30rem] place-self-end w-full">
        <AboutInfoImage
          src={EXAM_IMAGE}
          alt="girl studying"
          borderColors="mainGold-500"
          isBorderRight={true}
        />
      </li>
      <li className="pr-6">
        <AboutInfoText
          header="תמיכה אישית"
          text="המורים במיזם מספקים לתלמידים חווית למידה אישית, תוך שמירה על קשר ישיר עם התלמידים לאחר השיעור. המורים, רבים מהם משרתי מילואים, מספקים תמיכה נוספת בזמן אמת, כשהם זמינים לשאלות והכוונה מעבר לשיעור עצמו."
        />
      </li>
      <li className="pl-6">
        <AboutInfoText
          header="היקף הפעילות"
          text="הפרויקט פועל בעיקר עם תלמידי חטיבה ותיכון, אך בשמחה מספק גם מענים לתלמידי יסודי תוך מודעות לאתגרים הטכנולוגיים. השיעורים מתקיימים במגוון מקצועות, כשהמובילים ביותר הם מתמטיקה, פיזיקה ואנגלית, אך אנו גמישים לצרכים האישיים של כל תלמיד."
        />
      </li>
      <li className="h-[30rem] place-self-start w-full">
        <AboutInfoImage
          src={HANDS_IMAGE}
          alt="hands together"
          borderColors="mainGold-500"
        />
      </li>
    </ul>
  );
}
