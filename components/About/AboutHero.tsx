import ImageOverlay from "../UI/ImageOverlay";
import Image from "next/image";
import { GINGER_KID_IMAGE } from "@/constants/images";

export default function AboutHero() {
  return (
    <div className="w-full grid grid-cols-1 grid-rows-1 items-center justify-center justify-items-center lg:h-[23rem] h-[20rem]">
      <div className="grid-stack z-20 text-mainWhite-0 grid items-center justify-center justify-items-center max-w-[38rem] md:gap-8 gap-4 p-4">
        <h4 className="text-mainWhite-0 text-24 md:text-36">{`על הפרויקט 'שעה של פוקוס'`}</h4>
        <article className="text-center md:text-18 text-16 font-normal leading-30">
          שעה של פוקוס הוא מיזם התנדבותי שנולד מתוך הרצון לסייע לתלמידים מפונים.
          המיזם מחבר בין מתנדבים מדהימים לבין תלמידים הזקוקים לעזרה בלימודים,
          ומעניק שיעורים פרטיים שבועיים בחינם דרך הזום.
        </article>
      </div>
      <ImageOverlay className="blur-lg">
        <Image
          src={GINGER_KID_IMAGE}
          height={368}
          width={1080}
          alt="Ginger kid in front of a screen"
          className=" w-full h-full object-cover blur-[4px]"
          priority
        />
      </ImageOverlay>
    </div>
  );
}
