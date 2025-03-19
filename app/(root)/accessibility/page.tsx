import { Metadata } from "next";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: "הצהרת נגישות",
  category: "accessibility",
  robots: {
    follow: true,
    index: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function AccessibilityDeclarationPage() {
  return (
    <article className="p-8 min-h-[calc(100vh-5rem)] flex flex-col gap-4 ">
      <div className="flex flex-col gap-1">
        <h1>הצהרת נגישות</h1>
        <p className="text-mainGray-800 text-16">
          הצהרת הנגישות עודכנה בתאריך 2025.
        </p>
        <p className="text-mainGray-800 text-16">
          אנחנו ב - שעה של פוקוס פועלים להנגשת אתר האינטרנט שלנו ([כתובת אתר
          האינטרנט]) לאנשים עם מוגבלות.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-20 font-semibold">מהות אתר אינטרנט נגיש</h2>
        <p className="text-mainGray-800 text-16">
          אתר אינטרנט נגיש, הינו אתר המאפשר לאדם עם מוגבלות, לגלוש באותה רמת
          יעילות והנאה כמו גולשים אחרים, תוך שימוש ביכולות המערכת עליה הוא פועל
          ובאמצעות טכנולוגיות מסייעות לנגישות.
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-20 font-semibold">
          ביצוע התאמות נגישות באתר האינטרנט
        </h2>
        <p className="text-mainGray-800 text-16">
          {` התאמנו את האתר בהתאם לסימן ג': שירותי האינטרנט בתקנות שוויון זכויות
        לאנשים עם מוגבלות (התאמות נגישות לשירות) התשע"ג 2013, לתקן הישראלי ת"י
        5568 המבוסס על הנחיות [WCAG 2.0 , האתר הונגש לרמהA\AA\AAA] ], ובכפוף
        לשינויים והתאמות שבוצעו במסמך התקן הישראלי.תכני האתר הותאמו לעבודה עם
        טכנולוגיות מסייעות כגון קורא מסך ושימוש במקלדת. במסגרת זו [מחקו את
        המיותר]:`}
        </p>
        <p className="text-mainGray-800 text-16">
          במידה ומצאתם באתר האינטרנט בעיה בנושא הנגישות או שאתם זקוקים עזרה, אתם
          מוזמנים לפנות אלינו דרך רכז/ת הנגישות של הארגון:
        </p>
      </div>
    </article>
  );
}
