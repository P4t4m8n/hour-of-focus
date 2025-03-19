//Next
import Image from "next/image";
//UI
import ItemList from "../UI/ItemList";
import GenericInfoCmp from "../UI/GenericInfoCmp";
//Constants
import { WHO_WE_ARE_IMAGE } from "@/constants/images";

export default function WhoWeAre() {
  return (
    <GenericInfoCmp
      className="home-layout-who-we-are"
      info={
        <ItemList<{ header: string; text: string; _id: undefined }>
          listStyle=" flex flex-col gap-10 w-full order-2 lg:order-1 "
          items={items}
          renderItem={(item) => (
            <WhoWeAreItem header={item.header} text={item.text} />
          )}
        />
      }
      image={
        <Image
          width={512}
          height={512}
          src={WHO_WE_ARE_IMAGE}
          alt="Who we are"
          className="object-fill h-full w-full "
          priority
        />
      }
      imgConStyle="order-1 lg:order-2"
     
    />
  );
}

const items = [
  {
    _id: undefined,
    header: "מי אנחנו?",
    text: `
    אנחנו קבוצה של סטודנטים, מילואימניקים, מורים, עובדים בהייטק, ועוד
    רבים המתנדבים לסייע לאחינו המפונים מהדרום והצפון.
 `,
  },
  {
    _id: undefined,

    header: "מה המטרה שלנו?",
    text: `הפרויקט פועל מתוך רוח של ערבות הדדית, במטרה להעניק תמיכה חינוכית ולימודית לתלמידים המפונים, לסייע בנחיתה רכה לאלו שכבר חזרו לבתיהם, ולאפשר לכל תלמיד שעה של פוקוס 💙.`,
  },
  {
    _id: undefined,

    header: "איך זה עובד",
    text: `
    אנחנו נתאם חיבור בין המתנדבים לתלמידים, ונקצה לכל תלמיד מורה פרטי
    שיספק לו שיעור פרטי אונליין במשך שעה אחת בשבוע, בנושא אחד שיבחר`,
  },
];

const WhoWeAreItem = ({ header, text }: { header: string; text: string }) => {
  return (
    <li>
      <h5 className="medium:text-normal pb-3">{header}</h5>
      <p className="text-normal medium:text-[1rem] leading-30 text-mainGray-800">
        {text}
      </p>
    </li>
  );
};
